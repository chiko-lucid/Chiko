import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowDownRight, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile } = usePortfolio();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#0A0A0B]">
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Text & Intro & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-8">
            
            {/* Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.25em] text-white/60 font-semibold">
              <Sparkles className="w-3 h-3 text-white/80" />
              <span>Chiko Arche &bull; 치코 일러스트레이터</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tighter text-white">
                Character <br />
                <span className="italic text-white/50">Illustrator.</span>
              </h1>
              <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                {profile.subtitle || 'Capturing emotions in characters for gaming, virtual contents, and subculture projects with over 5 years of professional experience.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleScroll('#gallery')}
                className="px-6 py-3.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors shadow-xl flex items-center gap-2"
              >
                <span>View Portfolio</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScroll('#contact')}
                className="px-6 py-3.5 border border-white/20 text-white/80 hover:border-white/40 hover:text-white text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 bg-white/5"
              >
                <span>Start Project</span>
              </button>
            </div>

            {/* Trust Stats Badges */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-xl pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-serif italic text-white">
                  {profile.completedCommissions}+
                </div>
                <div className="text-[9px] uppercase tracking-widest text-white/40 pt-1 font-medium">
                  Commissions
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-serif italic text-white">
                  {profile.experienceYears} Years
                </div>
                <div className="text-[9px] uppercase tracking-widest text-white/40 pt-1 font-medium">
                  Experience
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-serif italic text-white flex items-center gap-1.5">
                  <span>98%</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
                </div>
                <div className="text-[9px] uppercase tracking-widest text-white/40 pt-1 font-medium">
                  Satisfaction
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">Links:</span>
              <div className="flex items-center gap-3">
                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-medium"
                  >
                    Twitter
                  </a>
                )}
                {profile.socialLinks.pixiv && (
                  <a
                    href={profile.socialLinks.pixiv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-medium"
                  >
                    Pixiv
                  </a>
                )}
                {profile.socialLinks.artstation && (
                  <a
                    href={profile.socialLinks.artstation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-medium"
                  >
                    ArtStation
                  </a>
                )}
                {profile.socialLinks.openKakao && (
                  <a
                    href={profile.socialLinks.openKakao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white/10 border border-white/20 text-white/90 hover:bg-white/20 transition-all text-[10px] uppercase tracking-widest rounded-sm flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3 text-amber-300" />
                    <span>OpenKakao</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Masterpiece Artwork Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md sm:max-w-lg">
              
              {/* Outer Subtle Frame */}
              <div className="relative bg-[#0F0F12] rounded-2xl p-3 border border-white/10 shadow-2xl overflow-hidden">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1A1A1F]">
                  <img
                    src="/src/assets/images/hero_artwork_1785400284201.jpg"
                    alt="Representative Artwork"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Floating Overlay Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-sm bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Key Visual</span>
                  </div>

                  {/* Bottom Information */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-base text-white">Cyber Fantasy Heroine</h3>
                        <p className="text-[11px] text-white/50">Main Title Key Visual / 2025</p>
                      </div>
                      <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-[9px] text-white font-bold tracking-widest uppercase rounded-sm">
                        Best Work
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
