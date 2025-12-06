<script setup>
const style = 'https://tiles.openfreemap.org/styles/liberty'
const center = [10.559482, 47.21322]
const zoom = 4
</script>

<template>
  <MglMap :map-style="style" :center="center" :zoom="zoom">
    <MglNavigationControl />
  </MglMap>
</template>
