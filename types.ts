
import React from 'react';

export interface Service {
  id: string;
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  status: 'Novo' | 'Em Contato' | 'Fechado' | 'Perdido';
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  featured_image?: string;
  date: string;
  status: 'Rascunho' | 'Publicado';
}

export interface QueueItem {
  id: string;
  keyword: string;
  status: 'Pendente' | 'Processando' | 'Concluído' | 'Erro';
  scheduled_date: string;
}

export interface Proposal {
  id: string;
  clientName: string;
  clientEmail: string;
  title: string;
  description: string;
  fullContent?: string;
  value: number;
  status: 'Pendente' | 'Enviada' | 'Aceita' | 'Recusada';
  date: string;
}

export interface Transaction {
  id: string;
  proposal_id?: string;
  client_name: string;
  description: string;
  amount: number;
  type: 'Receita' | 'Despesa';
  date: string;
}

export interface SiteConfig {
  name: string;
  logo: string;
  logoUrl?: string;
  faviconUrl?: string;
  email: string;
  phone: string;
  address: string;
  blogFrequency: 2 | 3;
  maintenanceMode: boolean;
  maintenanceTitle: string;
  maintenanceMessage: string;
  robotsTxt: string;
  sitemapUrl: string;
  geminiApiKey?: string;
  openaiApiKey?: string;
  preferredAiModel: 'gemini' | 'openai';
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}
