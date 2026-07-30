import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MessageSquareText, Calculator, CreditCard, Palette, Sparkles, CheckCircle2, Send, Clock } from 'lucide-react';

export const Process: React.FC = () => {
  const { processSteps } = usePortfolio();

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareText':
        return <MessageSquareText className="w-4 h-4 text-white/80" />;
      case 'Calculator':
        return <Calculator className="w-4 h-4 text-white/80" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4 text-white/80" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-white/80" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-white/80" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4 text-white/80" />;
      case 'Send':
        return <Send className="w-4 h-4 text-white/80" />;
      default:
        return <Sparkles className="w-4 h-4 text-white/80" />;
    }
  };

  return (
    <section id="process" className="py-20 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 block mb-1">
              Work Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Production Workflow
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-2 font-light">
              Transparent, step-by-step production flow designed for client clarity and precision.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-sm bg-white/5 border border-white/10 text-[11px] uppercase tracking-wider font-medium text-white/70 flex items-center gap-2 self-start md:self-auto">
            <Clock className="w-3.5 h-3.5 text-white/60" />
            <span>Avg Timeline: <strong className="text-white">2 &ndash; 4 Weeks</strong></span>
          </div>
        </div>

        {/* Process Timeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300 shadow-2xl group"
            >
              {/* Step Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-sm bg-[#1A1A1F] border border-white/10 flex items-center justify-center">
                    {getStepIcon(step.iconName)}
                  </div>
                  <span className="text-xl font-serif italic text-white/30 group-hover:text-white/50 transition-colors">
                    0{step.step}
                  </span>
                </div>

                <h3 className="font-serif text-base text-white mb-2 group-hover:text-white/90 transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/60 text-xs font-light leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Step Duration */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-medium uppercase tracking-widest text-white/40">
                <span>Duration</span>
                <span className="text-white font-semibold">{step.duration}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
