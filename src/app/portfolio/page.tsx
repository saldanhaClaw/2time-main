import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Code2, Zap, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio | 2timeweb - Custom Software Projects',
  description: 'Explore our portfolio of custom SaaS, AI automation, and micro-SaaS projects. 100+ successful deliveries for startups and small businesses.',
  keywords: 'portfolio, saas portfolio, custom software projects, AI automation projects, micro saas examples',
}

const projects = [
  {
    slug: 'peptide-skin',
    title: 'Peptide Skin',
    category: 'E-commerce SaaS',
    description: 'A comprehensive skincare e-learning platform with course management, payment processing, and admin dashboard.',
    image: null,
    tech: ['Next.js', 'Stripe', 'Prisma', 'Neon', 'Tailwind'],
    highlights: ['$50K+ revenue', '500+ customers', '3-month launch'],
    href: '/portfolio/peptide-skin'
  },
  {
    slug: 'mounjaro-alert',
    title: 'Mounjaro Alert',
    category: 'Health SaaS',
    description: 'AI-powered medication tracking system that sends intelligent reminders and progress reports for weight management patients.',
    image: null,
    tech: ['Next.js', 'Gemini AI', 'Neon', 'Resend'],
    highlights: ['4.8/5 user rating', '10K+ alerts sent', '95% adherence'],
    href: '/portfolio/mounjaro-alert'
  },
  {
    slug: 'launchpad-ai-demo',
    title: 'Launchpad AI Demo',
    category: 'AI Tool',
    description: 'Interactive demo showcasing AI model capabilities with real-time chat interface and multi-model selection.',
    image: null,
    tech: ['Next.js', 'OpenAI API', 'Tailwind', 'GSAP'],
    highlights: ['5K+ demos', '20% conversion', '2-week build'],
    href: '/portfolio/launchpad-ai-demo'
  },
  {
    slug: 'adcopy-optimizer',
    title: 'AdCopy Optimizer',
    category: 'Marketing SaaS',
    description: 'AI-powered ad copy generator that creates high-converting Facebook and Google ads in seconds.',
    image: null,
    tech: ['Next.js', 'OpenAI', 'Auth.js', 'Neon'],
    highlights: ['10K+ copies', '3.2x CTR boost', 'Freemium model'],
    href: '/portfolio/adcopy-optimizer'
  },
  {
    slug: '30-30-30',
    title: '30-30-30 Challenge',
    category: 'Fitness SaaS',
    description: 'Complete fitness challenge platform with workout tracking, nutrition logging, and community features.',
    image: null,
    tech: ['Next.js', 'Stripe', 'Prisma', 'Neon', 'GSAP'],
    highlights: ['1,000+ users', '$12K MRR', 'iOS/Android apps'],
    href: '/portfolio/30-30-30'
  },
  {
    slug: 'botox-capilar',
    title: 'Botox Capilar',
    category: 'E-commerce',
    description: 'E-commerce platform for haircare products with subscription options and personalized recommendations.',
    image: null,
    tech: ['Next.js', 'Stripe', 'Neon', 'Tailwind'],
    highlights: ['200+ SKUs', 'Subscriptions', 'Brazil market'],
    href: '/portfolio/botox-capilar'
  }
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Real projects, real results. See how we&apos;ve helped startups and small businesses launch successful SaaS products and AI applications.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '100+', label: 'Projects Delivered' },
              { number: '4.9', label: 'Average Rating' },
              { number: '6 weeks', label: 'Typical MVP Timeline' },
              { number: '98%', label: 'On-Time Delivery' }
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.slug} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-primary-400" />
                </div>
                <div className="p-6">
                  <div className="text-primary-600 text-sm font-medium mb-2">{project.category}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">Key Results:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map(h => (
                        <span key={h} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={project.href}
                    className="inline-flex items-center gap-2 text-primary-600 font-medium group-hover:underline"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Success Story?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Let us help you transform your vision into a successful SaaS product. Book a free consultation today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
