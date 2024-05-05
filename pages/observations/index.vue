<script setup lang="ts">
import {collectionGroup, limit, orderBy, query} from "firebase/firestore";
import Card from 'primevue/card'
import RecentTable from "~/components/RecentObservationsTable.vue";

const db = useFirestore()
const observationsRef = collectionGroup(db, 'observations')
const observationsQuery = query(observationsRef, orderBy('time', 'desc'), limit(25))
const observations = useCollection(observationsQuery, {wait: true, ssrKey: 'observations'})
</script>

<template>
  Observations

  <Card>
    <template #content>
      <RecentTable :observations="observations"/>
    </template>
  </Card>
</template>

<style scoped>

</style>
