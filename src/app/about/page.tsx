import type { Metadata } from 'next'
import { Users, Zap, Shield, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About 2timeweb | Custom Software & AI Automation Agency',
  description: '2timeweb is a custom software development agency specializing in micro-SaaS, AI automation, and full-stack development for startups. 100+ projects delivered.',
  keywords: 'about 2timeweb, our team, custom software agency, SaaS development company',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About 2timeweb
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              We are a team of senior full-stack engineers dedicated to helping startups and small businesses build successful SaaS products.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8">
              To empower startups and small businesses with high-quality, scalable software that drives growth and competitive advantage.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2020, 2timeweb has grown from a solo developer to a team of 12 senior engineers. We&apos;ve delivered over 100 projects ranging from micro-SaaS MVPs to enterprise-grade AI automation systems. Our clients include seed-stage startups, established SaaS companies, and agencies looking to expand their service offerings.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Speed Without Compromise',
                desc: 'We deliver in 4-6 weeks using modern tools and proven processes. Quality is never sacrificed for speed.'
              },
              {
                icon: Shield,
                title: 'Transparency',
                desc: 'Fixed pricing, clear communication, and honest timelines. No surprises, no hidden costs.'
              },
              {
                icon: Users,
                title: 'Partnership',
                desc: 'We treat every client as a partner. Your success is our success. We provide honest advice even when it means recommending a different approach.'
              },
              {
                icon: Award,
                title: 'Excellence',
                desc: 'We write clean, maintainable code. We follow best practices. We care about details.'
              }
            ].map(value => (
              <div key={value.title} className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Vinicius Saldanha',
                role: 'Founder & Lead Architect',
                bio: 'Full-stack engineer with 10+ years of experience. Previously led engineering teams at tech startups. Specializes in Next.js, Prisma, and SaaS architecture.'
              },
              {
                name: 'Daniel Saldanha',
                role: 'Operations & Strategy',
                bio: 'Operations expert with background in scaling SaaS businesses. Focuses on client success, process optimization, and strategic partnerships.'
              }
            ].map(member => (
              <div key={member.name} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { number: '100+', label: 'Projects Delivered' },
              { number: '4.9/5', label: 'Client Rating' },
              { number: '6 weeks', label: 'Avg MVP Timeline' },
              { number: '98%', label: 'On-Time Delivery' }
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
