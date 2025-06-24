import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building, Briefcase, ArrowRight, Star, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

// Enhanced animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03, 
    y: -10,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const iconContainerVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Professional service card component
const ServiceCard = ({ icon: Icon, title, description, features, isPopular = false, onButtonClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      variants={itemVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1"
        >
          <Star className="w-3 h-3 fill-current" />
          {t.services.mostPopular}
        </motion.div>
      )}

      <motion.div
        variants={cardHoverVariants}
        className={`relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden ${
          isPopular 
            ? 'border-[#b18344]/30 bg-gradient-to-br from-white to-[#b18344]/5' 
            : 'border-gray-100 hover:border-[#b18344]/20'
        }`}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b18344]/5 to-transparent rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#d4a574]/5 to-transparent rounded-full translate-y-6 -translate-x-6" />
        
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#b18344]/3 to-[#d4a574]/3 rounded-3xl" />
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(177, 131, 68, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(212, 165, 116, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, rgba(177, 131, 68, 0.05) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-3xl"
          />
        </motion.div>

        {/* Icon container with enhanced animations */}
        <motion.div
          variants={iconContainerVariants}
          className="relative z-10 w-24 h-24 bg-gradient-to-br from-[#b18344] to-[#d4a574] rounded-2xl flex items-center justify-center mb-6 shadow-lg"
        >
          {/* Icon glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#b18344] to-[#d4a574] rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <Icon className="w-12 h-12 text-white relative z-10" />
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute top-1 right-1"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          >
            <Sparkles className="w-3 h-3 text-white/60" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3 
            className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#b18344] transition-colors duration-300"
            layout
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-6 leading-relaxed line-clamp-3"
            layout
          >
            {description}
          </motion.p>

          {/* Features list */}
          {features && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                height: isHovered ? "auto" : 0 
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mb-6 overflow-hidden"
            >
              <div className="space-y-2 pt-2 border-t border-[#b18344]/10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0, 
                      x: isHovered ? 0 : -20 
                    }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-[#b18344]" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={onButtonClick}
              className={`w-full group/btn relative overflow-hidden transition-all duration-500 ${
                isPopular
                  ? 'bg-gradient-to-r from-[#b18344] to-[#d4a574] hover:from-[#d4a574] hover:to-[#b18344] text-white shadow-lg hover:shadow-xl'
                  : 'border-[#b18344] text-[#b18344] hover:bg-[#b18344] hover:text-white bg-transparent border-2'
              }`}
            >
              {/* Button background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#b18344] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                {t.services.button}
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Hover border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-[#b18344]/0 group-hover:border-[#b18344]/20 transition-all duration-500"
          animate={{
            boxShadow: isHovered 
              ? "0 0 0 1px rgba(177, 131, 68, 0.1), 0 0 20px rgba(177, 131, 68, 0.1)" 
              : "0 0 0 1px transparent"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const Services = ({ handleFeatureClick }) => {
  const { t } = useLanguage();

  const servicesData = [
    {
      icon: Building,
      title: t.services.service1Title,
      description: t.services.service1Text,
      features: t.services.service1Features,
      isPopular: false
    },
    {
      icon: Users,
      title: t.services.service2Title,
      description: t.services.service2Text,
      features: t.services.service2Features,
      isPopular: true
    },
    {
      icon: Briefcase,
      title: t.services.service3Title,
      description: t.services.service3Text,
      features: t.services.service3Features,
      isPopular: false
    },
    {
      icon: Star,
      title: t.services.service4Title,
      description: t.services.service4Text,
      features: null,
      isPopular: false
    },
    {
      icon: CheckCircle,
      title: t.services.service5Title,
      description: t.services.service5Text,
      features: null,
      isPopular: false
    },
    {
      icon: ArrowRight,
      title: t.services.service6Title,
      description: t.services.service6Text,
      features: null,
      isPopular: false
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#b18344]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#d4a574]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#b18344]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced header section */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b18344]/10 to-[#d4a574]/10 text-[#b18344] px-6 py-2 rounded-full font-semibold text-sm mb-6 border border-[#b18344]/20"
          >
            <Sparkles className="w-4 h-4" />
            {t.services.tagline}
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#b18344] to-[#d4a574] bg-clip-text text-transparent mb-6 leading-tight"
          >
            {t.services.title}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            {t.services.description}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex justify-center"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-[#b18344] to-[#d4a574] rounded-full" />
          </motion.div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              isPopular={service.isPopular}
              onButtonClick={handleFeatureClick}
            />
          ))}
        </motion.div>

        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#b18344]/10 to-[#d4a574]/10 rounded-3xl p-8 md:p-12 border border-[#b18344]/20 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {t.services.ctaTitle}
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.services.ctaDescription}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleFeatureClick}
                className="bg-gradient-to-r from-[#b18344] to-[#d4a574] hover:from-[#d4a574] hover:to-[#b18344] text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.services.ctaButton}
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;