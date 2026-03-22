import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap, Clock, Code2, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Micro-SaaS Development | Build in 6 Weeks - 2timeweb',
  description: 'Micro-SaaS development company specializing in rapid MVP delivery. Launch your SaaS faster with our 6-week guarantee. White-label options available.',
  keywords: 'micro saas development, micro saas company, build micro saas, micro saas MVP, SaaS development',
}

export default function MicroSaaSDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Micro-SaaS Development
              <span className="block text-primary-600 mt-2">Build in 6 Weeks</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Transform your micro-SaaS idea into a fully functional product in 6 weeks or less. Our streamlined development process delivers rapid MVPs without compromising quality.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our 6-Week Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From idea to launch in six focused weeks. Here&apos;s how we work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { week: 'Week 1-2', title: 'Discovery & Design', desc: 'Deep dive into your requirements, user personas, and create wireframes and UI mockups.' },
              { week: 'Week 3-4', title: 'Core Development', desc: 'Build the essential features using Next.js, Prisma, and Neon. Weekly demos keep you informed.' },
              { week: 'Week 5-6', title: 'Testing & Launch', desc: 'Rigorous QA, performance optimization, production deployment, and basic documentation.' }
            ].map((step, i) => (
              <div key={i} className="text-center p-6 border border-gray-200 rounded-xl">
                <div className="text-primary-600 font-bold mb-2">{step.week}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What&apos;s Included</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Responsive design (mobile + desktop)',
                'Authentication with Auth.js/NextAuth',
                'Database with Prisma + Neon',
                'Stripe payment integration',
                'API endpoints (REST or GraphQL)',
                'SEO optimization (meta tags, sitemap)',
                'Performance optimization (Core Web Vitals)',
                '1 month of post-launch support'
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-gray-600">Fixed-price packages for micro-SaaS MVPs</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">Simple micro-SaaS with core features</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $7,997
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Up to 3 main features</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Responsive design</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Stripe integration</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Basic analytics</li>
              </ul>
              <Link
                href="/contact?package=starter"
                className="block w-full text-center border-2 border-primary-600 text-primary-600 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                Get Started
              </Link>
            </div>

            <div className="border-2 border-primary-600 rounded-xl p-8 relative bg-primary-50">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600 mb-6">Advanced micro-SaaS with integrations</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $14,997
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Up to 6 main features</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-600" />Admin dashboard</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Advanced Stripe (subscriptions)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />API integrations (Zapier)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Priority support</li>
              </ul>
              <Link
                href="/contact?package=professional"
                className="block w-full text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Micro-SaaS?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Book a free 30-minute consultation. We&apos;ll discuss your idea and provide a detailed scope and quote.
          </p>
          <Link
            href="/contact?service=micro-saas"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition"
          >
            Book Your Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
