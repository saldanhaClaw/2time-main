import Link from 'next/link'
import { ArrowRight, BarChart3, Zap, Shield, Globe, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Business with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Custom Software
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              We build AI automation, micro-SaaS, and custom SaaS solutions for startups and small businesses. Deploy in weeks, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-gray-400 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition"
              >
                Read Our Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose 2timeweb?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">MVPs in 4-12 weeks using modern stack and proven process.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Data-Driven</h3>
              <p className="text-gray-600">Metrics and analytics guide every decision we make.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade security with 99.9% uptime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From AI automation to custom SaaS development, we have the expertise to bring your vision to life.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Micro-SaaS Development</h3>
              <p className="text-gray-600 mb-4">Build focused, profitable micro-SaaS products in weeks.</p>
              <Link href="/services/micro-saas" className="text-cyan-600 hover:underline font-medium">
                Learn more →
              </Link>
            </div>
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">AI Automation</h3>
              <p className="text-gray-600 mb-4">Automate repetitive tasks with intelligent AI agents.</p>
              <Link href="/services/ai-automation" className="text-cyan-600 hover:underline font-medium">
                Learn more →
              </Link>
            </div>
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Custom SaaS</h3>
              <p className="text-gray-600 mb-4">Full-featured SaaS platforms tailored to your business.</p>
              <Link href="/services/custom-saas" className="text-cyan-600 hover:underline font-medium">
                Learn more →
              </Link>
            </div>
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Technical SEO</h3>
              <p className="text-gray-600 mb-4">Optimize your site for search engines and conversions.</p>
              <Link href="/services/technical-seo" className="text-cyan-600 hover:underline font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Book a free consultation. We'll discuss your goals and how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-600 mb-2">50+</div>
              <p className="text-gray-600">Projects Delivered</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">12 Weeks</div>
              <p className="text-gray-600">Average MVP Timeline</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
