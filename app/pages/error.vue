<script lang="ts" setup>
const route = useRoute()
const error = route.query.error || 'An unknown error occured.'
</script>

<template>
  <div
    class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex items-center justify-center flex-col"
  >
    <div role="alert" class="alert alert-error">
      <span>Oh no! {{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary mt-4">
      Home
      <Icon name="tabler:arrow-left" size="20" />
    </NuxtLink>
  </div>
</template>
