<script lang="ts" setup>
const authStore = useAuthStore()
onMounted(authStore.signOut)
</script>

<template>
  <div
    class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex items-center justify-center flex-col"
  >
    <span class="loading loading-spinner loading-xl"></span>
  </div>
</template>
