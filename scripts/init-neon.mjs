import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_6CuNlkeVUrD9@ep-cool-morning-ac6lqq9i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

async function setup() {
  console.log('🗄️ Creating tables on Neon...');

  await sql`CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    interest TEXT,
    status TEXT DEFAULT 'New',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS portfolio_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS site_config (
    id INTEGER PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    author TEXT,
    featured_image TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'Draft'
  )`;

  await sql`CREATE TABLE IF NOT EXISTS blog_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    scheduled_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clientname TEXT NOT NULL,
    clientemail TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    value DECIMAL(10,2),
    status TEXT DEFAULT 'Pending',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id UUID REFERENCES proposals(id),
    client_name TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    type TEXT DEFAULT 'Revenue',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;

  // Insert default site config
  await sql`INSERT INTO site_config (id, value) VALUES (1, ${JSON.stringify({
    name: "2TIMEWEB",
    logo: "2T",
    logoUrl: "",
    faviconUrl: "",
    email: "contact@2timeweb.com",
    phone: "+55 12 99714-6957",
    address: "São Paulo, Brazil / Global",
    blogFrequency: 2,
    maintenanceMode: false,
    maintenanceTitle: "Under Digital Construction",
    maintenanceMessage: "We are building something incredible to transform your business. Back soon!",
    robotsTxt: "User-agent: *\nDisallow: /admin\nAllow: /",
    sitemapUrl: "https://2timeweb.com/sitemap.xml",
    preferredAiModel: "gemini",
    instagram: "",
    facebook: "",
    linkedin: ""
  })}::jsonb) ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value`;

  console.log('✅ All 7 tables created + config seeded on Neon!');
}

setup().catch(console.error);
