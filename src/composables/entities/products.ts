import { apiService } from '@/services';
import type { PaginatedResponse } from '@/types';
import type { ProductFilterForm } from '../forms/products/filter';

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

export interface ProductFilterValues {
  categories: ProductCategory[];
  price_range: {
    min: number;
    max: number;
  };
}

export const useProducts = () => {
  async function fetchProducts(filter?: ProductFilterForm): Promise<PaginatedResponse<Product>> {
    return await apiService.get<PaginatedResponse<Product>>(
      '/product/',
      filter && {
        params: {
          price__gte: filter.price_range[0],
          price__lte: filter.price_range[1],
          category__in: filter.categories.join(',')
        }
      }
    );
  }

  async function fetchProductById(id: number): Promise<Product> {
    return await apiService.get(`/product/${id}/`);
  }

  async function fetchProductFilter(): Promise<ProductFilterValues> {
    return apiService.get('/product/filters/');
  }

  return {
    fetchProducts,
    fetchProductById,
    fetchProductFilter
  };
};
