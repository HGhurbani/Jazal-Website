import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadTranslations, updateTranslations as updateTranslationsFirebase, getTranslations } from '@/lib/translations';

const LanguageContext = createContext();

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
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);

  // تحميل البيانات من Firebase عند بدء التطبيق
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadTranslations();
        setTranslations(data);
      } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateTranslations = async (lang, updates) => {
    try {
      // تحديث البيانات في Firebase
      await updateTranslationsFirebase(lang, updates);
      
      // تحديث البيانات المحلية
      setTranslations(prev => ({
        ...prev,
        [lang]: mergeDeep(prev[lang] || {}, updates)
      }));
      
      return true;
    } catch (error) {
      console.error('خطأ في تحديث البيانات:', error);
      throw error;
    }
  };

  // الحصول على الترجمة الحالية
  const t = translations ? mergeDeep(translations[language] || {}, {}) : {};

  const value = {
    language,
    setLanguage,
    t,
    updateTranslations,
    loading,
    translations
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b18344] mx-auto mb-4"></div>
          <p className="text-slate-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

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