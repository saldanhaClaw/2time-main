"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface Portfolio3DCarouselProps {
    items: PortfolioItem[];
}

export function Portfolio3DCarousel({ items }: Portfolio3DCarouselProps) {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const displayItems = items.slice(0, 5);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % displayItems.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [displayItems.length, isHovered]);

    const getPosition = (itemIndex: number) => {
        const diff = (itemIndex - index + displayItems.length) % displayItems.length;
        return diff;
    };

    const variants = {
        0: { // Front
            x: "0%",
            z: 150,
            scale: 1,
            opacity: 1,
            zIndex: 20,
            rotateY: 0,
            filter: "blur(0px)",
        },
        1: { // Right 1
            x: "50%",
            z: 0,
            scale: 0.85,
            opacity: 0.7,
            zIndex: 15,
            rotateY: -30,
            filter: "blur(1px)",
        },
        2: { // Right 2 (back)
            x: "25%",
            z: -150,
            scale: 0.7,
            opacity: 0.3,
            zIndex: 10,
            rotateY: -45,
            filter: "blur(4px)",
        },
        3: { // Left 2 (back)
            x: "-25%",
            z: -150,
            scale: 0.7,
            opacity: 0.3,
            zIndex: 10,
            rotateY: 45,
            filter: "blur(4px)",
        },
        4: { // Left 1
            x: "-50%",
            z: 0,
            scale: 0.85,
            opacity: 0.7,
            zIndex: 15,
            rotateY: 30,
            filter: "blur(1px)",
        },
    };

    if (displayItems.length === 0) return null;

    return (
        <div 
            className="relative h-[600px] w-full flex items-center justify-center perspective-1000 overflow-visible py-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
            
            <div className="relative w-full max-w-[450px] h-[350px] preserve-3d">
                <AnimatePresence initial={false}>
                    {displayItems.map((item, i) => {
                        const pos = getPosition(i);
                        return (
                            <motion.div
                                key={item.id}
                                initial={false}
                                animate={variants[pos as keyof typeof variants]}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 260, 
                                    damping: 30,
                                    mass: 1
                                }}
                                className="absolute inset-0"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="group relative block h-full w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] bg-gray-900/40 backdrop-blur-2xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_20px_80px_rgba(59,_130,_246,_0.2)]">
                                    <div className="relative h-full w-full overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                                        
                                        <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
                                            <div className="overflow-hidden mb-2">
                                                <motion.span 
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] block"
                                                >
                                                    {item.category}
                                                </motion.span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tighter">{item.title}</h3>
                                            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-w-[90%] font-medium">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                                <a 
                                                    href={item.link || '#'} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-3 text-[10px] font-black text-white hover:bg-blue-600 transition-all uppercase tracking-[0.2em] bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10"
                                                >
                                                    Explorar Case <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Spotlight effect on hover */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 z-50">
                <button 
                    onClick={() => setIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length)}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-blue-600 transition-all active:scale-95 group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>
                
                <div className="flex gap-2">
                    {displayItems.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>

                <button 
                    onClick={() => setIndex((prev) => (prev + 1) % displayItems.length)}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-blue-600 transition-all active:scale-95 group"
                >
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
