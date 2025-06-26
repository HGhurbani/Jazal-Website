import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, ShoppingBag, Mic, Award, PartyPopper } from 'lucide-react';

const Projects = () => {
    const { t } = useLanguage();

    const projectData = [
        {
            id: 1,
            titleKey: 'project1Title',
            textKey: 'project1Text',
            image: "https://images.unsplash.com/photo-1697134674327-3f2261031064",
            alt: "معرض تجاري كبير بتصميم حديث",
            icon: ShoppingBag,
            categoryKey: 'categoryTrade'
        },
        {
            id: 2,
            titleKey: 'project2Title',
            textKey: 'project2Text',
            image: "https://images.unsplash.com/photo-1700936656167-5dc37a6f1e20",
            alt: "مؤتمر علمي في قاعة كبيرة",
            icon: Mic,
            categoryKey: 'categoryConference'
        },
        {
            id: 3,
            titleKey: 'project3Title',
            textKey: 'project3Text',
            image: "https://images.unsplash.com/photo-1554123460-3f3501064723",
            alt: "حفل تكريم أنيق بإضاءة ذهبية",
            icon: Award,
            categoryKey: 'categoryCeremony'
        },
        {
            id: 4,
            titleKey: 'project4Title',
            textKey: 'project4Text',
            image: "https://i.ibb.co/WpGmRgqz/Whats-App-Image-2025-06-26-at-6-39-21-PM.jpg",
            alt: "مهرجان البُر",
            icon: PartyPopper,
            categoryKey: 'categoryCeremony'
        }
    ];

    return (
        <section id="projects" className="section-padding bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.div 
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-6"
                    >
                        <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                        <span className="text-[#b18344] font-medium text-sm">{t.projects.featuredTag}</span>
                    </motion.div>
                    
                    <motion.h2 
                        variants={fadeInUp} 
                        className="text-4xl md:text-5xl font-bold mb-6"
                        style={{ 
                            background: 'linear-gradient(135deg, #b18344 0%, #d4a574 50%, #b18344 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {t.projects.title}
                    </motion.h2>
                    
                    <motion.p 
                        variants={fadeInUp} 
                        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        {t.projects.description}
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-4 gap-8"
                >
                    {projectData.map((project) => {
                        const IconComponent = project.icon;
                        return (
                            <motion.div 
                                key={project.id}
                                variants={fadeInUp} 
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <img
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt={project.alt}
                                        src={project.image}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                                            style={{ backgroundColor: 'rgba(177, 131, 68, 0.9)' }}
                                        >
                                            {t.projects[project.categoryKey]}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                                        <IconComponent 
                                            className="w-5 h-5 text-white"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-[#b18344] transition-colors duration-300">
                                        {t.projects[project.titleKey]}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {t.projects[project.textKey]}
                                    </p>
                                    
                                    {/* Action Button Removed as per request */}
                                </div>

                                {/* Hover Border Effect */}
                                <div 
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{ 
                                        background: `linear-gradient(135deg, transparent 0%, rgba(177, 131, 68, 0.1) 50%, transparent 100%)`,
                                        border: '2px solid rgba(177, 131, 68, 0.2)'
                                    }}
                                ></div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA removed as per request */}
            </div>
        </section>
    );
};

export default Projects;