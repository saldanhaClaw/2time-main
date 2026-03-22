-- Tabelas para o ecossistema 2TimeWeb

-- 1. Leads (CRM)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    interest TEXT,
    status TEXT DEFAULT 'Novo',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Itens do Portfólio
CREATE TABLE IF NOT EXISTS portfolio_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Configurações do Site
CREATE TABLE IF NOT EXISTS site_config (
    id INTEGER PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    author TEXT,
    featured_image TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'Rascunho'
);

-- 5. Fila do Blog (AI Queue)
CREATE TABLE IF NOT EXISTS blog_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL,
    status TEXT DEFAULT 'Pendente',
    scheduled_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Propostas de Serviços
CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clientName TEXT NOT NULL,
    clientEmail TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    value DECIMAL(10,2),
    status TEXT DEFAULT 'Pendente',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 7. Transações Financeiras (Fluxo de Caixa)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id UUID REFERENCES proposals(id),
    client_name TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    type TEXT DEFAULT 'Receita', -- Receita ou Despesa
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserção inicial para site_config com novos campos
INSERT INTO site_config (id, value) VALUES (1, '{
  "name": "2TIMEWEB",
  "logo": "2T",
  "logoUrl": "",
  "faviconUrl": "",
  "email": "contato@2timeweb.com.br",
  "phone": "+55 11 99999-9999",
  "address": "São Paulo - SP / Global",
  "blogFrequency": 2,
  "maintenanceMode": false,
  "maintenanceTitle": "Estamos em Obras Digitais",
  "maintenanceMessage": "Estamos construindo algo incrível para transformar seu negócio. Voltamos em breve!",
  "robotsTxt": "User-agent: *\\nDisallow: /admin\\nAllow: /",
  "sitemapUrl": "https://2timeweb.com.br/sitemap.xml",
  "geminiApiKey": "",
  "openaiApiKey": "",
  "preferredAiModel": "gemini",
  "instagram": "",
  "facebook": "",
  "linkedin": ""
}'::jsonb) ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;
