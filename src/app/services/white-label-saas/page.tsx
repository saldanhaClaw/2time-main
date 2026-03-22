import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Zap, BarChart3, Users, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'White-Label SaaS Development - Partner Program - 2timeweb',
  description: 'White-label SaaS development for agencies. Resell custom software as your own. Build a $10K/MRR business. Commission model. Start today.',
  keywords: 'white label saas, white-label development, saas partner program, resell saas, agency saas',
}

export default function WhiteLabelSaaSPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              White-Label SaaS
              <span className="block text-primary-600 mt-2">Partner Program</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Resell custom software as your own. Build a $10K/MRR business with our white-label development services. We handle the tech, you handle the client relationships.
            </p>
            <Link
              href="/contact?partner=true"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
            >
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Partnership Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, high-margin model that lets you focus on sales while we handle delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: 'You Sell',
                desc: 'Present the solution to your clients under your brand. Set your own prices. You own the customer relationship.'
              },
              {
                icon: Zap,
                title: 'We Build',
                desc: 'We develop the software using our proven process. White-label delivery means your clients never see us.'
              },
              {
                icon: Shield,
                title: 'You Keep 70%',
                desc: 'You set your own pricing and keep 70% of the revenue. Typical partner margins: $7,000 on a $10K project.'
              }
            ].map(step => (
              <div key={step.title} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can sell */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">White-Label Products Available</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'AI SDR Chatbot', price: '$3,000 - $10,000', margin: '$2,100 - $7,000' },
              { name: 'Micro-SaaS MVP', price: '$8,000 - $20,000', margin: '$5,600 - $14,000' },
              { name: 'Custom Dashboard', price: '$5,000 - $15,000', margin: '$3,500 - $10,500' },
              { name: 'Stripe Integration', price: '$2,000 - $6,000', margin: '$1,400 - $4,200' },
              { name: 'E-commerce Platform', price: '$10,000 - $25,000', margin: '$7,000 - $17,500' },
              { name: 'Custom API Integration', price: '$3,000 - $8,000', margin: '$2,100 - $5,600' }
            ].map(product => (
              <div key={product.name} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="mb-1">
                  <span className="text-gray-600 text-sm">Client Price: </span>
                  <span className="font-bold text-gray-900">{product.price}</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Your Margin: </span>
                  <span className="font-bold text-green-600">{product.margin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Join Our Partner Program</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: 'High Margins',
                  desc: 'Keep 70% of project revenue. Typical partner earns $7,000+ profit per project.'
                },
                {
                  icon: Zap,
                  title: 'Fast Turnaround',
                  desc: 'We deliver in 2-6 weeks. You can meet client deadlines and maintain reputation.'
                },
                {
                  icon: CheckCircle,
                  title: 'Quality Guaranteed',
                  desc: 'All projects include 1-month warranty. We handle bugs, you get the credit.'
                },
                {
                  icon: Users,
                  title: 'No Hiring Required',
                  desc: 'No need to hire developers. We are your tech team. Scale without overhead.'
                },
                {
                  icon: Shield,
                  title: 'Brand Control',
                  desc: 'All code and communication white-labeled. Your brand, your clients.'
                },
                {
                  icon: DollarSign,
                  title: 'Recurring Revenue',
                  desc: 'Offer maintenance plans for ongoing monthly income. 20% discount for partners.'
                }
              ].map(benefit => (
                <div key={benefit.title} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get Started in 3 Steps</h2>
            <div className="space-y-6">
              {[
                { title: 'Apply to Partner Program', desc: 'Fill out the application form. We review within 24 hours.' },
                { title: 'Sign Partner Agreement', desc: 'Simple agreement outlining commission structure and terms.' },
                { title: 'Start Selling', desc: 'Access partner portal, pricing matrix, and begin referring clients.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build a 6-Figure Agency?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Join our white-label partner program and start selling custom software under your brand. No development team required.
          </p>
          <Link
            href="/contact?partner=true"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
