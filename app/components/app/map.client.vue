<script lang="ts" setup>
import type { MglEvent } from '@indoorequal/vue-maplibre-gl'
import type { LngLatLike } from 'maplibre-gl'

const mapStore = useMapStore()

const style = 'https://tiles.openfreemap.org/styles/liberty'
const center = [10.559482, 47.21322]
const zoom = 4

onMounted(mapStore.init)

function onDoubleClick(mglEvent: MglEvent<'dblclick'>) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.long = mglEvent.event.lngLat.lng
    mapStore.addedPoint.lat = mglEvent.event.lngLat.lat
    mapStore.flyTo(mapStore.addedPoint)
  }
}
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center as LngLatLike"
    :zoom="zoom"
    @map:dblclick="onDoubleClick"
  >
    <MglNavigationControl />

    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template v-slot:marker>
        <div
          class="tooltip tooltip-top"
          :data-tip="point.name"
          :class="{ 'tooltip-open': mapStore.selectedPoint?.id === point.id }"
          @mouseenter="mapStore.selectPointWithoutFlyTo(point)"
          @mouseleave="mapStore.selectPointWithoutFlyTo(null)"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="32"
            class="transition-all"
            :class="
              mapStore.selectedPoint?.id === point.id
                ? 'text-accent'
                : 'text-primary'
            "
          />
        </div>
      </template>

      <MglPopup ref="popup">
        <h1 class="text-sm font-bold">{{ point.name }}</h1>
        <p v-if="point.description" class="text-xs opacity-80">
          {{ point.description }}
        </p>
      </MglPopup>
    </MglMarker>

    <MglMarker
      v-if="mapStore.addedPoint"
      :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
      draggable
      @update:coordinates="mapStore.updateAddedPoint"
    >
      <template v-slot:marker>
        <div
          class="tooltip tooltip-top tooltip-open"
          data-tip="Drag to your desired location."
        >
          <Icon
            name="tabler:map-pin-filled"
            size="32"
            class="text-secondary transition-all"
          />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>
