<script setup lang="ts">
import {collection} from 'firebase/firestore'
import DataView from 'primevue/dataview';

const db = useFirestore()
const units = useCollection(collection(db, 'units'))
const metadata = useCollection(collection(db, 'metadata'))
console.log(metadata)
</script>

<template>
  <ul>
    <li v-for="md in metadata" :key="md.id">{{ md.id }}</li>
  </ul>
  <DataView :value="units">
    <template #list="slotProps">
      <div class="flex flex-wrap">
        <div v-for="(unit, index) in slotProps.items" :key="unit.id" class="w-full p-3">
          {{ unit.id }} {{ unit.name }} {{ unit.num_images }} {{ unit.metadata }}
        </div>
      </div>
    </template>
  </DataView>
</template>

<style scoped>

</style>
