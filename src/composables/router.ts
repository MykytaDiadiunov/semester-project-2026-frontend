import { useRouter } from 'vue-router';

export const useRouting = () => {
  const router = useRouter();

  function back(): void {
    router.back();
  }

  function toCatalog(): void {
    router.push({ name: 'catalog' });
  }

  function toAuth(): void {
    router.push({ name: 'auth' });
  }

  function toProfile(): void {
    router.push({ name: 'profile' });
  }

  function toProductWithId(id: number): void {
    router.push({ name: 'product', params: { id } });
  }

  return {
    back,
    toCatalog,
    toAuth,
    toProfile,
    toProductWithId
  };
};
