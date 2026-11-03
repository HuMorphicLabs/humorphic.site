'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/auth.types';
import { authStorage } from '@/lib/auth';
import { authService } from '@/services/auth.service';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const refreshUser = useCallback(async () => {
    if (!authStorage.isAuthenticated()) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const cached = authStorage.getUser();
      if (cached) {
        setUser(cached);
        setIsAuthenticated(true);
      }
      const fresh = await authService.getMe();
      setUser(fresh);
      setIsAuthenticated(true);
    } catch {
      authStorage.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    const handleAuthExpired = () => {
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener('humorphic-auth-expired', handleAuthExpired);
    return () => {
      window.removeEventListener('humorphic-auth-expired', handleAuthExpired);
    };
  }, [refreshUser]);

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    refreshUser,
    logout,
  };
}
