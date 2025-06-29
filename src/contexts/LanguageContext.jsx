import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

const loadCustomTranslations = () => {
  try {
    return JSON.parse(localStorage.getItem('customTranslations')) || {};
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
  const [custom, setCustom] = useState(loadCustomTranslations());

  useEffect(() => {
    setCustom(loadCustomTranslations());
  }, []);

  const updateTranslations = (lang, updates) => {
    const updated = {
      ...custom,
      [lang]: mergeDeep(custom[lang] || {}, updates),
    };
    setCustom(updated);
    localStorage.setItem('customTranslations', JSON.stringify(updated));
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