'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Lock, Zap, Cloud, Database, Globe, ShieldCheck, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import JellyCard from '@/components/ui/JellyCard';
import Link from 'next/link';
import AnimatedHeroBackground from '@/components/ui/AnimatedHeroBackground';
import { useJellyScroll } from '@/hooks/useJellyScroll';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData: WeatherForecast[] = [
          { date: '2023-11-23', temperatureC: 22, summary: 'Sunny' },
          { date: '2023-11-24', temperatureC: 18, summary: 'Cloudy' },
          { date: '2023-11-25', temperatureC: 20, summary: 'Partly Cloudy' },
          { date: '2023-11-26', temperatureC: 15, summary: 'Rainy' },
          { date: '2023-11-27', temperatureC: 12, summary: 'Stormy' },
        ];
        setWeatherData(mockData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const features = [
    {
      title: "End-to-End Encryption",
      description: "Military-grade 256-bit AES encryption protects your data at rest and in transit.",
      icon: Lock,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Global CDN",
      description: "Lightning fast delivery from 24+ edge locations worldwide with 99.99% uptime.",
      icon: Globe,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Real-time Monitoring",
      description: "Instant alerts and detailed analytics for all API usage and security events.",
      icon: Cloud,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "DDoS Protection",
      description: "Advanced mitigation strategies to keep your services online 24/7.",
      icon: ShieldCheck,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10"
    },
    {
      title: "Lightning Fast",
      description: "Built with Next.js 14 and .NET 8 for maximum performance and scalability.",
      icon: Zap,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "Secure Database",
      description: "Encrypted data storage with automatic backups and disaster recovery.",
      icon: Database,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime SLA", icon: CheckCircle2 },
    { value: "1B+", label: "Daily Requests", icon: Zap },
    { value: "24+", label: "Global Regions", icon: Globe },
    { value: "10k+", label: "Happy Customers", icon: Star }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">

      {/* Animated Background */}
      <AnimatedHeroBackground />

      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 pt-16">
        <motion.div
          style={{ y, opacity }}
          className="z-10 text-center max-w-5xl mx-auto space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Next-Gen Security Platform</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Secure Your Digital
            </span>
            <br />
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Infrastructure
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Advanced encryption, real-time threat detection, and seamless integration for modern applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    Get Started Free
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
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full backdrop-blur-sm bg-background/50 border-2">
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center space-y-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: index * 2 }}
                  className="inline-block"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 px-4 bg-background/50 backdrop-blur-sm relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Why Choose SecureAPI?
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Enterprise-grade security features designed for modern applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.1
                }}
              >
                <JellyCard intensity={0.5} className="h-full">
                  <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                    <motion.div
                      className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </JellyCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-purple-600 p-12 md:p-20 text-center"
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <motion.div
              className="relative z-10 space-y-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Shield className="w-20 h-20 text-white mx-auto" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Ready to get started?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Join thousands of developers building secure applications today.
              </p>
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg h-16 px-12 rounded-full shadow-2xl hover:shadow-3xl transition-all font-semibold"
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}