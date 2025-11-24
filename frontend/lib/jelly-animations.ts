/**
 * Global Jelly Animation System
 * Centralized spring configurations and physics constants
 */

import { Transition } from 'framer-motion';

// ============================================
// SPRING PHYSICS CONFIGURATIONS
// ============================================

/**
 * Primary jelly effect - Best for most UI elements
 * High stiffness for snap, moderate damping for wobble
 */
export const jellySpring = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 1.2,
};

/**
 * Bouncy jelly - More pronounced bounce
 * Use for attention-grabbing elements
 */
export const bouncyJelly = {
    type: "spring" as const,
    stiffness: 300,
    damping: 15,
    mass: 1.5,
};

/**
 * Soft jelly - Gentle, smooth motion
 * Use for large containers or page transitions
 */
export const softJelly = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1.0,
};

/**
 * Elastic jelly - Maximum overshoot
 * Use for playful, high-energy interactions
 */
export const elasticJelly = {
    type: "spring" as const,
    stiffness: 350,
    damping: 18,
    mass: 1.8,
};

/**
 * Quick jelly - Fast response, minimal wobble
 * Use for hover states and quick interactions
 */
export const quickJelly = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
};

// ============================================
// TRANSITION PRESETS
// ============================================

/**
 * Page transition - Squash and stretch effect
 */
export const pageTransition: Transition = {
    ...softJelly,
    duration: 0.6,
};

/**
 * Card hover - Scale with wobble
 */
export const cardHover: Transition = {
    ...jellySpring,
    duration: 0.4,
};

/**
 * Button tap - Rubber band effect
 */
export const buttonTap: Transition = {
    ...quickJelly,
    duration: 0.3,
};

/**
 * Scroll reveal - Smooth entrance
 */
export const scrollReveal: Transition = {
    ...softJelly,
    duration: 0.8,
};

// ============================================
// ANIMATION VARIANTS
// ============================================

/**
 * Page morph variants for route transitions
 */
export const pageMorphVariants = {
    initial: {
        opacity: 0,
        scaleY: 0.8,
        y: 100,
    },
    animate: {
        opacity: 1,
        scaleY: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        scaleY: 0.6,
        y: -50,
    },
};

/**
 * Jelly card hover variants
 */
export const jellyCardVariants = {
    rest: {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
    },
    hover: {
        scale: 1.05,
        transition: cardHover,
    },
    tap: {
        scale: 0.95,
        transition: buttonTap,
    },
};

/**
 * Scroll-based stretch variants
 */
export const scrollStretchVariants = {
    rest: {
        scaleY: 1,
        skewY: 0,
    },
    scrolling: (velocity: number) => ({
        scaleY: 1 + Math.min(Math.abs(velocity) * 0.0002, 0.1),
        skewY: Math.max(-2, Math.min(2, velocity * 0.01)),
    }),
};

/**
 * Stagger children animation
 */
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

/**
 * Fade in up with jelly
 */
export const fadeInUpJelly = {
    initial: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: jellySpring,
    },
};

/**
 * Scale in with jelly
 */
export const scaleInJelly = {
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: bouncyJelly,
    },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate skew based on velocity
 */
export const calculateSkew = (velocity: number, maxSkew: number = 5): number => {
    return Math.max(-maxSkew, Math.min(maxSkew, velocity * 0.01));
};

/**
 * Calculate scale based on velocity
 */
export const calculateStretch = (velocity: number, maxStretch: number = 0.1): number => {
    return 1 + Math.min(Math.abs(velocity) * 0.0002, maxStretch);
};

/**
 * Dampen value for smooth transitions
 */
export const dampen = (value: number, factor: number = 0.1): number => {
    return value * factor;
};
