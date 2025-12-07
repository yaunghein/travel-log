export const useLocationsStore = defineStore('locationStore', () => {
  const { data, status, refresh } = useFetch('/api/locations', { lazy: true })

  const sidebarStore = useSidebarStore()
  const mapStore = useMapStore()

  effect(() => {
    if (data.value) {
      sidebarStore.loading = false
      sidebarStore.sidebarItems = data.value.map((location) => {
        return {
          id: location.id,
          label: location.name,
          icon: 'tabler:map-pin-filled',
          href: '/dashboard',
        }
      })
      mapStore.mapPoints = data.value.map((location) => {
        return {
          id: location.id,
          label: location.name,
          description: location.description,
          lat: location.lat,
          long: location.long,
        }
      })
    }
    sidebarStore.loading = status.value === 'pending'
  })

  return {
    locations: data,
    status,
    refresh,
  }
})
