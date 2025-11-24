'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-background border-t border-border/40 pt-24 pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                            <span>SecureAPI</span>
                        </Link>
                        <p className="text-muted-foreground text-lg">
                            Securing the digital frontier, one endpoint at a time.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Product</h3>
                        <ul className="space-y-4">
                            {['Features', 'Pricing', 'Documentation', 'Changelog'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Company</h3>
                        <ul className="space-y-4">
                            {['About', 'Team', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Connect</h3>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Github className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/40">
                    <p className="text-muted-foreground text-sm mb-4 md:mb-0">
                        © 2024 SecureAPI Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-8">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
                        <button
                            onClick={scrollToTop}
                            className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                        >
                            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </footer>
    );
}
