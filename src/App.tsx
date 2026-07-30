import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BestWorks } from './components/BestWorks';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { PortfolioGallery } from './components/PortfolioGallery';
import { TrustSection } from './components/TrustSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingContactButton } from './components/FloatingContactButton';
import { AdminModal } from './components/AdminModal';
import { PageHeaderBanner } from './components/PageHeaderBanner';
import { PortfolioItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

function PortfolioAppContent() {
  const { theme, activePage, setActivePage } = usePortfolio();

  const [selectedWorkModal, setSelectedWorkModal] = useState<PortfolioItem | null>(null);
  const [prefilledReferenceWork, setPrefilledReferenceWork] = useState<PortfolioItem | null>(null);
  const [prefilledServiceType, setPrefilledServiceType] = useState<string | undefined>(undefined);

  const handleInquireSimilarStyle = (work: PortfolioItem) => {
    setPrefilledReferenceWork(work);
    setActivePage('contact');
    setTimeout(() => {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPrefilledServiceType(serviceTitle);
    setActivePage('contact');
    setTimeout(() => {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const getThemeClass = () => {
    if (theme === 'light') return 'bg-slate-50 text-slate-900';
    if (theme === 'pastel') return 'bg-pink-950/20 text-slate-100';
    return 'bg-slate-950 text-slate-100 dark';
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-amber-400 selection:text-black transition-colors duration-300 ${getThemeClass()}`}>
      {/* Fixed Sticky Header */}
      <Header />

      <main>
        {activePage !== 'home' && <PageHeaderBanner activePage={activePage} />}

        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activePage === 'home' && (
              <>
                <Hero />
                <BestWorks onSelectWork={(work) => setSelectedWorkModal(work)} />
                <About />
                <Services onSelectServiceForInquiry={handleSelectServiceForInquiry} />
                <Process />
                <PortfolioGallery
                  onInquireSimilarStyle={handleInquireSimilarStyle}
                  selectedWorkModal={selectedWorkModal}
                  setSelectedWorkModal={setSelectedWorkModal}
                />
                <TrustSection />
                <FAQSection />
                <ContactSection
                  prefilledReferenceWork={prefilledReferenceWork}
                  prefilledServiceType={prefilledServiceType}
                />
              </>
            )}

            {activePage === 'best-works' && (
              <>
                <BestWorks onSelectWork={(work) => setSelectedWorkModal(work)} />
                <ContactSection
                  prefilledReferenceWork={prefilledReferenceWork}
                  prefilledServiceType={prefilledServiceType}
                />
              </>
            )}

            {activePage === 'about' && (
              <>
                <About />
                <TrustSection />
              </>
            )}

            {activePage === 'services' && (
              <>
                <Services onSelectServiceForInquiry={handleSelectServiceForInquiry} />
                <ContactSection
                  prefilledReferenceWork={prefilledReferenceWork}
                  prefilledServiceType={prefilledServiceType}
                />
              </>
            )}

            {activePage === 'process' && (
              <>
                <Process />
                <FAQSection />
              </>
            )}

            {activePage === 'gallery' && (
              <>
                <PortfolioGallery
                  onInquireSimilarStyle={handleInquireSimilarStyle}
                  selectedWorkModal={selectedWorkModal}
                  setSelectedWorkModal={setSelectedWorkModal}
                />
                <ContactSection
                  prefilledReferenceWork={prefilledReferenceWork}
                  prefilledServiceType={prefilledServiceType}
                />
              </>
            )}

            {activePage === 'reviews' && (
              <>
                <TrustSection />
                <ContactSection
                  prefilledReferenceWork={prefilledReferenceWork}
                  prefilledServiceType={prefilledServiceType}
                />
              </>
            )}

            {activePage === 'faq' && (
              <>
                <FAQSection />
                <ContactSection
                  prefilledReferenceWork={prefilledReferenceWork}
                  prefilledServiceType={prefilledServiceType}
                />
              </>
            )}

            {activePage === 'contact' && (
              <ContactSection
                prefilledReferenceWork={prefilledReferenceWork}
                prefilledServiceType={prefilledServiceType}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA Button */}
      <FloatingContactButton />

      {/* Admin Management Modal */}
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
}
