import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Code2, Zap, Shield, BarChart3, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Custom SaaS Development for Startups | Full-Stack Experts - 2timeweb',
  description: 'Custom software development for startups. Full-stack development with Next.js, Prisma, Stripe. 100+ projects delivered. Free consultation.',
  keywords: 'custom saas development, custom software development, startup development, hire saas developers, SaaS development agency',
}

export default function CustomSaaSDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Custom SaaS Development
              <span className="block text-primary-600 mt-2">for Startups & Innovators</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Transform your vision into a production-ready SaaS application. We specialize in scalable architecture, Stripe integration, and rapid delivery for startups.
            </p>
            <Link
              href="/contact?service=custom-saas"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Tech Stack</h2>
            <p className="text-gray-600">Modern, proven technologies for scalable SaaS</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Next.js 14', type: 'Framework' },
              { name: 'React', type: 'Library' },
              { name: 'TypeScript', type: 'Language' },
              { name: 'Prisma ORM', type: 'Database' },
              { name: 'Neon PostgreSQL', type: 'Database' },
              { name: 'Stripe', type: 'Payments' },
              { name: 'Tailwind CSS', type: 'Styling' },
              { name: 'GSAP', type: 'Animations' },
              { name: 'Vercel', type: 'Hosting' }
            ].map(tech => (
              <div key={tech.name} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="font-semibold text-gray-900">{tech.name}</div>
                <div className="text-sm text-gray-600">{tech.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Build</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Code2,
                  title: 'Web Applications',
                  desc: 'Full-stack web apps with responsive UIs, REST/GraphQL APIs, and real-time features.'
                },
                {
                  icon: Zap,
                  title: 'SaaS Platforms',
                  desc: 'Multi-tenant SaaS applications with subscription billing, user management, and usage tracking.'
                },
                {
                  icon: Shield,
                  title: 'Admin Dashboards',
                  desc: 'Powerful admin panels with data visualization, reporting, and content management.'
                },
                {
                  icon: BarChart3,
                  title: 'Analytics & Reporting',
                  desc: 'Custom analytics pipelines and dashboards tailored to your business KPIs.'
                },
                {
                  icon: Users,
                  title: 'Collaboration Tools',
                  desc: 'Team collaboration features with real-time updates, notifications, and file sharing.'
                },
                {
                  icon: CheckCircle,
                  title: 'API Integrations',
                  desc: 'Seamless integration with third-party APIs (Stripe, Stripe Connect, Twilio, SendGrid, etc.).'
                }
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Work</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                title: 'Discovery & Planning',
                desc: 'We start with a deep dive into your business goals, target users, and technical requirements. You get a detailed project plan with milestones and fixed price.'
              },
              {
                title: 'Design & Prototyping',
                desc: 'Our designer creates wireframes and interactive prototypes using 21st.dev-inspired patterns. You approve before development begins.'
              },
              {
                title: 'Agile Development',
                desc: '2-week sprints with weekly demos. We use GitHub for version control and keep you in the loop throughout.'
              },
              {
                title: 'Testing & QA',
                desc: 'Rigorous testing across devices and browsers. Performance optimization to hit Lighthouse scores >90.'
              },
              {
                title: 'Deployment & Support',
                desc: 'Production deployment on Vercel or your preferred host. 1 month of bug fixes included. Ongoing support options available.'
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Startups Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                '5+ years of SaaS development experience',
                '100+ successful projects delivered',
                'Transparent fixed pricing, no surprises',
                'Fast delivery: 4-8 weeks typical',
                'Senior developers only (no juniors)',
                'Stripe and payment integration experts',
                'Post-launch support and maintenance',
                'Free 30-minute consultation'
              ].map(item => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your SaaS?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Book a free consultation today. We&apos;ll discuss your vision and provide a detailed scope and quote within 48 hours.
          </p>
          <Link
            href="/contact?service=custom-saas"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
          >
            Get Your Free Estimate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
