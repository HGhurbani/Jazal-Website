import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Play, Sparkles, Star, Shield, Award } from 'lucide-react';

// Professional color palette based on #b18344
const colors = {
  primary: '#b18344',
  primaryDark: '#8a6335',
  primaryLight: '#c19558',
  accent: '#d4a574',
  textOnDark: '#FFFFFF',
  textSecondaryOnDark: '#E5E7EB', // A light gray color
};

const contentVariants = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  },
  logo: {
    initial: { opacity: 0, scale: 0.9, y: -15 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  },
  title: {
    initial: { opacity: 0, y: 25 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  },
  subtitle: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  description: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  buttons: {
    initial: { opacity: 0, y: 25 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut"
      }
    }
  },
  features: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }
};


// Professional scroll indicator
const ScrollIndicator = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#features, #about, main > section:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={scrollToNext}
        className="flex flex-col items-center group focus:outline-none"
        style={{ color: colors.textOnDark }}
        aria-label="انتقل إلى القسم التالي"
      >
        <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium">
          اكتشف المزيد
        </span>
        <motion.div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            borderColor: colors.textOnDark,
            backgroundColor: 'transparent'
          }}
          whileHover={{
            backgroundColor: colors.textOnDark,
            color: colors.primaryDark
          }}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
    </motion.div>
  );
});

// Professional trust indicators
const TrustIndicators = memo(() => {
  const { t } = useLanguage();
  const trustFeatures = [
    { icon: Shield, text: t.hero.trustSecure, count: "100%" },
    { icon: Award, text: t.hero.trustQuality, count: "5★" },
    { icon: Star, text: t.hero.trustSatisfaction, count: "98%" }
  ];

  return (
    <motion.div
      variants={contentVariants.features}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-opacity-30 mt-12"
      style={{ borderColor: colors.textOnDark }}
    >
      {trustFeatures.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          whileHover={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: `0 8px 25px rgba(0, 0, 0, 0.2)`
          }}
        >
          <feature.icon
            className="w-8 h-8 mb-2"
            style={{ color: colors.accent }}
          />
          <span className="text-lg font-bold mb-1" style={{ color: colors.accent }}>
            {feature.count}
          </span>
          <span className="text-sm" style={{ color: colors.textSecondaryOnDark }}>
            {feature.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
});

ScrollIndicator.displayName = 'ScrollIndicator';
TrustIndicators.displayName = 'TrustIndicators';

// Enhanced hero content with professional styling
const HeroContent = memo(({ t, onFeatureClick, onWatchDemo }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);

  return (
    <div
      className="container mx-auto px-6 text-center relative z-10 pt-[7.5rem]"
      ref={ref}
    >
      <motion.div
        variants={contentVariants.container}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="space-y-8 max-w-6xl mx-auto"
      >
        {/* Professional logo presentation */}
        <motion.header variants={contentVariants.logo} className="relative">
          <div className="relative inline-block">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/c3f3bdb0-c5a8-4eed-ac70-a2a78493befa/cc8f541a68d760043559fb919eb461d8.png"
              alt={t.hero.logoAlt || "شعار شركة جزل"}
              className={`h-32 w-auto mx-auto mb-8 relative z-10 transition-all duration-600 drop-shadow-lg ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              loading="eager"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </motion.header>

        {/* Professional main title */}
        <motion.div variants={contentVariants.title} className="relative">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 text-shadow"
            style={{ color: colors.textOnDark, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            {t.hero.title}
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
        </motion.div>

        <motion.p
          variants={contentVariants.subtitle}
          className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed"
          style={{ color: colors.textSecondaryOnDark, textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          variants={contentVariants.description}
          className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
          style={{ color: colors.textSecondaryOnDark, textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}
        >
          {t.hero.description}
        </motion.p>

        {/* Professional CTA buttons */}
        <motion.div
          variants={contentVariants.buttons}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
        >
          <motion.div
            onHoverStart={() => setPrimaryButtonHovered(true)}
            onHoverEnd={() => setPrimaryButtonHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onFeatureClick}
              className="relative px-10 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden group min-w-[220px] border-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                color: 'white',
                boxShadow: `0 4px 15px ${colors.primary}40`,
                focusRingColor: colors.primary
              }}
              onMouseEnter={(e) => {
                e.target.style.background = `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`;
                e.target.style.boxShadow = `0 6px 20px ${colors.primary}50`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
                e.target.style.boxShadow = `0 4px 15px ${colors.primary}40`;
              }}
              aria-label={t.hero.buttonAriaLabel || t.hero.button}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={primaryButtonHovered ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <Sparkles className="w-5 h-5 mr-2 inline" />
              <span className="relative z-10">{t.hero.button}</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onWatchDemo}
              variant="outline"
              className="px-10 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[220px] group bg-transparent text-white"
              style={{
                borderColor: colors.textOnDark,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.textOnDark;
                e.target.style.color = colors.primaryDark;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = colors.textOnDark;
              }}
              aria-label={t.hero.demo}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span>{t.hero.demo}</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Professional trust indicators */}
        <TrustIndicators />
      </motion.div>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';

const Hero = ({ handleFeatureClick }) => {
  const { t } = useLanguage();
  
  const onFeatureClick = useCallback(() => {
    if (typeof handleFeatureClick === 'function') {
      handleFeatureClick();
    }
  }, [handleFeatureClick]);

  const onWatchDemo = useCallback(() => {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://jazl.sa/1.png)',
      }}
      aria-label={t.hero.sectionAriaLabel || "الصفحة الرئيسية"}
    >
      {/* Professional background overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Main content */}
      <HeroContent
        t={t}
        onFeatureClick={onFeatureClick}
        onWatchDemo={onWatchDemo}
      />

      {/* Professional scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

Hero.displayName = 'Hero';

export default memo(Hero);