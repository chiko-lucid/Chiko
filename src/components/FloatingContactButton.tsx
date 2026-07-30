import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const FloatingContactButton: React.FC = () => {
  const { profile } = usePortfolio();

  const handleScrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleScrollToContact}
        className="group relative flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-widest shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            profile.status === 'AVAILABLE' ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />
        <MessageSquareText className="w-3.5 h-3.5 text-black" />
        <span>Inquire Now</span>
      </button>
    </div>
  );
};
