import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '../types/api';
import { apiClient } from './api-client';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // You could add an endpoint to validate token and get user info
      // For now, we'll just check if token exists
      if (apiClient.isAuthenticated()) {
        // In a real app, you might want to fetch user profile here
        setUser({ id: 1, email: 'user@example.com', firstName: 'John', lastName: 'Doe' });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      apiClient.logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await apiClient.login({ email, password });
      setUser(result.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};