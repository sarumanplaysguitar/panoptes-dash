<script setup>
import UnitBadge from "@/components/app/ui/UnitBadge.vue";
import {useUnitStore} from "@/stores/units.js";

const store = useUnitStore()
</script>

<template>
  <div class="badge-holder">
    <unitBadge v-for="unit in store.units" :key="unit.id" :unit_id="unit.id.slice(3)"/>
  </div>
</template>

<style>
.badge-holder {
  @apply bg-neutral-900 flex flex-row gap-3 p-2 h-[3.5m] md:flex-col md:h-screen md:w-[3.6rem] items-center overflow-y-auto
}
</style>
