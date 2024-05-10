<script setup>
import {usePendingPromises} from 'vuefire'

import Avatar from 'primevue/avatar';

const unitsStore = useUnitsStore()
const units = unitsStore.units
onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <Card>
    <template #content>
      <div class="avatar_bg">
        <div v-for="unit in units">
          <Avatar :label="unit.unit_id.slice(3)" shape="circle">
            <NuxtLink :to="`/unit/${unit.unit_id}`">{{ unit.unit_id.slice(3) }}</NuxtLink>
          </Avatar>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.avatar_bg {
  @apply flex flex-row gap-3 p-1 h-[3.5m] md:flex-col md:h-screen md:w-[3rem] overflow-y-auto
}
</style>
