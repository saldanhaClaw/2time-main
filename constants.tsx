
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
    id: '1',
    title: 'Site W-tech Brasil',
    category: 'SITES',
    description: 'Sistema de Site Integrado com cursos e agendas',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800'
  },
  {
    id: '2',
    title: 'Automação Kiwify e Vendas',
    category: 'AUTOMAÇÕES',
    description: 'Integração Kiwify para aceleração de conversão',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
  },
  {
    id: '3',
    title: 'Sistema Imobiliária',
    category: 'SISTEMAS',
    description: 'Automação completa para gestão de imóveis',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800'
  },
  {
    id: '4',
    title: 'Escola de Leilões',
    category: 'SITES',
    description: 'Lançamento de Cursos online e Presencial',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800'
  },
  {
    id: '5',
    title: 'Blog SEO Grupo Trido',
    category: 'SEO',
    description: 'Publicações com Redatora profissional',
    image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800'
  },
  {
    id: '6',
    title: 'Controle Hospedagem',
    category: 'SISTEMAS',
    description: 'Dashboard de gestão para hotelaria',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800'
  },
  {
    id: '7',
    title: 'Nacional Hidro',
    category: 'SITES',
    description: 'Hidrojateamento de Alta Pressão',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800'
  },
  {
    id: '8',
    title: 'Resort das Oliveiras',
    category: 'SISTEMAS',
    description: 'Gestão Inteligente',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800'
  },
  {
    id: '9',
    title: 'Loja Wtech Store',
    category: 'SITES',
    description: 'E-commerce de altíssima conversão',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800'
  }
];
