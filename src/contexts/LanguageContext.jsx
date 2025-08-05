import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

const loadCustomTranslations = async () => {
  try {
    // Bypass any caches to always retrieve the latest data
    const res = await fetch('/api/data', { cache: 'no-store' });
    const data = await res.json();
    return data.customTranslations || {};
  } catch {
    return {};
  }
};

const mergeDeep = (target, source) => {
  if (typeof source !== 'object' || source === null) return source;
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === 'object') {
      output[key] = mergeDeep(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [custom, setCustom] = useState({});

  useEffect(() => {
    loadCustomTranslations().then(setCustom).catch(() => {});
  }, []);

  const updateTranslations = async (lang, updates) => {
    const updated = {
      ...custom,
      [lang]: mergeDeep(custom[lang] || {}, updates),
    };
    setCustom(updated);
    try {
      await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, updates }),
        cache: 'no-store',
      });
    } catch {
      // Ignore network errors; state already updated locally
    }
  };

  const t = mergeDeep(translations[language], custom[language] || {});

  const value = {
    language,
    setLanguage,
    t,
    updateTranslations,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};