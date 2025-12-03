<script lang="ts" setup>
const authStore = useAuthStore()
await authStore.init()
</script>

<template>
  <header class="flex min-h-screen flex-col">
    <AppNavbar />
    <main>
      <slot></slot>
    </main>
  </header>
</template>
