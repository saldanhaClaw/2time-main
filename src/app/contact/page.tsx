'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      service: formData.get('service'),
      budget: formData.get('budget'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Let&apos;s Build Something Great
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Book a free 30-minute consultation or send us a message. We typically respond within 4 hours during business days.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                  >
                    <option value="">Select a service</option>
                    <option value="Micro-SaaS Development">Micro-SaaS Development</option>
                    <option value="AI SDR Chatbot">AI SDR Chatbot</option>
                    <option value="Custom SaaS Development">Custom SaaS Development</option>
                    <option value="White-Label Partnership">White-Label Partnership</option>
                    <option value="Other">Other / Not Sure Yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="$5k-10k">$5,000 - $10,000</option>
                    <option value="$10k-25k">$10,000 - $25,000</option>
                    <option value="$25k-50k">$25,000 - $50,000</option>
                    <option value="$50k+">$50,000+</option>
                    <option value="undecided">Undecided / Exploring</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What are you looking to build? What problem does it solve? Target launch date?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 text-center">Message sent! We&apos;ll reply within 4 hours.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-center">Failed to send. Please try again or email us directly.</p>
                )}

                <p className="text-sm text-gray-500 text-center">
                  By submitting, you agree to our Privacy Policy. We never spam.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">contact@2timeweb.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone / SMS</h3>
                    <p className="text-gray-600">
                      <a href="tel:+15512982976468" className="text-primary-600 hover:underline">+1 (551) 298-297-6468</a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Call or text, Mon-Fri 9AM-5PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <p className="text-gray-600">
                      <a href="https://wa.me/15512982976468" className="text-primary-600 hover:underline">+1 (551) 298-297-6468</a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Fast response, same hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Tech Street<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM PST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-xl">
                <h3 className="font-semibold text-green-900 mb-2">Free Consultation</h3>
                <p className="text-green-800 text-sm mb-4">
                  Not sure where to start? Book a free 30-minute consultation. We&apos;ll discuss your project and provide guidance at no cost.
                </p>
                <a
                  href="https://calendly.com/2timeweb/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
