
import React from 'react';
import {
    Rocket,
    Users,
    Video,
    Calendar,
    ArrowRight,
    Star,
    TrendingUp,
    Zap,
    CheckCircle2,
    ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './components/ui/card';
import { Spotlight } from './components/ui/spotlight';

const LancamentosPage = ({ onBack, onContact }: { onBack: () => void, onContact: () => void }) => {
    const features = [
        {
            icon: <Rocket className="text-blue-500" />,
            title: "Estratégia 360",
            description: "Do planejamento do infoproduto à estruturação do funil de vendas."
        },
        {
            icon: <Video className="text-purple-500" />,
            title: "Digital & Híbrido",
            description: "Cursos online, mentorias e eventos presenciais de alto impacto."
        },
        {
            icon: <TrendingUp className="text-green-500" />,
            title: "Tráfego Escalável",
            description: "Gestão estratégica de anúncios para atrair sua audiência qualificada."
        },
        {
            icon: <Zap className="text-yellow-500" />,
            title: "Automação de Vendas",
            description: "Sistemas que vendem enquanto você foca no seu conteúdo."
        }
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-blue-500/30">
            {/* Background Decorative */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[100px] rounded-full"></div>
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/50 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Home
                </button>
                <span className="text-xl font-black uppercase tracking-tighter">
                    2TIME<span className="text-blue-500">LAUNCH</span>
                </span>
                <button
                    onClick={onContact}
                    className="px-6 py-2 bg-blue-600 rounded-full text-xs font-black uppercase tracking-widest"
                >
                    Seja um Lançado
                </button>
            </nav>

            <main className="pt-32 pb-24 px-6">
                {/* Hero */}
                <section className="max-w-7xl mx-auto text-center mb-32 relative">
                    <Spotlight className="-top-20 left-1/2 -translate-x-1/2 opacity-50" fill="rgba(168, 85, 247, 0.2)" />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                            <Star size={12} className="fill-purple-500" /> Especialistas em High-Ticket
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight">
                            Transforme sua Audiência em um <br />
                            <span className="gradient-text italic">Império de Educação.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Somos o braço tecnológico e estratégico de influenciadores que buscam lançar cursos, mentorias e eventos presenciais com estrutura de escala global.
                        </p>
                        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={onContact}
                                className="px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-purple-900/40 flex items-center justify-center gap-2 group"
                            >
                                Quero ser Lançado pela 2Time <Rocket className="group-hover:translate-y-[-2px] transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* Cursos Presenciais vs Digitais */}
                <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-32">
                    <Card className="p-10 border-white/5 bg-gray-900/50 hover:border-blue-500/20 transition-all flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500">
                            <Video size={32} />
                        </div>
                        <h3 className="text-2xl font-black mb-4">Cursos & CPLs Digitais</h3>
                        <p className="text-gray-500 mb-8">Estruturamos toda a jornada do aluno, plataforma de membros, edição estratégica e funis perpétuos ou de lançamento clássico.</p>
                        <ul className="text-sm text-gray-400 space-y-2 mt-auto">
                            <li>• Lançamentos Meteoricos/Internos</li>
                            <li>• Estrutura de VSL e Scripting</li>
                            <li>• Hospedagem em Áreas de Membros VIP</li>
                        </ul>
                    </Card>

                    <Card className="p-10 border-white/5 bg-gray-900/50 hover:border-purple-500/20 transition-all flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-500">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-2xl font-black mb-4">Eventos Presenciais</h3>
                        <p className="text-gray-500 mb-8">Do check-in à experiência no palco. Organizamos a tecnologia por trás de ingressos, networking e conversão presencial.</p>
                        <ul className="text-sm text-gray-400 space-y-2 mt-auto">
                            <li>• Gestão de Check-in em Tempo Real</li>
                            <li>• Landing Pages de Alta Conversão</li>
                            <li>• Funis de Up-sell Presencial</li>
                        </ul>
                    </Card>
                </section>

                {/* Benefits Grid */}
                <section className="max-w-7xl mx-auto mb-32">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-black">Nosso Diferencial Tecnológico</h2>
                        <p className="text-gray-500">O que nos afasta das agências de lançamento comuns.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="p-8 glass rounded-[2.5rem] space-y-4 border-white/5 hover:bg-white/5 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center border border-white/10">
                                    {f.icon}
                                </div>
                                <h4 className="font-bold text-white">{f.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action Final */}
                <section className="max-w-4xl mx-auto text-center">
                    <div className="p-16 glass rounded-[3rem] border-purple-500/20 bg-purple-600/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10"><Rocket size={100} /></div>
                        <h2 className="text-4xl font-black mb-6">Pronto para o Próximo Nível?</h2>
                        <p className="text-gray-400 mb-10 text-lg">Se você tem audiência e quer transformá-la em um negócio escalável, temos a tecnologia e a estratégia que você precisa.</p>
                        <button
                            onClick={onContact}
                            className="px-12 py-5 bg-white text-gray-950 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
                        >
                            Agendar Consultoria de Lançamento
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LancamentosPage;
