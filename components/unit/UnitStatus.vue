<script setup lang="ts">

import CurrentTarget from "~/components/unit/status/CurrentTarget.vue";
import OverheadSky from "~/components/unit/status/OverheadSky.vue";
import Telemetry from "~/components/unit/status/Telemetry.vue";
import Weather from "~/components/unit/status/Weather.vue";
import Moon from "~/components/unit/status/Moon.vue";
import Safety from "~/components/unit/status/Safety.vue";
</script>

<template>
  <div class="flex">
    <div class="status-layout">
      <CurrentTarget/>
      <Telemetry/>
      <Safety />
      <Weather/>
      <Moon/>
      <OverheadSky/>
    </div>
  </div>
</template>

<style>
.status-layout {
  @apply grid grid-cols-4 gap-2
}

.status-card {
  @apply col-span-2 rounded-md p-4
}

.status-header {
  @apply text-sm uppercase pb-2
}
</style>
