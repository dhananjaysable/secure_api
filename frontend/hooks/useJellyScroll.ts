'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { calculateSkew, calculateStretch } from '@/lib/jelly-animations';

interface UseJellyScrollOptions {
    maxStretch?: number;
    maxSkew?: number;
    stiffness?: number;
    damping?: number;
}

export function useJellyScroll(options: UseJellyScrollOptions = {}) {
    const {
        maxStretch = 0.08,
        maxSkew = 3,
        stiffness = 200,
        damping = 20,
    } = options;

    const ref = useRef<HTMLElement>(null);
    const scrollVelocity = useMotionValue(0);
    const lastScrollY = useRef(0);
    const lastTime = useRef(Date.now());

    // Spring-smoothed values
    const smoothVelocity = useSpring(scrollVelocity, { stiffness, damping, mass: 0.5 });

    // Transform velocity to visual effects
    const scaleY = useTransform(
        smoothVelocity,
        [-1000, 0, 1000],
        [1 + maxStretch, 1, 1 + maxStretch]
    );

    const skewY = useTransform(
        smoothVelocity,
        [-1000, 0, 1000],
        [maxSkew, 0, -maxSkew]
    );

    useEffect(() => {
        const handleScroll = () => {
            const currentTime = Date.now();
            const currentScrollY = window.scrollY;

            const timeDelta = currentTime - lastTime.current;
            const scrollDelta = currentScrollY - lastScrollY.current;

            // Calculate velocity (pixels per millisecond)
            const velocity = timeDelta > 0 ? (scrollDelta / timeDelta) * 100 : 0;

            scrollVelocity.set(velocity);

            lastScrollY.current = currentScrollY;
            lastTime.current = currentTime;
        };

        // Throttle scroll handler
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Reset velocity when scrolling stops
        const resetVelocity = setInterval(() => {
            const currentScrollY = window.scrollY;
            if (currentScrollY === lastScrollY.current) {
                scrollVelocity.set(0);
            }
        }, 100);

        return () => {
            window.removeEventListener('scroll', onScroll);
            clearInterval(resetVelocity);
        };
    }, [scrollVelocity]);

    return {
        ref,
        scaleY,
        skewY,
        velocity: smoothVelocity,
    };
}
