export type RoutePath = '/' | '/features' | '/pricing' | '/about' | '/contact';

export interface Plan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  limitations?: string[];
  ctaText: string;
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'architecture' | 'deployment' | 'billing' | 'security';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  contribution: string;
  prior: string;
}

export interface FeatureDeepDive {
  id: string;
  title: string;
  headline: string;
  summary: string;
  metrics: { label: string; value: string; unit?: string }[];
  codeSnippet: string;
  invariants: string[];
}
