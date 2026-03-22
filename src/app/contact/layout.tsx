import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Get Free Consultation - 2timeweb',
  description: 'Get a free consultation for your SaaS project. We typically respond within 4 hours. Email, call, or text us.',
  keywords: 'contact 2timeweb, saas consultation, free project estimate, custom software quote',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
