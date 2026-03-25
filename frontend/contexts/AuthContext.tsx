"use client";

import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Use sessionStorage instead of localStorage for session-based auth
    // This ensures login is required each time the browser/tab is opened
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_authenticated') === 'true';
    }
    return false;
  });

  const login = async (email: string, password: string) => {
    // Simple authentication logic - you can enhance this with real API
    // For now, using hardcoded credentials
    if (email === 'admin@shubhconstruction.com' && password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
