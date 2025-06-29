import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = ({ handleContactSubmit }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const whatsappNumber = t.footer.contactPhone || '+966504447148';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(`مرحباً، أود التواصل معكم بخصوص خدماتكم`);
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const whatsappMessage = encodeURIComponent(
      `*رسالة جديدة من الموقع*\n\n` +
      `الاسم: ${formData.name}\n` +
      `الهاتف: ${formData.phone}\n` +
      `الرسالة: ${formData.message}`
    );
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${whatsappMessage}`, '_blank');
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setFormData({ name: '', phone: '', message: '' });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#b18344] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#b18344] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-[#b18344]/10 px-4 py-2 rounded-full mb-6">
            <MessageCircle className="w-5 h-5 text-[#b18344]" />
            <span className="text-[#b18344] font-medium">{t.nav.contact}</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#b18344] to-[#d4a574] bg-clip-text text-transparent">
              {t.contact.title}
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.contact.description}
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <form
                onSubmit={handleFormSubmit}
                className={`p-6 bg-white rounded-3xl shadow-xl border border-gray-200/50 space-y-4 ${language === 'ar' ? 'md:order-2' : 'md:order-1'}`}
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#b18344' }}>
                  {t.contact.formTitle}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{t.contact.formSubtitle}</p>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.contact.formNamePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.contact.formPhonePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                />

                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.contact.formMessagePlaceholder}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                ></textarea>

                <Button
                  type="submit"
                  className="w-full mt-2 !bg-[#b18344] hover:!bg-[#9e6f37] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.contact.sending : t.contact.whatsappSubmit}
                </Button>

                {showSuccess && (
                  <div className="flex items-center text-green-600 mt-4">
                    <CheckCircle className="w-5 h-5 me-2" />
                    <span>{t.toast.successTitle}</span>
                  </div>
                )}
              </form>

              <div className={`rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 h-full ${language === 'ar' ? 'md:order-1' : 'md:order-2'}`}>
                <iframe
                  src="https://www.google.com/maps?q=8133+%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D8%AD+-+%D8%AD%D9%8A+%D8%A7%D9%84%D9%86%D8%AF%D9%89+%D8%AD%D9%8A+%D8%A7%D9%84%D9%86%D8%AF%D9%89,+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6+RADA8133,+%D8%A7%D9%84%D9%85%D9%85%D9%84%D9%83%D8%A9+%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9+%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9&output=embed"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع شركتنا"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;