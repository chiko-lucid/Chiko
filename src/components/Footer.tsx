import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-serif italic text-lg text-white font-bold">
                Chiko Arche
              </span>
              <span className="text-[10px] text-amber-300 font-medium">({profile.name})</span>
            </div>
            <p className="text-[11px] text-white/40 mt-1 font-light">
              Freelance Character Illustrator &amp; Live2D Designer. All rights reserved.
            </p>
          </div>

          {/* Center Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-widest">
            {profile.socialLinks.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                X (Twitter)
              </a>
            )}
            {profile.socialLinks.pixiv && (
              <a
                href={profile.socialLinks.pixiv}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                Pixiv
              </a>
            )}
            {profile.socialLinks.instagram && (
              <a
                href={profile.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                Instagram
              </a>
            )}
            {profile.socialLinks.artstation && (
              <a
                href={profile.socialLinks.artstation}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                ArtStation
              </a>
            )}
            {profile.socialLinks.behance && (
              <a
                href={profile.socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                Behance
              </a>
            )}
            {profile.socialLinks.youtube && (
              <a
                href={profile.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                YouTube
              </a>
            )}
            {profile.socialLinks.twitch && (
              <a
                href={profile.socialLinks.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                Twitch
              </a>
            )}
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>

          {/* Right Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#1A1A1F] hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all shadow-md"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

      </div>
    </footer>
  );
};
