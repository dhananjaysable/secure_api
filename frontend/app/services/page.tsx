'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '@/components/ui/TiltCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Zap, Globe, Lock, Server, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
    {
        title: "API Security",
        description: "Comprehensive protection for your API endpoints against OWASP Top 10 threats and automated attacks.",
        icon: Shield,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    },
    {
        title: "DDoS Mitigation",
        description: "Global edge network that absorbs and neutralizes volumetric attacks before they reach your origin.",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-400/10"
    },
    {
        title: "Global CDN",
        description: "Accelerate content delivery with our distributed network of edge servers worldwide.",
        icon: Globe,
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        title: "Identity Management",
        description: "Secure authentication and authorization with support for OAuth2, OIDC, and SAML.",
        icon: Lock,
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        title: "Secure Storage",
        description: "Encrypted object storage with granular access controls and automatic replication.",
        icon: Server,
        color: "text-rose-400",
        bg: "bg-rose-400/10"
    },
    {
        title: "Developer Tools",
        description: "SDKs, CLI tools, and comprehensive documentation to speed up your integration.",
        icon: Code,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10"
    }
];

export default function ServicesPage() {
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
            {/* Animated Background with Mouse Follower */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <motion.div
                    className="fixed top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
                    animate={{
                        x: mousePosition.x - 200,
                        y: mousePosition.y - 200,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                />
            </div>

            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Enterprise-grade security solutions tailored for your business needs.
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TiltCard className="h-full">
                                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors overflow-hidden group cursor-pointer">
                                    <CardHeader>
                                        <div className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                            <service.icon className={`w-8 h-8 ${service.color}`} />
                                        </div>
                                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base group-hover:text-foreground transition-colors">
                                            {service.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <Link href="/contact">
                        <Button size="lg" className="h-12 px-8 rounded-full text-lg">
                            Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
