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
      image: 'https://sadanykhalifa.com/uploads/Blog/1715236386.png',
      icon: Paintbrush,
      image: 'https://www.icreate-booth.com/images/intro/s16b.jpeg',
      icon: Paintbrush,
    },
    {
      title: t.services.service3Title,
      description: t.services.service3Text,
      image: 'https://i.ibb.co/WpGmRgqz/Whats-App-Image-2025-06-26-at-6-39-21-PM.jpg',
      icon: UserCheck,
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
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1jUhs3gDCxkO7GEQtqVlbRQ4LlP6PU71Y_g&s',
      icon: Camera,
    },
    {
      title: t.services.service6Title,
      description: t.services.service6Text,
      image:
        'https://www.alanyagroup.com/wp-content/uploads/2023/03/Meeting-Halls-in-Antalya.jpg',
      icon: MapPin,
    },
    {
      title: t.services.service7Title,
      description: t.services.service7Text,
      image: 'https://hyatok.com/mwfiles/thumbs/fit630x300/30951/1589198002/%D8%B7%D8%B1%D9%8A%D9%82%D8%A9_%D8%AA%D9%82%D8%AF%D9%8A%D9%85_%D8%A7%D9%84%D9%87%D8%AF%D8%A7%D9%8A%D8%A7.jpg',
      icon: Gift,
      store: true,
      link: 'https://jzl10.com/',
    },
    {
      title: t.services.service8Title,
      description: t.services.service8Text,
      image: 'https://perfumesheaven.com/wp-content/uploads/2025/02/%D8%B9%D8%B7%D8%B1-%D8%AC%D9%8A%D9%81%D9%86%D8%B4%D9%8A-780x470.png',
      icon: Gift,
      store: true,
      link: 'https://jzl10.com/',
    },
    {
      title: t.services.service9Title,
      description: t.services.service9Text,
      image:
        'https://shehabnews.com/uploads/images/2022/06/JiBP0.png',
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
