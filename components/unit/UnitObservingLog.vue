<script lang="ts" setup>
import {usePendingPromises} from 'vuefire'

const route = useRoute()

const observationsStore = useObservationsStore()
const unitObservations = observationsStore.getRecentUnitObservations(route.params.id)
onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <LazyRecentObservationsTable :observations="unitObservations"/>
</template>

<style scoped>

</style>
