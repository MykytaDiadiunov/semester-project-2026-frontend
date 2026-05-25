<template>
  <base-layout>
    <div class="flex gap-6">
      <div class="w-full flex flex-col gap-4">
        <app-cart-item v-for="value in cart?.items" :key="value.product.id" :cart-item="value" />
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
        <n-button type="primary" size="large">{{ $t('cart.pay') }}</n-button>
      </n-card>
    </div>
  </base-layout>
</template>

<script setup lang="ts">
import { CURRENT_CURRENCY } from '@/constants';
import { useCartStore } from '@/stores';
import { NCard, NButton } from 'naive-ui';
import { storeToRefs } from 'pinia';
import AppCartItem from '@/components/cart/AppCartItem.vue';

const cartStore = useCartStore();
const { cart, totalPrice } = storeToRefs(cartStore);
</script>
