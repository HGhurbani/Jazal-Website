import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadTranslations, updateTranslations as updateTranslationsFirebase, getTranslations, defaultTranslations } from '@/lib/translations';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
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
  const [isListening, setIsListening] = useState(false);

  // تحميل البيانات من Firebase عند بدء التطبيق
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('🔄 بدء تحميل البيانات من Firebase...');
        
        const data = await loadTranslations();
        console.log('✅ تم تحميل البيانات بنجاح:', data);
        
        setTranslations(data);
        setLastUpdate(Date.now());
        
        // بدء الاستماع للتغييرات بعد تحميل البيانات الأولية
        startRealtimeListener();
      } catch (error) {
        console.error('❌ خطأ في تحميل البيانات:', error);
        // استخدام البيانات الافتراضية في حالة الخطأ
        setTranslations(defaultTranslations);
        setLastUpdate(Date.now());
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // دالة لبدء الاستماع للتغييرات في الوقت الفعلي
  const startRealtimeListener = () => {
    if (!db || isListening) return;

    try {
      console.log('🔊 بدء الاستماع للتغييرات في Firebase...');
      
      const unsubscribe = onSnapshot(
        doc(db, 'website', 'data'),
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            console.log('📡 تم استلام تحديث من Firebase:', data);
            console.log('🕒 وقت التحديث:', new Date().toLocaleString('ar-SA'));
            
            // تحديث البيانات المحلية
            setTranslations(prev => {
              const newData = { ...data };
              console.log('📊 البيانات السابقة:', prev);
              console.log('📊 البيانات الجديدة:', newData);
              return newData;
            });
            
            setLastUpdate(Date.now());
            console.log('✅ تم تحديث البيانات المحلية بنجاح');
          } else {
            console.log('⚠️ لا توجد بيانات في Firebase، استخدام البيانات الافتراضية');
            setTranslations(defaultTranslations);
            setLastUpdate(Date.now());
          }
        },
        (error) => {
          console.error('❌ خطأ في الاستماع للتغييرات:', error);
          // في حالة الخطأ، استخدم البيانات الافتراضية
          console.log('🔄 استخدام البيانات الافتراضية في حالة الخطأ');
          setTranslations(defaultTranslations);
          setLastUpdate(Date.now());
        }
      );

      setIsListening(true);
      console.log('✅ تم بدء الاستماع للتغييرات بنجاح');

      // تنظيف الاستماع عند إلغاء التطبيق
      return () => {
        console.log('🛑 إيقاف الاستماع للتغييرات');
        unsubscribe();
        setIsListening(false);
      };
    } catch (error) {
      console.error('❌ خطأ في بدء الاستماع للتغييرات:', error);
    }
  };

  // دالة لإعادة تحميل البيانات يدوياً
  const refreshData = async () => {
    try {
      console.log('🔄 بدء إعادة تحميل البيانات...');
      setLoading(true);
      
      // إيقاف الاستماع الحالي
      if (isListening) {
        setIsListening(false);
      }
      
      const data = await loadTranslations();
      console.log('✅ تم إعادة تحميل البيانات بنجاح:', data);
      
      setTranslations(data);
      setLastUpdate(Date.now());
      
      // إعادة بدء الاستماع
      startRealtimeListener();
      
      return true;
    } catch (error) {
      console.error('❌ خطأ في إعادة تحميل البيانات:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTranslations = async (lang, updates) => {
    try {
      console.log('🔄 بدء تحديث البيانات...');
      console.log('🌐 اللغة:', lang);
      console.log('📝 التحديثات:', updates);
      
      // تحديث البيانات في Firebase
      await updateTranslationsFirebase(lang, updates);
      console.log('✅ تم حفظ البيانات في Firebase بنجاح');
      
      // تحديث البيانات المحلية فوراً
      setTranslations(prev => {
        const updated = {
          ...prev,
          [lang]: mergeDeep(prev[lang] || {}, updates)
        };
        console.log('📊 البيانات المحلية المحدثة:', updated);
        return updated;
      });
      
      // تحديث وقت آخر تحديث
      setLastUpdate(Date.now());
      console.log('✅ تم تحديث البيانات المحلية بنجاح');
      
      // إعادة تحميل البيانات من Firebase للتأكد من التحديث
      setTimeout(async () => {
        try {
          console.log('🔄 إعادة تحميل البيانات للتأكد من التحديث...');
          const freshData = await getDoc(doc(db, 'website', 'data'));
          if (freshData.exists()) {
            const data = freshData.data();
            console.log('📡 البيانات المحدثة من Firebase:', data);
            setTranslations(data);
            setLastUpdate(Date.now());
          }
        } catch (error) {
          console.error('❌ خطأ في إعادة تحميل البيانات للتأكد:', error);
        }
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('❌ خطأ في تحديث البيانات:', error);
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
    lastUpdate,
    isListening
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