'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AuthPattern() {
    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />

            {/* Animated Rings */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute border border-white/5 rounded-full"
                    style={{
                        width: `${(i + 1) * 15}vw`,
                        height: `${(i + 1) * 15}vw`,
                    }}
                    animate={{
                        rotate: i % 2 === 0 ? 360 : -360,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 30 + i * 10,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }
                    }}
                />
            ))}

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`p-${i}`}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                    }}
                    animate={{
                        y: [null, Math.random() * -100 + "%"],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            <MouseFollower />

            <div className="relative z-10 text-center p-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white mb-4"
                >
                    Secure Access
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 max-w-md mx-auto"
                >
                    Enter your credentials to access the secure dashboard.
                </motion.p>
            </div>
        </div>
    )
}

function MouseFollower() {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-[300px] h-[300px] bg-indigo-500/30 rounded-full blur-[80px] pointer-events-none"
            animate={{
                x: mousePosition.x - 150,
                y: mousePosition.y - 150,
            }}
            transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                mass: 0.5
            }}
        />
    );
}
