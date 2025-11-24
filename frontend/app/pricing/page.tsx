'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, Zap, Crown } from 'lucide-react';
import JellyCard from '@/components/ui/JellyCard';

const plans = [
    {
        name: "Starter",
        price: { monthly: 29, yearly: 290 },
        description: "Perfect for small projects and startups.",
        features: ["10k API Requests/mo", "Basic DDoS Protection", "Community Support", "1 Team Member", "99% Uptime SLA"],
        notIncluded: ["Custom SSL", "Priority Support", "Dedicated Account Manager"],
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        icon: Sparkles
    },
    {
        name: "Pro",
        price: { monthly: 99, yearly: 990 },
        description: "For growing businesses with higher traffic.",
        features: ["1M API Requests/mo", "Advanced DDoS Protection", "Priority Email Support", "5 Team Members", "Custom SSL", "99.9% SLA", "Advanced Analytics"],
        notIncluded: ["Dedicated Account Manager", "On-premise Option"],
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        popular: true,
        icon: Zap
    },
    {
        name: "Enterprise",
        price: { monthly: 299, yearly: 2990 },
        description: "Mission-critical security for large scale.",
        features: ["Unlimited API Requests", "Enterprise DDoS Protection", "24/7 Dedicated Support", "Unlimited Team Members", "Custom SSL", "99.99% SLA", "On-premise Option", "Dedicated Account Manager", "Custom Integrations"],
        notIncluded: [],
        color: "text-rose-400",
        bgColor: "bg-rose-500/10",
        icon: Crown
    }
];

export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Floating Blobs */}
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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
                {[...Array(10)].map((_, i) => (
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
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                            Simple, Transparent Pricing
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        Choose the plan that fits your needs. No hidden fees, cancel anytime.
                    </motion.p>

                    {/* Billing Toggle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <span className={`text-sm font-medium transition-colors ${billing === 'monthly' ? 'text-primary' : 'text-muted-foreground'}`}>
                            Monthly
                        </span>
                        <motion.button
                            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
                            className="w-16 h-8 bg-secondary rounded-full relative transition-colors duration-300 hover:bg-secondary/80"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="w-6 h-6 bg-primary rounded-full absolute top-1 left-1 shadow-lg"
                                animate={{ x: billing === 'yearly' ? 32 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </motion.button>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium transition-colors ${billing === 'yearly' ? 'text-primary' : 'text-muted-foreground'}`}>
                                Yearly
                            </span>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                                Save 20%
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className="relative"
                        >
                            {plan.popular && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -top-5 left-0 right-0 flex justify-center z-10"
                                >
                                    <span className="bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                                        Most Popular
                                    </span>
                                </motion.div>
                            )}
                            <JellyCard intensity={plan.popular ? 0.6 : 0.4} className="h-full">
                                <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden ${plan.popular ? 'border-primary/50 shadow-xl shadow-primary/10' : ''
                                    }`}>
                                    {/* Animated Background */}
                                    <motion.div
                                        className={`absolute inset-0 ${plan.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                                    />

                                    <CardHeader className="relative z-10 space-y-4">
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="inline-block"
                                        >
                                            <plan.icon className={`w-10 h-10 ${plan.color}`} />
                                        </motion.div>
                                        <CardTitle className="text-3xl group-hover:text-primary transition-colors">
                                            {plan.name}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {plan.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6 relative z-10">
                                        <motion.div
                                            className="text-5xl font-bold"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            ${billing === 'monthly' ? plan.price.monthly : plan.price.yearly}
                                            <span className="text-lg font-normal text-muted-foreground">
                                                /{billing === 'monthly' ? 'mo' : 'yr'}
                                            </span>
                                        </motion.div>
                                        <div className="space-y-3">
                                            {plan.features.map((feature, i) => (
                                                <motion.div
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <motion.div
                                                        whileHover={{ scale: 1.3, rotate: 360 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    >
                                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    </motion.div>
                                                    <span className="text-sm group-hover:text-foreground transition-colors">
                                                        {feature}
                                                    </span>
                                                </motion.div>
                                            ))}
                                            {plan.notIncluded.map((feature) => (
                                                <div key={feature} className="flex items-center gap-3 text-muted-foreground">
                                                    <X className="w-5 h-5 flex-shrink-0" />
                                                    <span className="text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="relative z-10">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full"
                                        >
                                            <Button
                                                className="w-full h-12 text-base font-semibold relative overflow-hidden group/btn"
                                                variant={plan.popular ? 'default' : 'outline'}
                                            >
                                                <span className="relative z-10">Get Started</span>
                                                {plan.popular && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                        initial={{ x: '-100%' }}
                                                        animate={{ x: '200%' }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    />
                                                )}
                                            </Button>
                                        </motion.div>
                                    </CardFooter>
                                </Card>
                            </JellyCard>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ / Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4 py-12"
                >
                    <h3 className="text-2xl font-bold">Need a custom plan?</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Contact our sales team for enterprise solutions tailored to your specific requirements.
                    </p>
                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block text-primary font-semibold hover:underline"
                    >
                        Contact Sales →
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
}
