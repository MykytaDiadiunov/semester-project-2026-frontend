<template>
  <n-form ref="formRef" :label-width="80" :model="formValues">
    <div class="flex justify-between mb-4">
      <span class="text-xl">{{ t('catalog.filter') }}</span>
      <n-button quaternary @click="handleClear">{{ t('catalog.clear') }}</n-button>
    </div>
    <div class="flex flex-col gap-8 mb-10">
      <n-checkbox-group v-model:value="formValues.categories">
        <div class="text-lg mb-1">
          {{ t('catalog.categories') }}
        </div>
        <n-space vertical>
          <n-checkbox
            v-for="category in initialValues.categories"
            :key="category.id"
            :value="category.id"
            :label="category.name"
          />
        </n-space>
      </n-checkbox-group>

      <n-space vertical>
        <div class="text-lg mb-1">{{ t('catalog.price') }}</div>
        <n-slider
          v-model:value="formValues.price_range"
          range
          :step="1"
          :min="initialValues.price_range.min"
          :max="initialValues.price_range.max"
        />
        <div class="flex gap-4">
          <n-input-number v-model:value="formValues.price_range[0]" size="small" />
          <n-input-number v-model:value="formValues.price_range[1]" size="small" />
        </div>
      </n-space>
    </div>
    <n-button block size="large" type="primary" @click="handleSubmit">
      {{ t('catalog.filter') }}
    </n-button>
  </n-form>
</template>

<script setup lang="ts">
import { NForm, NSpace, NSlider, NInputNumber, NCheckbox, NCheckboxGroup, NButton } from 'naive-ui';
import { useProductFilter, type ProductFilterForm, type ProductFilterValues } from '@/composables';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

interface Props {
  initialValues: ProductFilterValues;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'submit', formValues: ProductFilterForm): void;
}>();

const { t } = useI18n();
const { initialValues: initialValuesData } = useProductFilter(props.initialValues);

const formValues = ref<ProductFilterForm>({ ...initialValuesData.value });

function handleSubmit(): void {
  emit('submit', formValues.value);
}

function handleClear(): void {
  formValues.value = { ...initialValuesData.value };
}
</script>
