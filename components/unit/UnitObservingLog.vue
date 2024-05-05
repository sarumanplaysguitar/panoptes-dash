<script lang="ts" setup>
import {collection, limit, orderBy, query} from "firebase/firestore";
import RecentTable from "~/components/RecentObservationsTable.vue";

const route = useRoute()
const db = useFirestore()

const unitRef = collection(db, 'units', route.params.id, 'observations')
const recentObsQuery = query(unitRef, orderBy('time', 'desc'), limit(25))

const unitObservations = useCollection(recentObsQuery, {wait: true, ssrKey: 'recent-unit-observations'})
</script>

<template>
  <RecentTable :observations="unitObservations"/>
</template>

<style scoped>

</style>
