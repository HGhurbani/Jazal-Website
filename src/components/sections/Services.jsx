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

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={services[0].image}
              alt={services[0].title}
              className="rounded-2xl object-cover h-48 w-full"
              loading="lazy"
            />
            <img
              src={services[1].image}
              alt={services[1].title}
              className="rounded-2xl object-cover h-48 w-full"
              loading="lazy"
            />
            <img
              src={services[2].image}
              alt={services[2].title}
              className="rounded-2xl object-cover h-48 w-full col-span-2"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#b18344] to-[#d4a574] bg-clip-text text-transparent mb-8">
              {t.services.title}
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl">
              {t.services.description}
            </p>
            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold mb-2 text-[#b18344]">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  {service.store && (
                    <p className="text-sm text-green-700 mt-1">
                      {t.services.storeNote}
                    </p>
                  )}
                  {service.link && (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#b18344] underline"
                    >
                      {service.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
