import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, Building2, ThumbsUp, Users2, Award, Quote } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const { profile, reviews } = usePortfolio();

  const partnerLogos = [
    { name: 'NEXON Games Co.', project: 'Subculture Mobile RPG' },
    { name: 'Smilegate Megaport', project: 'Card Illustration' },
    { name: 'Kakao Games Corp.', project: 'Key Visual Event' },
    { name: 'Hololive Fan Project', project: 'VTuber Costume Design' },
    { name: 'A-Publishing Ltd.', project: 'Commercial Novel Cover' },
    { name: 'Studio B-Project', project: 'Goods Package Design' }
  ];

  return (
    <section id="reviews" className="py-20 bg-[#0A0A0B] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 block mb-1">
            Reviews &amp; Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Client Trust &amp; Track Record
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-2 font-light">
            Verified client feedback and key industry studio collaborations.
          </p>
        </div>

        {/* 1. Stat Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-[#0F0F12] border border-white/10 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award className="w-20 h-20 text-white" />
            </div>
            <div className="text-4xl sm:text-5xl font-serif text-white">
              {profile.completedCommissions}+
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mt-2">Completed Projects</p>
            <p className="text-[11px] text-white/40 mt-1 font-light">Successfully delivered commercial assets</p>
          </div>

          <div className="p-6 rounded-xl bg-[#0F0F12] border border-white/10 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ThumbsUp className="w-20 h-20 text-white" />
            </div>
            <div className="text-4xl sm:text-5xl font-serif text-white">
              {profile.satisfactionRate}%
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mt-2">Client Satisfaction</p>
            <p className="text-[11px] text-white/40 mt-1 font-light">Average satisfaction score across reviews</p>
          </div>

          <div className="p-6 rounded-xl bg-[#0F0F12] border border-white/10 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users2 className="w-20 h-20 text-white" />
            </div>
            <div className="text-4xl sm:text-5xl font-serif text-white">
              {profile.repeatClientRate}+
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mt-2">Repeat Clients</p>
            <p className="text-[11px] text-white/40 mt-1 font-light">Long-term studios &amp; returning clients</p>
          </div>
        </div>

        {/* 2. Client Worked With Grid */}
        <div className="mb-16">
          <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
            Partner Studios &amp; Brands
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerLogos.map((partner, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/20 flex flex-col items-center justify-center text-center transition-all group"
              >
                <Building2 className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors mb-2" />
                <span className="text-xs font-serif text-white/90 group-hover:text-white transition-colors">
                  {partner.name}
                </span>
                <span className="text-[9px] text-white/40 mt-0.5 font-light">{partner.project}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Testimonial Reviews Cards */}
        <div>
          <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-8">
            Client Testimonials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-xl bg-[#0F0F12] border border-white/10 relative flex flex-col justify-between shadow-2xl"
              >
                <Quote className="w-6 h-6 text-white/10 absolute top-4 right-4" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'text-amber-300 fill-amber-300'
                            : 'text-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 font-light italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white block font-serif font-normal">{rev.clientName}</strong>
                    <span className="text-white/40 text-[10px]">{rev.projectTitle}</span>
                  </div>
                  <span className="text-white/30 text-[10px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
