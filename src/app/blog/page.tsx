import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | 2timeweb - SaaS Development Insights',
  description: 'Expert articles on custom software development, AI automation, micro-SaaS, and startup tech strategy.',
  keywords: 'blog, saas development blog, AI automation articles, micro-saas, startup tech',
}

const blogPosts = [
  {
    slug: 'build-micro-saas-in-6-weeks-2024',
    title: 'Build My SaaS in 6 Weeks: 2024 Proven Method',
    date: '2024-03-15',
    excerpt: 'Step-by-step guide to launching a micro-SaaS MVP in 6 weeks. Includes tech stack recommendations, budget planning, and common pitfalls to avoid.',
    category: 'Micro-SaaS',
    readTime: '12 min read'
  },
  {
    slug: 'ai-automation-agency-small-business',
    title: 'AI Automation for Small Business: Complete Guide',
    date: '2024-03-10',
    excerpt: 'How small businesses can implement AI automation to save 20+ hours per week. Real-world examples, ROI calculations, and implementation roadmap.',
    category: 'AI Automation',
    readTime: '15 min read'
  },
  {
    slug: 'white-label-saas-10k-mrr',
    title: 'White-Label SaaS: How to Build a $10K/MRR Business',
    date: '2024-03-05',
    excerpt: 'The white-label SaaS business model explained. How agencies and consultants can earn recurring revenue without writing code.',
    category: 'Business',
    readTime: '10 min read'
  },
  {
    slug: 'when-hire-agency-vs-inhouse',
    title: 'When to Hire an Agency vs In-House Developers',
    date: '2024-02-28',
    excerpt: 'Cost-benefit analysis of outsourcing vs hiring. Learn which approach makes sense for different stages of startup growth.',
    category: 'Startup',
    readTime: '8 min read'
  },
  {
    slug: 'micro-saas-vs-full-saas',
    title: 'Micro-SaaS vs Full SaaS: Which Builds Faster?',
    date: '2024-02-20',
    excerpt: 'Compare development timelines, revenue potential, and maintenance overhead. Discover which model aligns with your goals.',
    category: 'Micro-SaaS',
    readTime: '9 min read'
  },
  {
    slug: 'custom-vs-off-the-shelf',
    title: 'Custom vs Off-the-Shelf: Making the Right Choice',
    date: '2024-02-15',
    excerpt: 'When should you build custom software? When should you use existing tools? A decision framework for small businesses.',
    category: 'Strategy',
    readTime: '11 min read'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              2timeweb Blog
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Insights on SaaS development, AI automation, and startup engineering best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4 text-lg">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:underline"
                >
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
