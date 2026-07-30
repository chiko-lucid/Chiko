import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MessageCircle, Twitter, ExternalLink, Send, Clock, CheckCircle2, FileText } from 'lucide-react';
import { PortfolioItem } from '../types';

interface ContactSectionProps {
  prefilledReferenceWork?: PortfolioItem | null;
  prefilledServiceType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledReferenceWork,
  prefilledServiceType,
}) => {
  const { profile, submitInquiry } = usePortfolio();

  const [clientName, setClientName] = useState('');
  const [contactMethod] = useState('Email');
  const [contactDetail, setContactDetail] = useState('');
  const [usageType, setUsageType] = useState<'비상업 (개인 소장)' | '상업 (방송/굿즈)' | '기업/외주 프로젝트'>('상업 (방송/굿즈)');
  const [serviceType, setServiceType] = useState(prefilledServiceType || 'Character Illustration');
  const [budget, setBudget] = useState('Negotiable');
  const [deadline, setDeadline] = useState('');
  const [referenceWorkTitle, setReferenceWorkTitle] = useState(prefilledReferenceWork?.title || '');
  const [details, setDetails] = useState('');

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (prefilledReferenceWork) {
      setReferenceWorkTitle(prefilledReferenceWork.title);
    }
  }, [prefilledReferenceWork]);

  useEffect(() => {
    if (prefilledServiceType) {
      setServiceType(prefilledServiceType);
    }
  }, [prefilledServiceType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !contactDetail.trim() || !details.trim()) {
      alert('Please complete your name, contact detail, and project requirements.');
      return;
    }

    submitInquiry({
      clientName,
      contactMethod,
      contactDetail,
      usageType,
      serviceType,
      budget,
      deadline,
      referenceWorkTitle,
      details,
    });

    setSubmittedSuccess(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#0A0A0B] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 block mb-1">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Start Your Project
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-2 font-light">
            Inquiries and proposals are welcome anytime. Fill out the brief form below or connect directly via social channels.
          </p>

          {/* Status Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 p-3 rounded-sm bg-[#0F0F12] border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  profile.status === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
              <span className="font-serif text-white text-xs">
                Availability: {profile.status === 'AVAILABLE' ? 'Open for Commissions' : 'Bookings Closed'}
              </span>
            </div>
            <div className="text-white/20">|</div>
            <div className="flex items-center gap-1.5 text-white/60 font-light text-xs">
              <Clock className="w-3.5 h-3.5 text-white/60" />
              <span>Response Time: <strong className="text-white font-normal">{profile.responseTime}</strong></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct Contact Channels Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-[#0F0F12] border border-white/10 shadow-2xl space-y-6">
              <h3 className="font-serif text-lg text-white">Direct Communication</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Prefer direct messaging? Reach out via KakaoTalk, Email, or Twitter DM anytime.
              </p>

              <div className="space-y-3">
                {profile.socialLinks?.email && (
                  <a
                    href={`mailto:${profile.socialLinks.email}`}
                    className="p-3.5 rounded-sm bg-[#1A1A1F] border border-white/10 hover:border-white/20 text-xs text-white/80 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-sm bg-white/5 text-white/80">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif block text-white">Email Contact</span>
                        <span className="text-[11px] text-white/40 font-light">{profile.socialLinks.email}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                )}

                {profile.socialLinks?.openKakao && (
                  <a
                    href={profile.socialLinks.openKakao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-sm bg-[#1A1A1F] border border-white/10 hover:border-white/20 text-xs text-white/80 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-sm bg-white/5 text-amber-300">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif block text-white">Open KakaoTalk 1:1</span>
                        <span className="text-[11px] text-white/40 font-light">Instant Messaging</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </a>
                )}

                {profile.socialLinks?.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-sm bg-[#1A1A1F] border border-white/10 hover:border-white/20 text-xs text-white/80 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-sm bg-white/5 text-white/80">
                        <Twitter className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif block text-white">X (Twitter) DM</span>
                        <span className="text-[11px] text-white/40 font-light">Official Social Channel</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                )}

                {profile.socialLinks?.googleForm && (
                  <a
                    href={profile.socialLinks.googleForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-sm bg-[#1A1A1F] border border-white/10 hover:border-white/20 text-xs text-white/80 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-sm bg-white/5 text-white/80">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif block text-white">Google Form Application</span>
                        <span className="text-[11px] text-white/40 font-light">External Submission</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-[#0F0F12] border border-white/10 shadow-2xl">
              
              {submittedSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">Inquiry Received Successfully</h3>
                  <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
                    Thank you! An estimate and production schedule will be delivered to ({contactDetail}) within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setClientName('');
                      setContactDetail('');
                      setDetails('');
                    }}
                    className="px-6 py-2.5 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                  >
                    Submit New Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-serif text-lg text-white mb-1">Inquiry Form</h3>

                  {referenceWorkTitle && (
                    <div className="p-3 rounded-sm bg-white/5 border border-white/10 text-xs text-white/80 flex items-center justify-between">
                      <span>Referenced Work: <strong>"{referenceWorkTitle}"</strong></span>
                      <button
                        type="button"
                        onClick={() => setReferenceWorkTitle('')}
                        className="text-[10px] text-white/40 hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-white/60 mb-1.5">
                        Name / Studio / Handle <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Studio"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1A1F] border border-white/10 focus:border-white/30 text-xs text-white placeholder-white/40 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-white/60 mb-1.5">
                        Contact Info (Email / Discord) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="example@domain.com"
                        value={contactDetail}
                        onChange={(e) => setContactDetail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1A1F] border border-white/10 focus:border-white/30 text-xs text-white placeholder-white/40 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-white/60 mb-1.5">
                        Usage License Type
                      </label>
                      <select
                        value={usageType}
                        onChange={(e: any) => setUsageType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1A1F] border border-white/10 focus:border-white/30 text-xs text-white outline-none"
                      >
                        <option value="비상업 (개인 소장)">Non-Commercial (Personal)</option>
                        <option value="상업 (방송/굿즈)">Commercial (Streaming / Merch)</option>
                        <option value="기업/외주 프로젝트">Enterprise / Corporate Studio</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-white/60 mb-1.5">
                        Service Category
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1A1F] border border-white/10 focus:border-white/30 text-xs text-white outline-none"
                      >
                        <option value="캐릭터 일러스트">Character Illustration</option>
                        <option value="SD 일러스트">Chibi / SD Illustration</option>
                        <option value="디자인 & 키비주얼">Design &amp; Key Visual</option>
                        <option value="상업 / 외주 일러스트">Commercial Art</option>
                        <option value="Live2D 파츠 분리">Live2D Layer Separation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-white/60 mb-1.5">
                        Estimated Budget
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. $500 - $1000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1A1F] border border-white/10 focus:border-white/30 text-xs text-white placeholder-white/40 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-white/60 mb-1.5">
                        Target Deadline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Late August 2025"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1A1F] border border-white/10 focus:border-white/30 text-xs text-white placeholder-white/40 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-white/60 mb-1.5">
                      Project Description &amp; References <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe character features, posture, mood, image reference links..."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1A1F] border border-white/10 focus:border-white/30 text-xs text-white placeholder-white/40 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Project Inquiry</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
