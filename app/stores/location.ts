import type { Location } from '~/lib/db/schema'

export const useLocationsStore = defineStore('locationStore', () => {
  const { data, status, refresh } = useFetch('/api/locations', { lazy: true })
  // const data = ref<Location[] | null>(null)

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
          href: `/dashboard/locations/${location.slug}`,
          location,
        }
      })
      mapStore.mapPoints = data.value
    }
    sidebarStore.loading = status.value === 'pending'
  })

  return {
    locations: data,
    status,
    refresh,
  }
})
