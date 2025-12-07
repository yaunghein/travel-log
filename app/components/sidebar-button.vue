<script lang="ts" setup>
const mapStore = useMapStore()

defineProps<{
  label: string
  icon: string
  href: string
  iconColor?: 'text-accent' | 'text-primary' | 'text-primary'
}>()
</script>

<template>
  <NuxtLink :to="href" class="btn bg-base-100 justify-start">
    <Icon :name="icon" size="20" class="transition-all" :class="iconColor" />
    {{ label }}
  </NuxtLink>
</template>
