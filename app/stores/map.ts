import type { LngLatBounds } from 'maplibre-gl'
import type { MapPoint } from '~/types/map'

export const useMapStore = defineStore('mapStore', () => {
  const mapPoints = ref<MapPoint[]>([])
  const selectedPoint = ref<MapPoint | null>(null)
  const shouldFlyTo = ref(true)

  async function selectPointWithoutFlyTo(point: MapPoint | null) {
    shouldFlyTo.value = false
    selectedPoint.value = point
  }

  async function init() {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl')
    const { LngLatBounds } = await import('maplibre-gl')

    const map = useMap()
    const firstPoint = mapPoints.value[0]
    if (!firstPoint) return

    let bounds: LngLatBounds | null = null
    const padding = 64
    bounds = mapPoints.value.reduce(
      (bounds, point) => bounds.extend([point.long, point.lat]),
      new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat]
      )
    )
    map.map?.fitBounds(bounds, { padding })

    effect(async () => {
      if (selectedPoint.value && shouldFlyTo.value) {
        map.map?.flyTo({
          center: [selectedPoint.value.long, selectedPoint.value.lat],
        })
      } else {
        map.map?.fitBounds(bounds, { padding })
      }
      shouldFlyTo.value = true
    })
  }

  return {
    init,
    mapPoints,
    selectedPoint,
    selectPointWithoutFlyTo,
  }
})
