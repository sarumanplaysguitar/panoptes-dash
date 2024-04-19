<script setup>
import UnitSelector from "../components/units/UnitSelector.vue";
import AboutSelectedUnit from "../components/units/AboutSelectedUnit.vue";
import UnitDashboardContent from "../components/units/UnitDashboardContent.vue";
</script>

<template>
  <main>
    <div class="min-h-screen flex flex-col md:grid md:grid-cols-[3.6rem_18rem_1fr] md:grid-rows-1 bg-neutral-900">
      <div class="h-14 md:h-auto md:col-span-1 md:row-span-1">
        <UnitSelector/>
      </div>

      <div class="md:h-auto md:col-span-1 md:row-span-1">
        <AboutSelectedUnit/>
      </div>

      <div class="md:col-span-1 md:row-span-1 overflow-auto">
        <UnitDashboardContent/>
      </div>

    </div>
  </main>
</template>
