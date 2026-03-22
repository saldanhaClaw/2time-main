import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Bot, MessageSquare, Zap, BarChart3, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI SDR Chatbot for Website | Deploy in 2 Weeks - 2timeweb',
  description: 'AI SDR chatbot for website that qualifies leads 24/7. Custom GPT-4 integration, CRM sync, and human handoff. Deploy in 2 weeks.',
  keywords: 'ai sdr chatbot, ai chatbot for website, sales development chatbot, lead qualification chatbot, AI SDR',
}

export default function AISDRChatbotPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI SDR Chatbot
              <span className="block text-primary-600 mt-2">Qualify Leads 24/7</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Deploy an intelligent AI chatbot on your website that engages visitors, qualifies leads, and syncs with your CRM. Get it live in as little as 2 weeks.
            </p>
            <Link
              href="/contact?service=ai-chatbot"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-lg"
            >
              Get AI Chatbot Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our AI Chatbot Does</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              More than just a FAQ bot. Our AI SDR chatbot actively engages visitors and converts them into qualified leads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Bot,
                title: 'GPT-4 Powered',
                desc: 'Uses latest GPT-4 model for natural, context-aware conversations that feel human.'
              },
              {
                icon: MessageSquare,
                title: 'Lead Qualification',
                desc: 'Automatically asks qualifying questions and scores leads based on your criteria.'
              },
              {
                icon: Zap,
                title: 'CRM Sync',
                desc: 'Seamlessly adds qualified leads to your CRM (HubSpot, Salesforce, Pipedrive) in real-time.'
              },
              {
                icon: Clock,
                title: '24/7 Engagement',
                desc: 'Never miss a lead. Your AI works around the clock, even when your team is offline.'
              },
              {
                icon: BarChart3,
                title: 'Analytics Dashboard',
                desc: 'Track conversations, conversion rates, and lead quality with our analytics panel.'
              },
              {
                icon: CheckCircle,
                title: 'Human Handoff',
                desc: 'Automatically escalates high-intent leads to your sales team via Slack/email.'
              }
            ].map(feature => (
              <div key={feature.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
            <p className="text-gray-600">Connects with your existing tools</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {['HubSpot', 'Salesforce', 'Pipedrive', 'Slack', 'Mailchimp', 'Zapier'].map(tool => (
              <div key={tool} className="px-6 py-4 bg-white border border-gray-200 rounded-lg font-semibold text-gray-700">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Deployment Process</h2>
            <div className="space-y-6">
              {[
                { title: 'Discovery Call', desc: 'We learn about your business, ICP, and qualify criteria.' },
                { title: 'Bot Design', desc: 'We craft conversation flows and train the AI on your knowledge base.' },
                { title: 'Integration Setup', desc: 'Connect to your website, CRM, and notification systems.' },
                { title: 'Testing', desc: 'Test conversations with real scenarios, refine responses.' },
                { title: 'Launch', desc: 'Deploy to your website and train your team on management.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
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
      <section className="py-20 bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Automate Lead Qualification?</h2>
          <p className="text-primary-100 mb-10 max-w-2xl mx-auto">
            Book a demo and see how our AI SDR chatbot can transform your lead generation. Deployment in as little as 2 weeks.
          </p>
          <Link
            href="/contact?service=ai-chatbot"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Schedule a Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
