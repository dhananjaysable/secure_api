'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Award, Code2, Shield } from 'lucide-react';
import JellyCard from '@/components/ui/JellyCard';

const team = [
    {
        name: 'Sarah Chen',
        role: 'Chief Technology Officer',
        bio: 'Former security researcher at Google with 15 years of experience in cryptography and distributed systems.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' },
        expertise: ['Cryptography', 'Cloud Security', 'Architecture']
    },
    {
        name: 'Marcus Rodriguez',
        role: 'Head of Engineering',
        bio: 'Full-stack expert specializing in scalable microservices and cloud infrastructure with 12+ years experience.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' },
        expertise: ['Microservices', 'DevOps', 'Kubernetes']
    },
    {
        name: 'Emily Watson',
        role: 'Lead Security Analyst',
        bio: 'Certified Ethical Hacker (CEH) focused on penetration testing and vulnerability assessment.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' },
        expertise: ['Pentesting', 'OWASP', 'Compliance']
    },
    {
        name: 'David Kim',
        role: 'Product Designer',
        bio: 'Creating intuitive and secure user experiences for complex security tools with a focus on accessibility.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop',
        social: { twitter: '#', linkedin: '#', github: '#' },
        expertise: ['UX Design', 'Accessibility', 'Design Systems']
    },
];

const stats = [
    { icon: Award, label: 'Industry Awards', value: '15+' },
    { icon: Code2, label: 'Open Source', value: '50+' },
    { icon: Shield, label: 'Certifications', value: '100+' }
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

                {/* Floating Particles */}
                {[...Array(12)].map((_, i) => (
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

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">

                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                            Meet the Team
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                        className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto"
                    >
                        The brilliant minds behind our secure infrastructure.
                    </motion.p>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="text-center bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * 2 }}
                            >
                                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                            </motion.div>
                            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
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
                                <div className="h-full bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 group hover:border-primary/50 transition-all duration-300">
                                    <div className="aspect-square overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <motion.a
                                                href={member.social.twitter}
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-black flex items-center justify-center hover:bg-white transition-colors"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </motion.a>
                                            <motion.a
                                                href={member.social.linkedin}
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-black flex items-center justify-center hover:bg-white transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </motion.a>
                                            <motion.a
                                                href={member.social.github}
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-black flex items-center justify-center hover:bg-white transition-colors"
                                            >
                                                <Github className="w-5 h-5" />
                                            </motion.a>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                                            <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                                            <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors leading-relaxed">
                                                {member.bio}
                                            </p>
                                        </div>

                                        {/* Expertise Tags */}
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {member.expertise.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </JellyCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-6 py-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Want to Join Us?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're always looking for talented individuals to join our team.
                    </p>
                    <motion.a
                        href="mailto:careers@secureapi.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        View Open Positions
                    </motion.a>
                </motion.div>

            </div>
        </div>
    );
}
