'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Zap, Cloud, Database, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TiltCard from '@/components/ui/TiltCard';
import JellyCard from '@/components/ui/JellyCard';
import Link from 'next/link';
import AnimatedHeroBackground from '@/components/ui/AnimatedHeroBackground';
import { jellySpring, jellyCard, jellyHover, jellyStagger } from '@/lib/animations';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Simulating API call for demo purposes
        // In a real app, this would call your actual backend
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">

      {/* Animated Background */}
      <AnimatedHeroBackground />

      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 pt-16">
        <div className="z-10 text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={jellySpring.bouncy}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Next-Gen Security Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...jellySpring.medium, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Secure Your Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Infrastructure</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...jellySpring.soft, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Advanced encryption, real-time threat detection, and seamless integration for modern applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...jellySpring.bouncy, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={jellySpring.elastic}>
                <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/interactive">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={jellySpring.elastic}>
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full backdrop-blur-sm bg-background/50">
                  View Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-16 px-4 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose SecureAPI?</h2>
            <p className="text-muted-foreground text-lg">Enterprise-grade security features out of the box.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Modern Architecture",
                description: "Built with Next.js 14, .NET 8, and Tailwind CSS for maximum performance.",
                icon: Zap,
                color: "text-amber-400"
              },
              {
                title: "Global CDN",
                description: "Lightning fast delivery from edge locations worldwide.",
                icon: Globe,
                color: "text-blue-400"
              },
              {
                title: "Real-time Monitoring",
                description: "Instant alerts and detailed analytics for all API usage.",
                icon: Cloud,
                color: "text-purple-400"
              },
              {
                title: "DDoS Protection",
                description: "Advanced mitigation strategies to keep your services online.",
                icon: ShieldCheck,
                color: "text-rose-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...jellySpring.bouncy, delay: index * 0.1 }}
              >
                <JellyCard intensity={0.6} className="h-full">
                  <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer h-full">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={jellySpring.elastic}
                    >
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">{feature.description}</p>
                  </div>
                </JellyCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-8 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to get started?</h2>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Join thousands of developers building secure applications today.
              </p>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="text-lg h-14 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  Create Free Account
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}