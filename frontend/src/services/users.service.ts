import { apiClient } from '@/lib/api';
import { User } from '@/types/auth.types';

export const usersService = {
  async getProfile(): Promise<User> {
    const { data } = await apiClient.get<User>('/auth/me/');
    return data;
  },

  async updateProfile(id: string, payload: Partial<User>): Promise<User> {
    const { data } = await apiClient.patch<User>(`/users/${id}/`, payload);
    return data;
  },
};
