'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Zap, Cloud, Database, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TiltCard from '@/components/ui/TiltCard';
import Link from 'next/link';
import AnimatedHeroBackground from '@/components/ui/AnimatedHeroBackground';

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
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Next-Gen Security Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Secure Your Digital <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Infrastructure</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Advanced encryption, real-time threat detection, and seamless integration for modern applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/interactive">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full backdrop-blur-sm bg-background/50">
                View Demo
              </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TiltCard className="h-full">
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                    <div className="p-8 flex flex-col items-start h-full">
                      <div className={`p-3 rounded-2xl bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                        <feature.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </Card>
                </TiltCard>
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