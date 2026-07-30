import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioCategory, PortfolioItem } from '../types';
import { PortfolioModal } from './PortfolioModal';
import { Search, Star, Eye, Layers } from 'lucide-react';

interface PortfolioGalleryProps {
  onInquireSimilarStyle: (work: PortfolioItem) => void;
  selectedWorkModal: PortfolioItem | null;
  setSelectedWorkModal: (work: PortfolioItem | null) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onInquireSimilarStyle,
  selectedWorkModal,
  setSelectedWorkModal,
}) => {
  const { portfolioItems } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: PortfolioCategory[] = [
    'ALL',
    'Original',
    'Commercial',
    'Live2D',
    'Character Design',
    'Fan Art',
  ];

  const filteredWorks = useMemo(() => {
    return portfolioItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'ALL' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [portfolioItems, activeCategory, searchQuery]);

  return (
    <section id="gallery" className="py-20 bg-[#0A0A0B] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 block mb-1">
              Portfolio Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              All Works
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-2 font-light">
              Explore our character design catalog and key visuals. Click any work to view details.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, client, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F0F12] border border-white/10 focus:border-white/30 text-xs text-white placeholder-white/40 outline-none transition-all rounded-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === 'ALL'
                ? portfolioItems.length
                : portfolioItems.filter((i) => i.category === cat).length;

            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white/60 hover:text-white border-white/10 hover:border-white/20'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-sm text-[9px] ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/40'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredWorks.length === 0 ? (
          <div className="p-16 text-center rounded-xl bg-[#0F0F12] border border-white/10">
            <p className="text-white/40 text-xs font-light">No works matched your search parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedWorkModal(work)}
                className="group cursor-pointer rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 shadow-xl flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1F]">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark hover overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 backdrop-blur-[2px]">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-sm bg-white/10 text-white text-[9px] font-bold uppercase tracking-widest">
                        {work.category}
                      </span>
                      <span className="text-[10px] text-white/60 tracking-wider">{work.year}</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-white/70 line-clamp-3 leading-relaxed font-light">
                        {work.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white font-semibold pt-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Artwork</span>
                      </div>
                    </div>
                  </div>

                  {work.isBestWork && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-amber-300 text-black text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <Star className="w-2.5 h-2.5 fill-black" />
                      <span>BEST</span>
                    </div>
                  )}

                  {work.images && work.images.length > 1 && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-sm bg-black/70 border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 backdrop-blur-md shadow-md">
                      <Layers className="w-3 h-3 text-white/80" />
                      <span>{work.images.length}</span>
                    </div>
                  )}
                </div>

                {/* Info Footer */}
                <div className="p-4 bg-[#0F0F12] flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base text-white group-hover:text-white/80 transition-colors line-clamp-1">
                      {work.title}
                    </h3>
                    <p className="text-[11px] text-white/40 mt-0.5 font-light">
                      {work.client || work.category}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {work.tags.slice(0, 2).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider text-white/40"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <PortfolioModal
        work={selectedWorkModal}
        onClose={() => setSelectedWorkModal(null)}
        onInquireSimilarStyle={onInquireSimilarStyle}
      />
    </section>
  );
};
