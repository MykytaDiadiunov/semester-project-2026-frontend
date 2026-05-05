import type { ProductFilterValues } from '@/composables/entities/products';
import { computed } from 'vue';

export interface ProductFilterForm {
  categories: number[];
  price_range: number[];
}

export const useProductFilter = (productFilterInitialValues?: ProductFilterValues) => {
  const initialValues = computed<ProductFilterForm>(() => {
    if (productFilterInitialValues) {
      return {
        categories: [],
        price_range: [
          productFilterInitialValues.price_range.min,
          productFilterInitialValues.price_range.max
        ]
      };
    }

    return {
      categories: [],
      price_range: [0, 0]
    };
  });

  return {
    initialValues
  };
};
