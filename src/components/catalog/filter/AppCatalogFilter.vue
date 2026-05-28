<template>
  <n-card>
    <app-catalog-filter-form
      v-if="!isFilterValuesLoading && filterInitialData"
      :initial-values="filterInitialData"
      @submit="(val) => emit('submit', val)"
    />
    <div v-else>
      <n-spin :size="60" />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { useProducts, type ProductFilterForm } from '@/composables';
import { NCard, NSpin } from 'naive-ui';
import AppCatalogFilterForm from '@/components/catalog/filter/AppCatalogFilterForm.vue';
import { useQuery } from '@tanstack/vue-query';

const { fetchProductFilter } = useProducts();

const { isLoading: isFilterValuesLoading, data: filterInitialData } = useQuery({
  queryKey: ['products-filter'],
  queryFn: () => fetchProductFilter()
});

const emit = defineEmits<{
  (e: 'submit', formValues: ProductFilterForm): void;
}>();
</script>
