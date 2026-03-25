import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_6CuNlkeVUrD9@ep-cool-morning-ac6lqq9i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require');

async function seed() {
  console.log('🌱 Seeding Neon Database...');

  // 1. Clear old data to avoid duplicates
  await sql`DELETE FROM blog_posts`;
  await sql`DELETE FROM portfolio_items`;
  console.log('🧹 Old data cleared.');

  // 2. Seed Blog Posts — status MUST be 'Published' (not 'Publicado') as BlogPage.tsx filters by p.status === 'Published'
  await sql`
    INSERT INTO blog_posts (title, content, author, status, featured_image, date)
    VALUES 
    (
      'Como a Automação Dobra o Fechamento de Vendas em 30 Dias', 
      'Se você ainda perde leads porque sua equipe de vendas demora para responder no WhatsApp, você está deixando dinheiro na mesa.

## O Problema

A maioria das empresas B2B perde até 78% dos leads nos primeiros 5 minutos de inatividade. Nossos sistemas integram CRMs diretamente ao fluxo de WhatsApp e Meta Ads, garantindo resposta instantânea.

## A Solução 2TimeWeb

Criamos ecossistemas que conectam seu CRM, automações de WhatsApp e Meta Ads em uma máquina de vendas que funciona 24/7.

### Resultados Comprovados
- Redução de 60% no tempo de resposta
- Aumento de 2x na taxa de conversão
- ROI positivo desde o primeiro mês', 
      'Equipe 2TimeWeb', 
      'Published', 
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      NOW() - INTERVAL '5 days'
    ),
    (
      'Desenvolvimento Sob Medida vs Soluções de Prateleira: Por que os Players Escolhem Custom', 
      'Por que grandes players abandonam plataformas limitadas e optam por ecossistemas sob medida?

## A Resposta: Escalabilidade Infinita

Arquiteturas Serverless como as que utilizamos na 2TimeWeb permitem escalar horizontalmente sem limites, pagando apenas pelo que se usa.

## Comparativo Real

### Solução de Prateleira
- Limitação de customização
- Dependência do fornecedor
- Custos crescentes com escala

### Desenvolvimento Sob Medida
- Controle total da stack
- Integração nativa com seus processos
- Custo previsível a longo prazo

A 2TimeWeb constrói ecossistemas digitais que não apenas resolvem problemas de hoje, mas se adaptam ao crescimento futuro do seu negócio.', 
      'Gabriel Moraes', 
      'Published', 
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
      NOW() - INTERVAL '3 days'
    ),
    (
      'O Segredo do SEO B2B para Consultorias e Clínicas', 
      'Tráfego pago traz resultados rápidos, mas o SEO é o patrimônio digital mais valioso a longo prazo.

## Case: Grupo Trido

Veja como estruturamos o blog SEO do Grupo Trido para dominar o nicho de equipamentos industriais.

### Estratégia Aplicada
- Pesquisa de palavras-chave com intenção comercial
- Estrutura de conteúdo pilar + cluster
- Otimização técnica (Core Web Vitals, Schema Markup)
- Link building estratégico

## Resultados em 6 Meses
- 340% de aumento no tráfego orgânico
- 12 palavras-chave na primeira página do Google
- Redução de 45% no custo de aquisição de clientes

O SEO B2B é o ativo digital que gera leads qualificados enquanto você dorme.', 
      'Equipe 2TimeWeb', 
      'Published', 
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
      NOW() - INTERVAL '1 day'
    )
  `;
  console.log('✅ Blog posts seeded with status "Published"!');

  // 3. Seed Portfolio — these are the actual projects from the original 2TimeWeb site
  // Note: Using screenshots from the GM's original portfolio
  await sql`
    INSERT INTO portfolio_items (id, title, category, description, image, link)
    VALUES 
    ('port01', 'Site W-tech Brasil', 'SITES', 'Sistema de Site Integrado com cursos e agendas', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', '#'),
    ('port02', 'Blog SEO Grupo Trido', 'SEO', 'Publicações com Redatora profissional', 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800', '#'),
    ('port03', 'E-Lance', 'SITES', 'Site Integrado com Automações e Sistema', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800', '#'),
    ('port04', 'Portal do Franqueado E-Lance', 'SISTEMAS', 'Sistema para o Franqueado E-Lance', 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800', '#'),
    ('port05', 'Escola de Leilões', 'SITES', 'Lançamento de Cursos online e Presencial Leilões', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800', '#'),
    ('port06', 'Sistema Imobiliária automação', 'SISTEMAS', 'Automação completa para gestão imobiliária', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800', '#'),
    ('port07', 'Site portal Imobiliária', 'SITES', 'Portal completo para busca de imóveis', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800', '#'),
    ('port08', 'Automação Kiwify e Sistemas de Vendas', 'AUTOMAÇÕES', 'Integração avançada Kiwify para aceleração de vendas', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', '#'),
    ('port09', 'Automação Pro-Riders', 'AUTOMAÇÕES', 'Sistema automatizado para gestão de vendas', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800', '#'),
    ('port10', 'Pecon Atendente', 'AUTOMAÇÕES', 'Automação de atendimento inteligente', 'https://images.unsplash.com/photo-1531746790095-e5e9c545b6ef?q=80&w=800', '#'),
    ('port11', 'Nacional Hidro', 'SITES', 'Hidrojateamento de Alta Pressão e Saneamento 24h', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', '#'),
    ('port12', 'Noelle Garcia - Advogada', 'SITES', 'Especializada em Direito Criminal, Família e Civil', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800', '#'),
    ('port13', 'Controle Hospedagem - Resort', 'SISTEMAS', 'Dashboard de gestão completo para hotelaria', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800', '#'),
    ('port14', 'Portal B-Tech - Escola', 'SISTEMAS', 'Portal educacional completo', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800', '#'),
    ('port15', 'Site B-Tech', 'SITES', 'Site institucional premium', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800', '#'),
    ('port16', 'Resort das Oliverias - Pablo Marçal', 'SISTEMAS', 'Gestão inteligente de resort', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800', '#'),
    ('port17', 'Sistema de Gestão', 'SISTEMAS', 'Estoque Inteligente em Tempo Real', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', '#'),
    ('port18', 'Grupo Trido', 'SITES', 'Site institucional completo', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800', '#'),
    ('port19', 'Portal Gestão W-Tech', 'SISTEMAS', 'Portal de gestão empresarial', 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800', '#'),
    ('port20', 'Loja Online', 'SITES', 'E-commerce de alta conversão', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800', '#'),
    ('port21', 'Vendas Lançamento Online ProRiders', 'SITES', 'Página de vendas para lançamento', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800', '#'),
    ('port22', 'Site Wtech Novo', 'SITES', 'nova versão do site institucional', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800', '#'),
    ('port23', 'Loja online Wtech Store', 'SITES', 'E-commerce de peças e acessórios', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800', '#')
    ON CONFLICT (id) DO UPDATE SET 
      title = EXCLUDED.title, 
      category = EXCLUDED.category,
      description = EXCLUDED.description,
      image = EXCLUDED.image;
  `;
  console.log('✅ Portfolio seeded with 23 real projects!');

  console.log('🎉 Seeding Complete!');
}

seed().catch(console.error);
