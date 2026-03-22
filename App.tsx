
import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Globe,
  ShieldCheck,
  Layers,
  Workflow,
  ExternalLink,
  LayoutDashboard,
  MessageSquare,
  Construction,
  Hammer,
  LogOut,
  Send,
  Loader2,
  Sparkles,
  Bot,
  Cpu,
  Rocket,
  Home,
  Bookmark,
  Phone,
  LayoutGrid,
  PhoneCall,
  Folder,
  Instagram,
  Facebook,
  Linkedin,
  Newspaper,
  BookOpen,
  ChevronRight,
  Code // Added for Partner Section
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, PORTFOLIO as INITIAL_PORTFOLIO } from './constants';
import Dashboard from './Dashboard';
import Login from './Login';
import { Lead, SiteConfig, PortfolioItem, Proposal, BlogPost, QueueItem, Transaction } from './types';
import { supabase } from './supabase';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { TestimonialCard } from "@/components/ui/testimonial-cards";
import LancamentosPage from "./LancamentosPage";
import { LimelightNav } from "@/components/ui/limelight-nav";
import BlogPage from "./BlogPage";
import PortfolioPage from "./PortfolioPage";
import ServicePage, { SERVICES_DATA } from "./ServicePage";
import { Portfolio3DCarousel } from "./components/ui/portfolio-3d-carousel";

const TESTIMONIALS = [
  {
    id: 1,
    testimonial: "A 2TimeWeb transformou nosso processo de vendas. O SDR automático é como ter um funcionário nota 10 disponível 24h por dia.",
    author: "Ricardo S. - CEO @ AutoTech"
  },
  {
    id: 2,
    testimonial: "O sistema de SEO integrado gerou mais leads orgânicos em 3 meses do que toda nossa estratégia paga do ano passado.",
    author: "Maria V. - Diretora de Growth @ LogiFlow"
  },
  {
    id: 3,
    testimonial: "Escalabilidade real. Conseguimos dobrar nossa operação sem contratar mais ninguém pro administrativo graças às automações.",
    author: "Carlos R. - Fundador @ BuildFast"
  }
];

const ShuffleCards = () => {
  const [positions, setPositions] = useState<string[]>(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop() as string);
    setPositions(newPositions);
  };

  return (
    <div className="relative h-[450px] w-full max-w-[350px] mx-auto md:mx-0">
      {TESTIMONIALS.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          id={testimonial.id}
          testimonial={testimonial.testimonial}
          author={testimonial.author}
          handleShuffle={handleShuffle}
          position={positions[index]}
        />
      ))}
    </div>
  );
}

const INITIAL_CONFIG: SiteConfig = {
  name: '2TIMEWEB',
  logo: '2T',
  logoUrl: '',
  faviconUrl: '',
  email: 'contato@2timeweb.com.br',
  phone: '+55 11 99999-9999',
  address: 'São Paulo - SP / Global',
  blogFrequency: 2,
  maintenanceMode: false,
  maintenanceTitle: 'Estamos em Obras Digitais',
  maintenanceMessage: 'Estamos construindo algo incrível para transformar seu negócio. Voltamos em breve!',
  robotsTxt: 'User-agent: *\nDisallow: /admin\nAllow: /',
  sitemapUrl: 'https://2timeweb.com.br/sitemap.xml',
  preferredAiModel: 'gemini'
};

