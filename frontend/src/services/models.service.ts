import { apiClient } from '@/lib/api';
import { Model3D, Category, PaginatedResponse } from '@/types/models3d.types';

export const modelsService = {
  async getModels(params?: {
    category?: string;
    search?: string;
    page?: number;
    featured?: boolean;
    format?: string;
  }): Promise<PaginatedResponse<Model3D>> {
    const { data } = await apiClient.get<PaginatedResponse<Model3D>>('/3d-models/', {
      params,
    });
    return data;
  },

  async getModelById(id: string): Promise<Model3D> {
    const { data } = await apiClient.get<Model3D>(`/3d-models/${id}/`);
    return data;
  },

  async getMyModels(page = 1): Promise<PaginatedResponse<Model3D>> {
    const { data } = await apiClient.get<PaginatedResponse<Model3D>>('/3d-models/my_models/', {
      params: { page },
    });
    return data;
  },

  async getCategories(): Promise<PaginatedResponse<Category>> {
    const { data } = await apiClient.get<PaginatedResponse<Category>>('/3d-models/categories/');
    return data;
  },

  async uploadModel(formData: FormData): Promise<Model3D> {
    const { data } = await apiClient.post<Model3D>('/3d-models/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async deleteModel(id: string): Promise<void> {
    await apiClient.delete(`/3d-models/${id}/`);
  },
};
