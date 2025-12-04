<script lang="ts" setup>
const authStore = useAuthStore()
await authStore.init()
</script>

<template>
  <div class="flex flex-1">
    <div class="bg-base-300 w-64">
      <div class="flex justify-end p-2 pb-0">
        <Icon name="tabler:chevron-left" size="20" />
      </div>
      <div class="flex flex-col gap-2 p-2">
        <SidebarButton label="Locations" icon="tabler:map" href="/dashboard" />
        <SidebarButton label="Add Location" icon="tabler:circle-plus-filled" href="/dashboard/add" />
        <div class="divider"></div>
        <SidebarButton label="Sign Out" icon="tabler:logout-2" href="/sign-out" />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
