import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Clients from '@/components/sections/Clients';
// import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import WhatsAppPopup from '@/components/ui/WhatsAppPopup';

function AppContent() {
  const { toast } = useToast();
  const { language, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // تم إزالة رسالة تحديث البيانات

  const handleContactSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast({
      title: t.toast.successTitle,
      description: t.toast.successDescription,
    });
  };

  const handleFeatureClick = () => {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero handleFeatureClick={handleFeatureClick} />
          <About />
          <Services handleFeatureClick={handleFeatureClick} />
          <Projects />
          <Clients />
          {/* <Testimonials /> */}
          <Faq />
          <Contact handleContactSubmit={handleContactSubmit} />
        </main>
        <Footer handleFeatureClick={handleFeatureClick} />
        <WhatsAppPopup />
        <Toaster />
        

      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;