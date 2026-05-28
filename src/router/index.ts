import { authMiddleware } from '@/middlewares';
import {
  createWebHistory,
  createRouter,
  type RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'catalog',
    path: '/',
    component: () => import('@/views/CatalogView.vue'),
    meta: {
      auth: false
    }
  },
  {
    name: 'auth',
    path: '/auth',
    component: () => import('@/views/AuthView.vue'),
    meta: {
      auth: false
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/views/CurrentUserProfile.vue'),
    meta: {
      auth: true
    }
  },
  {
    name: 'product',
    path: '/product/:id',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: {
      auth: false
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/CartView.vue'),
    meta: {
      auth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const isAuthMiddlewareResult = authMiddleware(to, from);

  if (isAuthMiddlewareResult !== true) {
    return isAuthMiddlewareResult;
  }

  return true;
});

export default router;
