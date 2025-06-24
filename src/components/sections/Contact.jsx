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

  const whatsappNumber = '+905079975403';

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
    
    // إعداد رسالة الواتساب من بيانات الفورم
    const whatsappMessage = encodeURIComponent(
      `*رسالة جديدة من الموقع*\n\n` +
      `الاسم: ${formData.name}\n` +
      `الهاتف: ${formData.phone}\n` +
      `الرسالة: ${formData.message}`
    );
    
    // محاكاة تأخير الإرسال
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // فتح الواتساب مع الرسالة
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${whatsappMessage}`, '_blank');
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // إعادة تعيين الفورم
    setFormData({ name: '', phone: '', message: '' });
    
    // إخفاء رسالة النجاح بعد 3 ثوان
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* خلفية تصميمية */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* معلومات التواصل */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#b18344] to-[#d4a574] rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                {t.contact.methodsTitle}
              </h3>
              
              <div className="space-y-6">
                {/* الواتساب */}
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200/50"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{t.contact.whatsapp}</h4>
                    <p className="text-gray-600 text-sm">{t.contact.whatsappDescription}</p>
                    <p className="text-green-600 font-medium text-sm" dir="ltr">{whatsappNumber}</p>
                  </div>
                  <Button
                    onClick={handleDirectWhatsApp}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    {t.contact.chatButton}
                  </Button>
                </motion.div>

                {/* الهاتف */}
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#b18344]/10 to-[#d4a574]/10 border border-[#b18344]/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#b18344] to-[#d4a574] rounded-2xl flex items-center justify-center shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{t.contact.phone}</h4>
                    <p className="text-gray-600 text-sm">{t.contact.phoneSub}</p>
                    <p className="text-[#b18344] font-medium" dir="ltr">+966 11 123 4567</p>
                  </div>
                </motion.div>

                {/* العنوان */}
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200/50"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
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

          {/* فورم التواصل */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-xl border border-white/20 relative overflow-hidden">
              {/* خلفية تصميمية للفورم */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b18344]/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.contact.formTitle}</h3>
                  <p className="text-gray-600 text-sm">{t.contact.formSubtitle}</p>
                </div>

                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-green-700 font-medium">{t.toast.successTitle}</span>
                  </motion.div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-start">
                      {t.contact.formName}
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#b18344] focus:border-[#b18344] transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder={t.contact.formNamePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-start">
                      {t.contact.phone}
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#b18344] focus:border-[#b18344] transition-all duration-300 bg-gray-50 focus:bg-white text-left"
                      placeholder={t.contact.formPhonePlaceholder}
                      dir="ltr"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-start">
                      {t.contact.formMessage}
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#b18344] focus:border-[#b18344] transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                      placeholder={t.contact.formMessagePlaceholder}
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#b18344] to-[#d4a574] hover:from-[#9a6d35] hover:to-[#b18344] text-white py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer"></div>
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t.contact.sending}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        {t.contact.whatsappSubmit}
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;