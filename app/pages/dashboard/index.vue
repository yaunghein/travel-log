<script lang="ts" setup>
const locationStore = useLocationsStore()
const { locations, status } = storeToRefs(locationStore)

onMounted(locationStore.refresh)
</script>

<template>
  <div class="container mx-auto max-w-6xl px-2">
    <h1 class="my-4 text-lg">Locations</h1>

    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl"></span>
    </div>

    <div v-else-if="locations && locations.length" class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="location in locations" :key="location.id" class="card card-compact bg-base-300">
        <div class="card-body">
          <div class="text-base font-bold">{{ location.name }}</div>
          <p class="text-sm opacity-80">{{ location.description }}</p>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-2">
      <p>Add a location to get started.</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary max-w-40">
        Add Location
        <Icon name="tabler:circle-plus-filled" size="20" />
      </NuxtLink>
    </div>
  </div>
</template>
