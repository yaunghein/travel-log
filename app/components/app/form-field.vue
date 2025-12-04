<script lang="ts" setup>
defineProps<{
  name: string
  label: string
  error?: string
  type?: 'text' | 'textarea' | 'number'
}>()
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{{ label }}</legend>
    <Field
      :as="type || 'input'"
      :type="type || 'text'"
      :name="name"
      class="input w-full"
      :class="{
        'input-error': error,
        text: type === 'text',
        textarea: type === 'textarea',
      }"
    />
    <p v-if="error" class="fieldset-label">{{ error }}</p>
  </fieldset>
</template>
