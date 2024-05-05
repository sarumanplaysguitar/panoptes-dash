<script setup>
import Avatar from 'primevue/avatar';
import {useUnitsStore} from "~/stores/units.js";

const unitsStore = useUnitsStore()
const units = unitsStore.units
</script>

<template>
  <div class="avatar_bg">
    <div class="relative inline-block" v-for="unit in units">
      <Avatar :label="unit.unit_id.slice(3)" shape="circle">
        <NuxtLink :to="`/unit/${unit.unit_id}`">{{ unit.unit_id.slice(3) }}</NuxtLink>
      </Avatar>
    </div>
  </div>
</template>

<style scoped>
.avatar_bg {
  @apply flex flex-row gap-3 p-2 h-[3.5m] md:flex-col md:h-screen md:w-[3.6rem] items-center overflow-y-auto
}
</style>
