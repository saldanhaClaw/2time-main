import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://2timeweb.com'

  const urls = [
    baseUrl,
    `${baseUrl}/services`,
    `${baseUrl}/services/micro-saas-development`,
    `${baseUrl}/services/ai-sdr-chatbot`,
    `${baseUrl}/services/custom-saas-development`,
    `${baseUrl}/services/white-label-saas`,
    `${baseUrl}/portfolio`,
    `${baseUrl}/blog`,
    `${baseUrl}/contact`,
    `${baseUrl}/about`,
    `${baseUrl}/privacy`,
    `${baseUrl}/terms`,
    `${baseUrl}/blog/build-micro-saas-in-6-weeks-2024`,
    `${baseUrl}/blog/ai-automation-agency-small-business`,
    `${baseUrl}/blog/white-label-saas-10k-mrr`,
  ]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
