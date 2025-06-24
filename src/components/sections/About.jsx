import React, { useState } from 'react';
import { Users, Award, Star, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const { t } = useLanguage();

  const cards = [
    {
      id: 1,
      icon: Award,
      title: t.about.card1Title,
      text: t.about.card1Text,
      gradient: "from-[#b18344] via-[#c49454] to-[#d4a566]",
      accentColor: "#b18344"
    },
    {
      id: 2,
      icon: Users,
      title: t.about.card2Title,
      text: t.about.card2Text,
      gradient: "from-[#9d7239] via-[#b18344] to-[#c49454]",
      accentColor: "#9d7239"
    },
    {
      id: 3,
      icon: Star,
      title: t.about.card3Title,
      text: t.about.card3Text,
      gradient: "from-[#c49454] via-[#d4a566] to-[#e5b677]",
      accentColor: "#c49454"
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#b18344]/20 to-[#c49454]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-[#9d7239]/20 to-[#b18344]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#d4a566]/15 to-[#e5b677]/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 transform transition-all duration-700 hover:scale-105">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-[#b18344]/10 to-[#c49454]/10 rounded-full border border-[#b18344]/30">
            <Sparkles className="w-5 h-5 text-[#b18344]" />
            <span className="text-sm font-medium text-[#9d7239]">{t.about.tagline}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9d7239] via-[#b18344] to-[#c49454] bg-clip-text text-transparent mb-6 leading-tight">
            {t.about.title}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {t.about.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;
            
            return (
              <div
                key={card.id}
                className={`group relative transform transition-all duration-500 ${isHovered ? 'scale-105 -translate-y-2' : 'hover:scale-105 hover:-translate-y-2'}`}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card Background with Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 group-hover:shadow-2xl transition-all duration-300">
                  {/* Floating Icon */}
                  <div className={`relative w-20 h-20 mx-auto mb-6 transform transition-all duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl blur-md opacity-50`}></div>
                    <div className={`relative w-full h-full bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-gray-900 transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                    {card.text}
                  </p>

                  {/* Interactive Arrow */}
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${card.gradient} text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer`}>
                      <span className="text-sm font-medium">{t.about.learnMore}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Subtle Corner Decoration */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-[#b18344] to-[#c49454] rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#b18344] to-[#c49454] text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
            <span className="text-lg font-semibold">{t.about.cta}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;