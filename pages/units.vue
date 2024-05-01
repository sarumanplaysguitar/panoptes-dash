<script setup lang="ts">
import {collection} from 'firebase/firestore'
import DataView from 'primevue/dataview';
import {useCollection, useFirestore} from "vuefire";

const db = useFirestore()
const unitsRef = collection(db, 'units')
const units = useCollection(unitsRef, { once: true })


</script>

<template>
  <DataView :value="units">
    <template #list="slotProps">
      <div class="flex flex-wrap">
        <div v-for="(unit, index) in slotProps.items" :key="unit.id" class="w-full p-3">
          {{ unit.id }} {{ unit.name }} {{ unit.latitude }}° {{ unit.longitude }}° {{ unit.elevation }}m
        </div>
      </div>
    </template>
  </DataView>
</template>

<style scoped>

</style>
