import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const { services } = usePortfolio();

  return (
    <section id="services" className="py-20 bg-[#0A0A0B] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 block mb-1">
            Services &amp; Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Commercial Services
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-2 font-light">
            Customized illustration and design packages tailored for games, virtual contents, and character merchandise.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif italic text-white/30 group-hover:text-white/50 transition-colors">
                    {service.number}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[10px] font-medium tracking-widest text-white/60 uppercase">
                    <Clock className="w-3 h-3 text-white/60" />
                    <span>{service.estimatedTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif text-white group-hover:text-white/90 transition-colors">
                  {service.title}
                </h3>
                <p className="text-[11px] text-white/40 font-light tracking-wide mb-4">
                  {service.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-sm bg-[#1A1A1F] border border-white/10 text-white/70 text-[10px] uppercase tracking-wider font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Recommended For List */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] block">
                    Recommended Applications:
                  </span>
                  {service.recommendedFor.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/80 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {service.startingPrice && (
                  <span className="text-xs text-white/40 font-light">
                    {service.startingPrice}
                  </span>
                )}
                <button
                  onClick={() => onSelectServiceForInquiry(service.title)}
                  className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors group/btn"
                >
                  <span>Inquire Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
