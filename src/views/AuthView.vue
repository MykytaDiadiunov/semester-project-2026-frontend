<template>
  <base-layout>
    <div
      class="flex flex-col justify-center items-center min-h-[calc(100vh-(--spacing(22))-(--spacing(6)))] w-full"
    >
      <n-card class="max-w-150 w-full shadow-lg">
        <n-tabs type="segment" animated>
          <n-tab-pane name="login" :tab="t('auth.labels.login')">
            <app-login-form />
          </n-tab-pane>
          <n-tab-pane name="register" :tab="t('auth.labels.register')">
            <app-register-form />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </base-layout>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NCard, NTabs, NTabPane } from 'naive-ui';
import AppRegisterForm from '@/components/auth/AppRegisterForm.vue';
import AppLoginForm from '@/components/auth/AppLoginForm.vue';

const { t } = useI18n();
</script>
