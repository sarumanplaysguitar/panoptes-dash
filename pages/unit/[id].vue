<script lang="ts" setup>
import {doc} from "firebase/firestore";
import AboutSelectedUnit from "~/components/unit/AboutSelectedUnit.vue";

const route = useRoute()
const db = useFirestore()

const unitDoc = useDocument(doc(db, 'units', route.params.id), {wait: true})
</script>

<template>
  <!-- Main Layout -->
  <div class="min-h-screen flex flex-col md:grid md:grid-cols-[3.6rem_18rem_1fr] md:grid-rows-1 bg-neutral-900">
    <div class="h-14 md:h-auto md:col-span-1 md:row-span-1">
      <UnitSelector/>
    </div>

    <div class="md:h-auto md:col-span-1 md:row-span-1">
      <AboutSelectedUnit :unit="unitDoc" />
    </div>

    <div class="md:col-span-1 md:row-span-1 overflow-auto">
      <UnitDashboardContent :unit="unitDoc"/>
    </div>

    <RouterView/>
  </div>
</template>

<style scoped>

</style>