// --- SDR ASSISTANT COMPONENT ---
const SDRAssistant = ({ onLeadCapture, phone }: { onLeadCapture: (l: any) => void, phone: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', email: '', phone: '', interest: 'Sistemas' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { label: "Olá! Sou o assistente da 2TimeWeb. Qual seu nome?", key: 'name', type: 'text' },
    { label: "Prazer! Qual seu melhor e-mail?", key: 'email', type: 'email' },
    { label: "E seu WhatsApp para o orçamento?", key: 'phone', type: 'tel' },
    { label: "O que você busca? (Sistemas, Automação, SEO)", key: 'interest', type: 'select', options: ['Sistemas', 'Automação', 'SEO'] }
  ];

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      await onLeadCapture(data);
      setIsSubmitting(false);
      setStep(step + 1); // Thank you step
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-4 w-80 glass rounded-3xl overflow-hidden shadow-2xl border-blue-500/20"
          >
            <div className="p-6 bg-blue-600 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 font-bold">
                <Bot size={20} /> SDR Inteligente
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            <div className="p-6 space-y-4 bg-gray-950">
              {step < steps.length ? (
                <>
                  <p className="text-sm font-medium text-gray-300">{steps[step].label}</p>
                  {steps[step].type === 'select' ? (
                    <select
                      value={(data as any)[steps[step].key]}
                      onChange={e => setData({ ...data, [steps[step].key]: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                    >
                      {steps[step].options?.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={steps[step].type}
                      value={(data as any)[steps[step].key]}
                      onChange={e => setData({ ...data, [steps[step].key]: e.target.value })}
                      autoFocus
                      onKeyPress={e => e.key === 'Enter' && handleNext()}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  )}
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                  >
                    Próximo <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-bold">Solicitação Recebida!</h4>
                  <p className="text-xs text-gray-400">Um especialista entrará em contato em breve.</p>
                  <a
                    href={`https://wa.me/${phone.replace(/\D/g, '')}?text=Olá,%20acabei%20de%20solicitar%20um%20orçamento%20pelo%20site.`}
                    className="block py-3 bg-green-600 text-white rounded-xl font-bold text-sm"
                  >
                    Falar Agora no WhatsApp
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform animate-bounce hover:animate-none"
      >
        <MessageSquare size={32} />
      </button>
    </div>
  );
};

// --- MAINTENANCE PAGE ---
const MaintenancePage = ({ config, onOpenDashboard }: { config: SiteConfig, onOpenDashboard: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#030712] p-6 text-center">
    <div className="max-w-2xl">
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center text-blue-500 animate-bounce">
          <Construction size={48} />
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-black mb-6 gradient-text uppercase tracking-tighter">
        {config.maintenanceTitle}
      </h1>
      <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
        {config.maintenanceMessage}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={`https://wa.me/${config.phone.replace(/\D/g, '')}`} className="px-8 py-4 bg-blue-600 rounded-full font-bold shadow-xl shadow-blue-900/40">
          Falar no WhatsApp
        </a>
        <button onClick={onOpenDashboard} className="px-8 py-4 glass rounded-full font-bold text-gray-500 hover:text-white transition-colors">
          Acesso Admin
        </button>
      </div>
    </div>
  </div>
);

// --- NAVBAR ---
const Navbar = ({ onOpenDashboard, config, setView, setSelectedService }: { onOpenDashboard: () => void, config: SiteConfig, setView: (v: any) => void, setSelectedService: (s: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {config.logoUrl ? (
            <img src={config.logoUrl} alt={config.name} className="h-10 w-auto" />
          ) : (
            <>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">{config.logo}</div>
              <span className="text-xl font-bold tracking-tight uppercase">{config.name.replace('WEB', '')}<span className="text-blue-500">WEB</span></span>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#servicos" onClick={() => setView('site')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Serviços</a>
          <button onClick={() => setView('lancamentos')} className="text-sm font-medium text-purple-400 hover:text-white transition-colors flex items-center gap-1">
            <Rocket size={14} /> Lançamentos
          </button>

          <div className="group relative py-4">
            <button className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors flex items-center gap-1">
              Tecnologia <ChevronRight size={14} className="rotate-90 group-hover:rotate-[270deg] transition-transform" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
              <div className="glass w-[600px] p-6 rounded-[2rem] border-white/10 shadow-2xl grid grid-cols-2 gap-2">
                {Object.values(SERVICES_DATA).map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setView('service'); setSelectedService(s.id); }}
                    className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all text-left group/item"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover/item:scale-110 transition-transform">
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{s.title}</p>
                      <p className="text-[10px] text-gray-500 line-clamp-1">{s.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setView('portfolio')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Portfólio</button>
          <button onClick={() => setView('blog')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <Newspaper size={14} /> Blog
          </button>
          <button onClick={onOpenDashboard} className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full glass">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <a href="#contato" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">
            Solicitar Orçamento
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-white/5 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top max-h-[80vh] overflow-y-auto">
          <a href="#servicos" onClick={() => { setView('site'); setMobileMenuOpen(false); }} className="text-lg font-medium">Serviços</a>
          <button onClick={() => { setView('lancamentos'); setMobileMenuOpen(false); }} className="text-lg font-medium text-left">Lançamentos</button>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Tecnologia & Serviços</p>
            <div className="grid grid-cols-1 gap-2">
              {Object.values(SERVICES_DATA).map(s => (
                <button
                  key={s.id}
                  onClick={() => { setView('service'); setSelectedService(s.id); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-left"
                >
                  <div className="text-blue-500">{s.icon}</div>
                  <span className="text-sm font-bold">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { setView('portfolio'); setMobileMenuOpen(false); }} className="text-lg font-medium text-left">Portfólio</button>
          <button onClick={() => { setView('blog'); setMobileMenuOpen(false); }} className="text-lg font-medium text-left">Blog</button>
          <button onClick={() => { onOpenDashboard(); setMobileMenuOpen(false); }} className="text-lg font-medium text-left flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" /> Painel Admin
          </button>
          <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="py-3 bg-blue-600 text-center rounded-lg font-bold">Quero meu Sistema</a>
        </div>
      )}
    </nav>
  );
};

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState<'site' | 'dashboard' | 'login' | 'lancamentos' | 'blog' | 'portfolio' | 'service'>('site');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && view === 'dashboard') setView('site');
    });
    fetchData();
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    const { data: leadsData } = await supabase.from('leads').select('*').order('date', { ascending: false });
    if (leadsData) setLeads(leadsData);

    const { data: portData } = await supabase.from('portfolio_items').select('*');
    if (portData && portData.length > 0) setPortfolio(portData);
    else setPortfolio(INITIAL_PORTFOLIO.map(p => ({ ...p, id: String(p.id) })));

    const { data: configData } = await supabase.from('site_config').select('*').single();
    if (configData) setConfig(configData.value as SiteConfig);

    const { data: propData } = await supabase.from('proposals').select('*').order('date', { ascending: false });
    if (propData) setProposals(propData);

    const { data: blogData } = await supabase.from('blog_posts').select('*').order('date', { ascending: false });
    if (blogData) setPosts(blogData);

    const { data: qData } = await supabase.from('blog_queue').select('*').order('scheduled_date', { ascending: true });
    if (qData) setQueue(qData);

    const { data: transData } = await supabase.from('transactions').select('*').order('date', { ascending: false });
    if (transData) setTransactions(transData);
  };

  const handleAddLead = async (data: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const newLead = { ...data, date: new Date().toISOString(), status: 'Novo' };
    const { data: savedLead } = await supabase.from('leads').insert([newLead]).select().single();
    if (savedLead) setLeads([savedLead, ...leads]);
  };

  const handleOpenDashboard = () => session ? setView('dashboard') : setView('login');

  // Favicon dynamic update
  useEffect(() => {
    if (config.faviconUrl) {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = config.faviconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [config.faviconUrl]);

  if (view === 'login') return <Login onLoginSuccess={() => setView('dashboard')} />;

  if (view === 'dashboard' && session) {
    return (
      <Dashboard
        onExit={() => setView('site')}
        leads={leads}
        setLeads={setLeads}
        config={config}
        setConfig={async (newVal) => {
          setConfig(newVal);
          await supabase.from('site_config').upsert({ id: 1, value: newVal });
        }}
        portfolio={portfolio}
        setPortfolio={async (newVal) => setPortfolio(newVal)}
        proposals={proposals}
        setProposals={setProposals}
        posts={posts}
        setPosts={setPosts}
        transactions={transactions}
        setTransactions={setTransactions}
      />
    );
  }

  if (view === 'service' && selectedService) {
    return (
      <>
        <Navbar onOpenDashboard={handleOpenDashboard} config={config} setView={setView} setSelectedService={setSelectedService} />
        <ServicePage
          serviceId={selectedService}
          onBack={() => setView('site')}
          onSubmitLead={handleAddLead}
        />
        <SDRAssistant onLeadCapture={handleAddLead} phone={config.phone} />
      </>
    );
  }

  if (config.maintenanceMode && view !== 'dashboard' && view !== 'login') {
    return <MaintenancePage config={config} onOpenDashboard={handleOpenDashboard} />;
  }

  if (view === 'lancamentos') {
    return <LancamentosPage onBack={() => setView('site')} onContact={() => {
      const el = document.getElementById('contato');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else {
        setView('site');
        setTimeout(() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }} />;
  }

  if (view === 'portfolio') {
    return <PortfolioPage portfolio={portfolio} onBack={() => setView('site')} />;
  }

  if (view === 'blog') {
    return <BlogPage
      posts={posts}
      queue={queue}
      onBack={() => setView('site')}
      onReadPost={() => { }}
    />;
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      <Navbar onOpenDashboard={handleOpenDashboard} config={config} setView={setView} setSelectedService={setSelectedService} />

      <main>
        {/* NEW PREMIUM HERO */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-20 overflow-hidden px-6">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(59, 130, 246, 0.3)" />

          <Card className="max-w-7xl mx-auto min-h-[600px] border-white/5 overflow-hidden flex flex-col lg:flex-row items-center">
            <div className="flex-1 p-8 md:p-16 z-10 flex flex-col justify-center text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 mx-auto lg:mx-0"
              >
                <Sparkles size={12} className="animate-pulse" /> 2TimeWeb: Tecnologia Sob Medida
              </motion.div>
              <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
                Sistemas que Convertem,<br /> IA que <span className="gradient-text italic">Escala.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Sua empresa no piloto automático com ecossistemas digitais de alta performance, SEO estratégico e automações inteligentes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contato" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all shadow-xl shadow-blue-600/20">
                  Começar Projeto Agora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#tecnologia" className="px-8 py-4 glass rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  Ver Nossa Tech
                </a>
              </div>
            </div>

            <div className="flex-1 relative w-full h-[400px] lg:h-[600px]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </Card>
        </section>

        {/* TECHNOLOGY VISUALIZATION */}
        <section id="tecnologia" className="py-24 bg-gray-950/30">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <DatabaseWithRestApi />
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
                Infraestrutura Robusta para <br /><span className="text-blue-500">Escala Infinita.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Não criamos apenas sites. Construímos motores de dados integrados via REST API, conectando seu CRM, Blog e Marketing em uma única engrenagem de crescimento.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 glass rounded-[2rem] border-white/5">
                  <Cpu className="text-blue-500 mb-4" />
                  <h4 className="font-bold mb-2 text-sm">IA Integrada</h4>
                  <p className="text-xs text-gray-500">Decisões baseadas em dados e geração de conteúdo SEO.</p>
                </div>
                <div className="p-6 glass rounded-[2rem] border-white/5">
                  <Workflow className="text-purple-500 mb-4" />
                  <h4 className="font-bold mb-2 text-sm">Workflows</h4>
                  <p className="text-xs text-gray-500">Elimine tarefas repetitivas e foque no fechamento.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                Parcerias de Sucesso
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
                O que dizem quem já <br /><span className="gradient-text italic">escalou conosco.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Empresas que transformaram seu administrativo em uma máquina de lucro automática através de nossos ecossistemas.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} className="w-12 h-12 rounded-full border-4 border-gray-950 object-cover" src={`https://i.pravatar.cc/128?img=${i + 20}`} alt="" />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-gray-950 bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white tracking-tighter">+150</div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Mais de 150 parcerias</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Nível Global</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end pr-10">
              <ShuffleCards />
            </div>
          </div>
        </section>

        {/* NEW LAUNCH SECTION (PRE-SERVICES) */}
        <section className="py-24 bg-gradient-to-b from-gray-950 to-[#030712] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-600/5 blur-[120px] rounded-full"></div>
          <div className="container mx-auto px-6">
            <Card className="max-w-6xl mx-auto border-purple-500/10 bg-gray-900/40 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-16">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest">
                    Vertical Especialista
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    Somos o Braço de <span className="text-purple-400">Lançamento</span> para Influenciadores.
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Transformamos sua audiência em um negócio estruturado. Lançamos cursos digitais e mentorias, além de estruturar toda a tecnologia para seus eventos presenciais.
                  </p>
                  <button
                    onClick={() => setView('lancamentos')}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-purple-900/40 group"
                  >
                    Conhecer Modelo de Lançamento <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/5 shadow-3xl relative group">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/CR0c54uAq70?start=19"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Impacto & Escala</p>
                      <p className="text-[10px] text-gray-500">Tecnologia proprietária para funis de alta conversão.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* PARTNER SECTION */}
        <section className="py-24 bg-gray-950/40 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto glass p-8 md:p-12 rounded-[3rem] border-white/5 relative">
              
              <div className="w-full md:w-1/3 flex justify-center relative">
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-600/20 shadow-2xl shadow-blue-900/40 group">
                  <img 
                    src="/gabriel-moraes.jpeg" 
                    alt="Gabriel Moraes" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="absolute -bottom-4 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <Code size={16} /> Tech Lead
                </div>
              </div>

              <div className="w-full md:w-2/3 space-y-6 text-center md:text-left relative z-10">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Gabriel Moraes</h3>
                  <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Sócio & Engenharia de Sistemas</p>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed">
                  Técnico de desenvolvimento focado na arquitetura de soluções robustas. Cursando Engenharia de Sistemas, Gabriel lidera a inovação tecnológica da 2TimeWeb, garantindo que cada linha de código contribua para a escalabilidade do seu negócio.
                </p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                   <div className="px-4 py-2 glass rounded-xl text-xs font-bold text-gray-300 flex items-center gap-2">
                      <Cpu size={14} className="text-blue-500" /> Alta Performance
                   </div>
                   <div className="px-4 py-2 glass rounded-xl text-xs font-bold text-gray-300 flex items-center gap-2">
                      <Workflow size={14} className="text-purple-500" /> Automação
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="servicos" className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-20 italic bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">Nosso Arsenal de Soluções</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service) => (
                <div key={service.id} className="glass p-8 rounded-[2.5rem] group hover:bg-blue-600/5 transition-all border-white/5 hover:border-blue-500/20">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-blue-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-white">{service.title}</h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CRM / FORM SECTION */}
        <section id="contato" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -z-10"></div>
          <div className="container mx-auto px-6">
            <Card className="max-w-5xl mx-auto p-8 md:p-16 border-white/10 shadow-3xl bg-gray-900/80">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl font-black mb-8 leading-tight">Vamos construir seu <span className="text-blue-500">próximo nível?</span></h2>
                  <p className="text-gray-400 mb-8 leading-relaxed">Deixe seus dados e receba um diagnóstico tecnológico gratuito da sua empresa.</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500"><Send size={16} />Reforçam o CRM</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
                      <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500"><Sparkles size={16} />IA Generativa</div>
                    </div>
                  </div>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  handleAddLead({
                    name: target.name.value,
                    email: target.email.value,
                    phone: target.phone.value,
                    interest: target.interest.value
                  });
                  target.reset();
                  alert('Seu diagnóstico foi solicitado!');
                }} className="space-y-4">
                  <input required name="name" type="text" placeholder="Nome completo" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="email" type="email" placeholder="E-mail" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                    <input required name="phone" type="tel" placeholder="WhatsApp" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <select name="interest" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all">
                    <option value="Sistemas">Sistemas Sob Medida</option>
                    <option value="Automacao">IA & Automação</option>
                    <option value="SEO">SEO & Tráfego</option>
                  </select>
                  <button type="submit" className="w-full py-5 bg-white text-gray-950 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                    Solicitar Diagnóstico Agora <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* BLOG LATEST POSTS */}
        <section id="blog-preview" className="py-24 bg-gray-950/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  Fique por Dentro
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white">Insights & <span className="text-blue-500 italic">Tendências.</span></h2>
              </div>
              <button
                onClick={() => setView('blog')}
                className="px-6 py-3 glass rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-all flex items-center gap-2"
              >
                Ver Todo o Blog <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {posts.filter(p => p.status === 'Publicado').slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  onClick={() => setView('blog')}
                  className="group cursor-pointer space-y-6 glass p-6 rounded-[2.5rem] border-white/5 hover:border-blue-500/20 transition-all"
                >
                  <div className="aspect-[16/10] bg-gray-900 rounded-[1.5rem] overflow-hidden relative">
                    {post.featured_image ? (
                      <img src={post.featured_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 bg-black/20 group-hover:bg-transparent transition-colors">
                      <BookOpen size={48} className="text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-3 px-2">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-10">
                      {post.content.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
              {posts.filter(p => p.status === 'Publicado').length === 0 && (
                <div className="col-span-3 text-center py-12 text-gray-600 italic">Nenhum post publicado ainda.</div>
              )}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                Portfólio de Elite
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white">Cases de <span className="gradient-text italic">Sucesso.</span></h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Transformamos ideias complexas em ecossistemas digitais lucrativos e de alta performance.
              </p>
            </div>
          </div>
          
          <Portfolio3DCarousel items={portfolio} />
          
          <div className="container mx-auto px-6 text-center mt-12">
            <button 
              onClick={() => setView('portfolio')}
              className="px-8 py-4 glass rounded-2xl font-bold text-gray-400 hover:text-white transition-all hover:bg-white/5"
            >
              Ver Todos os Projetos
            </button>
          </div>
        </section>
      </main>

      <footer className="pt-24 pb-12 bg-gray-950">
        <div className="container mx-auto px-6 border-t border-white/5 pt-16">
          <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">{config.logo}</div>
                <span className="text-2xl font-black uppercase tracking-tighter">{config.name}</span>
              </div>
              <p className="text-gray-500 max-w-sm">{config.address}</p>
              <p className="text-blue-500 font-bold">{config.email}</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400">Navegação</h4>
              <nav className="flex flex-col gap-2">
                <a href="#servicos" className="text-sm text-gray-500 hover:text-white transition-colors">Serviços</a>
                <a href="#portfolio" className="text-sm text-gray-500 hover:text-white transition-colors">Portfólio</a>
                <button onClick={handleOpenDashboard} className="text-sm text-gray-500 hover:text-white transition-colors text-left">Admin Panel</button>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400">Social</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                {config.instagram && <a href={config.instagram} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-gray-400 hover:text-white transition-all"><Instagram size={20} /></a>}
                {config.facebook && <a href={config.facebook} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-gray-400 hover:text-white transition-all"><Facebook size={20} /></a>}
                {config.linkedin && <a href={config.linkedin} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-gray-400 hover:text-white transition-all"><Linkedin size={20} /></a>}
                <a href={`https://wa.me/${config.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-gray-400 hover:text-white transition-all"><PhoneCall size={20} /></a>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center text-[10px] font-bold text-gray-700 uppercase tracking-widest">
            © {new Date().getFullYear()} 2TimeWeb Digital Studio. Made with AI Engineering.
          </div>
        </div>
      </footer>

      {/* MOBILE BAR */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] flex justify-center">
        <LimelightNav
          className="w-full justify-around shadow-2xl shadow-blue-900/40"
          items={[
            { id: '1', icon: <Home />, onClick: () => { setView('site'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
            { id: '2', icon: <Rocket />, onClick: () => setView('lancamentos') },
            { id: 'blog', icon: <Newspaper />, onClick: () => setView('blog') },
            { id: '3', icon: <Workflow />, onClick: () => { setView('site'); setTimeout(() => document.getElementById('tecnologia')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
            { id: '5', icon: <PhoneCall />, onClick: () => { setView('site'); setTimeout(() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
          ]}
        />
      </div>

      <SDRAssistant onLeadCapture={handleAddLead} phone={config.phone} />
    </div>
  );
}
