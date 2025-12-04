<script lang="ts" setup>
defineProps<{
  label: string
  icon: string
  href: string
}>()
</script>

<template>
  <NuxtLink :to="href" class="btn bg-base-100 justify-start">
    <Icon :name="icon" size="20" />
    {{ label }}
  </NuxtLink>
</template>
