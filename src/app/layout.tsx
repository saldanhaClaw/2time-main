import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: '2timeweb - Custom Software & AI Automation Development',
  description: 'We build custom SaaS, AI automation, and micro-SaaS solutions for startups and small businesses. Deploy in 6 weeks. Free consultation.',
  keywords: 'custom software, SaaS development, AI automation, micro-SaaS, startup development, white-label SaaS',
  authors: [{ name: '2timeweb Team' }],
  openGraph: {
    title: '2timeweb - Transform Your Business with Custom Software',
    description: 'Expert custom software development, AI automation, and micro-SaaS solutions. Fast delivery, transparent pricing.',
    url: 'https://2timeweb.com',
    siteName: '2timeweb',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "2timeweb",
              "description": "Custom software development and AI automation services for startups and small businesses",
              "url": "https://2timeweb.com",
              "telephone": "+15512982976468",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+15512982976468",
                  "contactType": "customer service",
                  "areaServed": "US",
                  "availableLanguage": ["en"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+15512982976468",
                  "contactType": "sales",
                  "areaServed": "US",
                  "availableLanguage": ["en"]
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Tech Street",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "postalCode": "94105",
                "addressCountry": "US"
              },
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              },
              "priceRange": "$$$",
              "currenciesAccepted": "USD",
              "openingHours": "Mo-Fr 09:00-17:00",
              "sameAs": [
                "https://twitter.com/2timeweb",
                "https://linkedin.com/company/2timeweb"
              ]
            })
          }}
        />
        {/* Google Search Console */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
        {/* GA4 */}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');`
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-auto">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">2timeweb</h4>
              <p className="text-gray-400 text-sm">
                Custom software and AI automation for forward-thinking businesses.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/services/micro-saas-development" className="hover:text-white">Micro-SaaS Development</Link></li>
                <li><Link href="/services/ai-sdr-chatbot" className="hover:text-white">AI SDR Chatbot</Link></li>
                <li><Link href="/services/custom-saas-development" className="hover:text-white">Custom SaaS Development</Link></li>
                <li><Link href="/services/white-label-saas" className="hover:text-white">White-Label SaaS</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <div className="flex justify-center gap-6 mb-4">
              <Link href="sms:+15512982976468" className="inline-flex items-center gap-2 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                SMS
              </Link>
              <Link href="https://wa.me/15512982976468" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.438-.004 6.554-5.338 11.891-11.893 11.891-1.841-.001-3.568-.683-4.951-1.899l-6.345 1.64-2.833-2.834c1.791-.682 3.499-1.651 4.891-2.923.579-.53 1.072-1.169 1.432-1.877.403-.793.636-1.654.636-2.55 0-2.702-2.094-4.902-4.688-4.902-2.553 0-4.682 2.133-4.682 4.882 0 .536.105 1.048.29 1.515.151.381.363.731.62 1.037l3.395 3.298-1.415 1.414 4.374 4.374 2-2c.54.176 1.099.291 1.658.291 1.326 0 2.613-.577 3.538-1.613.362-.403.678-.874.909-1.361l2.492-7.826-7.825 2.492c-.488.231-.959.547-1.361.91-.87.833-1.484 1.873-1.613 3.202-.398 2.202.054 4.248 1.603 5.754 1.018 1.008 2.355 1.553 3.757 1.553 2.50 0 4.902-1.827 5.306-4.312l1.953-6.125-6.125 1.954c-1.257.399-2.287 1.158-2.853 2.132l-1.168 2.134z"/></svg>
                WhatsApp
              </Link>
              <Link href="mailto:contact@2timeweb.com" className="inline-flex items-center gap-2 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email
              </Link>
            </div>
            <p>© {new Date().getFullYear()} 2timeweb. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
