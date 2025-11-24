'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import TiltCard from '@/components/ui/TiltCard';

const stats = [
    { label: "Global Locations", value: "24+" },
    { label: "Uptime", value: "99.99%" },
    { label: "Daily Requests", value: "1B+" },
    { label: "Team Members", value: "50+" }
];

const timeline = [
    { year: "2020", title: "Founded", description: "SecureAPI was born with a mission to secure the internet." },
    { year: "2021", title: "Series A", description: "Raised $10M to expand our global infrastructure." },
    { year: "2022", title: "Global Expansion", description: "Launched edge nodes in 15 new countries." },
    { year: "2023", title: "Enterprise Ready", description: "Achieved SOC2 Type II compliance and launched enterprise plan." }
];

export default function AboutPage() {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <motion.div
                    className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
                    animate={{
                        x: mousePosition.x - 200,
                        y: mousePosition.y - 200,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                />
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Securing the Future of APIs
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        We are a team of security experts and engineers dedicated to making the internet safer for everyone.
                    </motion.p>
                </div>

                {/* Global Network Visualization */}
                <div className="relative h-[400px] w-full bg-card/30 rounded-3xl border border-border/50 overflow-hidden backdrop-blur-sm flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20">
                        {/* Animated Network Lines */}
                        <svg className="w-full h-full">
                            {[...Array(10)].map((_, i) => (
                                <motion.line
                                    key={i}
                                    x1={Math.random() * 100 + "%"}
                                    y1={Math.random() * 100 + "%"}
                                    x2={Math.random() * 100 + "%"}
                                    y2={Math.random() * 100 + "%"}
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="text-primary"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.5 }}
                                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                                />
                            ))}
                            {[...Array(20)].map((_, i) => (
                                <motion.circle
                                    key={`node-${i}`}
                                    cx={Math.random() * 100 + "%"}
                                    cy={Math.random() * 100 + "%"}
                                    r="3"
                                    className="fill-primary"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.5, 0] }}
                                    transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                                />
                            ))}
                        </svg>
                    </div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-3xl font-bold mb-4">Global Infrastructure</h2>
                        <p className="text-muted-foreground">Spanning 24+ regions worldwide</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TiltCard className="h-full">
                                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col items-center justify-center p-6 text-center group hover:border-primary/50 transition-colors">
                                    <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
                                </Card>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
                {/* Timeline */}
                <div className="space-y-12">
                    <h2 className="text-3xl font-bold text-center">Our Journey</h2>
                    <div className="relative border-l border-border/50 ml-4 md:ml-auto md:mx-auto md:max-w-2xl pl-8 space-y-12">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                                <div className="space-y-2">
                                    <span className="text-sm font-mono text-primary">{item.year}</span>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
