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
} from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.service1Title,
      description: t.services.service1Text,
      image: 'https://i.ibb.co/j9jW4LGw/Whats-App-Image-2025-06-26-at-6-39-20-PM.jpg',
      icon: CalendarCheck
    },
    {
      title: t.services.service2Title,
      description: t.services.service2Text,
      image: 'https://www.icreate-booth.com/images/intro/s16b.jpeg',
      icon: Paintbrush
    },
    {
      title: t.services.service3Title,
      description: t.services.service3Text,
      image: 'https://i.ibb.co/WpGmRgqz/Whats-App-Image-2025-06-26-at-6-39-21-PM.jpg',
      icon: UserCheck
    },
    {
      title: t.services.service4Title,
      description: t.services.service4Text,
      image: 'https://www.okaz.com.sa/uploads/images/2023/07/19/2135082.jpg',
      icon: ClipboardList
    },
    {
      title: t.services.service5Title,
      description: t.services.service5Text,
      image: 'https://lh3.googleusercontent.com/proxy/qgsYgh7HjyENZJGuN9OLMeDpib03XjH9Iep-hKPzyHZfqUv7T8t6R4fvGrLLhTB0TCHH3QLO4-J13tqO2G4riyADMgw2',
      icon: Camera
    },
    {
      title: t.services.service6Title,
      description: t.services.service6Text,
      image: 'https://www.datocms-assets.com/66357/1694520603-mdlbeast2022_1201_201525-0707_kv.webp?auto=format&fit=max&w=3840&q=75',
      icon: MapPin
    },
    {
      title: t.services.service7Title,
      description: t.services.service7Text,
      icon: Gift,
      store: true,
      link: 'https://jzl10.com/'
    },
    {
      title: t.services.service8Title,
      description: t.services.service8Text,
      icon: Gift,
      store: true,
      link: 'https://jzl10.com/'
    },
    {
      title: t.services.service9Title,
      description: t.services.service9Text,
      image: 'https://www.datocms-assets.com/66357/1694520603-mdlbeast2022_1201_201525-0707_kv.webp?auto=format&fit=max&w=3840&q=75',
      icon: PartyPopper
    }
  ];

  const storeService = services.find((s) => s.store);
  const normalServices = services.filter((s) => !s.store);
  const firstGroup = normalServices.slice(0, 3);
  const secondGroup = normalServices.slice(3);

  const collage1 = [
    'top-0 left-0 w-1/2 h-1/2 rotate-3',
    'bottom-0 right-0 w-1/2 h-1/2 -rotate-6',
    'top-1/4 left-1/3 w-1/2 h-1/2 rotate-2',
  ];

  const collage2 = [
    'top-0 right-0 w-1/2 h-1/2 -rotate-3',
    'bottom-0 left-0 w-1/2 h-1/2 rotate-2',
    'top-1/4 left-1/4 w-1/2 h-1/2 rotate-3',
    'bottom-1/4 right-1/4 w-1/2 h-1/2 -rotate-2',
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 space-y-16">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#b18344] to-[#d4a574] bg-clip-text text-transparent mb-8">
            {t.services.title}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">{t.services.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80">
            {firstGroup.map((service, index) => (
              <img
                key={index}
                src={service.image}
                alt={service.title}
                className={`absolute object-cover rounded-xl shadow-lg ${collage1[index]}`}
                loading="lazy"
              />
            ))}
          </div>
          <div className="space-y-6">
            {firstGroup.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <Icon className="w-6 h-6 text-[#b18344]" />
                  <div>
                    <h3 className="text-xl font-semibold text-[#b18344] mb-1">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2 relative h-80">
            {secondGroup.map((service, index) => (
              <img
                key={index}
                src={service.image}
                alt={service.title}
                className={`absolute object-cover rounded-xl shadow-lg ${collage2[index]}`}
                loading="lazy"
              />
            ))}
          </div>
          <div className="md:order-1 space-y-6 md:text-right">
            {secondGroup.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 md:flex-row-reverse md:text-right"
                >
                  <Icon className="w-6 h-6 text-[#b18344]" />
                  <div>
                    <h3 className="text-xl font-semibold text-[#b18344] mb-1">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {storeService && (
          <div className="text-center pt-8 bg-white rounded-xl border border-[#b18344] shadow-lg p-8">
            {(() => {
              const Icon = storeService.icon;
              return <Icon className="w-10 h-10 text-[#b18344] mx-auto mb-4" />;
            })()}
            <h3 className="text-2xl font-bold mb-2 text-[#b18344]">{storeService.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">
              {storeService.description}
            </p>
            <a
              href={storeService.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #b18344 0%, #d4a574 50%, #b18344 100%)',
                boxShadow: '0 4px 20px rgba(177, 131, 68, 0.3)',
              }}
            >
              <span>{t.services.storeBrowse}</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
