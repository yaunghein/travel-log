<script lang="ts" setup>
import type { LngLatLike } from 'maplibre-gl'

const mapStore = useMapStore()

const style = 'https://tiles.openfreemap.org/styles/liberty'
const center = [10.559482, 47.21322]
const zoom = 4

onMounted(mapStore.init)
</script>

<template>
  <MglMap :map-style="style" :center="center as LngLatLike" :zoom="zoom">
    <MglNavigationControl />
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template v-slot:marker>
        <div
          class="tooltip tooltip-top tooltip-primary"
          :data-tip="point.label"
        >
          <Icon name="tabler:map-pin-filled" size="32" class="text-primary" />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>
