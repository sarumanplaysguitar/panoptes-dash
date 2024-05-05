<script setup lang="ts">
import Card from 'primevue/card'
import RecentTable from "~/components/RecentObservationsTable.vue";

const observationsStore = useObservationsStore()

</script>

<template>
  <Card>
    <template #header>Observations</template>
    <template #content>
      <RecentTable :observations="observationsStore.observations"/>
    </template>
  </Card>
</template>

<style scoped>

</style>
