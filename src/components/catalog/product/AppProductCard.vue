<template>
  <n-card hoverable class="w-full rounded-xl overflow-hidden cursor-pointer" @click="goToDetails">
    <template #cover>
      <n-image
        :src="product.content_file"
        :alt="product.name"
        object-fit="cover"
        class="w-full aspect-square"
        preview-disabled
      />
    </template>

    <div class="text-xl font-semibold text-center">
      {{ product.name }}
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <div class="text-3xl font-bold">
          {{ product.price }}
          <span class="text-lg font-medium opacity-70">{{ CURRENT_CURRENCY }}</span>
        </div>

        <n-button
          size="large"
          type="primary"
          strong
          :disabled="isItemInCart"
          @click.stop="$emit('add-to-cart', product)"
        >
          {{ t('core.labels.add_to_cart') }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { useRouting, type Product } from '@/composables';
import { CURRENT_CURRENCY } from '@/constants';
import { useCartStore } from '@/stores';
import { NCard, NImage, NButton } from 'naive-ui';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
  product: Product;
}

const { t } = useI18n();
const { toProductWithId } = useRouting();
const cartStore = useCartStore();

const props = defineProps<Props>();

defineEmits<{
  (e: 'add-to-cart', product: Product): void;
}>();

const isItemInCart = computed(() => cartStore.itemInCart(props.product.id));

function goToDetails() {
  if (props.product.id) {
    toProductWithId(props.product.id);
  }
}
</script>
