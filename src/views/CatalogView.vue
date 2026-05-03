<template>
  <BaseLayout>
    <div class="flex flex-col gap-6">
      <div>
        <!-- Filter in future -->
      </div>

      <div class="w-full">
        <div v-if="isProductsLoading" class="flex justify-center items-center min-h-100">
          <n-spin :size="80" />
        </div>

        <div
          v-else-if="!products?.results || products?.results.length === 0"
          class="flex justify-center items-center min-h-100"
        >
          <n-empty :show-icon="false" size="large">
            <div class="flex flex-col justify-center items-center gap-2">
              <n-icon :size="80">
                <MoodSad />
              </n-icon>
              <span class="text-2xl">{{ t('core.no_data') }} :(</span>
            </div>
          </n-empty>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AppProductCard v-for="item in products.results" :key="item.id" :product="item" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { NSpin, NEmpty, NIcon } from 'naive-ui';
import { MoodSad } from '@vicons/tabler';
import AppProductCard from '@/components/catalog/product/AppProductCard.vue';
import { useProducts } from '@/composables';
import { useQuery } from '@tanstack/vue-query';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { fetchProducts } = useProducts();

const { isLoading: isProductsLoading, data: products } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetchProducts()
});
</script>
