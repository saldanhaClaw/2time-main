
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings as SettingsIcon,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  X,
  BarChart3,
  Sparkles,
  Loader2,
  Trash2,
  Eye,
  Save,
  Globe,
  MousePointer2,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ListOrdered,
  Clock,
  Play,
  CalendarDays,
  Briefcase,
  Image as ImageIcon,
  ExternalLink,
  ShieldAlert,
  SearchCode,
  FileCode,
  LogOut,
  Cpu,
  FileSignature,
  Instagram,
  Facebook,
  Linkedin,
  RotateCcw
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { Lead, BlogPost, SiteConfig, QueueItem, PortfolioItem, Proposal, Transaction } from './types';
import { supabase } from './supabase';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { saveSitemap } from './sitemap';
import {
  DollarSign,
  Download,
  SendHorizontal,
  FileDown
} from 'lucide-react';

interface DashboardProps {
  onExit: () => void;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  config: SiteConfig;
  setConfig: (config: SiteConfig) => Promise<void>;
  portfolio: PortfolioItem[];
  setPortfolio: (portfolio: PortfolioItem[]) => Promise<void>;
  proposals: Proposal[];
  setProposals: React.Dispatch<React.SetStateAction<Proposal[]>>;
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({
  onExit, leads, setLeads, config, setConfig, portfolio, setPortfolio, proposals, setProposals, posts, setPosts, transactions, setTransactions
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'blog' | 'portfolio' | 'proposals' | 'finance' | 'settings'>('overview');
  const [queue, setQueue] = useState<QueueItem[]>([]);

  // Load Data from Supabase
  useEffect(() => {
    const loadContent = async () => {
      const { data: queueData } = await supabase.from('blog_queue').select('*').order('scheduled_date', { ascending: true });
      if (queueData) setQueue(queueData);
    };
    loadContent();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onExit();
  };

  const menuItems = [
    { id: 'overview', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'leads', label: 'Leads (CRM)', icon: <Users className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog & IA', icon: <FileText className="w-5 h-5" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'proposals', label: 'Propostas', icon: <FileSignature className="w-5 h-5" /> },
    { id: 'finance', label: 'Financial', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-gray-100 overflow-hidden font-sans">
      <aside className="w-64 bg-gray-950/50 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">{config.logo}</div>
            <span className="font-bold text-lg tracking-tight uppercase">{config.name}</span>
          </div>
          <nav className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-2">
          <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5" />
            Ver Site
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{menuItems.find(i => i.id === activeTab)?.label}</h1>
            <p className="text-gray-500 text-sm">Gerencie seu ecossistema digital 2TimeWeb.</p>
          </div>
          <div className="flex items-center gap-4">
            {config.maintenanceMode && (
              <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-black uppercase rounded-full animate-pulse">
                Construction Mode Active
              </div>
            )}
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <Users className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {activeTab === 'overview' && <OverviewTab leads={leads} proposals={proposals} transactions={transactions} />}
        {activeTab === 'leads' && <LeadsTab leads={leads} setLeads={setLeads} />}
        {activeTab === 'blog' && <BlogTab posts={posts} setPosts={setPosts} queue={queue} setQueue={setQueue} config={config} setConfig={setConfig} />}
        {activeTab === 'portfolio' && <PortfolioTab portfolio={portfolio} setPortfolio={setPortfolio} />}
        {activeTab === 'proposals' && <ProposalsTab proposals={proposals} setProposals={setProposals} config={config} transactions={transactions} setTransactions={setTransactions} />}
        {activeTab === 'finance' && <FinanceTab transactions={transactions} setTransactions={setTransactions} />}
        {activeTab === 'settings' && <SettingsTab config={config} setConfig={setConfig} />}
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const OverviewTab = ({ leads, proposals, transactions }: { leads: Lead[], proposals: Proposal[], transactions: Transaction[] }) => {
  const receitas = transactions.filter(t => t.type === 'Revenue').reduce((acc, t) => acc + Number(t.amount), 0);
  const pendingValue = proposals.filter(p => p.status === 'Enviada').reduce((acc, p) => acc + Number(p.value), 0);
  const conversionRate = proposals.length > 0
    ? (proposals.filter(p => p.status === 'Aceita').length / proposals.length) * 100
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in transition-all">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4 bg-gradient-to-br from-blue-600/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Users size={18} /></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Leads</p>
          </div>
          <h4 className="text-4xl font-black">{leads.length}</h4>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-500">
            <TrendingUp size={12} /> Ativo
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4 bg-gradient-to-br from-purple-600/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500"><FileSignature size={18} /></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Propostas Ativas</p>
          </div>
          <h4 className="text-4xl font-black">{proposals.filter(p => ['Pendente', 'Enviada'].includes(p.status)).length}</h4>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter italic">Pipeline: R$ {pendingValue.toLocaleString('pt-BR')}</p>
        </div>

        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4 bg-gradient-to-br from-green-600/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500"><DollarSign size={18} /></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Faturamento Bruto</p>
          </div>
          <h4 className="text-4xl font-black text-green-400">R$ {receitas.toLocaleString('pt-BR')}</h4>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-500">
            <TrendingUp size={12} /> Meta batida (100%)
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4 bg-gradient-to-br from-orange-600/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500"><MousePointer2 size={18} /></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Conversion Rate</p>
          </div>
          <h4 className="text-4xl font-black">{conversionRate.toFixed(1)}%</h4>
          <p className="text-[10px] font-bold text-gray-600">Baseado em propostas</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] border-white/5 h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold flex items-center gap-2"><BarChart3 size={18} className="text-blue-500" /> Atividade Semanal</h4>
          </div>
          <div className="h-full flex items-end gap-3 pb-8">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 space-y-2 group">
                <div style={{ height: `${h}%` }} className="w-full bg-blue-600/20 group-hover:bg-blue-600/40 rounded-t-xl transition-all relative">
                </div>
                <div className="text-center text-[8px] font-bold text-gray-600">DIA {i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6">
          <h4 className="font-bold flex items-center gap-2"><Clock size={18} className="text-orange-500" /> Recent Leads</h4>
          <div className="space-y-4">
            {leads.slice(0, 5).map(lead => (
              <div key={lead.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-xs">
                  {lead.name[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">{lead.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{lead.interest}</p>
                </div>
                <CheckCircle2 size={16} className="text-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioTab = ({ portfolio, setPortfolio }: { portfolio: PortfolioItem[], setPortfolio: any }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newProject, setNewProject] = useState<Omit<PortfolioItem, 'id'>>({
    title: '', category: 'Sistemas', description: '', image: '', link: ''
  });

  const handleAdd = async () => {
    if (!newProject.title || !newProject.image) return;
    const newItem = { ...newProject, id: Math.random().toString(36).substr(2, 9) };
    const { data } = await supabase.from('portfolio_items').insert([newItem]).select().single();
    if (data) {
      setPortfolio([data, ...portfolio]);
      setNewProject({ title: '', category: 'Sistemas', description: '', image: '', link: '' });
      setShowAdd(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete este projeto?')) {
      await supabase.from('portfolio_items').delete().eq('id', id);
      setPortfolio(portfolio.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Case & Project Management</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
        >
          {showAdd ? <X size={20} /> : <Plus size={20} />}
          {showAdd ? 'Cancelar' : 'Novo Projeto'}
        </button>
      </div>

      {showAdd && (
        <div className="glass p-8 rounded-[2rem] border-blue-500/20 bg-blue-600/5 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Project Title</label>
              <input
                type="text"
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                placeholder="E.g.: Real Estate Management App"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Category</label>
              <select
                value={newProject.category}
                onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
              >
                <option>Assessorias</option>
                <option>Sistemas</option>
                <option>Automations</option>
                <option>Sites</option>
                <option>SEO</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">URL da Imagem</label>
              <input
                type="text"
                value={newProject.image}
                onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
          <div className="space-y-4 flex flex-col">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Short Description</label>
              <textarea
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full h-24 bg-gray-950 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none resize-none"
                placeholder="Explique o problema resolvido..."
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Link Externo (Opcional)</label>
              <input
                type="text"
                value={newProject.link}
                onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                placeholder="https://projeto.com"
              />
            </div>
            <button
              onClick={handleAdd}
              className="mt-auto py-4 bg-white text-gray-950 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
            >
              Publish no Portfolio
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {portfolio.map(item => (
          <div key={item.id} className="glass rounded-[2rem] overflow-hidden border-white/5 group hover:border-blue-500/20 transition-all">
            <div className="aspect-video relative overflow-hidden bg-gray-900">
              <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 right-4 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{item.category}</span>
                {item.link && <ExternalLink size={14} className="text-gray-600" />}
              </div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeadsTab = ({ leads, setLeads }: { leads: Lead[], setLeads: any }) => {
  const handleUpdate = async (id: string, status: any) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads(leads.map(x => x.id === id ? { ...x, status } : x));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete lead?')) {
      await supabase.from('leads').delete().eq('id', id);
      setLeads(leads.filter(x => x.id !== id));
    }
  };

  return (
    <div className="glass rounded-3xl border-white/5 overflow-hidden animate-in fade-in">
      <table className="w-full text-left">
        <thead className="bg-gray-950/50 text-gray-500 text-[10px] uppercase font-black tracking-widest">
          <tr>
            <th className="px-8 py-6">Lead</th>
            <th className="px-8 py-6">Interesse</th>
            <th className="px-8 py-6">Status</th>
            <th className="px-8 py-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.map(l => (
            <tr key={l.id} className="hover:bg-white/5 transition-colors group">
              <td className="px-8 py-5">
                <p className="font-bold text-sm text-white">{l.name}</p>
                <p className="text-xs text-gray-500">{l.email}</p>
              </td>
              <td className="px-8 py-5 text-sm text-gray-400">{l.interest}</td>
              <td className="px-8 py-5">
                <select
                  value={l.status}
                  onChange={(e) => handleUpdate(l.id, e.target.value as any)}
                  className="bg-gray-950 border border-white/10 rounded-lg px-3 py-1 text-[10px] font-bold uppercase focus:border-blue-500 outline-none"
                >
                  <option>Novo</option>
                  <option>Em Contato</option>
                  <option>Fechado</option>
                  <option>Perdido</option>
                </select>
              </td>
              <td className="px-8 py-5 text-right">
                <button onClick={() => handleDelete(l.id)} className="p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BlogTab = ({ posts, setPosts, queue, setQueue, config, setConfig }: { posts: BlogPost[], setPosts: any, queue: QueueItem[], setQueue: any, config: SiteConfig, setConfig: any }) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const addKeywords = async () => {
    const kws = keywordInput.split(',').map(k => k.trim()).filter(k => k);
    const newItems = kws.map(k => ({
      keyword: k,
      status: 'Pendente',
      scheduled_date: new Date().toISOString()
    }));

    const { data } = await supabase.from('blog_queue').insert(newItems).select();
    if (data) {
      setQueue([...queue, ...data]);
      setKeywordInput('');
    }
  };

  const suggestKeywords = async () => {
    if (!config.geminiApiKey && !config.openaiApiKey) {
      alert('Configure an API key in settings first.');
      return;
    }

    setIsSuggesting(true);
    const existingTitles = posts.map(p => p.title).join(', ');
    const prompt = `Based on the topics we already wrote: [${existingTitles}], suggest 8 new trending keywords or topics in technology, AI, digital marketing and automation for the 2TimeWeb blog. Focus on topics that attract entrepreneurs and CEOs. Answer ONLY the keywords separated by commas, no explanations.`;

    try {
      if (config.preferredAiModel === 'gemini') {
        const ai = new GoogleGenAI({ apiKey: config.geminiApiKey || '' });
        const result = await ai.models.generateContent({
          model: "gemini-pro",
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        setKeywordInput(result.text || '');
      } else {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.openaiApiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "user", content: prompt }]
          })
        });
        const result = await resp.json();
        setKeywordInput(result.choices[0].message.content);
      }
    } catch (e) {
      console.error(e);
      alert('Erro ao sugerir palavras-chave.');
    } finally {
      setIsSuggesting(false);
    }
  };

  const processOne = async (item?: QueueItem) => {
    const target = item || queue.find(q => q.status === 'Pendente');
    if (!target) return;

    setIsGenerating(true);
    await supabase.from('blog_queue').update({ status: 'Processando' }).eq('id', target.id);
    setQueue(prev => prev.map(q => q.id === target.id ? { ...q, status: 'Processando' } : q));

    try {
      let data = { title: '', content: '' };

      if (config.preferredAiModel === 'gemini') {
        const ai = new GoogleGenAI({ apiKey: config.geminiApiKey || '' });
        const result = await ai.models.generateContent({
          model: "gemini-pro",
          contents: [{ role: 'user', parts: [{ text: `Write an authoritative blog post about "${target.keyword}". Format the result as PURE JSON (without markdown blocks): {"title": "Title", "content": "Markdown Content"}. Use a technical and elegant tone.` }] }]
        });

        let text = result.text || '';
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          text = text.substring(start, end + 1);
        }
        data = JSON.parse(text || '{}');
      } else {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.openaiApiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "user", content: `Write an authoritative blog post about "${target.keyword}". Format the result as JSON: {"title": "Title", "content": "Markdown Content"}. Use a technical and elegant tone.` }],
            response_format: { type: "json_object" }
          })
        });
        const result = await resp.json();
        data = JSON.parse(result.choices[0].message.content);
      }

      const images = [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1620712943543-bcc4628c7190?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'
      ];
      const randomImg = images[Math.floor(Math.random() * images.length)];

      const newPost = {
        title: data.title || target.keyword,
        content: data.content || 'Error generating content.',
        author: config.preferredAiModel === 'gemini' ? 'Gemini AI' : 'GPT AI',
        featured_image: `https://loremflickr.com/1200/630/technology,business,minimal,${encodeURIComponent(target.keyword)}`,
        date: new Date().toISOString(),
        status: 'Draft' as const
      };

      const { data: savedPost } = await supabase.from('blog_posts').insert([newPost]).select().single();
      if (savedPost) setPosts([savedPost, ...posts]);

      await supabase.from('blog_queue').update({ status: 'Completed' }).eq('id', target.id);
      setQueue(prev => prev.map(q => q.id === target.id ? { ...q, status: 'Completed' } : q));
    } catch (err) {
      console.error('Erro na IA:', err);
      await supabase.from('blog_queue').update({ status: 'Erro' }).eq('id', target.id);
      setQueue(prev => prev.map(q => q.id === target.id ? { ...q, status: 'Erro' } : q));
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePostStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'Published' ? 'Draft' : 'Published';
    const { error } = await supabase.from('blog_posts').update({ status: newStatus }).eq('id', post.id);
    if (!error) {
      setPosts(posts.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
    }
  };

  const updatePost = async () => {
    if (!editingPost) return;
    const { error } = await supabase.from('blog_posts').update({
      title: editingPost.title,
      content: editingPost.content,
      featured_image: editingPost.featured_image
    }).eq('id', editingPost.id);

    if (!error) {
      setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p));
      setEditingPost(null);
    }
  };

  const processBulk = async () => {
    const pendings = queue.filter(q => q.status === 'Pendente');
    if (pendings.length === 0) return;

    for (const item of pendings) {
      await processOne(item);
    }
  };

  const deleteQueueItem = async (id: string) => {
    await supabase.from('blog_queue').delete().eq('id', id);
    setQueue(queue.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="glass p-8 rounded-[2rem] border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Sparkles className="text-blue-400" /> Content Automation (Bulk/Auto)</h3>
        <p className="text-xs text-gray-500 mb-6 font-medium">Enter keywords separated by commas. AI will create automatic drafts for each one.</p>
        <textarea
          placeholder="E.g.: How to scale a digital business, Best automations for 2025..."
          value={keywordInput}
          onChange={e => setKeywordInput(e.target.value)}
          className="w-full h-24 bg-gray-950 border border-white/10 rounded-2xl p-4 mb-4 focus:border-blue-500 outline-none text-sm"
        />
        <div className="flex gap-4">
          <button onClick={addKeywords} className="px-8 py-3 bg-white text-gray-950 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">Add to Queue</button>

          <button
            onClick={suggestKeywords}
            disabled={isSuggesting}
            className="px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-xl font-bold text-sm flex items-center gap-2 border border-purple-500/20 transition-all"
          >
            {isSuggesting ? <Loader2 size={16} className="animate-spin" /> : <SearchCode size={16} />}
            Sugerir Temas com IA
          </button>

          <button
            onClick={processBulk}
            disabled={isGenerating || queue.filter(q => q.status === 'Pendente').length === 0}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
          >
            {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Play size={16} />}
            Processar Fila
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Column 1: Queue */}
        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
          <h4 className="font-bold flex items-center justify-between text-sm">
            <span className="flex items-center gap-2"><Clock size={16} className="text-gray-500" /> Fila de Espera</span>
            <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-gray-400">{queue.filter(q => q.status !== 'Completed').length}</span>
          </h4>
          <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-2 custom-scrollbar">
            {queue.filter(q => q.status !== 'Completed').map(q => (
              <div key={q.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group animate-in slide-in-from-left duration-300">
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold truncate pr-2">{q.keyword}</span>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${q.status === 'Erro' ? 'text-red-500' : 'text-blue-500'}`}>{q.status}</span>
                </div>
                <button onClick={() => deleteQueueItem(q.id)} className="p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {queue.filter(q => q.status !== 'Completed').length === 0 && (
              <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                <p className="text-gray-600 italic text-xs">Fila limpa.</p>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Drafts/Approval */}
        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
          <h4 className="font-bold flex items-center justify-between text-sm">
            <span className="flex items-center gap-2"><FileSignature size={16} className="text-yellow-500" /> Awaiting Approval</span>
            <span className="bg-yellow-500/10 px-2 py-0.5 rounded text-[10px] text-yellow-500">{posts.filter(p => !p.status || p.status === 'Draft').length}</span>
          </h4>
          <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-2 custom-scrollbar">
            {posts.filter(p => !p.status || p.status === 'Draft').map(post => (
              <div key={post.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center group animate-in fade-in zoom-in duration-300">
                <div className="flex-1 min-w-0 mr-4">
                  <h4 className="font-bold text-sm truncate">{post.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => togglePostStatus(post)} className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all" title="Aprovar e Publish">
                    <CheckCircle2 size={14} />
                  </button>
                  <button onClick={() => setEditingPost(post)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <FileSignature size={14} />
                  </button>
                  <button onClick={async () => {
                    if (confirm('Delete rascunho?')) {
                      await supabase.from('blog_posts').delete().eq('id', post.id);
                      setPosts(posts.filter(p => p.id !== post.id));
                    }
                  }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {posts.filter(p => !p.status || p.status === 'Draft').length === 0 && (
              <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                <p className="text-gray-600 italic text-xs">Sem rascunhos.</p>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Published */}
        <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
          <h4 className="font-bold flex items-center justify-between text-sm">
            <span className="flex items-center gap-2"><Globe size={16} className="text-blue-500" /> Publisheds no Site</span>
            <span className="bg-blue-500/10 px-2 py-0.5 rounded text-[10px] text-blue-500">{posts.filter(p => p.status === 'Published').length}</span>
          </h4>
          <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-2 custom-scrollbar">
            {posts.filter(p => p.status === 'Published').map(post => (
              <div key={post.id} className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl flex justify-between items-center group">
                <div className="flex-1 min-w-0 mr-4">
                  <h4 className="font-bold text-sm truncate text-white">{post.title}</h4>
                  <p className="text-[9px] text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => togglePostStatus(post)} className="p-2 text-green-500 hover:bg-yellow-500/10 hover:text-yellow-500 rounded-lg transition-all" title="Mudar para Draft">
                    <RotateCcw size={14} />
                  </button>
                  <button onClick={() => setEditingPost(post)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Edit Post">
                    <FileSignature size={14} />
                  </button>
                  <button onClick={async () => {
                    if (confirm('Remove do site?')) {
                      await supabase.from('blog_posts').delete().eq('id', post.id);
                      setPosts(posts.filter(p => p.id !== post.id));
                    }
                  }} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {posts.filter(p => p.status === 'Published').length === 0 && (
              <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                <p className="text-gray-600 italic text-xs">Nenhum post ao vivo.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] border-white/10 flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gray-950/50">
              <h3 className="text-xl font-bold flex items-center gap-2"><FileSignature className="text-blue-500" /> Edit Post</h3>
              <button onClick={() => setEditingPost(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar bg-[#030712]/50">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Post Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full bg-gray-950 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">URL da Imagem de Destaque</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={editingPost.featured_image || ''}
                    onChange={e => setEditingPost({ ...editingPost, featured_image: e.target.value })}
                    className="flex-1 bg-gray-950 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all text-sm"
                  />
                  {editingPost.featured_image && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                      <img src={editingPost.featured_image} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Content (Markdown)</label>
                  <span className="text-[10px] text-blue-500 font-bold">Use Markdown to format titles, lists and bold text</span>
                </div>
                <textarea
                  value={editingPost.content}
                  onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full h-96 bg-gray-950 border border-white/10 rounded-2xl p-6 text-sm text-gray-300 font-mono focus:border-blue-500 outline-none resize-none transition-all leading-relaxed"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-gray-950/50 flex justify-end gap-4">
              <button
                onClick={() => setEditingPost(null)}
                className="px-8 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-white transition-colors"
              >
                Descartar
              </button>
              <button
                onClick={updatePost}
                className="px-10 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FileUpload = ({ label, onUpload, current }: { label: string, onUpload: (base64: string) => void, current?: string }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
        <ImageIcon size={12} /> {label}
      </label>
      <div className="flex items-center gap-4">
        {current ? (
          <div className="w-12 h-12 rounded-lg bg-gray-900 border border-white/10 p-2 flex items-center justify-center relative group">
            <img src={current} className="max-w-full max-h-full object-contain" />
            <button
              onClick={() => onUpload('')}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-950 border border-dashed border-white/20 flex items-center justify-center text-gray-600">
            <ImageIcon size={20} />
          </div>
        )}
        <label className="flex-1">
          <div className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 text-xs font-bold text-gray-400 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus size={16} />}
            {current ? 'Trocar Imagem' : 'Subir Arquivo'}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

const SettingsTab = ({ config, setConfig }: { config: SiteConfig, setConfig: any }) => {
  const [temp, setTemp] = useState(config);
  const [activeSub, setActiveSub] = useState<'geral' | 'seo' | 'construcao' | 'ia'>('geral');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await setConfig(temp);
    setSaving(false);
    alert('Settings saved!');
  };

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <aside className="space-y-2">
        <button onClick={() => setActiveSub('geral')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSub === 'geral' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>Identidade</button>
        <button onClick={() => setActiveSub('ia')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSub === 'ia' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>Artificial Intelligence</button>
        <button onClick={() => setActiveSub('seo')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSub === 'seo' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>SEO (Robots/Sitemap)</button>
        <button onClick={() => setActiveSub('construcao')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSub === 'construcao' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>Construction Page</button>
      </aside>

      <div className="lg:col-span-3 glass p-10 rounded-[2.5rem] border-white/5 space-y-8">
        {activeSub === 'geral' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Globe size={20} className="text-blue-500" /> Geral</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Site Name</label>
                <input type="text" value={temp.name} onChange={e => setTemp({ ...temp, name: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Logo (Sigla/Texto)</label>
                <input type="text" value={temp.logo} onChange={e => setTemp({ ...temp, logo: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <FileUpload
                label="Logo URL (Upload)"
                current={temp.logoUrl}
                onUpload={(b64) => setTemp({ ...temp, logoUrl: b64 })}
              />
              <FileUpload
                label="Favicon URL (Upload)"
                current={temp.faviconUrl}
                onUpload={(b64) => setTemp({ ...temp, faviconUrl: b64 })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Phone size={12} /> Phone Number</label>
                <input type="text" value={temp.phone} onChange={e => setTemp({ ...temp, phone: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Mail size={12} /> E-mail de Contato</label>
                <input type="text" value={temp.email} onChange={e => setTemp({ ...temp, email: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><MapPin size={12} /> Business/Home Address</label>
              <input type="text" value={temp.address} onChange={e => setTemp({ ...temp, address: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Instagram size={12} /> Instagram URL</label>
                <input type="text" value={temp.instagram} onChange={e => setTemp({ ...temp, instagram: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" placeholder="https://instagram.com/..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Facebook size={12} /> Facebook URL</label>
                <input type="text" value={temp.facebook} onChange={e => setTemp({ ...temp, facebook: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" placeholder="https://facebook.com/..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Linkedin size={12} /> LinkedIn URL</label>
                <input type="text" value={temp.linkedin} onChange={e => setTemp({ ...temp, linkedin: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </div>
        )}

        {activeSub === 'ia' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Cpu size={20} className="text-blue-500" /> Artificial Intelligence</h3>
            <p className="text-sm text-gray-500">Configure API keys and preferred model for automatic content generation.</p>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Preferred Model</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTemp({ ...temp, preferredAiModel: 'gemini' })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${temp.preferredAiModel === 'gemini' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-gray-950 hover:bg-white/5'}`}
                  >
                    <Sparkles className={temp.preferredAiModel === 'gemini' ? 'text-blue-500' : 'text-gray-600'} />
                    <span className="text-xs font-bold">Google Gemini (Pro)</span>
                  </button>
                  <button
                    onClick={() => setTemp({ ...temp, preferredAiModel: 'openai' })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${temp.preferredAiModel === 'openai' ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-gray-950 hover:bg-white/5'}`}
                  >
                    <Cpu className={temp.preferredAiModel === 'openai' ? 'text-green-500' : 'text-gray-600'} />
                    <span className="text-xs font-bold">OpenAI GPT-4 Turbo</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gemini API Key</label>
                  <input
                    type="password"
                    value={temp.geminiApiKey}
                    onChange={e => setTemp({ ...temp, geminiApiKey: e.target.value })}
                    className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none"
                    placeholder="Alza..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">OpenAI API Key</label>
                  <input
                    type="password"
                    value={temp.openaiApiKey}
                    onChange={e => setTemp({ ...temp, openaiApiKey: e.target.value })}
                    className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-green-500 outline-none"
                    placeholder="sk-..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSub === 'ia' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Cpu size={20} className="text-blue-500" /> Artificial Intelligence</h3>
            <p className="text-sm text-gray-500">Configure API keys and preferred model for automatic content generation.</p>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Preferred Model</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTemp({ ...temp, preferredAiModel: 'gemini' })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${temp.preferredAiModel === 'gemini' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-gray-950 hover:bg-white/5'}`}
                  >
                    <Sparkles className={temp.preferredAiModel === 'gemini' ? 'text-blue-500' : 'text-gray-600'} />
                    <span className="text-xs font-bold">Google Gemini (Pro)</span>
                  </button>
                  <button
                    onClick={() => setTemp({ ...temp, preferredAiModel: 'openai' })}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${temp.preferredAiModel === 'openai' ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-gray-950 hover:bg-white/5'}`}
                  >
                    <Cpu className={temp.preferredAiModel === 'openai' ? 'text-green-500' : 'text-gray-600'} />
                    <span className="text-xs font-bold">OpenAI GPT-4 Turbo</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gemini API Key</label>
                  <input
                    type="password"
                    value={temp.geminiApiKey}
                    onChange={e => setTemp({ ...temp, geminiApiKey: e.target.value })}
                    className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none"
                    placeholder="Alza..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">OpenAI API Key</label>
                  <input
                    type="password"
                    value={temp.openaiApiKey}
                    onChange={e => setTemp({ ...temp, openaiApiKey: e.target.value })}
                    className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-green-500 outline-none"
                    placeholder="sk-..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSub === 'seo' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><SearchCode size={20} className="text-purple-500" /> SEO & Rastreamento</h3>
            
            <div className="p-6 bg-purple-500/5 rounded-[2rem] border border-purple-500/10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-white">Sitemap Dinâmico</h4>
                  <p className="text-[10px] text-gray-500 max-w-xs">Gere o arquivo XML com todas as páginas, blog e portfólio para subir no Google Search Console.</p>
                </div>
                <button 
                  onClick={async () => {
                    const success = await saveSitemap();
                    if (success) alert('Sitemap gerado e baixado com sucesso! Agora você pode enviá-lo para o Google Search Console.');
                    else alert('Erro ao gerar sitemap.');
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-[10px] font-bold uppercase transition-all flex items-center gap-2"
                >
                  <RotateCcw size={12} /> Atualizar Sitemap
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><FileCode size={12} /> Robots.txt</label>
                <textarea
                  value={temp.robotsTxt}
                  onChange={e => setTemp({ ...temp, robotsTxt: e.target.value })}
                  className="w-full h-32 bg-gray-950 border border-white/10 rounded-xl p-4 font-mono text-xs focus:border-blue-500 outline-none resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">URL do Sitemap.xml</label>
                <input type="text" value={temp.sitemapUrl} onChange={e => setTemp({ ...temp, sitemapUrl: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
        )}

        {activeSub === 'construcao' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2"><ShieldAlert size={20} className="text-yellow-500" /> Modo Maintenance</h3>
              <button
                onClick={() => setTemp({ ...temp, maintenanceMode: !temp.maintenanceMode })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${temp.maintenanceMode ? 'bg-red-500 text-white' : 'glass text-gray-500'}`}
              >
                {temp.maintenanceMode ? 'Desativar Agora' : 'Ativar Agora'}
              </button>
            </div>
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Page Title (H1)</label>
                <input type="text" value={temp.maintenanceTitle} onChange={e => setTemp({ ...temp, maintenanceTitle: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mensagem de Apoio</label>
                <textarea
                  value={temp.maintenanceMessage}
                  onChange={e => setTemp({ ...temp, maintenanceMessage: e.target.value })}
                  className="w-full h-24 bg-gray-950 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-white/5 flex justify-end">
          <button disabled={saving} onClick={save} className="px-10 py-4 bg-white text-gray-950 rounded-2xl font-bold shadow-xl shadow-white/5 hover:scale-105 transition-all flex items-center gap-2">
            {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Salvar Tudo
          </button>
        </div>
      </div>
    </div>
  );
};

const ProposalsTab = ({ proposals, setProposals, config, transactions, setTransactions }: { proposals: Proposal[], setProposals: any, config: SiteConfig, transactions: Transaction[], setTransactions: any }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [newProp, setNewProp] = useState<Omit<Proposal, 'id' | 'date' | 'status'>>({
    clientName: '', clientEmail: '', title: '', description: '', value: 0
  });

  const generateAIProposal = async () => {
    if (!config.geminiApiKey && !config.openaiApiKey) {
      alert('Configure an API key in settings first.');
      return;
    }
    if (!newProp.title) {
      alert('Dê um título/serviço para a proposta primeiro.');
      return;
    }

    setIsGenerating(true);
    const prompt = `Crie uma proposta comercial profissional para o serviço: "${newProp.title}". 
    Descrição adicional: "${newProp.description}". 
    O valor é: R$ ${newProp.value}.
    A empresa que presta o serviço é a ${config.name}.
    A proposta deve conter: Introdução, Escopo detalhado, Cronograma sugerido, Investimento e Próximos passos.
    Responda em Markdown elegante.`;

    try {
      let content = '';
      if (config.preferredAiModel === 'gemini') {
        const ai = new GoogleGenAI({ apiKey: config.geminiApiKey || '' });
        const result = await ai.models.generateContent({
          model: "gemini-pro",
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        content = result.text || '';
      } else {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.openaiApiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "user", content: prompt }]
          })
        });
        const result = await resp.json();
        content = result.choices[0].message.content;
      }
      setNewProp({ ...newProp, description: content });
    } catch (e) {
      console.error(e);
      alert('Erro ao gerar proposta com IA.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAdd = async () => {
    const item = { ...newProp, status: 'Pendente', date: new Date().toISOString() };
    const { data } = await supabase.from('proposals').insert([item]).select().single();
    if (data) {
      setProposals([data, ...proposals]);
      setShowAdd(false);
      setNewProp({ clientName: '', clientEmail: '', title: '', description: '', value: 0 });
    }
  };

  const exportPDF = (proposal: Proposal) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(3, 7, 18);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(config.name, 20, 25);

    doc.setFontSize(10);
    doc.text("PROPOSTA COMERCIAL", 150, 25);

    // Client Info
    doc.setTextColor(3, 7, 18);
    doc.setFontSize(12);
    doc.text("Para:", 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(proposal.clientName, 20, 62);
    doc.text(proposal.clientEmail, 20, 68);

    doc.setFont("helvetica", "bold");
    doc.text("Data:", 150, 55);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(proposal.date).toLocaleDateString(), 150, 62);

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(proposal.title, 20, 85);
    doc.setDrawColor(59, 130, 246);
    doc.line(20, 88, 190, 88);

    // Content
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const splitText = doc.splitTextToSize(proposal.description, 170);
    doc.text(splitText, 20, 100);

    // Value
    const finalY = (splitText.length * 5) + 110;
    doc.setFillColor(243, 244, 246);
    doc.rect(20, finalY, 170, 20, 'F');
    doc.setFont("helvetica", "bold");
    doc.text(`VALOR TOTAL: R$ ${Number(proposal.value).toLocaleString('pt-BR')}`, 25, finalY + 13);

    doc.save(`Proposta_${proposal.clientName.replace(/\s/g, '_')}.pdf`);
  };

  const handleUpdate = async (id: string, status: any) => {
    const { error } = await supabase.from('proposals').update({ status }).eq('id', id);
    if (!error) {
      setProposals(proposals.map(p => p.id === id ? { ...p, status } : p));

      // Se for aceita, cria transação no financeiro
      if (status === 'Aceita') {
        const prop = proposals.find(p => p.id === id);
        if (prop) {
          const trans = {
            proposal_id: prop.id,
            client_name: prop.clientName,
            description: `Serviço: ${prop.title}`,
            amount: prop.value,
            type: 'Revenue' as const,
            date: new Date().toISOString()
          };
          const { data: newTrans } = await supabase.from('transactions').insert([trans]).select().single();
          if (newTrans) {
            setTransactions([newTrans, ...transactions]);
            alert('Proposta marcada como GANHA! Lançamento gerado no financeiro.');
          }
        }
      }
    }
  };

  const updateProposal = async () => {
    if (!editingProposal) return;
    const { error } = await supabase.from('proposals').update({
      clientName: editingProposal.clientName,
      clientEmail: editingProposal.clientEmail,
      title: editingProposal.title,
      description: editingProposal.description,
      value: editingProposal.value
    }).eq('id', editingProposal.id);

    if (!error) {
      setProposals(proposals.map(p => p.id === editingProposal.id ? editingProposal : p));
      setEditingProposal(null);
      alert('Proposta atualizada com sucesso!');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete proposta?')) {
      await supabase.from('proposals').delete().eq('id', id);
      setProposals(proposals.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in transition-all">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Gestão de Propostas Comerciais</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg"
        >
          {showAdd ? <X size={20} /> : <Plus size={20} />}
          {showAdd ? 'Cancelar' : 'Nova Proposta'}
        </button>
      </div>

      {showAdd && (
        <div className="glass p-8 rounded-[2rem] border-white/5 bg-white/5 grid md:grid-cols-2 gap-6 scale-in-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Informações do Cliente</label>
              <input type="text" placeholder="Nome do Cliente" value={newProp.clientName} onChange={e => setNewProp({ ...newProp, clientName: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              <input type="email" placeholder="E-mail do Cliente" value={newProp.clientEmail} onChange={e => setNewProp({ ...newProp, clientEmail: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Detalhes do Serviço</label>
              <input type="text" placeholder="Title do Serviço (ex: Gestão de Tráfego)" value={newProp.title} onChange={e => setNewProp({ ...newProp, title: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
              <input type="number" placeholder="Valor (R$)" value={newProp.value} onChange={e => setNewProp({ ...newProp, value: Number(e.target.value) })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Descrição da Proposta</label>
              <button
                onClick={generateAIProposal}
                disabled={isGenerating}
                className="flex items-center gap-1 text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors"
              >
                {isGenerating ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                GERAR COM IA
              </button>
            </div>
            <textarea placeholder="Descreva o serviço ou use a IA para gerar o texto completo..." value={newProp.description} onChange={e => setNewProp({ ...newProp, description: e.target.value })} className="w-full h-40 bg-gray-950 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none resize-none custom-scrollbar" />
            <button onClick={handleAdd} className="w-full py-4 bg-white text-gray-950 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
              <Save size={18} /> Salvar Proposta no Sistema
            </button>
          </div>
        </div>
      )}

      <div className="glass rounded-3xl border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-950/50 text-gray-500 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="px-8 py-6">Cliente / Title</th>
              <th className="px-8 py-6">Valor</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {proposals.map(p => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-5">
                  <p className="font-bold text-sm text-white">{p.clientName}</p>
                  <p className="text-xs text-gray-500">{p.title}</p>
                </td>
                <td className="px-8 py-5 text-sm font-mono text-green-400">R$ {Number(p.value).toLocaleString('pt-BR')}</td>
                <td className="px-8 py-5">
                  <select
                    value={p.status}
                    onChange={(e) => handleUpdate(p.id, e.target.value as any)}
                    className={`bg-gray-950 border border-white/10 rounded-lg px-3 py-1 text-[10px] font-bold uppercase outline-none transition-all ${p.status === 'Aceita' ? 'text-green-500 border-green-500/30 bg-green-500/5' :
                      p.status === 'Recusada' ? 'text-red-500' : 'text-gray-400'
                      }`}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Enviada">Enviada</option>
                    <option value="Aceita">Aceita</option>
                    <option value="Recusada">Recusada</option>
                  </select>
                </td>
                <td className="px-8 py-5 text-right flex justify-end gap-2">
                  <button onClick={() => setEditingProposal(p)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Edit Proposta">
                    <FileSignature size={16} />
                  </button>
                  <button onClick={() => exportPDF(p)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Baixar PDF">
                    <FileDown size={16} />
                  </button>
                  <button onClick={() => window.open(`mailto:${p.clientEmail}?subject=Proposta: ${p.title}&body=Olá ${p.clientName}, segue nossa proposta para ${p.title} no valor de R$ ${p.value}.`)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <Mail size={16} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProposal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] border-white/10 flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gray-950/50">
              <h3 className="text-xl font-bold flex items-center gap-2"><FileSignature className="text-blue-500" /> Edit Proposta Comercial</h3>
              <button onClick={() => setEditingProposal(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar bg-[#030712]/50">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Informações do Cliente</label>
                    <input type="text" value={editingProposal.clientName} onChange={e => setEditingProposal({ ...editingProposal, clientName: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
                    <input type="email" value={editingProposal.clientEmail} onChange={e => setEditingProposal({ ...editingProposal, clientEmail: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Detalhes do Serviço</label>
                    <input type="text" value={editingProposal.title} onChange={e => setEditingProposal({ ...editingProposal, title: e.target.value })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
                    <input type="number" value={editingProposal.value} onChange={e => setEditingProposal({ ...editingProposal, value: Number(e.target.value) })} className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-2 flex flex-col">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Descrição Completa</label>
                  <textarea value={editingProposal.description} onChange={e => setEditingProposal({ ...editingProposal, description: e.target.value })} className="flex-1 min-h-[15rem] bg-gray-950 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none resize-none custom-scrollbar" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-gray-950/50 flex justify-end gap-4">
              <button onClick={() => setEditingProposal(null)} className="px-8 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-white transition-colors">Descartar</button>
              <button onClick={updateProposal} className="px-10 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FinanceTab = ({ transactions, setTransactions }: { transactions: Transaction[], setTransactions: any }) => {
  const receitas = transactions.filter(t => t.type === 'Revenue').reduce((acc, t) => acc + Number(t.amount), 0);
  const despesas = transactions.filter(t => t.type === 'Despesa').reduce((acc, t) => acc + Number(t.amount), 0);
  const saldo = receitas - despesas;

  const handleDelete = async (id: string) => {
    if (confirm('Delete esta transação? Isso não afetará a proposta original.')) {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (!error) {
        setTransactions(transactions.filter(t => t.id !== id));
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in transition-all">
      <div className="grid grid-cols-3 gap-6">
        <div className="glass p-8 rounded-[2rem] border-white/5 bg-gradient-to-br from-green-600/10 to-transparent">
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-2">Total Revenues</p>
          <h4 className="text-3xl font-black text-white">R$ {receitas.toLocaleString('pt-BR')}</h4>
        </div>
        <div className="glass p-8 rounded-[2rem] border-white/5 bg-gradient-to-br from-red-600/10 to-transparent">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-2">Total Despesas</p>
          <h4 className="text-3xl font-black text-white">R$ {despesas.toLocaleString('pt-BR')}</h4>
        </div>
        <div className="glass p-8 rounded-[2rem] border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent shadow-xl shadow-blue-900/10">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Saldo em Caixa</p>
          <h4 className="text-3xl font-black text-white">R$ {saldo.toLocaleString('pt-BR')}</h4>
        </div>
      </div>

      <div className="glass rounded-3xl border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gray-950/20">
          <h3 className="font-bold flex items-center gap-2"><ListOrdered size={16} className="text-blue-500" /> Histórico de Movimentações</h3>
          <button className="px-4 py-2 glass rounded-lg text-[10px] font-bold uppercase tracking-widest hover:text-blue-400 transition-all">Exportar Excel</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-950/50 text-gray-500 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="px-8 py-6">Data</th>
              <th className="px-8 py-6">Cliente / Descrição</th>
              <th className="px-8 py-6">Valor</th>
              <th className="px-8 py-6">Tipo</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.map(t => (
              <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-5 text-xs text-gray-500 font-mono">
                  {new Date(t.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-8 py-5">
                  <p className="font-bold text-sm text-white">{t.client_name}</p>
                  <p className="text-xs text-gray-500">{t.description}</p>
                </td>
                <td className={`px-8 py-5 text-sm font-mono font-bold ${t.type === 'Revenue' ? 'text-green-400' : 'text-red-400'}`}>
                  {t.type === 'Revenue' ? '+' : '-'} R$ {Number(t.amount).toLocaleString('pt-BR')}
                </td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${t.type === 'Revenue' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                    'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                    {t.type}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-10 text-center text-gray-500 italic">Nenhuma transação registrada ainda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
