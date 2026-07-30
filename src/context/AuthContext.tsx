'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Role } from '@/types';

interface AuthContextValue {
  user: User | null;
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  login: (user: User) => void;
  logout: () => void;
  updateRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'dinepulse_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore user from localStorage on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (_) {}
    setHydrated(true);
  }, []);

  const login = useCallback((newUser: User) => {
    setUser(newUser);
    setIsAuthOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (_) {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }, []);

  const updateRole = useCallback((role: Role) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, role };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (_) {}
      return updated;
    });
  }, []);

  const openAuth = useCallback(() => setIsAuthOpen(true), []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  // Prevent hydration mismatch — render nothing until localStorage is read
  if (!hydrated) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthOpen, openAuth, closeAuth, login, logout, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
