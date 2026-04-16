export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  shortBio: string;
  title: string;
  credentials: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  expertise: string[];
  articleCount: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageCaption?: string;
  imageCredit?: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: string; // author id
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  sources?: Source[];
  factChecker?: string;
  isFeatured?: boolean;
  isBreaking?: boolean;
  isTrending?: boolean;
  isEditorsPick?: boolean;
}

export interface Source {
  title: string;
  url: string;
  publication?: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Correction {
  articleSlug: string;
  articleTitle: string;
  date: string;
  description: string;
  correctedBy: string;
}
