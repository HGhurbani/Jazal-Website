import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp,
  LayoutDashboard,
  Mic,
  CalendarCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const { t } = useLanguage();

  const services = [
    { icon: LayoutDashboard, title: t.footer.service1Title, desc: t.footer.service1Desc },
    { icon: Mic, title: t.footer.service2Title, desc: t.footer.service2Desc },
    { icon: CalendarCheck, title: t.footer.service3Title, desc: t.footer.service3Desc }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b18344' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-12" // تم التعديل هنا
          >
            {/* Company Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#b18344' }}>
                  {t.footer.companyTitle}
                </h3>
                <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: '#b18344' }}></div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t.footer.companyDescription}
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4 rtl:space-x-reverse">
                {[
                  { Icon: Facebook, url: 'https://facebook.com/Jzlcompany' },
                  { Icon: Twitter, url: 'https://twitter.com/Jzlcompany' },
                  { Icon: Instagram, url: 'https://instagram.com/Jzlcompany' },
                  { Icon: Linkedin, url: 'https://linkedin.com/company/Jzlcompany' }
                ].map(({ Icon, url }, index) => (
                  <motion.a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center hover:border-[#b18344] hover:bg-[#b18344] transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-400">@Jzlcompany</p>
            </motion.div>

            {/* Quick Services */}
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#b18344' }}>
                  {t.footer.servicesTitle}
                </h3>
                <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: '#b18344' }}></div>
              </div>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 8 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(177, 131, 68, 0.2)' }}>
                        <service.icon className="w-4 h-4" style={{ color: '#b18344' }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-[#b18344] transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">{service.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#b18344] transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#b18344' }}>
                  {t.footer.contactTitle}
                </h3>
                <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: '#b18344' }}></div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: t.footer.contactAddress },
                  { icon: Phone, text: t.footer.contactPhone },
                  { icon: Mail, text: t.footer.contactEmail },
                  { icon: Clock, text: t.footer.contactHours }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 8 }}
                    className="flex items-center space-x-3 rtl:space-x-reverse group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(177, 131, 68, 0.2)' }}>
                      <item.icon className="w-5 h-5" style={{ color: '#b18344' }} />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* تم حذف قسم النشرة الإخبارية من هنا */}

          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                {t.footer.rights}
              </div>
              
              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#b18344' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9a6f39';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#b18344';
                }}
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <div className="w-full h-full rounded-full" style={{ 
          background: `radial-gradient(circle, #b18344 0%, transparent 70%)` 
        }}></div>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
        <div className="w-full h-full rounded-full" style={{ 
          background: `radial-gradient(circle, #b18344 0%, transparent 70%)` 
        }}></div>
      </div>
    </footer>
  );
};

export default Footer;