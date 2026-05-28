<template>
  <n-modal v-model:show="isOpen" class="max-w-150 w-full">
    <n-card class="max-w-150 w-full shadow-lg p-4 pt-0">
      <n-tabs type="segment" animated>
        <n-tab-pane name="login" :tab="t('auth.labels.login')">
          <app-login-form />
        </n-tab-pane>
        <n-tab-pane name="register" :tab="t('auth.labels.register')">
          <app-register-form />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NTabPane, NTabs, NCard } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import AppLoginForm from '@/components/auth/AppLoginForm.vue';
import AppRegisterForm from '@/components/auth/AppRegisterForm.vue';

const { t } = useI18n();

const isOpen = defineModel<boolean>('show', { required: true });
</script>
