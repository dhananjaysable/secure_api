'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import AuthPattern from '@/components/ui/AuthPattern';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const validatePassword = (pwd: string) => {
        if (pwd.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(pwd)) return "Password must contain an uppercase letter";
        if (!/[a-z]/.test(pwd)) return "Password must contain a lowercase letter";
        if (!/[0-9]/.test(pwd)) return "Password must contain a number";
        if (!/[!@#$%^&*]/.test(pwd)) return "Password must contain a special character";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (honeypot) {
            console.log("Bot detected");
            return;
        }

        const pwdError = validatePassword(password);
        if (pwdError) {
            setError(pwdError);
            return;
        }

        setIsLoading(true);

        try {
            await register(email, password, firstName, lastName);
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
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

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                        <p className="text-muted-foreground mt-2">
                            Join thousands of developers securing their APIs
                        </p>
                    </div>

                    <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Enter your details to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                    <p className="text-xs text-muted-foreground">
                                        Must be at least 8 characters with uppercase, lowercase, number, and special char.
                                    </p>
                                </div>

                                {/* Honeypot field - hidden from users */}
                                <div className="hidden">
                                    <input
                                        type="text"
                                        value={honeypot}
                                        onChange={(e) => setHoneypot(e.target.value)}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
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
                                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <div className="text-sm text-center text-muted-foreground w-full">
                                Already have an account?{' '}
                                <Link href="/login" className="text-primary hover:underline underline-offset-4 font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
