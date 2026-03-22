
import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Calendar,
    User,
    ArrowRight,
    Clock,
    Search,
    Tag,
    Globe,
    Sparkles
} from 'lucide-react';
import { BlogPost, QueueItem } from './types';
import { Card } from './components/ui/card';

const BlogPage = ({
    posts,
    queue,
    onBack,
    onReadPost
}: {
    posts: BlogPost[],
    queue: QueueItem[],
    onBack: () => void,
    onReadPost: (post: BlogPost) => void
}) => {
    const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-[#030712] text-gray-100">
                <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
                    <button
                        onClick={() => setSelectedPost(null)}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={18} /> Voltar ao Blog
                    </button>
                    <span className="text-xl font-black uppercase tracking-tighter">
                        2TIME<span className="text-blue-500">BLOG</span>
                    </span>
                    <div className="w-24"></div>
                </nav>

                <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {selectedPost.featured_image && (
                            <div className="w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                <img src={selectedPost.featured_image} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="flex items-center gap-4 text-xs font-bold text-blue-500 uppercase tracking-widest">
                            <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                            <span>Por {selectedPost.author}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
                            {selectedPost.title}
                        </h1>

                        <div className="prose prose-invert prose-blue max-w-none">
                            <div className="text-gray-400 leading-relaxed text-lg space-y-6">
                                {selectedPost.content.split('\n').map((para, i) => {
                                    if (para.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-white mt-8 mb-4">{para.replace('# ', '')}</h1>;
                                    if (para.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{para.replace('## ', '')}</h2>;
                                    if (para.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-2">{para.replace('### ', '')}</h3>;
                                    if (para.startsWith('- ')) return <li key={i} className="ml-4 list-disc">{para.replace('- ', '')}</li>;
                                    return <p key={i}>{para}</p>;
                                })}
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030712] text-gray-100">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronLeft size={18} /> Home
                </button>
                <span className="text-xl font-black uppercase tracking-tighter">
                    2TIME<span className="text-blue-500">BLOG</span>
                </span>
                <button className="p-2 glass rounded-full text-gray-400">
                    <Search size={18} />
                </button>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <section className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                            Insights em <span className="text-blue-500 italic">Tecnologia.</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Exploramos as fronteiras da Artificial Intelligence, Engenharia de Software e Escala Digital.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {/* SECTION 1: PUBLISHED POSTS */}
                        {posts.filter(p => p.status === 'Published').length > 0 && (
                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5"></div>
                                    <h2 className="text-sm font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                                        <Globe size={14} /> Artigos Publisheds
                                    </h2>
                                    <div className="h-px flex-1 bg-white/5"></div>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {posts.filter(p => p.status === 'Published').map((post, i) => (
                                        <motion.div
                                            key={post.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Card
                                                onClick={() => setSelectedPost(post)}
                                                className="group h-full flex flex-col border-white/5 bg-gray-900/40 hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden p-0"
                                            >
                                                <div className="aspect-video bg-gray-950 relative overflow-hidden">
                                                    {post.featured_image ? (
                                                        <img
                                                            src={post.featured_image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:scale-110 transition-transform duration-700"></div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                                </div>
                                                <div className="p-8 space-y-4 flex-1 flex flex-col">
                                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Published</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-1">
                                                        {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
                                                    </p>
                                                    <div className="pt-4 flex items-center gap-2 text-xs font-black text-white uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                                        Ler Artigo <ArrowRight size={14} className="text-blue-500" />
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECTION 2: DRAFTS (COMING SOON) */}
                        {posts.filter(p => !p.status || p.status === 'Draft').length > 0 && (
                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5"></div>
                                    <h2 className="text-sm font-black uppercase tracking-widest text-yellow-500 flex items-center gap-2">
                                        <Tag size={14} /> Coming Soon / Under Review
                                    </h2>
                                    <div className="h-px flex-1 bg-white/5"></div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {posts.filter(p => !p.status || p.status === 'Draft').map((post) => (
                                        <div key={post.id} className="glass p-8 rounded-[2rem] border-white/5 bg-gray-950/50 space-y-4 opacity-70 grayscale hover:grayscale-0 transition-all hover:opacity-100 group border-dashed">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500/50">Curadoria Editorial</span>
                                                <Clock size={16} className="text-gray-700" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors capitalize">{post.title.toLowerCase()}</h3>
                                            <p className="text-[11px] text-gray-600 italic">Content in final technical review phase.</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECTION 3: QUEUE (IDEA STAGE) */}
                        {queue.filter(q => q.status !== 'Completed').length > 0 && (
                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5"></div>
                                    <h2 className="text-sm font-black uppercase tracking-widest text-purple-500 flex items-center gap-2">
                                        <Sparkles size={14} /> AI Production Queue
                                    </h2>
                                    <div className="h-px flex-1 bg-white/5"></div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {queue.filter(q => q.status !== 'Completed').map((item) => (
                                        <div key={item.id} className="px-5 py-3 bg-white/5 border border-white/5 rounded-full flex items-center gap-3 group hover:bg-white/10 transition-all">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Processando' ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'}`}></div>
                                            <span className="text-xs font-bold text-gray-500 group-hover:text-purple-400 transition-colors">{item.keyword}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {posts.length === 0 && queue.length === 0 && (
                            <div className="text-center py-24 glass rounded-[3rem] border-white/5">
                                <p className="text-gray-500 font-bold italic">No insights available at the moment. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BlogPage;
