import { supabase } from './supabase';

export const generateSitemap = async () => {
  try {
    // Buscar dados dinâmicos
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('id, title, date')
      .eq('status', 'Publicado')
      .order('date', { ascending: false });

    const { data: portfolio } = await supabase
      .from('portfolio_items')
      .select('id, title');

    const baseUrl = 'https://2timeweb.com.br'; // URL oficial do site
    const currentDate = new Date().toISOString();

    // Páginas principais do ecossistema
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
      { url: '/service/ecommerce', priority: '0.8', changefreq: 'monthly' },
    ];

    // Gerar XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Adicionar páginas principais
    corePages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Adicionar posts do blog
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        const slug = post.title.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }

    // Adicionar itens do portfólio
    if (portfolio && portfolio.length > 0) {
      portfolio.forEach(item => {
        const slug = item.title.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        sitemap += `
  <url>
    <loc>${baseUrl}/portfolio/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });
    }

    sitemap += `
</urlset>`;

    return sitemap;
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    return null;
  }
};

// Função para salvar sitemap no public
export const saveSitemap = async () => {
  const sitemapContent = await generateSitemap();
  if (!sitemapContent) return false;

  try {
    // Em produção, você salvaria isso no servidor
    // Por enquanto, vamos apenas retornar o conteúdo
    console.log('Sitemap gerado com sucesso!');
    
    // Criar um blob e fazer download (para desenvolvimento)
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar sitemap:', error);
    return false;
  }
};
