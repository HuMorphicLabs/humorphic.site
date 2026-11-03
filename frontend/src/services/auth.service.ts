import { apiClient } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/auth.types';

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register/', payload);
    authStorage.setTokens(data.access, data.refresh);
    authStorage.setUser(data.user);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('humorphic-auth-changed'));
    }
    return data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login/', payload);
    authStorage.setTokens(data.access, data.refresh);
    authStorage.setUser(data.user);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('humorphic-auth-changed'));
    }
    return data;
  },

  async logout(): Promise<void> {
    const refresh = authStorage.getRefreshToken();
    try {
      if (refresh) {
        await apiClient.post('/auth/logout/', { refresh });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      authStorage.clearTokens();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('humorphic-auth-changed'));
      }
    }
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get<User>('/auth/me/');
    authStorage.setUser(data);
    return data;
  },
};
