import { useCart, type Cart, type CartItem, type ManageCartItemBody } from '@/composables';
import { message } from '@/plugins';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartRequests = useCart();

  const cart = ref<Cart | null>(null);

  const isCartLoading = ref<boolean>(false);

  const itemsCount = computed(() => cart.value?.items.length || 0);
  const totalPrice = computed(() => {
    return (
      cart.value?.items.reduce((acc, item) => {
        return acc + item.product.price;
      }, 0) || 0
    );
  });

  async function populateCart(): Promise<void> {
    isCartLoading.value = true;
    try {
      const response = await cartRequests.fetchCart();
      cart.value = response;
    } catch (e: unknown) {
      message.error(String(e));
    } finally {
      isCartLoading.value = false;
    }
  }

  async function manageCartItem(cartItem: ManageCartItemBody): Promise<void> {
    const response = await cartRequests.manageCartItem(cartItem);
    cart.value = { ...response };
  }

  async function closeCartOrder(): Promise<void> {
    await cartRequests.closeCartOrder();
    await populateCart();
  }

  function itemInCart(itemId: number): boolean {
    if (!cart.value) return false;

    return cart.value.items.some((el: CartItem) => el.product.id === itemId);
  }

  return {
    cart,
    isCartLoading,
    itemsCount,
    totalPrice,
    populateCart,
    manageCartItem,
    itemInCart,
    closeCartOrder
  };
});
