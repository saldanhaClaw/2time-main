import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap, Shield, Clock, Code2, Bot, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-primary-50 py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Business with{' '}
              <span className="text-primary-600">Custom Software & AI Automation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              We build micro-SaaS, AI chatbots, and custom applications that help startups and small businesses scale. Get a free consultation and project estimate within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition"
              >
                View Our Work
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>6-Week MVP Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>100+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Free Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white" id="services">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized development services tailored for startups and small businesses. We combine cutting-edge technology with practical business solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Bot,
                title: 'AI SDR Chatbot',
                description: '24/7 AI-powered sales development chatbot that qualifies leads and syncs with your CRM.',
                href: '/services/ai-sdr-chatbot'
              },
              {
                icon: Code2,
                title: 'Micro-SaaS Development',
                description: 'Build a focused SaaS product quickly. Launch your MVP in 6 weeks with our streamlined process.',
                href: '/services/micro-saas-development'
              },
              {
                icon: Zap,
                title: 'Custom SaaS Development',
                description: 'Full-featured custom software solutions for startups. Scalable architecture from day one.',
                href: '/services/custom-saas-development'
              },
              {
                icon: Shield,
                title: 'White-Label SaaS',
                description: 'Resell custom software as your own. Build a $10K/mrr business with our white-label partnership.',
                href: '/services/white-label-saas'
              }
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-primary-200 transition"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition">
                  <service.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-primary-600 font-medium group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose 2timeweb?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                title: 'Fast Delivery',
                description: 'Most projects delivered in 4-6 weeks. We use proven processes and modern tools to accelerate development without sacrificing quality.'
              },
              {
                icon: BarChart3,
                title: 'Scalable Architecture',
                description: 'Built on Next.js, Prisma, and Neon. Your application will handle growth from 100 to 100,000 users without rewrites.'
              },
              {
                icon: Shield,
                title: 'Transparent Pricing',
                description: 'Fixed-price quotes with no hidden costs. You know exactly what you&apos;ll pay before we start. No surprise invoices.'
              }
            ].map((benefit) => (
              <div key={benefit.title} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white" id="portfolio">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              A selection of our recent work across various industries and technologies.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
            >
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Peptide Skin',
                category: 'E-commerce SaaS',
                description: 'Full-stack skincare e-learning platform with Stripe payments and admin dashboard.',
                tech: ['Next.js', 'Stripe', 'Prisma', 'Neon']
              },
              {
                title: 'Mounjaro Alert',
                category: 'Health SaaS',
                description: 'AI-powered medication tracking and notification system for weight management.',
                tech: ['Next.js', 'Gemini AI', 'Neon']
              },
              {
                title: 'Launchpad AI Demo',
                category: 'AI Tool',
                description: 'Interactive AI demo showcase with real-time chat and model selection.',
                tech: ['Next.js', 'OpenAI', 'Tailwind']
              }
            ].map((project) => (
              <div key={project.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-primary-400" />
                </div>
                <div className="text-sm text-primary-600 font-medium mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your SaaS?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Book a free consultation today. We&apos;ll discuss your project and provide a detailed estimate within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Get Your Free Estimate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO, HealthTech Startup',
                content: '2timeweb delivered our AI chatbot in 3 weeks. It now handles 40% of our lead qualification automatically. Game changer.',
              },
              {
                name: 'Michael Chen',
                role: 'Founder, FinTech SaaS',
                content: 'The micro-SaaS they built for us is generating $15K MRR after 4 months. Professional team, great communication.',
              },
              {
                name: 'Emily Rodriguez',
                role: 'CTO, EdTech Company',
                content: 'Their development speed is incredible. They built our custom LMS in 6 weeks while we focused on content. Highly recommended.',
              }
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-1 mb-4 text-yellow-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
