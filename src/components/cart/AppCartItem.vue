<template>
  <n-card content-class="flex">
    <div class="max-h-30 max-w-30">
      <n-image
        :src="cartItem.product.content_file"
        :alt="cartItem.product.name"
        object-fit="cover"
        class="w-full aspect-square"
        preview-disabled
      />
    </div>
    <div class="w-full flex items-center justify-between">
      <div class="h-full flex flex-col justify-center ml-4">
        <span class="text-2xl font-bold">{{ cartItem.product.name }}</span>
        <span class="text-xl font-light text-white/60">
          {{ cartItem.product.price }}{{ CURRENT_CURRENCY }}
        </span>
      </div>
      <n-button circle @click="() => manageCartMutate()">
        <template #icon>
          <n-icon><Trash /></n-icon>
        </template>
      </n-button>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { Trash } from '@vicons/tabler';
import type { CartItem } from '@/composables';
import { CURRENT_CURRENCY } from '@/constants';
import { NCard, NImage, NButton, NIcon } from 'naive-ui';
import { useCartStore } from '@/stores';
import { useMutation } from '@tanstack/vue-query';
import { message } from '@/plugins';
import { useI18n } from 'vue-i18n';

interface Props {
  cartItem: CartItem;
}

const props = defineProps<Props>();

const { t } = useI18n();
const { manageCartItem } = useCartStore();

const { mutateAsync: manageCartMutate } = useMutation({
  mutationFn: () =>
    manageCartItem({
      product: props.cartItem.product.id,
      quantity: 0
    }),
  onError: (e: unknown) => message.error(String(e)),
  onSuccess: () => message.success(t('validation.success'))
});
</script>
