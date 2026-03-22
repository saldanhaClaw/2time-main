import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | 2timeweb',
  description: 'Privacy policy for 2timeweb services. How we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, GDPR, personal information',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: March 21, 2024</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-0">1. Introduction</h2>
              <p>
                2timeweb (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
              <p>We may collect personal information from you in various ways, including:</p>
              <ul>
                <li><strong>Contact Forms:</strong> Name, email address, company name, project details when you request a consultation.</li>
                <li><strong>Analytics:</strong> Usage data like IP address, browser type, pages visited (via Vercel Analytics).</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your experience. You can disable cookies in your browser settings.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send project updates and estimates</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>We do NOT sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">4. Data Storage & Security</h2>
              <p>
                Your data is stored on secure servers (Vercel, Neon) with industry-standard encryption. We implement appropriate technical and organizational measures to protect against unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">5. Third-Party Services</h2>
              <p>We use the following third-party services that may collect data:</p>
              <ul>
                <li><strong>Vercel:</strong> Hosting and analytics</li>
                <li><strong>Neon:</strong> Database hosting</li>
                <li><strong>Stripe:</strong> Payment processing (if applicable)</li>
                <li><strong>Resend:</strong> Email delivery</li>
              </ul>
              <p>These services have their own privacy policies. We encourage you to review them.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
              </ul>
              <p>To exercise these rights, contact us at privacy@2timeweb.com.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">7. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for individuals under 13. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page with a revised &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:<br />
                Email: privacy@2timeweb.com<br />
                Address: 123 Tech Street, San Francisco, CA 94105, USA
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
