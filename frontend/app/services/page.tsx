'use client';

import React from 'react';
import { motion } from 'framer-motion';
import JellyCard from '@/components/ui/JellyCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Zap, Globe, Lock, Server, Code, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
    {
        title: "API Security",
        description: "Comprehensive protection for your API endpoints against OWASP Top 10 threats and automated attacks.",
        icon: Shield,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        features: ["WAF Protection", "Rate Limiting", "Bot Detection"]
    },
    {
        title: "DDoS Mitigation",
        description: "Global edge network that absorbs and neutralizes volumetric attacks before they reach your origin.",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        features: ["Layer 3/4/7 Protection", "Auto-scaling", "Real-time Alerts"]
    },
    {
        title: "Global CDN",
        description: "Accelerate content delivery with our distributed network of edge servers worldwide.",
        icon: Globe,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        features: ["24+ Locations", "Smart Caching", "HTTP/3 Support"]
    },
    {
        title: "Identity Management",
        description: "Secure authentication and authorization with support for OAuth2, OIDC, and SAML.",
        icon: Lock,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        features: ["SSO", "MFA", "Role-based Access"]
    },
    {
        title: "Secure Storage",
        description: "Encrypted object storage with granular access controls and automatic replication.",
        icon: Server,
        color: "text-rose-400",
        bg: "bg-rose-400/10",
        features: ["AES-256 Encryption", "Auto Backup", "Geo-replication"]
    },
    {
        title: "Developer Tools",
        description: "SDKs, CLI tools, and comprehensive documentation to speed up your integration.",
        icon: Code,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        features: ["REST & GraphQL", "10+ SDKs", "Interactive Docs"]
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Floating Blobs */}
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

                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-primary text-sm font-medium">Enterprise Solutions</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                            Our Services
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        Enterprise-grade security solutions tailored for your business needs.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                        >
                            <JellyCard intensity={0.5} className="h-full">
                                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden group cursor-pointer relative">
                                    {/* Animated Background */}
                                    <motion.div
                                        className={`absolute inset-0 ${service.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
                                    />

                                    <CardHeader className="relative z-10">
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-4`}
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <service.icon className={`w-8 h-8 ${service.color}`} />
                                        </motion.div>
                                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                            {service.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="relative z-10 space-y-4">
                                        <CardDescription className="text-base group-hover:text-foreground transition-colors leading-relaxed">
                                            {service.description}
                                        </CardDescription>

                                        {/* Features List */}
                                        <ul className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                                                >
                                                    <CheckCircle2 className={`w-4 h-4 ${service.color}`} />
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </JellyCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center space-y-6 py-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to secure your infrastructure?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Talk to our sales team to find the perfect solution for your needs.
                    </p>
                    <Link href="/contact">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button size="lg" className="h-14 px-10 rounded-full text-lg relative overflow-hidden group">
                                <span className="relative z-10 flex items-center">
                                    Contact Sales
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
