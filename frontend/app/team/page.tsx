'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import TiltCard from '@/components/ui/TiltCard';

const team = [
    {
        name: 'Sarah Chen',
        role: 'Chief Technology Officer',
        bio: 'Former security researcher at Google with 15 years of experience in cryptography.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' }
    },
    {
        name: 'Marcus Rodriguez',
        role: 'Head of Engineering',
        bio: 'Full-stack expert specializing in scalable microservices and cloud infrastructure.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' }
    },
    {
        name: 'Emily Watson',
        role: 'Lead Security Analyst',
        bio: 'Certified Ethical Hacker (CEH) focused on penetration testing and vulnerability assessment.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' }
    },
    {
        name: 'David Kim',
        role: 'Product Designer',
        bio: 'Creating intuitive and secure user experiences for complex security tools.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' }
    },
];

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-background p-8 pt-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3"
                />
            </div>

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Meet the Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        The brilliant minds behind our secure infrastructure.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <TiltCard className="h-full">
                                <div className="h-full bg-card rounded-xl overflow-hidden border border-border group">
                                    <div className="aspect-square overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <MagneticButton className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200">
                                                <Twitter className="w-5 h-5" />
                                            </MagneticButton>
                                            <MagneticButton className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200">
                                                <Linkedin className="w-5 h-5" />
                                            </MagneticButton>
                                            <MagneticButton className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200">
                                                <Github className="w-5 h-5" />
                                            </MagneticButton>
                                        </div>
                                    </div>

                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                        <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                                        <p className="text-muted-foreground text-sm">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
