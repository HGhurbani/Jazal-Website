import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadTranslations, updateTranslations as updateTranslationsFirebase, getTranslations, defaultTranslations } from '@/lib/translations';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  const [translations, setTranslations] = useState(defaultTranslations);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // تحميل البيانات من Firebase عند بدء التطبيق
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadTranslations();
        setTranslations(data);
        setLastUpdate(Date.now());
      } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // الاستماع للتغييرات في Firebase في الوقت الفعلي
  useEffect(() => {
    if (!db) return;

    const unsubscribe = onSnapshot(
      doc(db, 'website', 'data'),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setTranslations(data);
          setLastUpdate(Date.now());
          console.log('تم تحديث البيانات تلقائياً من Firebase');
        } else {
          // إذا لم توجد بيانات في Firebase، استخدم البيانات الافتراضية
          console.log('لا توجد بيانات في Firebase، استخدام البيانات الافتراضية');
          setTranslations(defaultTranslations);
        }
      },
      (error) => {
        console.error('خطأ في الاستماع للتغييرات:', error);
        // في حالة الخطأ، استخدم البيانات الافتراضية
        console.log('استخدام البيانات الافتراضية في حالة الخطأ');
        setTranslations(defaultTranslations);
      }
    );

    return () => unsubscribe();
  }, []);

  // دالة لإعادة تحميل البيانات يدوياً
  const refreshData = async () => {
    try {
      setLoading(true);
      const data = await loadTranslations();
      setTranslations(data);
      setLastUpdate(Date.now());
      return true;
    } catch (error) {
      console.error('خطأ في إعادة تحميل البيانات:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTranslations = async (lang, updates) => {
    try {
      // تحديث البيانات في Firebase
      await updateTranslationsFirebase(lang, updates);
      
      // تحديث البيانات المحلية
      setTranslations(prev => ({
        ...prev,
        [lang]: mergeDeep(prev[lang] || {}, updates)
      }));
      
      // تحديث وقت آخر تحديث
      setLastUpdate(Date.now());
      
      return true;
    } catch (error) {
      console.error('خطأ في تحديث البيانات:', error);
      throw error;
    }
  };

  // الحصول على الترجمة الحالية مع fallback للبيانات الافتراضية
  const t = translations && translations[language] ? 
    mergeDeep(defaultTranslations[language] || {}, translations[language] || {}) : 
    defaultTranslations[language] || {};

  const value = {
    language,
    setLanguage,
    t,
    updateTranslations,
    refreshData,
    loading,
    translations,
    lastUpdate
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