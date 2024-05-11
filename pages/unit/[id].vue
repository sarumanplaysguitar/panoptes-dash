<script lang="ts" setup>
import {collection, doc} from "firebase/firestore";

const db = useFirestore()
const route = useRoute()

const unitsRef = collection(db, 'units')
const unitDoc = ref(useDocument(doc(unitsRef, route.params.id), {wait: true}))
const configDoc = ref(useDocument(doc(unitsRef, route.params.id, 'metadata', 'config'), {wait: true}))
</script>

<template>
  <!-- Main Layout -->
  <div class="flex flex-row min-h-screen">
    <div class="basis-1/16">
      <UnitSelector/>
    </div>

    <div class="basis-3/16">
      <UnitAboutSelectedUnit :unitDoc="unitDoc" :configDoc="configDoc"/>
    </div>

    <div class="basis-3/4">
      <LazyUnitDashboardContent/>
    </div>

    <RouterView/>
  </div>
</template>

<style scoped>

</style>
