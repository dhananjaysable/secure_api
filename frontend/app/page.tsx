'use client';

import { useAuth } from '../lib/auth-context';
import { apiClient } from '../lib/api-client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Cloud, CloudRain, Sun, Thermometer, ShieldCheck, Lock } from 'lucide-react';
import dynamic from 'next/dynamic';

const ParticleNetwork = dynamic(() => import('../components/ParticleNetwork'), { ssr: false });
import TiltCard from '../components/ui/TiltCard';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export default function Home() {
  const { user, logout, isAuthenticated } = useAuth();
  const [weather, setWeather] = useState<WeatherForecast[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiClient.get<WeatherForecast[]>('/WeatherForecast');
      setWeather(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data. Are you logged in?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>SecureAPI</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline-block">
                  Welcome, <span className="font-medium text-foreground">{user?.firstName}</span>
                </span>
                <Button variant="destructive" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="mb-12">
            <ParticleNetwork />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isAuthenticated ? (
              <Button size="lg" onClick={fetchWeather} isLoading={loading} className="min-w-[200px]">
                {loading ? 'Fetching Data...' : 'Fetch Secure Data'}
              </Button>
            ) : (
              <Link href="/login">
                <Button size="lg" className="min-w-[200px]">
                  <Lock className="mr-2 h-4 w-4" />
                  Access Secure Data
                </Button>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 max-w-md mx-auto p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weather Grid */}
        <AnimatePresence>
          {weather.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {weather.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {item.date}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Thermometer className="h-5 w-5 text-primary mr-2" />
                          <span className="text-2xl font-bold">{item.temperatureC}°C</span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {item.temperatureF}°F
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        {item.summary.toLowerCase().includes('rain') ? (
                          <CloudRain className="h-4 w-4 text-blue-500" />
                        ) : item.summary.toLowerCase().includes('cloud') ? (
                          <Cloud className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Sun className="h-4 w-4 text-yellow-500" />
                        )}
                        {item.summary}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid (shown when no data) */}
        {weather.length === 0 && !loading && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "End-to-End Encryption",
                description: "All data is encrypted before leaving the client and decrypted only by the server.",
                icon: ShieldCheck
              },
              {
                title: "JWT Authentication",
                description: "Secure stateless authentication with automatic token rotation and refresh.",
                icon: Lock
              },
              {
                title: "Modern Architecture",
                description: "Built with Next.js 14, .NET 8, and Tailwind CSS for maximum performance.",
                icon: Cloud
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
              >
                <TiltCard className="h-full">
                  <Card className="glass-card border-0 h-full hover:bg-white/5 transition-colors duration-300">
                    <div className="p-6 flex flex-col items-center text-center h-full">
                      <div className="p-3 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}