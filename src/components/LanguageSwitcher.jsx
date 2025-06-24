import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="font-semibold text-gray-700 hover:text-yellow-600 hover:bg-yellow-100/50"
    >
      {language === 'ar' ? 'EN' : 'AR'}
    </Button>
  );
};

export default LanguageSwitcher;