<script lang="ts" setup>
const route = useRoute()
const authStore = useAuthStore()
const locationStore = useLocationsStore()
const sidebarStore = useSidebarStore()
const mapStore = useMapStore()

await authStore.init()

onMounted(() => {
  if (route.path !== '/dashboard') {
    locationStore.refresh()
  }
})
</script>

<template>
  <div class="flex flex-1">
    <div class="bg-base-300 w-64 shrink-0">
      <div class="flex justify-end p-2 pb-0">
        <Icon name="tabler:chevron-left" size="20" />
      </div>
      <div class="flex flex-col gap-2 p-2">
        <SidebarButton label="Locations" icon="tabler:map" href="/dashboard" />
        <SidebarButton
          label="Add Location"
          icon="tabler:circle-plus-filled"
          href="/dashboard/add"
        />
        <div
          v-if="sidebarStore.loading || sidebarStore.sidebarItems.length"
          class="divider"
        ></div>
        <div v-if="sidebarStore.loading" class="grid gap-2">
          <div
            v-for="_ in [...Array(10)]"
            class="skeleton bg-base-100 h-9"
          ></div>
        </div>
        <div v-else class="grid gap-2">
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :label="item.label"
            :icon="item.icon"
            :href="item.href"
            :icon-color="
              mapStore.selectedPoint?.id === item.location?.id
                ? 'text-accent'
                : undefined
            "
            @mouseenter="mapStore.selectedPoint = item.location"
            @mouseleave="mapStore.selectedPoint = null"
          />
        </div>
        <div class="divider"></div>
        <SidebarButton
          label="Sign Out"
          icon="tabler:logout-2"
          href="/sign-out"
        />
      </div>
    </div>
    <div class="flex flex-1 flex-col overflow-hidden">
      <div class="overflow-hidden">
        <NuxtPage />
      </div>
      <div class="max-w-full flex-1 overflow-hidden">
        <AppMap />
      </div>
    </div>
  </div>
</template>
