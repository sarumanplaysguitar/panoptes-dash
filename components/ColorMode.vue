<script setup lang="ts">

const colorMode = useColorMode()

const colorOptions = ref(['system', 'light', 'dark'])

console.log(colorMode.preference)
</script>
<template>
  <Dropdown v-model="colorMode.preference" :options="colorOptions" value="system"></Dropdown>
</template>


<style>

</style>
