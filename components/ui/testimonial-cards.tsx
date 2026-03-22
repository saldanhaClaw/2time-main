"use client";

import * as React from 'react';
import { motion, PanInfo } from 'framer-motion';

interface TestimonialCardProps {
    key?: React.Key;
    handleShuffle: () => void;
    testimonial: string;
    position: string;
    id: number;
    author: string;
}

export function TestimonialCard({ handleShuffle, testimonial, position, id, author }: TestimonialCardProps) {
    const dragRef = React.useRef(0);
    const isFront = position === "front";

    return (
        <motion.div
            style={{
                zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
            }}
            animate={{
                rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
                x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
                opacity: position === "back" ? 0.3 : 1,
                scale: position === "back" ? 0.9 : 1
            }}
            drag={isFront ? true : false}
            dragElastic={0.35}
            dragListener={isFront}
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
            onDragStart={(e: any) => {
                dragRef.current = e.clientX || (e.touches && e.touches[0].clientX);
            }}
            onDragEnd={(e: any, info: PanInfo) => {
                if (info.offset.x < -150) {
                    handleShuffle();
                }
                dragRef.current = 0;
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-[2.5rem] border-2 border-white/5 bg-gray-900/80 p-8 shadow-2xl backdrop-blur-xl transition-colors ${isFront ? "cursor-grab active:cursor-grabbing border-blue-500/30" : "border-white/5"
                }`}
        >
            <div className="relative mx-auto h-32 w-32">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
                <img
                    src={`https://i.pravatar.cc/128?img=${id + 10}`}
                    alt={`Avatar of ${author}`}
                    className="relative pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-white/10 bg-gray-800 object-cover"
                />
            </div>
            <p className="text-center text-lg italic text-gray-300 leading-relaxed font-medium">
                "{testimonial}"
            </p>
            <div className="text-center space-y-1">
                <p className="text-sm font-black text-blue-400 uppercase tracking-widest">{author.split(' - ')[0]}</p>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{author.split(' - ')[1]}</p>
            </div>
        </motion.div>
    );
};
