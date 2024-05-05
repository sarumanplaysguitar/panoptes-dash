<script setup lang="ts">

import CurrentTarget from "~/components/unit/status/CurrentTarget.vue";
import OverheadSky from "~/components/unit/status/OverheadSky.vue";
import Telemetry from "~/components/unit/status/Telemetry.vue";
import Weather from "~/components/unit/status/Weather.vue";
import Moon from "~/components/unit/status/Moon.vue";
</script>

<template>
  <div class="flex">
    <div class="status-layout">
      <CurrentTarget/>
      <OverheadSky/>
      <Telemetry/>
      <Weather/>
      <Moon/>
    </div>
  </div>
</template>

<style scoped>
.status-layout {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full p-1 pb-2 mt-1
}
</style>
