<script lang="ts" setup>
const route = useRoute()
const { slug } = route.params
const {
  data: location,
  status,
  error,
} = useFetch(`/api/locations/${slug}`, {
  lazy: true,
})

const mapStore = useMapStore()

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value]
  }
})
</script>

<template>
  <div class="min-h-57.5 p-2">
    <div v-if="status === 'pending'">
      <div class="loading"></div>
    </div>
    <div v-if="error && status !== 'pending'" role="alert">
      <div class="alert alert-error alert-soft">{{ error.statusMessage }}</div>
    </div>
    <div v-if="location && status !== 'pending'">
      <h2 class="text-xl">{{ location?.name }}</h2>
      <h2 class="text-base">{{ location?.description }}</h2>
    </div>
  </div>
</template>
