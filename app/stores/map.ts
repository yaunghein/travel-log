import type { MapPoint } from '~/types/map'

export const useMapStore = defineStore('mapStore', () => {
  const mapPoints = ref<MapPoint[]>([])

  async function init() {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl')
    const { LngLatBounds } = await import('maplibre-gl')

    const map = useMap()
    const firstPoint = mapPoints.value[0]
    if (!firstPoint) return

    const bounds = mapPoints.value.reduce(
      (bounds, point) => bounds.extend([point.long, point.lat]),
      new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat]
      )
    )
    map.map?.fitBounds(bounds, {
      padding: 64,
    })
  }

  return {
    init,
    mapPoints,
  }
})
