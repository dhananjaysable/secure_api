'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <motion.h1
                        className="text-[150px] font-black leading-none tracking-tighter select-none"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            delay: 0.2
                        }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                            404
                        </span>
                    </motion.h1>

                    {/* Glitch Effect Overlay */}
                    <motion.div
                        className="absolute inset-0 text-[150px] font-black leading-none tracking-tighter text-destructive/20 select-none pointer-events-none"
                        animate={{
                            x: [-2, 2, -2],
                            y: [1, -1, 1],
                            opacity: [0.5, 0.2, 0.5]
                        }}
                        transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        aria-hidden="true"
                    >
                        404
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-6 max-w-md mx-auto"
                >
                    <div className="flex items-center justify-center space-x-2 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-widest">System Error</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold">
                        Page Not Found
                    </h2>

                    <p className="text-muted-foreground">
                        The requested resource could not be found on this server. It may have been moved, deleted, or never existed.
                    </p>

                    <div className="pt-4">
                        <Link href="/">
                            <Button size="lg" className="group">
                                <Home className="mr-2 w-4 h-4 transition-transform group-hover:scale-110" />
                                Return to Base
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        </div>
    );
}
