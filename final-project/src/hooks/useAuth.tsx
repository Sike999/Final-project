import { useState, useCallback } from 'react';
import { authApi, setAccessToken } from '../api.ts';
import type { Role} from '../types.ts';
import { useUserStore } from './userContext.tsx';

export const useAuth = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[] | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.login(email, password);
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (err: any) {
      const loginError = err.response?.data?.error || 'Login failed' 
      setError(prev => (prev ? [...prev, loginError] : [loginError]));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, name: string, password: string, role: Role, nickname?: string,  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.register(email, name, password, role, nickname);
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (err: any) {
      const regError = err.response?.data?.error || 'Registration failed'
      setError(prev => (prev ? [...prev, regError] : [regError]));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    if (loading) return;
    if (user) return;

    setLoading(true)
    try {
      const { data } = await authApi.getProfile();
      setUser(data);
    } catch {
      setUser(null);
      setAccessToken(null);
      
    } finally {
      setLoading(false)
    }
  }, [user, loading]);

  return { user, loading, error, login, register, logout, fetchProfile }
};