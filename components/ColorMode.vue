<script setup lang="ts">

const colorMode = useColorMode()

const colorOptions: Ref<UnwrapRef<string[]>> = ref(['system', 'light', 'dark'])

</script>
<template>
  <Dropdown v-model="colorMode.preference" :options="colorOptions" :value="colorMode.preference"></Dropdown>
</template>


<style>

</style>
