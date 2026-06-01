import type { User } from '@/stores';
import type { Product } from './products';
import { apiService } from '@/services';

export type CartStatus = 'active' | 'finished';

export interface Cart {
  id: number;
  user: User;
  status: CartStatus;
  items: CartItem[];
}

export interface ManageCartItemBody {
  product: number;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  async function fetchCart(): Promise<Cart> {
    return await apiService.get<Cart>('/user/cart/');
  }

  async function manageCartItem(addItemBody: ManageCartItemBody): Promise<Cart> {
    return await apiService.post<Cart>('/cart/manage-item/', addItemBody);
  }

  return { fetchCart, manageCartItem };
};
