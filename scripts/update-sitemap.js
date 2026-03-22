import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://bqxeivsnqmbfdrbxkjwj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxeGVpdnNucW1iZmRyYnhrandqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1Nzc5MDQsImV4cCI6MjA4MjE1MzkwNH0.u1rPFSgoV4fsKWWvMMjVTH3bliM9OX3QIenvJ1S6aC0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const slugify = (text) => text
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

async function run() {
  console.log('Fetching data from Supabase...');
  const { data: posts, error: postsError } = await supabase
    .from('blog_posts')
    .select('title, date')
    .eq('status', 'Publicado');

  const { data: portfolio, error: portError } = await supabase
    .from('portfolio_items')
    .select('title');

  if (postsError || portError) {
    console.error('Error fetching data:', postsError || portError);
    process.exit(1);
  }

  const baseUrl = 'https://2timeweb.com.br';
  const currentDate = new Date().toISOString();

  const corePages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/portfolio', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/lancamentos', priority: '0.9', changefreq: 'weekly' },
    { url: '/service/seo', priority: '0.8', changefreq: 'monthly' },
    { url: '/service/paginas', priority: '0.8', changefreq: 'monthly' },
    { url: '/service/assessoria', priority: '0.8', changefreq: 'monthly' },
    { url: '/service/trafego', priority: '0.8', changefreq: 'monthly' },
    { url: '/service/atendimento-ia', priority: '0.8', changefreq: 'monthly' },
    { url: '/service/processos', priority: '0.8', changefreq: 'monthly' },
    { url: '/service/sistemas', priority: '0.8', changefreq: 'monthly' },
    { url: '/service/ecommerce', priority: '0.8', changefreq: 'monthly' }
  ];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Core Pages
  corePages.forEach(p => {
    sitemap += `
  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
  });

  // Blog Posts
  if (posts) {
    posts.forEach(p => {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${slugify(p.title)}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
  }

  // Portfolio Items
  if (portfolio) {
    portfolio.forEach(p => {
      sitemap += `
  <url>
    <loc>${baseUrl}/portfolio/${slugify(p.title)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });
  }

  sitemap += '\n</urlset>';

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap.xml updated successfully in /public!');
}

run();
