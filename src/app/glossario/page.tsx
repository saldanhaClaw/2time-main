import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Glossary | 2timeweb - SEO & Web Development',
  description: 'Comprehensive glossary of technical terms for developers and SaaS entrepreneurs. SaaS, Micro-SaaS, AI Automation, CRM, Stripe, Neon, CI/CD.',
  keywords: 'technical glossary, SaaS, Micro-SaaS, AI Automation, CRM, Stripe, Neon, CI/CD, web development, 2timeweb',
  openGraph: {
    title: 'Technical Glossary | 2timeweb',
    description: 'Master fundamental technology and SaaS concepts with clear definitions, practical examples, and related resources.',
    url: 'https://2timeweb.com/glossario',
    siteName: '2timeweb',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const glossaryTerms = [
  {
    term: 'SaaS',
    definition: 'Software as a Service is a cloud-based software distribution model where applications are hosted remotely and accessed via the internet, eliminating local installation.',
    example: 'Tools like Google Workspace, Slack, and Notion are SaaS examples. You pay a monthly subscription and use the software directly in your browser.',
    relatedLinks: [
      { title: 'How to Scale a SaaS from Zero', url: '/blog/escalar-saas' },
      { title: 'SaaS Monetization: Subscription Models', url: '/blog/monetizacao-saas' },
    ],
    cardClass: 'card--saas',
  },
  {
    term: 'Micro-SaaS',
    definition: 'Micro-SaaS are small, niche-focused software products that solve very specific problems for a targeted market, operated by lean teams with minimal overhead.',
    example: 'A browser extension that automates LinkedIn follow-ups for recruiters, or a dashboard tracking specific e-commerce metrics.',
    relatedLinks: [
      { title: 'Building a Profitable Micro-SaaS', url: '/blog/micro-saas-rentavel' },
      { title: 'Lean SaaS Idea Validation', url: '/blog/validacao-saas' },
    ],
    cardClass: 'card--micro-saas',
  },
  {
    term: 'AI Automation',
    definition: 'AI Automation combines workflow automation with artificial intelligence capabilities (NLP, computer vision, generative models) to make intelligent decisions and adapt over time.',
    example: 'A system that automatically analyzes support tickets, classifies priority using NLP, and suggests responses based on historical data.',
    relatedLinks: [
      { title: 'Integrating AI into Workflows', url: '/blog/ai-workflows' },
      { title: 'Top AI Automation Tools in 2025', url: '/blog/firamentas-ai-automacao' },
    ],
    cardClass: 'card--ai-automation',
  },
  {
    term: 'CRM',
    definition: 'Customer Relationship Management platforms centralize customer data, interactions, and history to improve sales efficiency and customer support.',
    example: 'HubSpot, Salesforce, and Pipedrive enable lead tracking, opportunity conversion, and segmented email campaigns.',
    relatedLinks: [
      { title: 'Choosing the Right CRM for SaaS', url: '/blog/choose-crm-saas' },
      { title: 'Integrating CRM with Stripe & WhatsApp', url: '/blog/crm-integration' },
    ],
    cardClass: 'card--crm',
  },
  {
    term: 'WhatsApp API',
    definition: 'Official WhatsApp Business API enables programmatic sending/receiving of messages with verified delivery rates, media support, templates, and automations.',
    example: 'Order notifications, appointment reminders, and automated support via WhatsApp bot integrated with your backend.',
    relatedLinks: [
      { title: 'Setting Up WhatsApp API for Business', url: '/blog/whatsapp-api-setup' },
      { title: 'Marketing Automations with WhatsApp', url: '/blog/whatsapp-marketing' },
    ],
    cardClass: 'card--whatsapp-api',
  },
  {
    term: 'Technical SEO',
    definition: 'Technical SEO optimizes site structure (crawlability, indexing, speed, mobile-first, schema markup) to improve organic search rankings.',
    example: 'Optimizing Core Web Vitals, implementing Structured Data, fixing canonical tags, and improving URL architecture.',
    relatedLinks: [
      { title: 'Technical SEO Checklist 2025', url: '/blog/seo-tecnico-2025' },
      { title: 'Improving Core Web Vitals in Next.js', url: '/blog/core-web-vitals' },
    ],
    cardClass: 'card--seo',
  },
  {
    term: 'Stripe',
    definition: 'Global payments platform offering APIs for card processing, recurring billing, marketplaces, and subscription management.',
    example: 'Monthly subscriptions with Stripe Billing, one-time payments via Checkout, and split payments for marketplaces using Connect.',
    relatedLinks: [
      { title: 'Stripe Billing: Scalable Subscriptions', url: '/blog/stripe-billing' },
      { title: 'Stripe Webhooks & Security', url: '/blog/stripe-webhooks' },
    ],
    cardClass: 'card--stripe',
  },
  {
    term: 'Neon',
    definition: 'Serverless PostgreSQL with automatic branching per deploy and instant scaling, perfect for modern apps and small teams.',
    example: 'Using Neon with Prisma ORM in a Next.js app to get automatic staging environments per PR and zero-downtime migrations.',
    relatedLinks: [
      { title: 'Neon + Prisma: Complete Setup', url: '/blog/neon-prisma' },
      { title: 'Serverless PostgreSQL for Startups', url: '/blog/serverless-postgres' },
    ],
    cardClass: 'card--neon',
  },
  {
    term: 'CI/CD',
    definition: 'Continuous Integration and Continuous Delivery automate code building, testing, and deployment to ensure quality and frequent releases.',
    example: 'GitHub Actions pipeline that runs tests, builds, and deploys to Vercel on every push to main, with preview deployments for each PR.',
    relatedLinks: [
      { title: 'CI/CD with GitHub Actions', url: '/blog/github-actions-cicd' },
      { title: 'Automated Deploys on Vercel', url: '/blog/vercel-cicd' },
    ],
    cardClass: 'card--cicd',
  },
];

export default function GlossarioPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container py-12 text-center">
        <h1>Technical Glossary | 2timeweb</h1>
        <p>
          Master fundamental technology and SaaS concepts with clear definitions, practical examples, and resources to deepen your knowledge.
        </p>
      </header>

      {/* Bento Grid */}
      <main className="container">
        <div className="bento-grid">
          {glossaryTerms.map((item, index) => (
            <article key={index} className={`card ${item.cardClass}`}>
              <h2>{item.term}</h2>
              <p>{item.definition}</p>
              <div>
                <h3>Practical Example</h3>
                <div className="example-box">
                  &ldquo;{item.example}&rdquo;
                </div>
              </div>
              <div>
                <h3>Learn More</h3>
                <ul>
                  {item.relatedLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.url}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="container">
        <p>© {new Date().getFullYear()} 2timeweb. Specialists in Technical SEO & Web Development.</p>
        <p>
          <a href="/">← Back to Home</a>
        </p>
      </footer>
    </div>
  );
}
