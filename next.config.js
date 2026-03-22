/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Geo targeting: prioritize US edge regions
  output: 'standalone',
  // Ensure headers for SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: 'unsafe-inline' 'unsafe-eval'"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  // i18n: default US English
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
}

module.exports = nextConfig
