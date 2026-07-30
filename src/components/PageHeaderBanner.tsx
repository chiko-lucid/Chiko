import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ActivePage } from '../types';
import { ChevronRight, ArrowLeft, Sparkles, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

interface PageHeaderBannerProps {
  activePage: ActivePage;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({ activePage }) => {
  const { setActivePage } = usePortfolio();

  if (activePage === 'home') return null;

  const pageInfoMap: Record<
    Exclude<ActivePage, 'home'>,
    { title: string; engTitle: string; subtitle: string; category: string }
  > = {
    'best-works': {
      title: '대표 마스터피스',
      engTitle: 'Best Works',
      subtitle: '치코(Chiko) 작가가 엄선한 대표 키비주얼 & 메인 일러스트레이션 포트폴리오입니다.',
      category: 'Featured Collection',
    },
    about: {
      title: '작가 프로필',
      engTitle: 'About Artist',
      subtitle: '프리랜서 캐릭터 일러스트레이터 & Live2D 디자이너 치코(Chiko)의 세계관과 스펙입니다.',
      category: 'Artist Information',
    },
    services: {
      title: '작업 분야 & 견적 안내',
      engTitle: 'Services & Pricing',
      subtitle: '캐릭터 일러스트, VTuber 파츠분리, 굿즈 아트 등의 작업 단가와 제공 사양을 확인하세요.',
      category: 'Service Specs',
    },
    process: {
      title: '제작 프로세스',
      engTitle: 'Work Process',
      subtitle: '문의 접수부터 러프, 펜선, 채색, 최종 납품까지 체계적인 5단계 작업 공정을 안내합니다.',
      category: 'Workflow Guide',
    },
    gallery: {
      title: '전체 포트폴리오 갤러리',
      engTitle: 'Portfolio Gallery',
      subtitle: '상업 외주, 개인작, 팬아트, VTuber 등 치코 작가의 다채로운 캐릭터 작품 모음집입니다.',
      category: 'Artwork Archive',
    },
    reviews: {
      title: '클라이언트 후기 및 평가',
      engTitle: 'Reviews & Trust',
      subtitle: '실제 작업을 함께 진행한 의뢰인분들의 생생한 만족도 후기와 프로젝트 통계입니다.',
      category: 'Client Testimonials',
    },
    faq: {
      title: '자주 묻는 질문',
      engTitle: 'FAQ & Policy',
      subtitle: '저작권 규정, 납품 파일 형식, 수정 가능 횟수 등 커미션 전 확인 가능한 Q&A입니다.',
      category: 'Help Center',
    },
    contact: {
      title: '프로젝트 의뢰 & 문의',
      engTitle: 'Contact & Inquiry',
      subtitle: '원하시는 일러스트 사양과 양식을 작성해 치코 작가에게 맞춤견적을 신청해 보세요.',
      category: 'Project Submission',
    },
  };

  const current = pageInfoMap[activePage as Exclude<ActivePage, 'home'>] || {
    title: '페이지',
    engTitle: 'Page',
    subtitle: 'Chiko Arche 포트폴리오 전용 페이지입니다.',
    category: 'Portfolio',
  };

  const navPages: { id: ActivePage; label: string }[] = [
    { id: 'home', label: '전체 (Home)' },
    { id: 'best-works', label: 'Best Works' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-8 bg-gradient-to-b from-[#141418] via-[#0F0F12] to-[#0A0A0B] border-b border-white/10 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
            >
              <span>Chiko Arche</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-amber-300/90 font-medium">{current.engTitle}</span>
          </div>

          <button
            onClick={() => setActivePage('home')}
            className="px-3.5 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all text-xs flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>전체 페이지로 보기 (Overview)</span>
          </button>
        </div>

        {/* Title Block */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] uppercase tracking-widest font-bold">
            <Sparkles className="w-3 h-3" />
            <span>{current.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
            {current.engTitle} &bull; <span className="italic text-white/70">{current.title}</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        {/* Quick Tab Page Switcher Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold shrink-0 mr-2 flex items-center gap-1">
            <LayoutGrid className="w-3 h-3 text-amber-300" />
            <span>Pages:</span>
          </span>
          {navPages.map((p) => {
            const isSelected = activePage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActivePage(p.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-300 text-black shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
};
