'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { jellyCardVariants, jellySpring } from '@/lib/jelly-animations';

interface JellyCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number; // 0-1, controls how much the card reacts
    enableTilt?: boolean;
    enableSkew?: boolean;
}

export default function JellyCard({
    children,
    className = '',
    intensity = 0.5,
    enableTilt = true,
    enableSkew = true,
}: JellyCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mouse velocity tracking for skew effect
    const mouseVelocityX = useMotionValue(0);
    const mouseVelocityY = useMotionValue(0);
    const prevMouseX = useRef(0);
    const prevMouseY = useRef(0);

    // Spring-based smooth values
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Transform mouse position to rotation/skew
    const rotateX = useTransform(y, [-0.5, 0.5], [8 * intensity, -8 * intensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-8 * intensity, 8 * intensity]);

    const skewX = useTransform(mouseVelocityX, [-50, 50], [-3 * intensity, 3 * intensity]);
    const skewY = useTransform(mouseVelocityY, [-50, 50], [-3 * intensity, 3 * intensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Normalize mouse position to -0.5 to 0.5
        const mouseXPos = (e.clientX - rect.left) / width - 0.5;
        const mouseYPos = (e.clientY - rect.top) / height - 0.5;

        mouseX.set(mouseXPos);
        mouseY.set(mouseYPos);

        // Calculate velocity
        const velocityX = e.clientX - prevMouseX.current;
        const velocityY = e.clientY - prevMouseY.current;

        mouseVelocityX.set(velocityX);
        mouseVelocityY.set(velocityY);

        prevMouseX.current = e.clientX;
        prevMouseY.current = e.clientY;
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
        mouseVelocityX.set(0);
        mouseVelocityY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            variants={jellyCardVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            style={{
                rotateX: enableTilt ? rotateX : 0,
                rotateY: enableTilt ? rotateY : 0,
                skewX: enableSkew ? skewX : 0,
                skewY: enableSkew ? skewY : 0,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {/* Inner content with reverse transform to keep it flat */}
            <div
                style={{
                    transform: enableTilt ? 'translateZ(20px)' : 'none',
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </div>

            {/* Shine effect on hover */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-inherit"
                    style={{
                        background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={jellySpring}
                />
            )}
        </motion.div>
    );
}
