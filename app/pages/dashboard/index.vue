<script lang="ts" setup>
const locationStore = useLocationsStore()
const { locations, status } = storeToRefs(locationStore)
onMounted(locationStore.refresh)

const mapStore = useMapStore()
</script>

<template>
  <div class="container">
    <h1 class="my-4 px-2 text-lg">Locations</h1>

    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl"></span>
    </div>

    <div
      v-else-if="locations && locations.length"
      class="hide-scrollbar flex gap-2 overflow-scroll px-2 pb-2"
    >
      <div
        v-for="location in locations"
        :key="location.id"
        class="card card-compact bg-base-300 w-72 shrink-0 cursor-pointer border border-gray-400/10 transition-all"
        :class="{
          'border-accent!': mapStore.selectedPoint?.id === location.id,
        }"
        @mouseenter="mapStore.selectedPoint = location"
        @mouseleave="mapStore.selectedPoint = null"
      >
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
