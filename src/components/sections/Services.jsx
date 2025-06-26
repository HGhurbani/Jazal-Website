import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.service1Title,
      description: t.services.service1Text,
      image: 'https://images.unsplash.com/photo-1542838687-9ed1c86d3c61'
    },
    {
      title: t.services.service2Title,
      description: t.services.service2Text,
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'
    },
    {
      title: t.services.service3Title,
      description: t.services.service3Text,
      image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40'
    },
    {
      title: t.services.service4Title,
      description: t.services.service4Text,
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d'
    },
    {
      title: t.services.service5Title,
      description: t.services.service5Text,
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6'
    },
    {
      title: t.services.service6Title,
      description: t.services.service6Text,
      image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454'
    },
    {
      title: t.services.service7Title,
      description: t.services.service7Text,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
      store: true,
      link: 'https://jzl10.com/'
    },
    {
      title: t.services.service8Title,
      description: t.services.service8Text,
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42',
      store: true,
      link: 'https://jzl10.com/'
    },
    {
      title: t.services.service9Title,
      description: t.services.service9Text,
      image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383'
    }
  ];

  const storeService = services.find((s) => s.store);
  const normalServices = services.filter((s) => !s.store);
  const firstGroup = normalServices.slice(0, 3);
  const secondGroup = normalServices.slice(3);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 space-y-16">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#b18344] to-[#d4a574] bg-clip-text text-transparent mb-8">
            {t.services.title}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">{t.services.description}</p>
        </div>

        {firstGroup.map((service, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-[#b18344]">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
            <img
              src={service.image}
              alt={service.title}
              className="rounded-2xl object-cover w-full h-64"
              loading="lazy"
            />
          </div>
        ))}

        {secondGroup.map((service, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src={service.image}
              alt={service.title}
              className="rounded-2xl object-cover w-full h-64"
              loading="lazy"
            />
            <div className="md:text-right">
              <h3 className="text-2xl font-bold mb-2 text-[#b18344]">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}

        {storeService && (
          <div className="text-center pt-8">
            <img
              src={storeService.image}
              alt={storeService.title}
              className="rounded-2xl object-cover w-full max-w-xl mx-auto h-64 mb-6"
              loading="lazy"
            />
            <a
              href={storeService.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #b18344 0%, #d4a574 50%, #b18344 100%)',
                boxShadow: '0 4px 20px rgba(177, 131, 68, 0.3)'
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
