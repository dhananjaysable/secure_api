'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import JellyCard from '@/components/ui/JellyCard';
import { Shield, Globe, Zap, Users, Award, TrendingUp, Lock, Server, Heart, Code, Rocket, Target } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const stats = [
    { label: "Global Locations", value: "24+", icon: Globe, color: "text-blue-400" },
    { label: "Uptime", value: "99.99%", icon: TrendingUp, color: "text-green-400" },
    { label: "Daily Requests", value: "1B+", icon: Zap, color: "text-yellow-400" },
    { label: "Team Members", value: "50+", icon: Users, color: "text-purple-400" }
];

const timeline = [
    { year: "2020", title: "Founded", description: "SecureAPI was born with a mission to secure the internet.", icon: Rocket },
    { year: "2021", title: "Series A", description: "Raised $10M to expand our global infrastructure.", icon: TrendingUp },
    { year: "2022", title: "Global Expansion", description: "Launched edge nodes in 15 new countries.", icon: Globe },
    { year: "2023", title: "Enterprise Ready", description: "Achieved SOC2 Type II compliance and launched enterprise plan.", icon: Award }
];

const values = [
    {
        icon: Shield,
        title: "Security First",
        description: "We prioritize security in every decision we make, ensuring your data is always protected with military-grade encryption.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10"
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Our global CDN ensures your APIs respond in milliseconds, no matter where your users are located.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10"
    },
    {
        icon: Award,
        title: "Excellence",
        description: "We strive for excellence in everything we do, from code quality to customer support and beyond.",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10"
    },
    {
        icon: Heart,
        title: "Customer Focused",
        description: "Your success is our success. We're here to help you build amazing products that users love.",
        color: "text-rose-400",
        bgColor: "bg-rose-500/10"
    }
];

const team = [
    { role: "Engineering", count: "25+", icon: Code, color: "text-cyan-400" },
    { role: "Security", count: "15+", icon: Lock, color: "text-red-400" },
    { role: "Support", count: "10+", icon: Users, color: "text-green-400" },
];

export default function AboutPage() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Multiple Floating Blobs */}
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto space-y-24">
                {/* Hero Section */}
                <motion.div
                    style={{ opacity }}
                    className="text-center space-y-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="inline-block"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="inline-block mb-6"
                        >
                            <Shield className="w-24 h-24 text-primary drop-shadow-lg" />
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        <motion.span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: "200% 200%" }}
                        >
                            Securing the Future of APIs
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        We are a team of security experts and engineers dedicated to making the internet safer for everyone.
                    </motion.p>
                </motion.div>

                {/* Stats Grid with Enhanced Animations */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                        >
                            <JellyCard intensity={0.5} className="h-full">
                                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
                                    {/* Animated Background Gradient */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                        animate={{
                                            backgroundPosition: ["0% 0%", "100% 100%"],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                    />
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3 relative z-10">
                                        <motion.div
                                            whileHover={{ scale: 1.3, rotate: 360 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <stat.icon className={`w-10 h-10 ${stat.color}`} />
                                        </motion.div>
                                        <motion.div
                                            className="text-4xl md:text-5xl font-bold text-primary"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            </JellyCard>
                        </motion.div>
                    ))}
                </div>

                {/* Global Network Visualization - Enhanced */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative h-[500px] w-full bg-gradient-to-br from-card/40 to-card/10 rounded-3xl border border-border/50 overflow-hidden backdrop-blur-sm flex items-center justify-center group"
                >
                    <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full">
                            {[...Array(20)].map((_, i) => (
                                <motion.line
                                    key={i}
                                    x1={Math.random() * 100 + "%"}
                                    y1={Math.random() * 100 + "%"}
                                    x2={Math.random() * 100 + "%"}
                                    y2={Math.random() * 100 + "%"}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-primary"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.6 }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.15,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        repeatDelay: 1
                                    }}
                                />
                            ))}
                            {[...Array(40)].map((_, i) => (
                                <motion.circle
                                    key={`node-${i}`}
                                    cx={Math.random() * 100 + "%"}
                                    cy={Math.random() * 100 + "%"}
                                    r="4"
                                    className="fill-primary"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [0, 1.5, 0],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        delay: i * 0.1,
                                        repeat: Infinity
                                    }}
                                />
                            ))}
                        </svg>
                    </div>
                    <div className="relative z-10 text-center space-y-6 p-8">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            <Server className="w-20 h-20 text-primary mx-auto drop-shadow-lg" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold">Global Infrastructure</h2>
                        <p className="text-xl text-muted-foreground">Spanning 24+ regions worldwide with 99.99% uptime</p>

                        {/* Team Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto">
                            {team.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
                                >
                                    <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                                    <div className="text-2xl font-bold text-primary">{item.count}</div>
                                    <div className="text-xs text-muted-foreground">{item.role}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Our Values - Enhanced */}
                <div className="space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                    >
                        Our Core Values
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20
                                }}
                            >
                                <JellyCard intensity={0.4}>
                                    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
                                        <motion.div
                                            className={`absolute inset-0 ${value.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                                        />
                                        <CardContent className="p-8 space-y-4 relative z-10">
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 10 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                className="inline-block"
                                            >
                                                <div className={`p-4 rounded-xl bg-background ${value.color}`}>
                                                    <value.icon className="w-8 h-8" />
                                                </div>
                                            </motion.div>
                                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                                {value.title}
                                            </h3>
                                            <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                                {value.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </JellyCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Timeline - Enhanced */}
                <div className="space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                    >
                        Our Journey
                    </motion.h2>
                    <div className="relative border-l-2 border-primary/30 ml-4 md:ml-auto md:mx-auto md:max-w-3xl pl-8 space-y-16">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20
                                }}
                                whileHover={{ x: 15 }}
                                className="relative group"
                            >
                                <motion.div
                                    className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center"
                                    whileHover={{ scale: 1.5, rotate: 360 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <item.icon className="w-4 h-4 text-background" />
                                </motion.div>
                                <div className="space-y-3 bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50 group-hover:border-primary/50 transition-all">
                                    <span className="text-lg font-mono text-primary font-bold">{item.year}</span>
                                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section - Enhanced */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center space-y-8 py-16 relative"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="inline-block"
                    >
                        <Target className="w-16 h-16 text-primary mx-auto" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of developers who trust SecureAPI to protect their applications.
                    </p>
                    <Link href="/register">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button size="lg" className="h-16 px-12 text-lg rounded-full shadow-lg relative overflow-hidden group">
                                <span className="relative z-10">Start Free Trial</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.span
                                    className="ml-2 inline-block"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
