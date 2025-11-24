'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Awards', href: '/awards' },
    { name: 'Contact', href: '/contact' },
    { name: 'Pricing', href: '/pricing' },
];

export default function JellyNavbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // CSS Variables for tweakable timing
    const jellyVars = {
        '--jelly-stiffness': '300',
        '--jelly-damping': '18',
        '--jelly-mass': '0.8',
    } as React.CSSProperties;

    // Custom spring config for "wobble" with overshoot
    const jellySpring = {
        type: "spring",
        stiffness: 300,
        damping: 18,
        mass: 0.8,
    };

    // Rubber band scale effect for clicks
    const rubberBandTap = {
        scale: [1, 0.9, 1.1, 1],
        transition: {
            duration: 0.4,
            times: [0, 0.2, 0.6, 1],
            ease: "easeInOut"
        }
    };

    return (
        <>
            {/* SVG Filter Definition - Gooey Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="gooey-navbar">
                        {/* Blur to create the "liquid" merge effect */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        {/* Color matrix to sharpen edges and create the gooey merge */}
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 19 -9"
                            result="gooey"
                        />
                        {/* Composite to preserve sharp text */}
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl" style={jellyVars}>
                <div className="relative bg-background/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight z-10">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="text-primary"
                        >
                            <ShieldCheck className="w-8 h-8" />
                        </motion.div>
                        <span className="hidden sm:block">SecureAPI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 relative">
                        {/* Background Layer with Gooey Filter */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ filter: 'url(#gooey-navbar)' }}
                        >
                            {/* Active/Hover Pill with Gooey Effect */}
                            <ul className="flex items-center gap-1 h-full">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    const isHovered = hoveredPath === link.href;

                                    return (
                                        <li key={link.href} className="relative px-5 py-2.5">
                                            {(isHovered || (isActive && !hoveredPath)) && (
                                                <motion.div
                                                    layoutId="jelly-pill-bg"
                                                    className="absolute inset-0 bg-primary/30 rounded-full"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 18,
                                                        mass: 0.8,
                                                        duration: 0.6,
                                                    } as any}
                                                    style={{
                                                        scaleX: 1,
                                                        scaleY: 1,
                                                    }}
                                                    initial={false}
                                                />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Foreground Text Layer (No Filter) */}
                        <ul
                            className="flex items-center gap-1 relative z-10"
                            onMouseLeave={() => setHoveredPath(null)}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <motion.li
                                        key={link.href}
                                        className="relative"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`relative px-5 py-2.5 text-sm font-medium transition-colors rounded-full block ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            onMouseEnter={() => setHoveredPath(link.href)}
                                        >
                                            <motion.span
                                                className="relative z-10"
                                                animate={{
                                                    scale: (hoveredPath === link.href || isActive) ? 1.05 : 1
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {link.name}
                                            </motion.span>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4 z-10">
                        {isAuthenticated ? (
                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="text-sm text-muted-foreground">
                                    Hi, <span className="font-medium text-foreground">{user?.firstName}</span>
                                </span>
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={logout}
                                        className="rounded-full relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">Logout</span>
                                        <motion.div
                                            className="absolute inset-0 bg-white/10"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </Button>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm" className="rounded-full">
                                            Login
                                        </Button>
                                    </Link>
                                </motion.div>
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <Link href="/register">
                                        <Button size="sm" className="rounded-full relative overflow-hidden group">
                                            <span className="relative z-10">Get Started</span>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '100%' }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 3,
                                                    ease: "linear"
                                                }}
                                            />
                                        </Button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground z-10"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9, rotate: 90 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={jellySpring as any}
                            className="absolute top-full left-0 right-0 mt-4 p-4 bg-background/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl md:hidden"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium block relative overflow-hidden ${pathname === link.href
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-muted'
                                                }`}
                                        >
                                            <span className="relative z-10">{link.name}</span>
                                            {pathname !== link.href && (
                                                <motion.div
                                                    className="absolute inset-0 bg-primary/5"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="h-px bg-border/50 my-2" />
                                {isAuthenticated ? (
                                    <motion.div whileTap={{ scale: 0.95 }}>
                                        <Button variant="destructive" onClick={logout} className="w-full rounded-xl">
                                            Logout
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        <motion.div whileTap={{ scale: 0.95 }}>
                                            <Link href="/login">
                                                <Button variant="ghost" className="w-full rounded-xl">Login</Button>
                                            </Link>
                                        </motion.div>
                                        <motion.div whileTap={{ scale: 0.95 }}>
                                            <Link href="/register">
                                                <Button className="w-full rounded-xl">Get Started</Button>
                                            </Link>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
