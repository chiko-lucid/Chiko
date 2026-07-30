export type AvailabilityStatus = 'AVAILABLE' | 'BUSY';

export type PortfolioCategory = 'ALL' | 'Original' | 'Fan Art' | 'Commercial' | 'Live2D' | 'Character Design';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'ALL'>;
  imageUrl: string;
  images?: string[];
  isBestWork: boolean;
  tags: string[];
  year: string;
  client?: string;
  tools: string[];
  duration: string;
  purpose: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  estimatedTime: string;
  recommendedFor: string[];
  startingPrice?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  iconName: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  projectTitle: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InquiryForm {
  id?: string;
  clientName: string;
  contactMethod: string;
  contactDetail: string;
  usageType: '비상업 (개인 소장)' | '상업 (방송/굿즈)' | '기업/외주 프로젝트';
  serviceType: string;
  budget: string;
  deadline: string;
  referenceWorkTitle?: string;
  details: string;
  submittedAt?: string;
}

export interface ArtistProfile {
  name: string;
  role: string;
  subtitle: string;
  heroTagline?: string;
  mainTitle?: string;
  heroImageUrl?: string;
  heroImageTitle?: string;
  heroImageSub?: string;
  bioLines: string[];
  experienceYears: number;
  completedCommissions: number;
  repeatClientRate: number;
  satisfactionRate: number;
  status: AvailabilityStatus;
  responseTime: string;
  avatarUrl: string;
  skills: { name: string; level?: string; category: string }[];
  commercialScopes: string[];
  socialLinks: {
    twitter?: string;
    pixiv?: string;
    instagram?: string;
    artstation?: string;
    behance?: string;
    youtube?: string;
    twitch?: string;
    github?: string;
    openKakao?: string;
    email?: string;
    googleForm?: string;
    discord?: string;
  };
}

export type ThemeMode = 'dark' | 'light' | 'pastel';

export type ActivePage = 'home' | 'best-works' | 'about' | 'services' | 'process' | 'gallery' | 'reviews' | 'faq' | 'contact';
