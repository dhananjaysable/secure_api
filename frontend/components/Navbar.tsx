'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Awards', href: '/awards' },
    { name: 'Contact', href: '/contact' },
    { name: 'Pricing', href: '/pricing' },
];

function MagneticLink({ children, href, isActive, isScrolled }: { children: React.ReactNode, href: string, isActive: boolean, isScrolled: boolean }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ position: 'relative' }}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Link
                ref={ref}
                href={href}
                onMouseMove={handleMouse}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={reset}
                className={`relative px-4 py-2 text-sm font-medium transition-all whitespace-nowrap rounded-full block ${isActive ? 'text-primary' : isScrolled ? 'text-gray-300 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                    }`}
            >
                <motion.span
                    className="relative z-10 inline-block"
                    animate={{ letterSpacing: isHovered ? '0.05em' : '0em' }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.span>
                {isHovered && (
                    <motion.div
                        layoutId="navbar-hover"
                        className={`absolute inset-0 rounded-full -z-10 ${isScrolled ? 'bg-white/10' : 'bg-primary/10'}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                {isActive && (
                    <>
                        <motion.div
                            layoutId="navbar-active"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full bg-primary/5 -z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    </>
                )}
            </Link>
        </motion.div>
    );
}

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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
                initial={{ width: '100%', borderRadius: '0px', y: -100, opacity: 0 }}
                animate={{
                    width: isScrolled ? 'fit-content' : '100%',
                    borderRadius: isScrolled ? '9999px' : '0px',
                    y: isScrolled ? 10 : 0,
                    opacity: 1,
                    backgroundColor: isScrolled ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0)',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
                    border: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                    boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.3)' : '0 0 0 rgba(0,0,0,0)',
                }}
                transition={{
                    layout: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                    },
                    width: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        mass: 0.6,
                    },
                    borderRadius: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        mass: 0.5,
                    },
                    y: {
                        type: 'spring',
                        stiffness: 350,
                        damping: 28,
                        mass: 0.7,
                    },
                    backgroundColor: {
                        type: 'spring',
                        stiffness: 250,
                        damping: 35,
                    },
                    opacity: { duration: 0.5 }
                }}
                className={`pointer-events-auto transition-all duration-300 relative overflow-hidden ${isScrolled ? 'px-6 py-2' : 'px-4 sm:px-6 lg:px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border/40'
                    }`}
            >
                {/* Jelly Background Blob */}
                <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: isScrolled ? 1 : 0.8,
                        opacity: isScrolled ? 0.1 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        mass: 1.2,
                    }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 rounded-full blur-2xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
                <div className={`flex items-center justify-between ${isScrolled ? 'gap-8' : 'max-w-7xl mx-auto w-full'}`}>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group shrink-0">
                        <motion.div
                            className={`p-1.5 rounded-full relative ${isScrolled ? 'bg-white text-black' : 'text-primary'}`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ShieldCheck className="h-5 w-5 relative z-10" />
                            <motion.div
                                className="absolute inset-0 rounded-full bg-primary/20"
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                        {!isScrolled && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="group-hover:opacity-80 transition-opacity"
                            >
                                SecureAPI
                            </motion.span>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                whileHover={{ y: -2 }}
                            >
                                <MagneticLink
                                    href={link.href}
                                    isActive={pathname === link.href}
                                    isScrolled={isScrolled}
                                >
                                    {link.name}
                                </MagneticLink>
                            </motion.div>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        {isAuthenticated ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4"
                            >
                                {!isScrolled && (
                                    <motion.span
                                        className="text-sm text-muted-foreground"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Hi, <span className="font-medium text-foreground">{user?.firstName}</span>
                                    </motion.span>
                                )}
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant={isScrolled ? "secondary" : "destructive"}
                                        size="sm"
                                        onClick={logout}
                                        className={`${isScrolled ? "rounded-full h-8 px-4 text-xs" : ""} relative overflow-hidden group`}
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
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                {!isScrolled && (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link href="/login">
                                            <Button variant="ghost" size="sm" className="hover:bg-primary/10 relative overflow-hidden group">
                                                <span className="relative z-10">Login</span>
                                                <motion.div
                                                    className="absolute inset-0 bg-primary/5"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    whileHover={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </Button>
                                        </Link>
                                    </motion.div>
                                )}
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/register">
                                        <Button
                                            size="sm"
                                            className={`${isScrolled ? "rounded-full h-8 px-4 text-xs bg-white text-black hover:bg-gray-200" : ""} relative overflow-hidden group shadow-lg`}
                                        >
                                            <span className="relative z-10">{isScrolled ? "Start" : "Get Started"}</span>
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
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '100%' }}
                                                transition={{ duration: 0.6 }}
                                            />
                                        </Button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className={`md:hidden p-2 hover:text-foreground transition-colors relative ${isScrolled ? 'text-gray-300' : 'text-muted-foreground'}`}
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9, rotate: 90 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-6 w-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-6 w-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
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
                                        whileHover={{ x: 4 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all relative overflow-hidden group ${pathname === link.href
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            <span className="relative z-10">{link.name}</span>
                                            <motion.div
                                                className="absolute inset-0 bg-primary/5"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
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
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button variant="destructive" size="sm" onClick={logout} className="w-full">
                                                    Logout
                                                </Button>
                                            </motion.div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                                    <Button variant="ghost" size="sm" className="w-full">Login</Button>
                                                </Link>
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Link href="/register" onClick={() => setIsOpen(false)}>
                                                    <Button size="sm" className="w-full">Get Started</Button>
                                                </Link>
                                            </motion.div>
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
