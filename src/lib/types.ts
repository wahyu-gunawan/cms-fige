export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  icon: string;
  order: number;
  published: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  position: string;
  specialization: string;
  bio: string;
  education: string[];
  experience: string[];
  image: string;
  email: string;
  order: number;
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  heroTitle: string;
  heroSubtitle: string;
  yearsExperience: number;
  casesHandled: number;
  clientSatisfaction: number;
}
