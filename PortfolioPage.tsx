
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Search,
    ExternalLink,
    Filter,
    Code2,
    Cpu,
    Globe,
    TrendingUp,
    Layout
} from 'lucide-react';
import { PortfolioItem } from './types';

interface PortfolioPageProps {
    portfolio: PortfolioItem[];
    onBack: () => void;
}

const categories = [
    'All',
    'Assessorias',
    'Sistemas',
    'Automations',
    'Sites',
    'SEO'
];

const categoryIcons: Record<string, React.ReactNode> = {
    'Assessorias': <Cpu size={16} />,
    'Sistemas': <Code2 size={16} />,
    'Automations': <Cpu size={16} />,
    'Sites': <Globe size={16} />,
    'SEO': <TrendingUp size={16} />
};

const PortfolioPage: React.FC<PortfolioPageProps> = ({ portfolio, onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPortfolio = portfolio.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#030712] text-gray-100 font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 bg-gray-950/50">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Home
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar projeto..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-6 py-2 text-sm focus:border-blue-500 outline-none w-64 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                            Nossos Cases
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Portfolio de <br />
                            <span className="gradient-text italic">Engenharia Digital.</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                            Explore os ecossistemas que construímos para empresas que buscam escala, automação e presença digital de alto impacto.
                        </p>
                    </div>

                    {/* Categories Filter */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${selectedCategory === cat
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                                    }`}
                            >
                                {categoryIcons[cat]}
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Grid */}
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredPortfolio.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative glass rounded-[2.5rem] overflow-hidden border-white/5 bg-white/5 hover:border-blue-500/20 transition-all flex flex-col h-full"
                                >
                                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-900">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute top-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-black"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                            {item.description}
                                        </p>

                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-blue-400 transition-colors"
                                            >
                                                Ver Projeto Live <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredPortfolio.length === 0 && (
                        <div className="text-center py-32 space-y-6 animate-in fade-in zoom-in">
                            <div className="w-20 h-20 bg-gray-950 rounded-full flex items-center justify-center mx-auto border border-white/5">
                                <Search size={32} className="text-gray-700" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">Nenhum projeto encontrado</h3>
                                <p className="text-gray-500">Tente ajustar seus filtros ou busca.</p>
                            </div>
                            <button
                                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                                className="text-blue-500 font-bold hover:underline"
                            >
                                Limpar todos os filtros
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Branding */}
            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.2em]">
                    © 2024 2TimeWeb Digital Systems Studio
                </p>
            </footer>
        </div>
    );
};

export default PortfolioPage;
