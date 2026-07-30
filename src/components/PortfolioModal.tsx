import React, { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { X, Wrench, Clock, Target, UserCheck, MessageSquarePlus, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface PortfolioModalProps {
  work: PortfolioItem | null;
  onClose: () => void;
  onInquireSimilarStyle: (work: PortfolioItem) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  work,
  onClose,
  onInquireSimilarStyle,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset index when work changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [work?.id]);

  // Support Keyboard Left / Right / Escape navigation
  useEffect(() => {
    if (!work) return;

    const allImages = work.images && work.images.length > 0 
      ? Array.from(new Set([work.imageUrl, ...work.images]))
      : [work.imageUrl];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work, onClose]);

  if (!work) return null;

  const allImages = work.images && work.images.length > 0
    ? Array.from(new Set([work.imageUrl, ...work.images]))
    : [work.imageUrl];

  const currentImageUrl = allImages[activeImageIndex] || work.imageUrl;

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md overflow-y-auto">
      
      {/* Background click listener */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#0F0F12] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all shadow-xl"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image Gallery Display */}
          <div className="lg:col-span-7 bg-[#0A0A0B] p-4 sm:p-6 flex flex-col justify-between items-center min-h-[350px] lg:min-h-[550px] relative">
            
            {/* Top Image Counter Badge */}
            {allImages.length > 1 && (
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                <Layers className="w-3 h-3 text-white/60" />
                <span>{activeImageIndex + 1} / {allImages.length}</span>
              </div>
            )}

            {/* Main Image Frame with Navigation Overlay */}
            <div className="relative w-full flex-1 flex items-center justify-center max-h-[65vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#0F0F12] group">
              <img
                src={currentImageUrl}
                alt={`${work.title} - Image ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[65vh] transition-all duration-300"
              />

              {/* Prev / Next Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-white/20 text-white border border-white/20 transition-all backdrop-blur-md shadow-lg"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-white/20 text-white border border-white/20 transition-all backdrop-blur-md shadow-lg"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {allImages.length > 1 && (
              <div className="w-full mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-center">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-md overflow-hidden border transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-white ring-2 ring-white/40 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Work Information & Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0F0F12] overflow-y-auto max-h-[80vh] lg:max-h-[none]">
            
            <div className="space-y-5">
              
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-sm bg-white/10 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest">
                  {work.category}
                </span>
                {allImages.length > 1 && (
                  <span className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/20 text-white/80 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Layers className="w-3 h-3 text-white/60" />
                    <span>{allImages.length} Photos</span>
                  </span>
                )}
                {work.isBestWork && (
                  <span className="px-2.5 py-1 rounded-sm bg-amber-300 text-black text-[9px] font-bold uppercase tracking-widest">
                    &star; BEST WORK
                  </span>
                )}
                <span className="text-[10px] text-white/40 tracking-wider ml-auto">{work.year}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                {work.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {(work.tags || []).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-sm bg-[#1A1A1F] border border-white/10 text-[10px] uppercase tracking-wider text-white/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Detail Specifications */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-sm bg-[#1A1A1F] border border-white/10 text-xs space-y-1">
                {work.client && (
                  <div className="col-span-2 flex items-center gap-2 text-white/70 font-light">
                    <UserCheck className="w-3.5 h-3.5 text-white/60 shrink-0" />
                    <span>Client: <strong className="text-white font-normal">{work.client}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-white/70 font-light">
                  <Clock className="w-3.5 h-3.5 text-white/60 shrink-0" />
                  <span>Timeline: <strong className="text-white font-normal">{work.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-white/70 font-light">
                  <Wrench className="w-3.5 h-3.5 text-white/60 shrink-0" />
                  <span>Software: <strong className="text-white font-normal">{(work.tools || []).join(', ')}</strong></span>
                </div>
                {work.purpose && (
                  <div className="col-span-2 flex items-center gap-2 text-white/70 font-light">
                    <Target className="w-3.5 h-3.5 text-white/60 shrink-0" />
                    <span>Scope: <strong className="text-white font-normal">{work.purpose}</strong></span>
                  </div>
                )}
              </div>

              {/* Description Paragraph */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                  Artwork Overview
                </h4>
                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line">
                  {work.description}
                </p>
              </div>

            </div>

            {/* CTA Button: Similar Style Inquiry */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onClose();
                  onInquireSimilarStyle(work);
                }}
                className="w-full py-3 px-6 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Inquire Similar Style</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
