/**
 * Centralized Jelly Animation Configuration
 * Provides consistent elastic spring animations across the entire project
 */

import { Transition, Variants } from 'framer-motion';

// Jelly Spring Presets
export const jellySpring = {
    soft: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
        mass: 1,
    },
    medium: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
        mass: 0.8,
    },
    bouncy: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 30,
        mass: 0.6,
    },
    elastic: {
        type: 'spring' as const,
        stiffness: 500,
        damping: 35,
        mass: 0.5,
    },
};

// Hover/Tap Animation Variants
export const jellyHover = {
    scale: {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: jellySpring.bouncy,
    },
    lift: {
        whileHover: { y: -4, scale: 1.02 },
        whileTap: { y: 0, scale: 0.98 },
        transition: jellySpring.medium,
    },
    bounce: {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        transition: jellySpring.elastic,
    },
    subtle: {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: jellySpring.soft,
    },
};

// Card Animation Variants
export const jellyCard: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: jellySpring.medium,
    },
    hover: {
        y: -8,
        scale: 1.02,
        transition: jellySpring.bouncy,
    },
    tap: {
        scale: 0.98,
        transition: jellySpring.elastic,
    },
};

// Stagger Animation for Lists
export const jellyStagger = {
    container: {
        animate: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    },
    item: {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: jellySpring.medium,
        },
    },
};

// Icon Rotation Animation
export const jellyRotate = {
    hover: {
        rotate: 360,
        transition: {
            ...jellySpring.bouncy,
            duration: 0.6,
        },
    },
};

// Button Ripple Effect
export const jellyRipple: Variants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: {
        scale: 2,
        opacity: 0,
        transition: {
            ...jellySpring.soft,
            duration: 0.6,
        },
    },
};

// Page Transition
export const jellyPageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ...jellySpring.medium,
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            ...jellySpring.soft,
            duration: 0.3,
        },
    },
};

// Blob/Gradient Animation
export const jellyBlob = {
    animate: {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Input Focus Animation
export const jellyInput = {
    focus: {
        scale: 1.02,
        transition: jellySpring.bouncy,
    },
    blur: {
        scale: 1,
        transition: jellySpring.soft,
    },
};

// Modal/Dialog Animation
export const jellyModal: Variants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: jellySpring.bouncy,
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: jellySpring.soft,
    },
};

// Navbar Jelly Transition
export const jellyNavbar = {
    layout: jellySpring.medium,
    width: {
        ...jellySpring.medium,
        stiffness: 300,
        damping: 25,
        mass: 0.6,
    },
    borderRadius: {
        ...jellySpring.bouncy,
        stiffness: 400,
        damping: 30,
        mass: 0.5,
    },
    y: {
        ...jellySpring.medium,
        stiffness: 350,
        damping: 28,
        mass: 0.7,
    },
    backgroundColor: {
        ...jellySpring.soft,
        stiffness: 250,
        damping: 35,
    },
};

// Helper function to create custom jelly spring
export const createJellySpring = (
    stiffness: number = 300,
    damping: number = 25,
    mass: number = 0.8
): Transition => ({
    type: 'spring',
    stiffness,
    damping,
    mass,
});

// Letter Spacing Animation
export const jellyLetterSpacing = {
    hover: {
        letterSpacing: '0.05em',
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
    normal: {
        letterSpacing: '0em',
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};
