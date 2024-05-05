<script setup lang="ts">

import Safety from "~/components/unit/status/Safety.vue";
</script>

<template>
  <Card class="status-card">
    <template #header>
      <p class="status-header">Telemetry</p>
    </template>
    <template #content>
      <UnitMetadataPlot/>
      <LazyUnitStatusSafety />
    </template>
  </Card>

</template>

<style scoped>

</style>
