import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const testimonialsData = [
  {
    quoteKey: 'testimonial1Quote',
    nameKey: 'testimonial1Name',
    titleKey: 'testimonial1Title',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    quoteKey: 'testimonial2Quote',
    nameKey: 'testimonial2Name',
    titleKey: 'testimonial2Title',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    quoteKey: 'testimonial3Quote',
    nameKey: 'testimonial3Name',
    titleKey: 'testimonial3Title',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 4,
  },
  {
    quoteKey: 'testimonial4Quote',
    nameKey: 'testimonial4Name',
    titleKey: 'testimonial4Title',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
];

const TestimonialCard = ({ quote, name, title, avatar, rating }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-[90%] sm:w-[450px] bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:border-[#b18344]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-grab active:cursor-grabbing"
      variants={fadeInUp}
    >
      <Quote className="w-12 h-12 text-[#b18344]/20 mb-4 transform -scale-x-100" />
      <p className="text-gray-600 leading-relaxed mb-6 h-32 overflow-y-auto no-scrollbar">{quote}</p>
      
      <div className="flex items-center mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border-2 border-[#b18344]/50 shadow-md"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { t } = useLanguage();
  const constraintsRef = useRef(null);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const scrollBy = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handlePrev = () => scrollBy(-300);
  const handleNext = () => scrollBy(300);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [carouselRef]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-[#b18344]/10 text-[#b18344] px-4 py-2 rounded-full font-medium text-sm mb-6 border border-[#b18344]/20"
          >
            <Star className="w-4 h-4" />
            {t.testimonials.tagline}
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b18344] to-[#d4a574] bg-clip-text text-transparent"
          >
            {t.testimonials.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t.testimonials.description}
          </motion.p>
        </motion.div>

        <motion.div 
          ref={constraintsRef} 
          className="relative"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            ref={carouselRef}
            className="flex gap-8 cursor-grab overflow-x-auto no-scrollbar py-4 px-2"
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
          >
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={t.testimonials[testimonial.quoteKey]}
                name={t.testimonials[testimonial.nameKey]}
                title={t.testimonials[testimonial.titleKey]}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
              />
            ))}
          </motion.div>
          {/* Navigation arrows */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/70 shadow-md text-gray-600 hover:bg-white"
            >
                <ChevronLeft className="w-6 h-6"/>
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/70 shadow-md text-gray-600 hover:bg-white"
            >
                <ChevronRight className="w-6 h-6"/>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;