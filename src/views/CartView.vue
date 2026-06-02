<template>
  <base-layout>
    <div class="flex gap-6">
      <div v-if="isCartHaveItems" class="w-full flex flex-col gap-4">
        <app-cart-item v-for="value in cart?.items" :key="value.product.id" :cart-item="value" />
      </div>
      <div v-else class="w-full flex justify-center items-center min-h-100">
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
      <n-card class="max-w-100 h-fit" content-class="flex flex-col gap-4">
        <div class="flex justify-between">
          <span>{{ $t('cart.cost_of_goods') }}: </span>
          <span>{{ totalPrice }} {{ CURRENT_CURRENCY }}</span>
        </div>
        <div class="flex justify-between text-2xl font-bold">
          <span>{{ $t('cart.due') }}: </span>
          <span>{{ totalPrice }} {{ CURRENT_CURRENCY }}</span>
        </div>
        <n-button
          type="primary"
          size="large"
          :disabled="!isCartHaveItems"
          :loading="isCloseCartOrderPending"
          @click="() => closeCartOrderMutation()"
        >
          {{ $t('cart.pay') }}
        </n-button>
      </n-card>
    </div>
  </base-layout>
</template>

<script setup lang="ts">
import { CURRENT_CURRENCY } from '@/constants';
import { useCartStore } from '@/stores';
import { NCard, NButton, NEmpty, NIcon } from 'naive-ui';
import { MoodSad } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import AppCartItem from '@/components/cart/AppCartItem.vue';
import { useMutation } from '@tanstack/vue-query';
import { message } from '@/plugins';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

const cartStore = useCartStore();
const { cart, totalPrice } = storeToRefs(cartStore);

const { mutateAsync: closeCartOrderMutation, isPending: isCloseCartOrderPending } = useMutation({
  mutationFn: () => cartStore.closeCartOrder(),
  onError: (e: unknown) => message.error(String(e)),
  onSuccess: () => message.success(t('validation.success'))
});

const isCartHaveItems = computed<boolean>(() =>
  cart.value?.items ? cart.value?.items.length > 0 : false
);
</script>
