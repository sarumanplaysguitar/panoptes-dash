<script setup>
const props = defineProps({
  ra: Number,
  dec: Number,
})
</script>

<template>
<div>
  <div v-if="ra">
    {{ ra.toLocaleString() }}° {{ dec.toLocaleString() }}°
  </div>
</div>
</template>

<style scoped>

</style>
