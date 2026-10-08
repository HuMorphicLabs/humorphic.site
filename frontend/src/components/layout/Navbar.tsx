'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Menu, X, Bot, Box, User, LogOut, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'FEATURES', href: '/#features' },
    { name: 'ANATOMY', href: '/#anatomy' },
    { name: 'CHALLENGES', href: '/#challenges' },
    { name: 'JOURNEY', href: '/#journey' },
    { name: 'STATS', href: '/#stats' },
    { name: '3D MODELS', href: '/models' },
    { name: 'DASHBOARD', href: '/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyber-border/80 bg-cyber-bg/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-card border border-humorphic-orange/60 shadow-glow group-hover:scale-105 transition-transform">
              <Bot className="h-6 w-6 text-humorphic-orange" />
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-humorphic-gold animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-wider text-white flex items-center">
                HUMORPHIC<span className="text-humorphic-orange ml-0.5">LAB</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400">
                CYBERNETICS // v5.04
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-mono font-semibold tracking-wider transition-colors duration-200 hover:text-humorphic-orange ${
                    isActive ? 'text-humorphic-orange' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Status Pill & Auth Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <Badge variant="active" pulse>
              {SITE_CONFIG.status}
            </Badge>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-md bg-cyber-card border border-cyber-border px-3 py-1.5 text-xs font-mono text-slate-200 hover:border-humorphic-orange transition-colors"
                >
                  <User className="h-3.5 w-3.5 text-humorphic-orange" />
                  <span>{user?.username}</span>
                  {user?.role === 'admin' && (
                    <span className="text-[10px] bg-red-900/60 text-red-300 px-1 rounded border border-red-500/30">
                      ADMIN
                    </span>
                  )}
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  leftIcon={<LogOut className="h-3.5 w-3.5" />}
                >
                  LOGOUT
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    LOGIN
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    REGISTER
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyber-border bg-cyber-bg/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <Badge variant="active" pulse>
              {SITE_CONFIG.status}
            </Badge>
            <span className="text-xs font-mono text-slate-400">{SITE_CONFIG.coords}</span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-mono text-slate-200 hover:bg-cyber-card hover:text-humorphic-orange transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="text-xs font-mono text-slate-400 px-3">
                  Signed in as <strong className="text-white">{user?.username}</strong>
                </div>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    DASHBOARD
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  LOGOUT
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    LOGIN
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    REGISTER
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
