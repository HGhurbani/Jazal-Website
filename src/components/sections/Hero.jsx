import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SaudiLandmarkIcon } from '@/components/icons/SaudiLandmarkIcon';
import { GeometricPattern } from '@/components/icons/GeometricPattern';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Play, Sparkles, Star, Shield, Award } from 'lucide-react';

// Professional color palette based on #b18344
const colors = {
  primary: '#b18344',
  primaryDark: '#8a6335',
  primaryLight: '#c19558',
  accent: '#d4a574',
  background: '#faf8f5',
  text: '#2d2a26',
  textSecondary: '#5a5450'
};

// Enhanced animation variants with professional feel
const createBackgroundVariants = (shouldReduceMotion) => ({
  landmark: {
    animate: shouldReduceMotion ? {} : {
      y: [-6, 6, -6],
      rotate: [0, 2, 0],
      scale: [1, 1.01, 1],
    },
    transition: {
      duration: shouldReduceMotion ? 0 : 25,
      repeat: shouldReduceMotion ? 0 : Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  },
  pattern1: {
    animate: shouldReduceMotion ? {} : {
      y: [4, -4, 4],
      rotate: [2, -1, 2],
      opacity: [0.6, 0.8, 0.6],
    },
    transition: {
      duration: shouldReduceMotion ? 0 : 30,
      repeat: shouldReduceMotion ? 0 : Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  },
  pattern2: {
    animate: shouldReduceMotion ? {} : {
      y: [-3, 3, -3],
      rotate: [-1, 1, -1],
      scale: [0.99, 1.005, 0.99],
    },
    transition: {
      duration: shouldReduceMotion ? 0 : 35,
      repeat: shouldReduceMotion ? 0 : Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  }
});

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

// Professional background decorations with sophisticated effects
const BackgroundDecorations = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const backgroundVariants = createBackgroundVariants(shouldReduceMotion);
  
  // Subtle parallax transforms
  const y1 = useTransform(scrollY, [0, 400], [0, -120]);
  const y2 = useTransform(scrollY, [0, 400], [0, -80]);
  const y3 = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <>
      {/* Professional gradient overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.accent}10 50%, ${colors.primaryLight}15 100%)`
        }}
        aria-hidden="true"
      />

      {/* Sophisticated geometric patterns */}
      <motion.div
        className="absolute top-16 left-8 w-44 h-auto opacity-20 will-change-transform"
        variants={backgroundVariants.landmark}
        animate="animate"
        style={{ y: y1 }}
        aria-hidden="true"
      >
        <SaudiLandmarkIcon style={{ color: colors.primary }} className="drop-shadow-xl filter" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-16 right-8 w-28 h-auto opacity-25 will-change-transform"
        variants={backgroundVariants.pattern1}
        animate="animate"
        style={{ y: y2 }}
        aria-hidden="true"
      >
        <GeometricPattern style={{ color: colors.primaryDark }} className="drop-shadow-lg filter" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-1/4 w-20 h-auto opacity-10 will-change-transform"
        variants={backgroundVariants.pattern2}
        animate="animate"
        style={{ y: y3 }}
        aria-hidden="true"
      >
        <GeometricPattern style={{ color: colors.accent }} />
      </motion.div>

      {/* Professional floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-20 h-20 rounded-full blur-sm will-change-transform"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)` 
        }}
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/5 w-14 h-14 rounded-full blur-sm will-change-transform"
        style={{ 
          background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primaryLight}15)` 
        }}
        animate={shouldReduceMotion ? {} : {
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />

      {/* Subtle corner accents */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5"
        style={{ background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-5"
        style={{ background: `radial-gradient(circle, ${colors.accent}40 0%, transparent 70%)` }}
        aria-hidden="true"
      />
    </>
  );
});

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
        style={{ color: colors.textSecondary }}
        aria-label="انتقل إلى القسم التالي"
      >
        <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium">
          اكتشف المزيد
        </span>
        <motion.div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ 
            borderColor: colors.primary,
            backgroundColor: 'transparent'
          }}
          whileHover={{ 
            backgroundColor: colors.primary,
            color: 'white'
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
  const trustFeatures = [
    { icon: Shield, text: "موثوق وآمن", count: "100%" },
    { icon: Award, text: "جودة مضمونة", count: "5★" },
    { icon: Star, text: "رضا العملاء", count: "98%" }
  ];

  return (
    <motion.div
      variants={contentVariants.features}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-opacity-20 mt-12"
      style={{ borderColor: colors.primary }}
    >
      {trustFeatures.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: `${colors.background}80` }}
          whileHover={{ 
            backgroundColor: `${colors.primary}08`,
            boxShadow: `0 8px 25px ${colors.primary}20`
          }}
        >
          <feature.icon 
            className="w-8 h-8 mb-2" 
            style={{ color: colors.primary }}
          />
          <span className="text-lg font-bold mb-1" style={{ color: colors.primary }}>
            {feature.count}
          </span>
          <span className="text-sm" style={{ color: colors.textSecondary }}>
            {feature.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
});

BackgroundDecorations.displayName = 'BackgroundDecorations';
ScrollIndicator.displayName = 'ScrollIndicator';
TrustIndicators.displayName = 'TrustIndicators';

// Enhanced hero content with professional styling
const HeroContent = memo(({ t, onFeatureClick, onWatchDemo }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);

  return (
    <div className="container mx-auto px-6 text-center relative z-10" ref={ref}>
      <motion.div
        variants={contentVariants.container}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="space-y-8 max-w-6xl mx-auto"
      >
        {/* Professional logo presentation */}
        <motion.header variants={contentVariants.logo} className="relative">
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary}25, ${colors.accent}15)` 
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/c3f3bdb0-c5a8-4eed-ac70-a2a78493befa/cc8f541a68d760043559fb919eb461d8.png"
              alt={t.hero.logoAlt || "شعار شركة جزل"}
              className={`h-32 w-auto mx-auto mb-8 relative z-10 transition-all duration-600 filter drop-shadow-lg ${
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
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
            style={{ color: colors.text }}
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
          style={{ color: colors.textSecondary }}
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.p 
          variants={contentVariants.description}
          className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
          style={{ color: colors.textSecondary }}
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
              className="px-10 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[220px] group bg-transparent"
              style={{ 
                borderColor: colors.primary,
                color: colors.primary
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.primary;
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = colors.primary;
              }}
              aria-label="مشاهدة عرض توضيحي"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span>عرض توضيحي</span>
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

/**
 * Professional Hero Section Component
 * 
 * Enhanced with sophisticated UX features:
 * - Professional color scheme based on #b18344
 * - Refined animations and micro-interactions
 * - Trust indicators and social proof
 * - Accessibility optimizations
 * - Performance optimizations
 */
const Hero = ({ handleFeatureClick }) => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  // Subtle parallax effect for professional feel
  const backgroundY = useTransform(scrollY, [0, 500], [0, -100]);
  
  const onFeatureClick = useCallback(() => {
    if (typeof handleFeatureClick === 'function') {
      handleFeatureClick();
    }
  }, [handleFeatureClick]);

  const onWatchDemo = useCallback(() => {
    console.log('Watch demo clicked');
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
      aria-label={t.hero.sectionAriaLabel || "الصفحة الرئيسية"}
    >
      {/* Professional background with subtle gradient */}
      <motion.div 
        className="absolute inset-0 opacity-8"
        style={{ 
          y: shouldReduceMotion ? 0 : backgroundY,
          background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.accent}03 50%, ${colors.primaryLight}05 100%)`
        }}
        aria-hidden="true" 
      />
      
      {/* Professional background decorations */}
      <BackgroundDecorations />
      
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