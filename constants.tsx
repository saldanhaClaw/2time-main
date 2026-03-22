
import React from 'react';
import { 
  Zap, 
  Settings, 
  Search, 
  Layout, 
  BrainCircuit, 
  Database, 
  Code, 
  Target 
} from 'lucide-react';
import { Service, PortfolioItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'automation',
    title: 'Automation & Intelligent Systems',
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    items: [
      'Internal process automation',
      'CRM, Payments, WhatsApp integration',
      'Custom webhooks and workflows',
      'SaaS dashboards and panels'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Systems',
    icon: <Code className="w-6 h-6 text-indigo-400" />,
    items: [
      'MVPs and MicroSaaS',
      'Internal management platforms',
      'Multi-tenant systems',
      'Scalable architecture'
    ]
  },
  {
    id: 'seo',
    title: 'Strategic SEO & Performance',
    icon: <Search className="w-6 h-6 text-purple-400" />,
    items: [
      'Advanced technical SEO',
      'B2B business focus',
      'Ranking structure optimization',
      'Predictable organic traffic'
    ]
  },
  {
    id: 'platforms',
    title: 'Websites & Platforms',
    icon: <Layout className="w-6 h-6 text-pink-400" />,
    items: [
      'High-conversion landing pages',
      'Strategic corporate websites',
      'Complex portals',
      'User experience (UX)'
    ]
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    // Fix: Changed id from number to string to comply with PortfolioItem interface
    id: '1',
    title: 'Logistics Management System',
    category: 'Custom Systems',
    description: 'Complete fleet automation and real-time tracking.',
    image: 'https://picsum.photos/seed/logistics/800/600'
  },
  {
    // Fix: Changed id from number to string to comply with PortfolioItem interface
    id: '2',
    title: 'SaaS Sales Dashboard',
    category: 'Automação',
    description: 'Multiple payment gateway integration and advanced metrics.',
    image: 'https://picsum.photos/seed/dashboard/800/600'
  },
  {
    // Fix: Changed id from number to string to comply with PortfolioItem interface
    id: '3',
    title: 'B2B Content Portal',
    category: 'SEO & Growth',
    description: 'Architecture focused on qualified lead capture via organic traffic.',
    image: 'https://picsum.photos/seed/content/800/600'
  }
];
