import { Metadata } from 'next';
import '../styles/glossario.css';

export const metadata: Metadata = {
  title: 'Glossário Técnico | 2timeweb - SEO & Desenvolvimento Web',
  description: 'Glossário completo de termos técnicos essenciais para desenvolvedores e empreendedores SaaS. SaaS, Micro-SaaS, AI Automation, CRM, WhatsApp API, SEO Técnico, Stripe, Neon, CI/CD.',
  keywords: 'glossário técnico, glossary, SaaS, Micro-SaaS, AI Automation, CRM, WhatsApp API, SEO técnico, Stripe, Neon, CI/CD, desenvolvimento web, 2timeweb',
  openGraph: {
    title: 'Glossário Técnico | 2timeweb',
    description: 'Domine os conceitos fundamentais de tecnologia e SaaS com nosso glossário completo. Definições claras, exemplos práticos e links para conteúdos relacionados.',
    url: 'https://2timeweb.com/glossario',
    siteName: '2timeweb',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GlossarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {children}
    </div>
  );
}