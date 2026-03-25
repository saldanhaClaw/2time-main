import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_6CuNlkeVUrD9@ep-cool-morning-ac6lqq9i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require');

async function seed() {
  console.log('🌱 Seeding Neon Database...');

  // 1. Seed Blog Posts
  await sql`
    INSERT INTO blog_posts (title, content, author, status, featured_image)
    VALUES 
    (
      'Como a Automação Dobra o Fechamento de Vendas em 30 Dias', 
      'Se você ainda perde leads porque sua equipe de vendas demora para responder no WhatsApp, você está deixando dinheiro na mesa. Nossos sistemas integram CRMs diretamente ao fluxo de WhatsApp e Meta Ads.', 
      'Equipe 2TimeWeb', 
      'Publicado', 
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
    ),
    (
      'Desenvolvimento Sob Medida vs Soluções de Prateleira', 
      'Por que grandes players abandonam plataformas limitadas e optam por ecossistemas sob medida? A resposta está na escalabilidade infinita de arquiteturas Serverless como a que utilizamos na 2TimeWeb.', 
      'Gabriel Moraes', 
      'Publicado', 
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070'
    ),
    (
      'O Segredo do SEO B2B para Consultorias e Clínicas', 
      'Tráfego pago traz resultados rápidos, mas o SEO é o patrimônio digital mais valioso a longo prazo. Veja como estruturamos o blog SEO do Grupo Trido para dominar o nicho.', 
      'Equipe 2TimeWeb', 
      'Publicado', 
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015'
    )
  `;
  console.log('✅ Blog posts seeded!');

  // 2. Seed Portfolio
  await sql`
    INSERT INTO portfolio_items (id, title, category, description, image, link)
    VALUES 
    ('port1', 'Site W-tech Brasil', 'SITES', 'Sistema de Site Integrado com cursos e agendas', 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800', '#'),
    ('port2', 'Blog SEO Grupo Trido', 'SEO', 'Publicações com Redatora profissional', 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800', '#'),
    ('port3', 'Portal do Franqueado E-Lance', 'SISTEMAS', 'Sistema para o Franqueado E-Lance', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', '#'),
    ('port4', 'Sistema Imobiliária Automação', 'SISTEMAS', 'Automação completa para gestão de imóveis', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800', '#'),
    ('port5', 'Automação Kiwify e Vendas', 'AUTOMAÇÕES', 'Integração avançada Kiwify para aceleração de conversão', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', '#'),
    ('port6', 'Controle Hospedagem - Resort', 'SISTEMAS', 'Dashboard de gestão para hotelaria', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800', '#'),
    ('port7', 'Nacional Hidro', 'SITES', 'Hidrojateamento de Alta Pressão e Saneamento 24h', 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800', '#'),
    ('port8', 'Escola de Leilões', 'SITES', 'Lançamento de Cursos online e Presidencial', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800', '#'),
    ('port9', 'Loja Online Wtech Store', 'SITES', 'E-commerce de altíssima conversão', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800', '#')
    ON CONFLICT (id) DO UPDATE SET 
      title = EXCLUDED.title, 
      category = EXCLUDED.category,
      description = EXCLUDED.description;
  `;
  console.log('✅ Portfolio seeded!');

  console.log('🎉 Seeding Complete!');
}

seed().catch(console.error);
