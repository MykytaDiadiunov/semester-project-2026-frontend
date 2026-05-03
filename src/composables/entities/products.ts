import { apiService } from '@/services';
import type { PaginatedResponse } from '@/types';

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  category_detail: ProductCategory;
  content_file: string;
}

export const useProducts = () => {
  async function fetchProducts(): Promise<PaginatedResponse<Product>> {
    return await apiService.get<PaginatedResponse<Product>>('/product/');
  }

  async function fetchProductById(id: number): Promise<Product> {
    return await apiService.get(`/product/${id}/`);
  }

  return {
    fetchProducts,
    fetchProductById
  };
};
