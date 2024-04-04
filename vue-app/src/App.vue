<script setup>
  import { RouterView } from "vue-router";
  import UnitSelector from "./components/UnitSelector.vue";
  import AboutSelectedUnit from "./components/AboutSelectedUnit.vue";
  import UnitDashboardContent from "./components/UnitDashboardContent.vue";
  import UnitObservationLog from "./components/UnitObservationLog.vue";
</script>

<template>
  <!-- Main Layout -->
  <div class="min-h-screen flex flex-col md:grid md:grid-cols-[3.6rem_18rem_1fr] md:grid-rows-1 bg-neutral-900">
    <div class="h-14 md:h-auto md:col-span-1 md:row-span-1">
      <UnitSelector />
    </div>
    
    <div class="md:h-auto md:col-span-1 md:row-span-1">
      <AboutSelectedUnit />
    </div>
    
    <div class="md:col-span-1 md:row-span-1 overflow-auto">
      <UnitDashboardContent />
    </div>
    
    <RouterView />
  </div>
</template>

<style scoped></style>
