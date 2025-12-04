<script lang="ts" setup>
defineProps<{
  label: string
  icon: string
  href: string
}>()
</script>

<template>
  <NuxtLink :to="href" class="btn justify-start bg-base-100">
    <Icon :name="icon" size="20" />
    {{ label }}
  </NuxtLink>
</template>
