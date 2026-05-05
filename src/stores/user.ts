import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useTokenStore } from '@/stores/token';
import type { LoginForm } from '@/composables/forms/auth/login';
import { useRouting, type RegisterForm } from '@/composables';
import { message } from '@/plugins';
import { apiService } from '@/services';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface TokenedUser extends User {
  auth_token: string;
}

export const useUserStore = defineStore('user', () => {
  const { toCatalog, toAuth } = useRouting();

  const tokenStore = useTokenStore();

  const user = ref<User | null>(null);

  const isAuthorized = computed(() => !!tokenStore.token);

  function setUser(newUser: User): void {
    user.value = newUser;
  }

  function removeUserData(): void {
    user.value = null;
    tokenStore.removeToken();

    toAuth();
  }

  async function populateUser(): Promise<void> {
    try {
      const response = await apiService.get<TokenedUser>('/user/current/');
      setUser(response);
    } catch (e: unknown) {
      if (tokenStore.token) {
        message.error(String(e));
      }

      removeUserData();
    }
  }

  async function login(loginBody: LoginForm): Promise<void> {
    const response = await apiService.post<TokenedUser>('/user/login/', loginBody);
    _setUserResponse(response);

    toCatalog();
  }

  async function register(registerForm: RegisterForm): Promise<void> {
    const response = await apiService.post<{ user: TokenedUser }>('/user/register/', registerForm);
    _setUserResponse(response.user);

    toCatalog();
  }

  async function logout(): Promise<void> {
    await apiService.del('/user/logout/');

    removeUserData();
  }

  function _setUserResponse(authResponse: TokenedUser): void {
    const { auth_token, ...user } = authResponse;

    tokenStore.setToken(auth_token);
    setUser(user);
  }

  return {
    user,
    isAuthorized,
    login,
    logout,
    register,
    populateUser
  };
});
