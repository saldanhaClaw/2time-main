
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Send,
    ChevronRight,
    Star,
    Zap,
    Shield,
    Rocket,
    Bot,
    Globe,
    Layers,
    Cpu,
    Layout,
    ShoppingCart,
    Search,
    TrendingUp,
    Settings,
    Workflow,
    Sparkles,
    Loader2
} from 'lucide-react';
import { Spotlight } from "@/components/ui/spotlight";
import { Card } from "@/components/ui/card";

interface ServiceContent {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    benefits: { title: string; desc: string }[];
    image: string;
}

export const SERVICES_DATA: Record<string, ServiceContent> = {
    'seo': {
        id: 'seo',
        title: 'SEO Estratégico & Autoridade',
        subtitle: 'Domine a primeira página do Google',
        description: 'Transformamos seu site em uma máquina de vendas orgânicas com estratégias avançadas de SEO on-page, técnico e link building de alta autoridade.',
        icon: <Search className="w-8 h-8 text-blue-500" />,
        features: ['Auditoria Técnica Completa', 'Pesquisa de Keywords de Intenção', 'Otimização de Performance (Core Web Vitals)', 'Estratégia de Content Semântico'],
        benefits: [
            { title: 'Tráfego Qualificado', desc: 'Atraia pessoas que já estão procurando pelo seu serviço.' },
            { title: 'Custo Zero por Clique', desc: 'Reduza sua dependência de anúncios pagos a longo prazo.' },
            { title: 'Autoridade de Marca', desc: 'Seja reconhecido como o líder do seu segmento.' }
        ],
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'
    },
    'paginas': {
        id: 'paginas',
        title: 'Landing Pages de Alta Conversão',
        subtitle: 'Transforme visitantes em clientes',
        description: 'Criamos páginas focadas 100% em conversão, utilizando gatilhos mentais, design premium e copywriting persuasivo.',
        icon: <Layout className="w-8 h-8 text-purple-500" />,
        features: ['Design UI/UX Premium', 'Copywriting Persuasivo', 'Velocidade de Carregamento Ultra-rápida', 'Scripts de Rastreamento Instalados'],
        benefits: [
            { title: 'ROI Elevado', desc: 'Páginas que vendem mais com o mesmo investimento em tráfego.' },
            { title: 'Mobile First', desc: 'Experiência perfeita em smartphones e tablets.' },
            { title: 'Credibilidade Instatânea', desc: 'Um design que passa confiança logo no primeiro segundo.' }
        ],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
    },
    'assessoria': {
        id: 'assessoria',
        title: 'Assessoria de Marketing 360°',
        subtitle: 'Crescimento estruturado e previsível',
        description: 'Uma consultoria completa que atua no planejamento, execução e análise de todo o seu ecossistema digital.',
        icon: <TrendingUp className="w-8 h-8 text-green-500" />,
        features: ['Planejamento Estratégico Mensal', 'Análise de Funil de Vendas', 'Gestão de CRM e Leads', 'Relatórios de BI em Tempo Real'],
        benefits: [
            { title: 'Visão de Especialista', desc: 'Tenha um time de alto nível cuidando da sua estratégia.' },
            { title: 'Previsibilidade', desc: 'Saiba exatamente de onde vem cada centavo de lucro.' },
            { title: 'Escalabilidade', desc: 'Processos prontos para suportar o crescimento do seu negócio.' }
        ],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200'
    },
    'trafego': {
        id: 'trafego',
        title: 'Gestão de Tráfego Pago',
        subtitle: 'Escalando suas vendas com precisão',
        description: 'Google Ads, Meta Ads e TikTok Ads geridos por quem entende de ROI e performance real, não apenas métricas de vaidade.',
        icon: <Rocket className="w-8 h-8 text-orange-500" />,
        features: ['Configuração de Pixel e API', 'Testes A/B de Criativos', 'Retargeting Estratégico', 'Otimização Diária de Lances'],
        benefits: [
            { title: 'Lances Inteligentes', desc: 'Algoritmos configurados para buscar a melhor conversão.' },
            { title: 'Segmentação Laser', desc: 'Apareça para quem realmente tem potencial de compra.' },
            { title: 'Escalabilidade Rápida', desc: 'Aumente o faturamento de forma acelerada.' }
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
    },
    'atendimento-ia': {
        id: 'atendimento-ia',
        title: 'Automação de Atendimento com IA',
        subtitle: 'Seu time atendendo 24/7 sem cansar',
        description: 'We implement intelligent virtual agents on WhatsApp and Website that qualify leads and schedule meetings automatically.',
        icon: <Bot className="w-8 h-8 text-indigo-500" />,
        features: ['Integração com GPT-4', 'Atendimento Humanizado', 'Agendamento Direto no Calendário', 'Transferência para Humano Se Necessário'],
        benefits: [
            { title: 'Resposta Instantânea', desc: 'Não perca nenhum lead por demora no atendimento.' },
            { title: 'Redução de Custos', desc: 'Diminua drasticamente sua necessidade de equipe de suporte.' },
            { title: 'Qualificação Automática', desc: 'Seu time só fala com leads prontos para comprar.' }
        ],
        image: 'https://images.unsplash.com/photo-1531746790731-6c2079ee396f?auto=format&fit=crop&q=80&w=1200'
    },
    'processos': {
        id: 'processos',
        title: 'Automação de Processos (BPM)',
        subtitle: 'Sua empresa no piloto automático',
        description: 'Conectamos suas ferramentas (CRMs, Planilhas, ERPs) para eliminar tarefas manuais e erros humanos.',
        icon: <Workflow className="w-8 h-8 text-cyan-500" />,
        features: ['Integrations via Make/Zapier', 'Dashboard de Monitoramento', 'Relatórios Automáticos', 'Webhooks Personalizados'],
        benefits: [
            { title: 'Eficiência Operacional', desc: 'Faça mais com menos tempo e recursos.' },
            { title: 'Zero Erros', desc: 'Sistemas não esquecem de enviar e-mails ou atualizar dados.' },
            { title: 'Foco no Core Business', desc: 'Deixe as tarefas chatas para as máquinas.' }
        ],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'
    },
    'sistemas': {
        id: 'sistemas',
        title: 'Sistemas Personalizados & Apps',
        subtitle: 'Tecnologia sob medida para seu desafio',
        description: 'Desenvolvemos do zero sistemas web e plataformas complexas que resolvem problemas específicos do seu negócio.',
        icon: <Cpu className="w-8 h-8 text-red-500" />,
        features: ['Arquitetura Escalável', 'Segurança Bancária', 'Painéis Administrativos', 'APIs Robustas'],
        benefits: [
            { title: 'Ativo de Valor', desc: 'Sua empresa passa a ter uma tecnologia própria e valiosa.' },
            { title: 'Liberdade Total', desc: 'Sem mensalidades astronômicas de sistemas engessados.' },
            { title: 'Integração Nativa', desc: 'Tudo conversa entre si de forma fluida.' }
        ],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200'
    },
    'ecommerce': {
        id: 'ecommerce',
        title: 'E-commerce de Alta Performance',
        subtitle: 'Venda online com escala e segurança',
        description: 'Lojas virtuais modernas, rápidas e otimizadas para converter visitantes em compradores recorrentes.',
        icon: <ShoppingCart className="w-8 h-8 text-yellow-500" />,
        features: ['Checkout Otimizado', 'Recuperação de Carrinho', 'Gestão de Estoque IA', 'Relatórios de Vendas Detalhados'],
        benefits: [
            { title: 'Experiência de Compra', desc: 'Seus clientes vão amar comprar na sua loja.' },
            { title: 'Velocidade Extrema', desc: 'Otimizado para não perder nenhuma venda por lentidão.' },
            { title: 'Escalabilidade', desc: 'Pronto para Black Friday e picos de tráfego.' }
        ],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200'
    }
};

interface ServicePageProps {
    serviceId: string;
    onBack: () => void;
    onSubmitLead: (data: any) => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ serviceId, onBack, onSubmitLead }) => {
    const content = SERVICES_DATA[serviceId];
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', enterprise: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!content) return <div>Serviço não encontrado.</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmitLead({ ...formData, interest: content.title });
        setLoading(false);
        setSuccess(true);
    };

    return (
        <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(59, 130, 246, 0.2)" />

            <header className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Voltar para Home
                    </motion.button>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                                <Sparkles size={12} /> Tecnologia de Ponta
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                {content.title}
                            </h1>
                            <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium">
                                {content.description}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {content.features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <img src={content.image} className="w-full h-full object-cover" alt={content.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl border-white/5">
                                <p className="text-sm font-bold text-gray-400 uppercase mb-2">Impacto Real</p>
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-2xl font-black text-white">+85%</p>
                                        <p className="text-[10px] text-gray-500 uppercase">Conversão</p>
                                    </div>
                                    <div className="border-l border-white/10 pl-8">
                                        <p className="text-2xl font-black text-white">-40%</p>
                                        <p className="text-[10px] text-gray-500 uppercase">Custo Op.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Por que escolher nossa solução?</h2>
                        <p className="text-gray-500">Benefícios reais para quem busca escala e tecnologia.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {content.benefits.map((benefit, i) => (
                            <Card key={i} className="p-8 border-white/5 bg-gray-950/50 hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Zap size={24} />
                                </div>
                                <h4 className="text-xl font-bold mb-4">{benefit.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 pb-40">
                <div className="container mx-auto max-w-5xl">
                    <div className="glass rounded-[3rem] border-white/10 overflow-hidden grid lg:grid-cols-5 shadow-2xl">
                        <div className="lg:col-span-2 bg-blue-600 p-12 flex flex-col justify-center text-white space-y-6">
                            <h3 className="text-3xl font-black">Vamos Começar?</h3>
                            <p className="text-blue-100 font-medium">Preencha o formulário e um especialista em {content.title} entrará em contato em menos de 15 minutos.</p>

                            <div className="space-y-4 pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><CheckCircle2 size={16} /></div>
                                    <p className="text-sm font-bold">Consultoria Inicial Gratuita</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><CheckCircle2 size={16} /></div>
                                    <p className="text-sm font-bold">Análise de GAP de Tecnologia</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 p-12 bg-gray-950 relative overflow-hidden">
                            {success ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold mb-2">Recebemos sua Mensagem!</h4>
                                        <p className="text-gray-400">A specialist will contact you shortly via WhatsApp or Email.</p>
                                    </div>
                                    <button onClick={onBack} className="px-8 py-3 glass rounded-xl text-sm font-bold">Voltar para Home</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Seu nome"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Corporate Email</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="seu@nome.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">WhatsApp</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="(00) 00000-0000"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Empresa</label>
                                            <input
                                                type="text"
                                                value={formData.enterprise}
                                                onChange={e => setFormData({ ...formData, enterprise: e.target.value })}
                                                placeholder="Nome da empresa"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        disabled={loading}
                                        className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50 mt-4"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Solicitar Proposta de {content.title}</>}
                                    </button>
                                    <p className="text-[10px] text-gray-600 text-center mt-4">Ao enviar, você aceita nossa política de privacidade e LGPD.</p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
