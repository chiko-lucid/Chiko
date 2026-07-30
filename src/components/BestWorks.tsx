import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, Eye, ArrowUpRight, Layers } from 'lucide-react';
import { PortfolioItem } from '../types';

interface BestWorksProps {
  onSelectWork: (work: PortfolioItem) => void;
}

export const BestWorks: React.FC<BestWorksProps> = ({ onSelectWork }) => {
  const { portfolioItems } = usePortfolio();

  const bestWorks = portfolioItems.filter((item) => item.isBestWork).slice(0, 8);

  return (
    <section id="best-works" className="py-20 bg-[#0A0A0B] border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Best Works
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-2 max-w-xl font-light">
              Masterpiece collection showcasing character storytelling, refined color palettes, and intricate subculture aesthetics.
            </p>
          </div>

          <a
            href="#gallery"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <span>View All Works</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Best Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => onSelectWork(work)}
              className="group cursor-pointer rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/30 overflow-hidden transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1F]">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 backdrop-blur-[2px]">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-sm bg-white/10 border border-white/20 text-white text-[9px] font-bold tracking-widest uppercase">
                      {work.category}
                    </span>
                    <span className="text-[10px] tracking-widest text-white/60 font-medium">{work.year}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-white/70 line-clamp-3 leading-relaxed font-light">
                      {work.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-white font-semibold uppercase tracking-widest pt-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-sm bg-black/70 border border-white/10 text-[9px] uppercase tracking-widest font-bold text-amber-300 flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                  <span>BEST</span>
                </div>

                {work.images && work.images.length > 1 && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-sm bg-black/70 border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 backdrop-blur-md shadow-md">
                    <Layers className="w-3 h-3 text-white/80" />
                    <span>{work.images.length}</span>
                  </div>
                )}
              </div>

              {/* Bottom Content */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-[#0F0F12]">
                <div>
                  <h3 className="font-serif text-base text-white group-hover:text-white/80 transition-colors line-clamp-1">
                    {work.title}
                  </h3>
                  {work.client && (
                    <p className="text-[11px] text-white/40 mt-0.5 font-light">{work.client}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {work.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider text-white/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
