import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Layers, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <section id="about" className="py-20 bg-[#0A0A0B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 block mb-1">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Artist Profile
          </h2>
        </div>

        {/* Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Box: Avatar & Main Bio */}
          <div className="lg:col-span-7 rounded-xl bg-[#0F0F12] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 shadow-lg">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border border-black rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white">{profile.name}</h3>
                  <p className="text-[11px] uppercase tracking-widest text-white/50 font-medium">{profile.role}</p>
                </div>
              </div>

              {/* Main Bio Text */}
              <div className="space-y-3 text-white/70 text-sm font-light leading-relaxed">
                {(profile.bioLines || []).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

            </div>

            {/* Bottom Strengths List */}
            <div className="pt-6 border-t border-white/10 mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span className="text-xs text-white/80 font-light">Vivid Character Colors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span className="text-xs text-white/80 font-light">Strict Schedule Punctuality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span className="text-xs text-white/80 font-light">Live2D Layer Separations</span>
              </div>
            </div>
          </div>

          {/* Right Box: Skills & Commercial Work Tags */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Skills Container */}
            <div className="rounded-xl bg-[#0F0F12] border border-white/10 p-6 shadow-2xl flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-white/60" />
                <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                  Software &amp; Technical Skills
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {(profile.skills || []).map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] border border-white/10 text-[11px] font-medium text-white/80 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[9px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded-sm">
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Work Scopes */}
            <div className="rounded-xl bg-[#0F0F12] border border-white/10 p-6 shadow-2xl flex-1">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                  Commercial Scope
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {(profile.commercialScopes || []).map((scope, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-sm bg-[#1A1A1F] border border-white/10 text-[11px] font-medium text-white/70 flex items-center gap-1.5"
                  >
                    <span className="text-white/40 text-[8px]">&bull;</span>
                    <span>{scope}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
