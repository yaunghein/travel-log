<script lang="ts" setup>
// const authStore = useAuthStore()
// await authStore.init()
</script>

<template>
  <header class="flex min-h-screen flex-col">
    <AppNavbar />
    <main class="flex flex-1 flex-col">
      <slot></slot>
    </main>
  </header>
</template>
