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

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Spring configuration for the "wobble" effect
    const springConfig = {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1,
    };

    return (
        <>
            {/* SVG Filter Definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="gooey-nav">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
                <div className="relative bg-background/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight z-10">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="text-primary"
                        >
                            <ShieldCheck className="w-8 h-8" />
                        </motion.div>
                        <span className="hidden sm:block">SecureAPI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 relative">
                        {/* The "Gooey" Container for the Active Pill */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ filter: 'url(#gooey-nav)' }}
                        >
                            {/* We render a separate layer for the background blobs to apply the filter only to them */}
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const isHovered = hoveredPath === link.href;

                                return (isActive || isHovered) ? (
                                    <motion.div
                                        key={link.href}
                                        layoutId="nav-pill"
                                        className="absolute bg-primary/20 rounded-full"
                                        style={{
                                            // We need to calculate position dynamically or use a different structure
                                            // Since we can't easily get absolute positions here without refs, 
                                            // we'll use a different approach: Render the pill INSIDE the list but use the filter on the parent.
                                            // However, applying filter to text blurs it.
                                            // Solution: Two lists. One for background (filtered), one for text (foreground).
                                            display: 'none' // Placeholder for thought process
                                        }}
                                    />
                                ) : null;
                            })}
                        </div>

                        {/* Actual Navigation Items */}
                        <ul className="flex items-center gap-1 relative z-10" onMouseLeave={() => setHoveredPath(null)}>
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <li key={link.href} className="relative">
                                        <Link
                                            href={link.href}
                                            className={`relative px-5 py-2.5 text-sm font-medium transition-colors rounded-full block ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            onMouseEnter={() => setHoveredPath(link.href)}
                                        >
                                            <span className="relative z-10">{link.name}</span>

                                            {/* Active/Hover Pill */}
                                            {(hoveredPath === link.href || (isActive && !hoveredPath)) && (
                                                <motion.div
                                                    layoutId="jelly-pill"
                                                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                                                    transition={springConfig as any}
                                                    initial={false}
                                                    style={{
                                                        originY: "0px" // Helps with squash/stretch illusion
                                                    }}
                                                >
                                                    {/* Inner "Liquid" Core for extra gooeyness */}
                                                    <div className="absolute inset-2 bg-primary/10 rounded-full blur-sm" />
                                                </motion.div>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4 z-10">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">
                                    Hi, {user?.firstName}
                                </span>
                                <Button variant="destructive" size="sm" onClick={logout} className="rounded-full">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="rounded-full">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="rounded-full">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground z-10"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 mt-4 p-4 bg-background/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl md:hidden"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium ${pathname === link.href
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-muted'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="h-px bg-border/50 my-2" />
                                {isAuthenticated ? (
                                    <Button variant="destructive" onClick={logout} className="w-full rounded-xl">
                                        Logout
                                    </Button>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link href="/login">
                                            <Button variant="ghost" className="w-full rounded-xl">Login</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button className="w-full rounded-xl">Get Started</Button>
                                        </Link>
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
