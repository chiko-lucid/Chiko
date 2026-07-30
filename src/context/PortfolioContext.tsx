import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  initialArtistProfile,
  initialFAQs,
  initialPortfolioItems,
  initialProcessSteps,
  initialReviews,
  initialServices,
} from '../data/initialData';
import {
  ArtistProfile,
  FAQItem,
  InquiryForm,
  PortfolioItem,
  ProcessStep,
  ReviewItem,
  ServiceItem,
  ThemeMode,
  ActivePage,
} from '../types';

interface PortfolioContextType {
  profile: ArtistProfile;
  portfolioItems: PortfolioItem[];
  services: ServiceItem[];
  processSteps: ProcessStep[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  inquiries: InquiryForm[];
  theme: ThemeMode;
  activePage: ActivePage;
  isAdminOpen: boolean;
  selectedWorkForInquiry: PortfolioItem | null;
  
  // Actions
  setTheme: (theme: ThemeMode) => void;
  setActivePage: (page: ActivePage) => void;
  setIsAdminOpen: (isOpen: boolean) => void;
  setSelectedWorkForInquiry: (work: PortfolioItem | null) => void;
  
  // Admin & Data Mutations
  updateProfile: (updated: Partial<ArtistProfile>) => void;
  toggleStatus: () => void;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  
  addReview: (review: Omit<ReviewItem, 'id'>) => void;
  deleteReview: (id: string) => void;
  
  submitInquiry: (inquiry: Omit<InquiryForm, 'id' | 'submittedAt'>) => void;
  deleteInquiry: (id: string) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PROFILE = 'illustrator_portfolio_profile_v1';
const LOCAL_STORAGE_KEY_WORKS = 'illustrator_portfolio_works_v1';
const LOCAL_STORAGE_KEY_FAQS = 'illustrator_portfolio_faqs_v1';
const LOCAL_STORAGE_KEY_REVIEWS = 'illustrator_portfolio_reviews_v1';
const LOCAL_STORAGE_KEY_INQUIRIES = 'illustrator_portfolio_inquiries_v1';
const LOCAL_STORAGE_KEY_THEME = 'illustrator_portfolio_theme_v1';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ArtistProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && (parsed.name.includes('루미나') || parsed.name.includes('Lumina'))) {
          parsed.name = '치코 (Chiko)';
          if (parsed.bioLines) {
            parsed.bioLines = parsed.bioLines.map((line: string) =>
              line.replace(/루미나/g, '치코(Chiko)').replace(/Lumina/g, 'Chiko')
            );
          }
          if (parsed.socialLinks) {
            if (parsed.socialLinks.email?.includes('lumina')) {
              parsed.socialLinks.email = 'chiko.illust@example.com';
            }
            if (parsed.socialLinks.discord?.includes('Lumina')) {
              parsed.socialLinks.discord = 'Chiko_Illust#0001';
            }
          }
        }
        return parsed;
      } catch (e) {
        return initialArtistProfile;
      }
    }
    return initialArtistProfile;
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WORKS);
    if (!saved) return initialPortfolioItems;
    try {
      return JSON.parse(saved);
    } catch {
      return initialPortfolioItems;
    }
  });

  const [services] = useState<ServiceItem[]>(initialServices);
  const [processSteps] = useState<ProcessStep[]>(initialProcessSteps);

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_REVIEWS);
    if (!saved) return initialReviews;
    try {
      return JSON.parse(saved);
    } catch {
      return initialReviews;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_FAQS);
    if (!saved) return initialFAQs;
    try {
      return JSON.parse(saved);
    } catch {
      return initialFAQs;
    }
  });

  const [inquiries, setInquiries] = useState<InquiryForm[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) as ThemeMode;
    return saved || 'dark';
  });

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedWorkForInquiry, setSelectedWorkForInquiry] = useState<PortfolioItem | null>(null);

  // Sync with localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_WORKS, JSON.stringify(portfolioItems));
    } catch (e) {
      console.warn('Failed to save works to localStorage:', e);
    }
  }, [portfolioItems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.warn('Failed to save FAQs to localStorage:', e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed to save reviews to localStorage:', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Failed to save inquiries to localStorage:', e);
    }
  }, [inquiries]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, mode);
  };

  const updateProfile = (updated: Partial<ArtistProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const toggleStatus = () => {
    setProfile(prev => ({
      ...prev,
      status: prev.status === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE',
    }));
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: 'work-' + Date.now(),
    };
    setPortfolioItems(prev => [newItem, ...prev]);
  };

  const updatePortfolioItem = (id: string, updated: Partial<PortfolioItem>) => {
    setPortfolioItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: 'faq-' + Date.now(),
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(item => (item.id === id ? { ...item, ...updated } : item)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(item => item.id !== id));
  };

  const addReview = (review: Omit<ReviewItem, 'id'>) => {
    const newRev: ReviewItem = {
      ...review,
      id: 'rev-' + Date.now(),
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(item => item.id !== id));
  };

  const submitInquiry = (inquiryData: Omit<InquiryForm, 'id' | 'submittedAt'>) => {
    const newInquiry: InquiryForm = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      submittedAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefault = () => {
    setProfile(initialArtistProfile);
    setPortfolioItems(initialPortfolioItems);
    setFaqs(initialFAQs);
    setReviews(initialReviews);
    setInquiries([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PROFILE);
    localStorage.removeItem(LOCAL_STORAGE_KEY_WORKS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_FAQS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_REVIEWS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_INQUIRIES);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        portfolioItems,
        services,
        processSteps,
        reviews,
        faqs,
        inquiries,
        theme,
        activePage,
        isAdminOpen,
        selectedWorkForInquiry,
        setTheme,
        setActivePage,
        setIsAdminOpen,
        setSelectedWorkForInquiry,
        updateProfile,
        toggleStatus,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        addReview,
        deleteReview,
        submitInquiry,
        deleteInquiry,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
