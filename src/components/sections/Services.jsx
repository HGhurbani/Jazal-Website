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

  const services = [
    {
      title: t.services.service1Title,
      description: t.services.service1Text,
      image: 'https://i.ibb.co/j9jW4LGw/Whats-App-Image-2025-06-26-at-6-39-20-PM.jpg',
      icon: CalendarCheck,
    },
    {
      title: t.services.service2Title,
      description: t.services.service2Text,
      image: 'https://www.icreate-booth.com/images/intro/s16b.jpeg',
      icon: Paintbrush,
      image: 'https://sadanykhalifa.com/uploads/Blog/1715236386.png',
      icon: Paintbrush,
    },
    {
      title: t.services.service3Title,
      description: t.services.service3Text,
      image: 'https://i.ibb.co/WpGmRgqz/Whats-App-Image-2025-06-26-at-6-39-21-PM.jpg',
      icon: UserCheck,
      image: 'https://www.icreate-booth.com/images/intro/s16b.jpeg',
      icon: UserCheck,
    },
    {
      title: t.services.service4Title,
      description: t.services.service4Text,
      image: 'https://www.okaz.com.sa/uploads/images/2023/07/19/2135082.jpg',
      icon: ClipboardList,
    },
    {
      title: t.services.service5Title,
      description: t.services.service5Text,
      image:
        'https://lh3.googleusercontent.com/proxy/qgsYgh7HjyENZJGuN9OLMeDpib03XjH9Iep-hKPzyHZfqUv7T8t6R4fvGrLLhTB0TCHH3QLO4-J13tqO2G4riyADMgw2',
      icon: Camera,
    },
    {
      title: t.services.service6Title,
      description: t.services.service6Text,
      image:
        'https://www.datocms-assets.com/66357/1694520603-mdlbeast2022_1201201525-0707_kv.webp?auto=format&fit=max&w=3840&q=75',
      icon: MapPin,
    },
    {
      title: t.services.service7Title,
      description: t.services.service7Text,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
      icon: Gift,
      store: true,
      link: 'https://jzl10.com/',
    },
    {
      title: t.services.service8Title,
      description: t.services.service8Text,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
      icon: Gift,
      store: true,
      link: 'https://jzl10.com/',
    },
    {
      title: t.services.service9Title,
      description: t.services.service9Text,
      image:
        'https://www.datocms-assets.com/66357/1694520603-mdlbeast2022_1201201525-0707_kv.webp?auto=format&fit=max&w=3840&q=75',
      icon: PartyPopper,
    },
  ];

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
                  {service.store && (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#b18344] font-medium"
                    >
                      {t.services.storeBrowse}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
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
