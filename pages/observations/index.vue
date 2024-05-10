<script setup lang="ts">
import Card from 'primevue/card'
import {usePendingPromises} from 'vuefire'

const observationsStore = useObservationsStore()

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <Card>
    <template #header>Observations</template>
    <template #content>
      <LazyRecentObservationsTable :observations="observationsStore.observations"/>
    </template>
  </Card>
</template>

<style scoped>

</style>
