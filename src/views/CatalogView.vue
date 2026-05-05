<template>
  <BaseLayout>
    <div class="flex gap-6">
      <aside class="min-w-[320px]">
        <AppCatalogFilter @submit="handleFilterSubmit" />
      </aside>

      <main class="w-full">
        <div v-if="isProductsLoading" class="flex justify-center items-center min-h-100">
          <n-spin size="large" />
        </div>
        <div
          v-else-if="!products?.results?.length"
          class="flex justify-center items-center min-h-100"
        >
          <n-empty :show-icon="false">
            <template #extra>
              <div class="flex flex-col items-center gap-2 text-gray-500">
                <n-icon :size="80">
                  <MoodSad />
                </n-icon>
                <span class="text-2xl">{{ t('core.no_data') }} :(</span>
              </div>
            </template>
          </n-empty>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AppProductCard v-for="item in products.results" :key="item.id" :product="item" />
        </div>
      </main>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NSpin, NEmpty, NIcon } from 'naive-ui';
import { MoodSad } from '@vicons/tabler';
import { useQuery } from '@tanstack/vue-query';
import { useI18n } from 'vue-i18n';

import BaseLayout from '@/layouts/BaseLayout.vue'; // Не забудьте импорт, если он не глобальный
import AppProductCard from '@/components/catalog/product/AppProductCard.vue';
import AppCatalogFilter from '@/components/catalog/filter/AppCatalogFilter.vue';
import { useProducts, type ProductFilterForm } from '@/composables';

const { t } = useI18n();
const { fetchProducts } = useProducts();

const filters = ref<ProductFilterForm>();

const handleFilterSubmit = (values: ProductFilterForm) => {
  filters.value = { ...values };
};

const { isLoading: isProductsLoading, data: products } = useQuery({
  queryKey: ['products', filters],
  queryFn: () => fetchProducts(filters.value)
});
</script>
