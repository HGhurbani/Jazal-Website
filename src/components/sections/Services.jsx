import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  CalendarCheck,
  Paintbrush,
  UserCheck,
  ClipboardList,
  Camera,
  MapPin,
  PartyPopper,
  Gift,
  ExternalLink,
} from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  // دالة لإنشاء مصفوفة الخدمات ديناميكياً
  const createServicesArray = () => {
    const servicesArray = [];
    const icons = [CalendarCheck, Paintbrush, UserCheck, ClipboardList, Camera, MapPin, Gift, Gift, PartyPopper];
    
    // البحث عن الخدمات المتاحة في البيانات
    let serviceIndex = 1;
    while (true) {
      const titleKey = `service${serviceIndex}Title`;
      const textKey = `service${serviceIndex}Text`;
      const imageKey = `service${serviceIndex}Image`;
      const hasButtonKey = `service${serviceIndex}HasButton`;
      const buttonTextKey = `service${serviceIndex}ButtonText`;
      const buttonLinkKey = `service${serviceIndex}ButtonLink`;
      const buttonTypeKey = `service${serviceIndex}ButtonType`;
      
      // التحقق من وجود الخدمة
      if (t.services[titleKey] && t.services[textKey]) {
        const service = {
          title: t.services[titleKey],
          description: t.services[textKey],
          image: t.services[imageKey] || '',
          icon: icons[serviceIndex - 1] || CalendarCheck,
          hasButton: t.services[hasButtonKey] || false,
          buttonText: t.services[buttonTextKey] || '',
          buttonLink: t.services[buttonLinkKey] || '',
          buttonType: t.services[buttonTypeKey] || 'none',
        };
        
        servicesArray.push(service);
        serviceIndex++;
      } else {
        // إيقاف عند عدم وجود المزيد من الخدمات
        break;
      }
    }
    
    return servicesArray;
  };

  const services = createServicesArray();

  // إذا لم تكن هناك خدمات، لا تعرض القسم
  if (services.length === 0) {
    return null;
  }

  // دالة لإنشاء الزر المناسب
  const renderButton = (service) => {
    if (!service.hasButton || service.buttonType === 'none') {
      return null;
    }

    if (service.buttonType === 'store') {
      return (
        <a
          href="https://jzl10.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors"
        >
          <span>تسوق الآن</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      );
    }

    if (service.buttonType === 'custom' && service.buttonText && service.buttonLink) {
      return (
        <a
          href={service.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors"
        >
          <span>{service.buttonText}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      );
    }

    return null;
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#b18344] to-[#d4a574] bg-clip-text text-transparent mb-6">
            {t.services.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.services.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#b18344] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* عرض الزر المناسب */}
                  {renderButton(service)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
