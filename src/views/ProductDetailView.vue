<template>
  <BaseLayout>
    <div class="max-w-6xl mx-auto py-8">
      <div class="mb-6">
        <n-button quaternary @click="router.back()">
          <div class="flex items-center gap-2">
            <n-icon>
              <ArrowBack />
            </n-icon>
            <span>{{ t('core.labels.back') }}</span>
          </div>
        </n-button>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center min-h-100">
        <n-spin :size="80" />
      </div>

      <div v-else-if="!product" class="flex justify-center items-center min-h-100">
        <n-empty size="large" :description="t('core.no_data', 'Нет данных')" />
      </div>

      <n-card v-else size="large" class="rounded-2xl shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <n-image
              :src="product.content_file"
              :alt="product.name"
              class="w-full rounded-lg flex justify-center"
              object-fit="contain"
            />
          </div>

          <div class="flex flex-col gap-6">
            <div>
              <n-tag type="primary" size="small" round class="mb-3">
                {{ product.category_detail.name }}
              </n-tag>
              <n-h1 class="text-3xl md:text-4xl font-bold mb-0 leading-[1.2]">
                {{ product.name }}
              </n-h1>
            </div>

            <div class="text-4xl font-extrabold">
              <n-text>{{ product.price }} </n-text>
              <n-text depth="3" class="text-2xl font-medium">{{ CURRENT_CURRENCY }}</n-text>
            </div>

            <div class="flex gap-2">
              <n-button
                type="primary"
                size="large"
                class="w-full md:w-auto py-6 text-lg font-semibold"
                :disabled="isItemInCart"
                :loading="isManageCartPending"
                @click="() => manageCartItemWrapper(1)"
              >
                {{ isItemInCart ? t('core.labels.already_in_cart') : t('core.labels.add_to_cart') }}
              </n-button>

              <n-button
                v-if="isItemInCart"
                tertiary
                type="error"
                class="w-full min-h-full md:w-auto py-6 text-lg font-semibold"
                :loading="isManageCartPending"
                @click="() => manageCartItemWrapper(-1)"
              >
                <n-icon><Trash /></n-icon>
              </n-button>
            </div>

            <n-divider class="my-2" />

            <div>
              <n-h3 class="mt-0 mb-0">
                {{ t('core.labels.description') }}
              </n-h3>
              <n-text depth="2" class="leading-relaxed whitespace-pre-line text-lg">
                {{ product.description }}
              </n-text>
            </div>
          </div>
        </div>
      </n-card>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import {
  NButton,
  NImage,
  NTag,
  NDivider,
  NSpin,
  NEmpty,
  NCard,
  NH1,
  NH3,
  NText,
  NIcon
} from 'naive-ui';
import { Trash } from '@vicons/tabler';
import { ArrowBack } from '@vicons/tabler';
import { useRoute, useRouter } from 'vue-router';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useI18n } from 'vue-i18n';
import { CURRENT_CURRENCY } from '@/constants';
import { useProducts, type ManageCartItemBody, type Product } from '@/composables';
import { useCartStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { message } from '@/plugins';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const productId = route.params.id as string;

const cartStore = useCartStore();
const { t } = useI18n();
const { fetchProductById } = useProducts();

const { cart } = storeToRefs(cartStore);

const { isLoading, data: product } = useQuery<Product>({
  queryKey: ['product', productId],
  queryFn: () => fetchProductById(Number(productId)),
  enabled: !!productId
});

const { mutateAsync: manageCartItemMutate, isPending: isManageCartPending } = useMutation({
  mutationFn: (itemToManage: ManageCartItemBody) => cartStore.manageCartItem(itemToManage),
  onError: (e: unknown) => message.error(String(e)),
  onSuccess: () => message.success(t('validation.success'))
});

const isItemInCart = computed<boolean>(() => cartStore.itemInCart(product.value!.id));

async function manageCartItemWrapper(quantity: number) {
  await manageCartItemMutate({
    product: product.value!.id,
    quantity
  });
}
</script>
