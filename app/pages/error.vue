<script lang="ts" setup>
const route = useRoute()
const error = route.query.error || 'An unknown error occured.'
</script>

<template>
  <div
    class="card bg-base-300 container mx-auto mt-4 flex min-h-72 flex-col items-center justify-center text-center"
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
