import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';

// Navigation items configuration
const navigationItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' }
];

// Enhanced animation variants
const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: -100,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      when: "afterChildren"
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.08
    }
  }
};

const mobileItemVariants = {
  closed: { 
    opacity: 0, 
    x: -30,
    scale: 0.95,
    transition: { duration: 0.3 }
  },
  open: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Professional logo component with enhanced interactions
const Logo = memo(({ isScrolled }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div 
      className="flex items-center gap-4 cursor-pointer group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <div className="relative">
        {/* Premium glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#b18344]/30 to-[#d4a574]/30 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Elegant border ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#b18344]/20"
          animate={{ 
            rotate: [0, 360],
            borderColor: ['rgba(177, 131, 68, 0.2)', 'rgba(177, 131, 68, 0.4)', 'rgba(177, 131, 68, 0.2)']
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <img
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/c3f3bdb0-c5a8-4eed-ac70-a2a78493befa/cc8f541a68d760043559fb919eb461d8.png"
          alt="شعار شركة جزل"
          className={`relative z-10 transition-all duration-700 ${
            isScrolled ? 'h-12' : 'h-16'
          } w-auto filter drop-shadow-md ${
            imageLoaded
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />
      </div>
      
      {/* Premium company indicator */}
      <motion.div 
        className="hidden lg:flex items-center gap-2"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
       
      </motion.div>
    </motion.div>
  );
});

Logo.displayName = 'Logo';

// Professional navigation link component
const NavLink = memo(({ href, children, isActive, onClick }) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`relative px-4 py-2.5 font-semibold transition-all duration-400 group ${
        isActive 
          ? 'text-[#b18344]' 
          : 'text-gray-700 hover:text-[#b18344]'
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <span className="relative z-20 tracking-wide">{children}</span>
      
      {/* Professional hover background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#b18344]/8 to-[#d4a574]/8 rounded-xl border border-[#b18344]/10 -z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      
      {/* Premium active indicator */}
      <motion.div
        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#b18344] to-[#d4a574] rounded-full shadow-lg ${
          isActive ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'
        }`}
        transition={{ 
          width: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 }
        }}
      />
      
      {/* Subtle shine effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b18344]/5 to-transparent rounded-xl"
          animate={{ x: [-100, 100] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.a>
  );
});

NavLink.displayName = 'NavLink';

// Professional mobile menu component
const MobileMenu = memo(({ isOpen, onClose, t, activeSection, onNavigate }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Premium backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden relative z-50 bg-white/95 backdrop-blur-2xl border-t border-[#b18344]/20 shadow-2xl overflow-hidden"
          >
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#b18344]/5 to-transparent" />
            
            <div className="relative container mx-auto px-6 py-6 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  variants={mobileItemVariants}
                  custom={index}
                >
                  <a
                    href={item.href}
                    onClick={(e) => onNavigate(e, item.href, onClose)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl font-semibold transition-all duration-300 group ${
                      activeSection === item.key
                        ? 'text-white bg-gradient-to-r from-[#b18344] to-[#d4a574] shadow-lg'
                        : 'text-gray-700 hover:text-[#b18344] hover:bg-[#b18344]/5 border border-transparent hover:border-[#b18344]/20'
                    }`}
                  >
                    <span className="tracking-wide">{t.nav[item.key]}</span>
                    <ArrowLeft 
                      className={`w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 ${
                        activeSection === item.key ? 'text-white' : 'text-[#b18344]'
                      }`} 
                    />
                  </a>
                </motion.div>
              ))}
              
              <motion.div 
                variants={mobileItemVariants}
                className="pt-6 border-t border-[#b18344]/20"
              >
                <div className="bg-gradient-to-r from-[#b18344]/10 to-[#d4a574]/10 rounded-2xl p-4 border border-[#b18344]/20">
                  <LanguageSwitcher />
                </div>
              </motion.div>
              
              {/* Premium contact info */}
              <motion.div 
                variants={mobileItemVariants}
                className="pt-4 space-y-3"
              >
                <div className="text-sm font-semibold text-[#b18344] mb-3 tracking-wide">
                  {t.nav.contact}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50/80 rounded-xl p-3">
                  <div className="p-2 bg-[#b18344]/10 rounded-lg">
                    <Phone className="w-4 h-4 text-[#b18344]" />
                  </div>
                  <span className="font-medium">+966 50 123 4567</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50/80 rounded-xl p-3">
                  <div className="p-2 bg-[#b18344]/10 rounded-lg">
                    <Mail className="w-4 h-4 text-[#b18344]" />
                  </div>
                  <span className="font-medium">info@jazal.com</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

MobileMenu.displayName = 'MobileMenu';

// Main professional header component
const Header = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Enhanced scroll effects
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    // Professional header background transition
    setIsScrolled(currentScrollY > 30);
    
    // Smart hide/show header
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  });

  // Enhanced active section detection
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-15% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    navigationItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth navigation handler
  const handleNavigate = useCallback((e, href, callback) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      if (callback) callback();
    }
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-2xl shadow-2xl border-b border-[#b18344]/10' 
            : 'bg-white/80 backdrop-blur-xl shadow-lg'
        }`}
      >
        {/* Premium top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b18344] via-[#d4a574] to-[#b18344]" />
        
        <nav className={`container mx-auto px-6 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}>
          <div className="flex justify-between items-center">
            {/* Professional Logo */}
            <Logo isScrolled={isScrolled} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.key}
                  href={item.href}
                  isActive={activeSection === item.key}
                  onClick={(e) => handleNavigate(e, item.href)}
                >
                  {t.nav[item.key]}
                </NavLink>
              ))}
              
              <div className="mx-4 w-px h-8 bg-gradient-to-b from-transparent via-[#b18344]/30 to-transparent" />
              
              <div className="bg-gradient-to-r from-[#b18344]/5 to-[#d4a574]/5 rounded-xl p-2 border border-[#b18344]/10">
                <LanguageSwitcher />
              </div>
              
              {/* Premium CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavigate(e, '#contact')}
                className="ml-4 px-8 py-3 bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#b18344]/20 tracking-wide"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 25px 50px -12px rgba(177, 131, 68, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  {t.header.startProject}
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </motion.a>
            </div>

            {/* Professional Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-2xl bg-gradient-to-r from-[#b18344]/10 to-[#d4a574]/10 border border-[#b18344]/20 hover:bg-[#b18344]/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="قائمة التنقل"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#b18344]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#b18344]" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </nav>

        {/* Professional Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          t={t}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      </motion.header>

      {/* Professional spacer */}
      <div className={`transition-all duration-500 ${
        isScrolled ? 'h-[73px]' : 'h-[85px]'
      }`} />
    </>
  );
};

Header.displayName = 'Header';

export default memo(Header);