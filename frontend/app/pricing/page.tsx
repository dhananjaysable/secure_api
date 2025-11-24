'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';

const plans = [
    {
        name: "Starter",
        price: { monthly: 29, yearly: 290 },
        description: "Perfect for small projects and startups.",
        features: ["10k API Requests/mo", "Basic DDoS Protection", "Community Support", "1 Team Member"],
        notIncluded: ["Custom SSL", "SLA", "Dedicated Support"],
        color: "bg-blue-500"
    },
    {
        name: "Pro",
        price: { monthly: 99, yearly: 990 },
        description: "For growing businesses with higher traffic.",
        features: ["1M API Requests/mo", "Advanced DDoS Protection", "Priority Email Support", "5 Team Members", "Custom SSL", "99.9% SLA"],
        notIncluded: ["Dedicated Support"],
        color: "bg-purple-500",
        popular: true
    },
    {
        name: "Enterprise",
        price: { monthly: 299, yearly: 2990 },
        description: "Mission-critical security for large scale.",
        features: ["Unlimited API Requests", "Enterprise DDoS Protection", "24/7 Dedicated Support", "Unlimited Team Members", "Custom SSL", "99.99% SLA", "On-premise Option"],
        notIncluded: [],
        color: "bg-rose-500"
    }
];

export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
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
                    className="fixed top-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
                    animate={{
                        x: mousePosition.x - 200,
                        y: mousePosition.y - 200,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                />
            </div>

            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Simple, Transparent Pricing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Choose the plan that fits your needs. No hidden fees.
                    </motion.p>

                    <div className="flex items-center justify-center gap-4 pt-4">
                        <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
                        <button
                            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
                            className="w-14 h-7 bg-secondary rounded-full relative transition-colors duration-300"
                        >
                            <motion.div
                                className="w-5 h-5 bg-primary rounded-full absolute top-1 left-1"
                                animate={{ x: billing === 'yearly' ? 28 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${billing === 'yearly' ? 'text-primary' : 'text-muted-foreground'}`}>Yearly (Save 20%)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                                    <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <TiltCard className="h-full">
                                <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors ${plan.popular ? 'border-primary/50 shadow-lg shadow-primary/10' : ''}`}>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="text-4xl font-bold">
                                            ${billing === 'monthly' ? plan.price.monthly : plan.price.yearly}
                                            <span className="text-base font-normal text-muted-foreground">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                                        </div>
                                        <div className="space-y-2">
                                            {plan.features.map((feature) => (
                                                <div key={feature} className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-sm">{feature}</span>
                                                </div>
                                            ))}
                                            {plan.notIncluded.map((feature) => (
                                                <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                                                    <X className="w-4 h-4" />
                                                    <span className="text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                                            Get Started
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
