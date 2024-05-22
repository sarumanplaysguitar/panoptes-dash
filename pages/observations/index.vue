<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const unitsStore = useUnitsStore()
const observations = computed(() => unitsStore.currentObservations ? unitsStore.currentObservations : [])

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <Card>
    <template #header>Observations</template>
    <template #content>
      <RecentObservationsTable :observations="observations"/>
    </template>
  </Card>
</template>

<style scoped>

</style>
