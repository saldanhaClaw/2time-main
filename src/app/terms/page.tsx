import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | 2timeweb',
  description: 'Terms of service for 2timeweb development services. Client agreements, payment terms, and service obligations.',
  keywords: 'terms of service, client agreement, development terms',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: March 21, 2024</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-0">1. Agreement Overview</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of 2timeweb&apos;s development services (&quot;Services&quot;). By engaging us for a project, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">2. Services</h2>
              <p>
                We provide custom software development services, including but not limited to:
              </p>
              <ul>
                <li>Web application development</li>
                <li>AI automation implementation</li>
                <li>Micro-SaaS MVP development</li>
                <li>Consulting and technical advisory</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">3. Project Proposals & Pricing</h2>
              <p>
                Each project begins with a detailed proposal outlining:
              </p>
              <ul>
                <li>Scope of work and deliverables</li>
                <li>Timeline and milestones</li>
                <li>Fixed price or hourly rate</li>
                <li>Payment schedule</li>
              </ul>
              <p>
                Prices are in USD. A 50% deposit is typically required to begin work, with the remainder due upon project completion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">4. Client Responsibilities</h2>
              <p>To ensure project success, clients agree to:</p>
              <ul>
                <li>Provide complete requirements and specifications</li>
                <li>Designate a single point of contact for decisions</li>
                <li>Review deliverables and provide feedback within 5 business days</li>
                <li>Provide necessary content (text, images, data) in a timely manner</li>
                <li>Pay invoices according to the agreed schedule</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">5. Intellectual Property</h2>
              <p>
                Upon full payment, you own all delivered code and content created specifically for your project. However:
              </p>
              <ul>
                <li>We retain the right to reuse generic components, patterns, and tools developed for your project in future work for other clients.</li>
                <li>We may showcase your project in our portfolio (with your permission). You can opt-out in writing.</li>
                <li>Third-party libraries and open-source components remain under their respective licenses.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">6. Warranty & Support</h2>
              <p>
                We provide a 30-day warranty period after delivery during which we fix any bugs or defects at no additional cost. This excludes:
              </p>
              <ul>
                <li>Changes to requirements outside the original scope</li>
                <li>Issues caused by client modifications</li>
                <li>Third-party service outages</li>
              </ul>
              <p>
                Ongoing maintenance and support are available under a separate maintenance agreement (typically 20% of project cost annually).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">7. Confidentiality</h2>
              <p>
                Both parties agree to maintain confidentiality of proprietary information. We sign NDAs upon request. Your business information is safe with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">8. Limitation of Liability</h2>
              <p>
                Our liability is limited to the total project fees paid. We are not liable for indirect, incidental, or consequential damages. We do not guarantee specific business results (e.g., revenue, user growth) as these depend on many factors outside our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">9. Termination</h2>
              <p>
                Either party may terminate the agreement with written notice:
              </p>
              <ul>
                <li>If the other party breaches any material term and fails to cure within 10 days of notice</li>
                <li>Upon mutual agreement</li>
              </ul>
              <p>
                Upon termination, you will pay for all work completed to date at the agreed rate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco County.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">11. Contact</h2>
              <p>
                Questions about these Terms? Contact us at legal@2timeweb.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
