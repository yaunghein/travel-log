<script lang="ts" setup>
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => (colorMode.preference = value ? 'dark' : 'light'),
})
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input type="checkbox" v-model="isDark" />
    <Icon name="tabler:sun" class="swap-on" size="20" />
    <Icon name="tabler:moon-filled" class="swap-off" size="20" />
  </label>
</template>
