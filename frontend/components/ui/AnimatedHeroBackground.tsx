'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedHeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10 bg-background">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-purple-500/20 blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, -90, 0],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/20 blur-3xl"
            />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Mouse Follower */}
            <MouseFollower />
        </div>
    );
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
            className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10"
            animate={{
                x: mousePosition.x - 250,
                y: mousePosition.y - 250,
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
