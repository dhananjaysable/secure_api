'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import AuthPattern from '@/components/ui/AuthPattern';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Side - Animated Pattern */}
            <div className="hidden lg:block w-1/2 relative bg-slate-900">
                <AuthPattern />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-muted-foreground mt-2">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>
                                Use your email and password to sign in
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-red-500 text-sm bg-red-500/10 p-3 rounded-md"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <Button type="submit" className="w-full" isLoading={isLoading}>
                                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-sm text-center text-muted-foreground">
                                <Link href="/forgot-password" className="hover:text-primary underline underline-offset-4">
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="text-sm text-center text-muted-foreground">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-primary hover:underline underline-offset-4 font-medium">
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                    <div className="text-center text-xs text-muted-foreground">
                        <p>Demo Credentials:</p>
                        <p>Email: user@example.com</p>
                        <p>Password: Password123!</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
