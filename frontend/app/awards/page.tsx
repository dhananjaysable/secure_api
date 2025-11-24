'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const awards = [
    {
        title: "Best Security Solution",
        organization: "TechCrunch Awards 2023",
        description: "Recognized for innovation in API security and threat mitigation.",
        icon: Trophy,
        color: "text-amber-400",
        bg: "bg-amber-400/10"
    },
    {
        title: "Top 100 Startups",
        organization: "Forbes 2023",
        description: "Listed among the most promising cybersecurity startups globally.",
        icon: Star,
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        title: "Excellence in Privacy",
        organization: "CyberSecurity Breakthrough",
        description: "Awarded for our commitment to data privacy and compliance.",
        icon: Award,
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        title: "Enterprise Choice",
        organization: "Gartner Peer Insights",
        description: "Voted #1 by enterprise customers for ease of use and reliability.",
        icon: Medal,
        color: "text-rose-400",
        bg: "bg-rose-400/10"
    }
];

export default function AwardsPage() {
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
                    className="fixed top-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"
                    animate={{
                        x: mousePosition.x - 200,
                        y: mousePosition.y - 200,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                />
            </div>

            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Awards & Recognition
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Celebrating our commitment to excellence in cybersecurity.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {awards.map((award, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TiltCard className="h-full">
                                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
                                    <CardHeader className="flex flex-row items-center gap-6">
                                        <div className={`p-4 rounded-2xl ${award.bg} group-hover:scale-110 transition-transform duration-300`}>
                                            <award.icon className={`w-10 h-10 ${award.color}`} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl mb-1 group-hover:text-primary transition-colors">{award.title}</CardTitle>
                                            <CardDescription className="text-base font-medium text-primary/80 group-hover:text-primary transition-colors">
                                                {award.organization}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-lg group-hover:text-foreground transition-colors">
                                            {award.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
