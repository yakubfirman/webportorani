export interface HeroData {
  id?: number;
  name: string;
  headline: string;
  subheadline: string;
  photo_url: string;
  cv_url: string;
}

export interface AboutData {
  id?: number;
  content: string;
  photo_url: string;
}

export interface ExperienceData {
  id?: number;
  title: string;
  institution: string;
  type: 'formal' | 'pkl';
  period: string;
  description: string;
  responsibilities: string[];
  order: number;
}

export interface SkillData {
  id?: number;
  name: string;
  category: 'hard' | 'soft';
  level: number;
  order: number;
}

export interface PortfolioItemData {
  id?: number;
  title: string;
  description: string;
  type: 'document' | 'video' | 'image';
  url: string;
  thumbnail_url: string;
  order: number;
}

export interface TestimonialData {
  id?: number;
  name: string;
  role: string;
  content: string;
  photo_url: string;
  order: number;
}

export interface ContactInfoData {
  id?: number;
  email: string;
  phone: string;
  linkedin_url: string;
  instagram: string;
  address: string;
}

export interface ContactMessageData {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  is_read?: boolean;
}
