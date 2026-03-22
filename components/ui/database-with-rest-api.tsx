
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
    className?: string;
    circleText?: string;
    badgeTexts?: {
        first: string;
        second: string;
        third: string;
        fourth: string;
    };
    buttonTexts?: {
        first: string;
        second: string;
    };
    title?: string;
    lightColor?: string;
}

const DatabaseWithRestApi = ({
    className,
    circleText,
    badgeTexts,
    buttonTexts,
    title,
    lightColor,
}: DatabaseWithRestApiProps) => {
    return (
        <div
            className={cn(
                "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
                className
            )}
        >
            {/* SVG Paths  */}
            <svg
                className="h-full sm:w-full text-blue-500/20"
                width="100%"
                height="100%"
                viewBox="0 0 200 100"
            >
                <g
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0.4"
                    strokeDasharray="100 100"
                    pathLength="100"
                >
                    <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
                    <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
                    <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
                    <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
                    {/* Animation For Path Starting */}
                    <animate
                        attributeName="stroke-dashoffset"
                        from="100"
                        to="0"
                        dur="1s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25,0.1,0.5,1"
                        keyTimes="0; 1"
                    />
                </g>
                {/* Lights */}
                <g mask="url(#db-mask-1)">
                    <circle
                        className="database db-light-1"
                        cx="0"
                        cy="0"
                        r="12"
                        fill="url(#db-blue-grad)"
                    />
                </g>
                <g mask="url(#db-mask-2)">
                    <circle
                        className="database db-light-2"
                        cx="0"
                        cy="0"
                        r="12"
                        fill="url(#db-blue-grad)"
                    />
                </g>
                <g mask="url(#db-mask-3)">
                    <circle
                        className="database db-light-3"
                        cx="0"
                        cy="0"
                        r="12"
                        fill="url(#db-blue-grad)"
                    />
                </g>
                <g mask="url(#db-mask-4)">
                    <circle
                        className="database db-light-4"
                        cx="0"
                        cy="0"
                        r="12"
                        fill="url(#db-blue-grad)"
                    />
                </g>
                {/* Buttons */}
                <g stroke="currentColor" fill="none" strokeWidth="0.4">
                    <g>
                        <rect fill="#18181B" x="14" y="5" width="34" height="10" rx="5"></rect>
                        <DatabaseIcon x="18" y="7.5"></DatabaseIcon>
                        <text x="28" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">{badgeTexts?.first || "CRM"}</text>
                    </g>
                    <g>
                        <rect fill="#18181B" x="60" y="5" width="34" height="10" rx="5"></rect>
                        <DatabaseIcon x="64" y="7.5"></DatabaseIcon>
                        <text x="74" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">{badgeTexts?.second || "SEO"}</text>
                    </g>
                    <g>
                        <rect fill="#18181B" x="108" y="5" width="34" height="10" rx="5"></rect>
                        <DatabaseIcon x="112" y="7.5"></DatabaseIcon>
                        <text x="122" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">{badgeTexts?.third || "BLOG"}</text>
                    </g>
                    <g>
                        <rect fill="#18181B" x="150" y="5" width="40" height="10" rx="5"></rect>
                        <DatabaseIcon x="154" y="7.5"></DatabaseIcon>
                        <text x="165" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">{badgeTexts?.fourth || "API"}</text>
                    </g>
                </g>
                <defs>
                    <mask id="db-mask-1"><path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" strokeWidth="0.5" stroke="white" /></mask>
                    <mask id="db-mask-2"><path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" strokeWidth="0.5" stroke="white" /></mask>
                    <mask id="db-mask-3"><path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white" /></mask>
                    <mask id="db-mask-4"><path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white" /></mask>
                    <radialGradient id="db-blue-grad" fx="1">
                        <stop offset="0%" stopColor={lightColor || "#3b82f6"} />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
            </svg>
            {/* Main Box */}
            <div className="absolute bottom-10 flex w-full flex-col items-center">
                <div className="absolute -bottom-4 h-[100px] w-[82%] rounded-2xl bg-blue-600/10 blur-xl" />
                <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-white/10 bg-gray-950 px-3 py-1.5 shadow-xl">
                    <SparklesIcon className="size-3 text-blue-400" />
                    <span className="ml-2 text-[10px] font-bold tracking-tight uppercase">
                        {title ? title : "Infraestrutura Integrada 2TimeWeb"}
                    </span>
                </div>
                <div className="absolute -bottom-8 z-30 grid h-[70px] w-[70px] place-items-center rounded-full border border-white/10 bg-gray-950 font-black text-xs text-blue-500 shadow-2xl">
                    {circleText ? circleText : "CORE"}
                </div>
                <div className="relative z-10 flex h-[160px] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gray-900/50 backdrop-blur-md shadow-2xl">
                    <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-blue-600/10 px-3 text-[10px] font-bold border border-blue-500/20 flex items-center gap-2 ">
                        <HeartHandshakeIcon className="size-3" />
                        <span>{buttonTexts?.first || "SDR Solution"}</span>
                    </div>
                    <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-purple-600/10 px-3 text-[10px] font-bold sm:flex border border-purple-500/20 items-center gap-2 font-bold uppercase">
                        <Folder className="size-3" />
                        <span>{buttonTexts?.second || "Microservices"}</span>
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute -bottom-20 rounded-full border-t border-white/5 bg-blue-500/5"
                            style={{ width: 100 + i * 45, height: 100 + i * 45 }}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
    return (
        <svg
            x={x}
            y={y}
            xmlns="http://www.w3.org/2000/svg"
            width="5"
            height="5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
    );
};
