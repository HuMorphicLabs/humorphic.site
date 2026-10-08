export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name: string;
  models_count?: number;
  created_at: string;
}

export interface Model3D {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: Category | null;
  category_id?: string | null;
  model_file: string;
  thumbnail?: string | null;
  file_size: number;
  file_size_formatted: string;
  polygon_count: number;
  format: 'glb' | 'gltf';
  is_active: boolean;
  is_featured: boolean;
  uploaded_by_username: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ModelCreatePayload {
  name: string;
  description?: string;
  category_id?: string;
  model_file: File;
  thumbnail?: File;
  polygon_count?: number;
  is_featured?: boolean;
}
