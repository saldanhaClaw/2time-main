
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
    title: 'Automação & Sistemas Inteligentes',
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    items: [
      'Automação de processos internos',
      'Integração CRM, Pagamentos, WhatsApp',
      'Webhooks e fluxos personalizados',
      'Dashboards e painéis SaaS'
    ]
  },
  {
    id: 'custom',
    title: 'Sistemas Personalizados',
    icon: <Code className="w-6 h-6 text-indigo-400" />,
    items: [
      'MVPs e MicroSaaS',
      'Plataformas internas de gestão',
      'Sistemas multi-tenant',
      'Arquitetura escalável'
    ]
  },
  {
    id: 'seo',
    title: 'SEO Estratégico & Performance',
    icon: <Search className="w-6 h-6 text-purple-400" />,
    items: [
      'SEO técnico avançado',
      'Foco em negócios B2B',
      'Estruturação para rankeamento',
      'Tráfego orgânico previsível'
    ]
  },
  {
    id: 'platforms',
    title: 'Sites & Plataformas',
    icon: <Layout className="w-6 h-6 text-pink-400" />,
    items: [
      'Landing pages de alta conversão',
      'Sites institucionais estratégicos',
      'Portais complexos',
      'Experiência do usuário (UX)'
    ]
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    // Fix: Changed id from number to string to comply with PortfolioItem interface
    id: '1',
    title: 'Sistema de Gestão Logística',
    category: 'Sistemas Personalizados',
    description: 'Automação completa de frota e rastreamento em tempo real.',
    image: 'https://picsum.photos/seed/logistics/800/600'
  },
  {
    // Fix: Changed id from number to string to comply with PortfolioItem interface
    id: '2',
    title: 'Dashboard de Vendas SaaS',
    category: 'Automação',
    description: 'Integração de múltiplos gateways de pagamento e métricas avançadas.',
    image: 'https://picsum.photos/seed/dashboard/800/600'
  },
  {
    // Fix: Changed id from number to string to comply with PortfolioItem interface
    id: '3',
    title: 'Portal de Conteúdo B2B',
    category: 'SEO & Crescimento',
    description: 'Arquitetura focada em captura de leads qualificados via orgânico.',
    image: 'https://picsum.photos/seed/content/800/600'
  }
];
