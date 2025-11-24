'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

// Scramble Text Component
const ScrambleText = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState(text);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span>{display}</span>;
};

export default function NotFound() {
    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Particles Logic
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; value: string; delay: number; duration: number }>>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove);

            // Initialize particles on client only
            setParticles(
                [...Array(20)].map((_, i) => ({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    value: Math.random() > 0.5 ? '1' : '0',
                    delay: Math.random() * 5,
                    duration: Math.random() * 5 + 5,
                }))
            );
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [mouseX, mouseY]);

    // Parallax Transforms
    const x1 = useTransform(mouseX, (x) => (x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * 0.02);
    const y1 = useTransform(mouseY, (y) => (y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * 0.02);

    const x2 = useTransform(mouseX, (x) => (x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * 0.03);
    const y2 = useTransform(mouseY, (y) => (y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * 0.03);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden relative font-mono">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

            {/* Background Elements with Parallax */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ x: x1, y: y1 }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
                />
                <motion.div
                    style={{ x: x2, y: y2 }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-[100px]"
                />

                {/* Floating Particles */}
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute text-primary/20 text-xs font-bold"
                        initial={{
                            x: particle.x,
                            y: particle.y,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: particle.delay
                        }}
                    >
                        {particle.value}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-default"
                >
                    <motion.h1
                        className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter select-none relative z-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            delay: 0.2
                        }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 group-hover:text-destructive transition-colors duration-300">
                            404
                        </span>
                    </motion.h1>

                    {/* Glitch Effect Overlay - Intensifies on Hover */}
                    <motion.div
                        className="absolute inset-0 text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-destructive/40 select-none pointer-events-none z-0"
                        animate={{
                            x: [-2, 2, -2],
                            y: [1, -1, 1],
                            opacity: [0.5, 0.2, 0.5]
                        }}
                        whileHover={{
                            x: [-5, 5, -3, 3],
                            y: [2, -2, 4, -4],
                            opacity: 0.8
                        }}
                        transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        aria-hidden="true"
                    >
                        404
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-primary/40 select-none pointer-events-none z-0 mix-blend-screen"
                        animate={{
                            x: [2, -2, 2],
                            y: [-1, 1, -1],
                            opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 0.1
                        }}
                        aria-hidden="true"
                    >
                        404
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-6 max-w-md mx-auto relative z-20"
                >
                    <div className="flex items-center justify-center space-x-2 text-destructive animate-pulse">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-widest">System Error</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold h-10">
                        <ScrambleText text="Page Not Found" />
                    </h2>

                    <p className="text-muted-foreground">
                        The requested resource could not be found on this server. It may have been moved, deleted, or never existed.
                    </p>

                    <div className="pt-4">
                        <Link href="/">
                            <Button size="lg" className="group relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <Home className="mr-2 w-4 h-4 transition-transform group-hover:scale-110 relative z-10" />
                                <span className="relative z-10">Return to Base</span>
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        </div>
    );
}
