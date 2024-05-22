<script setup lang="ts">

</script>

<template>
  <div class="flex">
    <div class="status-layout">
      <!--      <LazyUnitStatusCurrentTarget/>-->
      <!--      <LazyUnitStatusTelemetry/>-->
      <LazyUnitStatusSafety/>
      <LazyUnitStatusWeather/>
      <!--      <LazyUnitStatusMoon/>-->
      <!--      <LazyUnitStatusOverheadSky/>-->
    </div>
  </div>
</template>

<style>
.status-layout {
  @apply grid grid-cols-4 gap-2
}

.status-card {
  @apply col-span-1 rounded-md p-4
}

.status-header {
  @apply text-sm uppercase pb-2
}
</style>
