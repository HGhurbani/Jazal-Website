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

  const whatsappNumber = '+966504447148';

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* معلومات التواصل */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-lg border border-white/20 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#b18344] to-[#d4a574] rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  {t.contact.methodsTitle}
                </h3>
                
                <div className="space-y-6">
                  {/* ... other contact methods ... */}
                  <motion.div 
                    whileHover={{ x: language === 'ar' ? -10 : 10 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200/50"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800">{t.contact.whatsapp}</h4>
                      <p className="text-gray-600 text-sm">{t.contact.whatsappDescription}</p>
                      <p className="text-green-600 font-medium text-sm" dir="ltr">{whatsappNumber}</p>
                    </div>
                    <Button
                      onClick={handleDirectWhatsApp}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="hidden sm:inline">{t.contact.chatButton}</span>
                      <MessageCircle className="w-4 h-4 sm:hidden" />
                    </Button>
                  </motion.div>

                  <motion.div 
                     whileHover={{ x: language === 'ar' ? -10 : 10 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#b18344]/10 to-[#d4a574]/10 border border-[#b18344]/20"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-[#b18344] to-[#d4a574] rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{t.contact.phone}</h4>
                      <p className="text-gray-600 text-sm">{t.contact.phoneSub}</p>
                      <p className="text-[#b18344] font-medium" dir="ltr">0504447148</p>
                    </div>
                  </motion.div>

                  <motion.div 
                     whileHover={{ x: language === 'ar' ? -10 : 10 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200/50"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{t.contact.address}</h4>
                      <p className="text-gray-600 text-sm">{t.contact.addressSub}</p>
                      <p className="text-blue-600 font-medium">{t.contact.addressValue}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* خريطة الموقع */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 h-full">
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;