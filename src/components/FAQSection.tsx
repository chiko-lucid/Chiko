import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs } = usePortfolio();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#0A0A0B] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 block mb-1">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Client Inquiry FAQ
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-2 font-light">
            Essential guidelines for commercial rights, revision cycles, and asset deliveries.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-xl bg-[#0F0F12] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-white/60 shrink-0" />
                    <span className="font-serif text-base text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-white/60 text-xs sm:text-sm font-light leading-relaxed border-t border-white/10 bg-[#0A0A0B]">
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
