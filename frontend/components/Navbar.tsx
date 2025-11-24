'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Awards', href: '/awards' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
            <motion.nav
                layout
                initial={{ width: '100%', borderRadius: '0px', y: 0 }}
                animate={{
                    width: isScrolled ? 'fit-content' : '100%',
                    borderRadius: isScrolled ? '9999px' : '0px',
                    y: isScrolled ? 10 : 0,
                    backgroundColor: isScrolled ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0)',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
                    border: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    mass: 1,
                }}
                className={`pointer-events-auto transition-all duration-300 ${isScrolled ? 'px-6 py-2 shadow-2xl' : 'px-4 sm:px-6 lg:px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border/40'
                    }`}
            >
                <div className={`flex items-center justify-between ${isScrolled ? 'gap-8' : 'max-w-7xl mx-auto w-full'}`}>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group shrink-0">
                        <motion.div
                            className={`p-1.5 rounded-full ${isScrolled ? 'bg-white text-black' : 'text-primary'}`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ShieldCheck className="h-5 w-5" />
                        </motion.div>
                        {!isScrolled && <span className="group-hover:opacity-80 transition-opacity">SecureAPI</span>}
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={() => setHoveredPath(link.href)}
                                onMouseLeave={() => setHoveredPath(null)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-full ${pathname === link.href ? 'text-primary' : isScrolled ? 'text-gray-300 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {link.name}
                                {link.href === hoveredPath && (
                                    <motion.div
                                        layoutId="navbar-hover"
                                        className={`absolute inset-0 rounded-full -z-10 ${isScrolled ? 'bg-white/10' : 'bg-primary/10'}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                                {link.href === pathname && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                {!isScrolled && (
                                    <span className="text-sm text-muted-foreground">
                                        Hi, <span className="font-medium text-foreground">{user?.firstName}</span>
                                    </span>
                                )}
                                <Button
                                    variant={isScrolled ? "secondary" : "destructive"}
                                    size="sm"
                                    onClick={logout}
                                    className={isScrolled ? "rounded-full h-8 px-4 text-xs hover:scale-105 transition-transform" : "hover:scale-105 transition-transform"}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                {!isScrolled && (
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm" className="hover:bg-primary/10">Login</Button>
                                    </Link>
                                )}
                                <Link href="/register">
                                    <Button size="sm" className={`${isScrolled ? "rounded-full h-8 px-4 text-xs bg-white text-black hover:bg-gray-200" : ""} hover:scale-105 transition-transform`}>
                                        {isScrolled ? "Start" : "Get Started"}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 hover:text-foreground transition-colors ${isScrolled ? 'text-gray-300' : 'text-muted-foreground'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className={`md:hidden overflow-hidden ${isScrolled ? 'w-[80vw]' : 'w-full'}`}
                        >
                            <div className={`p-4 space-y-2 rounded-xl ${isScrolled ? 'bg-zinc-900/95 border border-zinc-800 backdrop-blur-md' : 'bg-background/95 backdrop-blur-md border border-border/40'}`}>
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="pt-4 mt-2 border-t border-border/10"
                                >
                                    {isAuthenticated ? (
                                        <div className="space-y-4">
                                            <span className="block px-4 text-sm text-muted-foreground">
                                                Signed in as <span className="font-medium text-foreground">{user?.firstName}</span>
                                            </span>
                                            <Button variant="destructive" size="sm" onClick={logout} className="w-full">
                                                Logout
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                                <Button variant="ghost" size="sm" className="w-full">Login</Button>
                                            </Link>
                                            <Link href="/register" onClick={() => setIsOpen(false)}>
                                                <Button size="sm" className="w-full">Get Started</Button>
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}
