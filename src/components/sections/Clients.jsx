import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Award, CheckCircle, TrendingUp } from 'lucide-react';

const Clients = () => {
    const { t } = useLanguage();

    const clientsData = [
        {
            id: 1,
            nameKey: 'client1',
            logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Mobily_logo.svg",
            alt: "شعار موبايلي"
        },
        {
            id: 2,
            nameKey: 'client2',
            logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ministry_of_Environment_Water_and_Agriculture_logo.svg",
            alt: "شعار وزارة الزراعة"
        },
        {
            id: 3,
            nameKey: 'client3',
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Ministry_of_Education_Saudi_Arabia_Logo.svg",
            alt: "شعار وزارة التعليم"
        },
        {
            id: 4,
            nameKey: 'client4',
            logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ministry_of_Defense_Saudi_Arabia.png",
            alt: "شعار وزارة الدفاع"
        },
        {
            id: 5,
            nameKey: 'client5',
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Emblem_of_Saudi_Arabia_Ministry_of_Interior.png",
            alt: "شعار وزارة الداخلية"
        },
        {
            id: 6,
            nameKey: 'client6',
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nissan_logo.png",
            alt: "شعار شركة نيسان"
        }
    ];

    const stats = [
        { number: "50+", label: t.clients.statSatisfied, icon: Star },
        { number: "200+", label: t.clients.statProjects, icon: CheckCircle },
        { number: "10+", label: t.clients.statYears, icon: Award },
        { number: "98%", label: t.clients.statSatisfaction, icon: TrendingUp }
    ];

    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{ 
                    backgroundImage: `radial-gradient(circle at 25% 25%, #b18344 2px, transparent 2px)`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="container mx-auto px-6 relative">
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
                        <Star className="w-4 h-4 text-[#b18344]" />
                        <span className="text-[#b18344] font-medium text-sm">{t.clients.tagline}</span>
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
                        {t.clients.title}
                    </motion.h2>
                    
                    <motion.p 
                        variants={fadeInUp} 
                        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        {t.clients.description}
                    </motion.p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                            >
                                <div 
                                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(177, 131, 68, 0.1)' }}
                                >
                                    <IconComponent className="w-6 h-6 text-[#b18344]" />
                                </div>
                                <div className="text-2xl font-bold text-[#b18344] mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Clients Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {clientsData.map((client) => (
                        <motion.div 
                            key={client.id}
                            variants={fadeInUp} 
                            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Logo Container */}
                            <div className="relative mb-6">
                                <div 
                                    className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ 
                                        background: 'linear-gradient(135deg, rgba(177, 131, 68, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%)'
                                    }}
                                ></div>
                                <div className="relative flex items-center justify-center h-20">
                                    <img  
                                        className="h-16 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
                                        alt={client.alt}
                                        src={client.logo}
                                    />
                                </div>
                            </div>

                            {/* Client Info */}
                            <div className="text-center">
                                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#b18344] transition-colors duration-300">
                                    {t.clients[client.nameKey]}
                                </h3>
                                

                                {/* Success Indicator */}
                                <div className="flex items-center justify-center gap-1 text-[#b18344]">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-xs font-medium">{t.clients.trustedPartner}</span>
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div 
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{ 
                                    border: '2px solid rgba(177, 131, 68, 0.2)'
                                }}
                            ></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust Section */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <div 
                        className="max-w-4xl mx-auto p-8 rounded-2xl border-2 border-dashed"
                        style={{ borderColor: 'rgba(177, 131, 68, 0.3)', backgroundColor: 'rgba(177, 131, 68, 0.05)' }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Award className="w-8 h-8 text-[#b18344]" />
                            <h3 className="text-2xl font-bold text-[#b18344]">{t.clients.trustedByLeadersTitle}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {t.clients.trustedByLeadersDesc}
                        </p>
                        
                        <div className="grid grid-cols-1 gap-8 mt-6 pt-6 border-t border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[#b18344]">100%</div>
                                <div className="text-sm text-gray-500">{t.clients.trustCert3}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Clients;