<script setup lang="ts">
import {collection} from 'firebase/firestore'
import DataView from 'primevue/dataview';

const db = useFirestore()
const units = useCollection(collection(db, 'units'))
</script>

<template>
  <DataView :value="units">
    <template #list="slotProps">
      <div class="flex flex-wrap">
        <div v-for="(unit, index) in slotProps.items" :key="unit.id" class="w-full p-3">
          {{ unit.id }} {{ unit.name }}
        </div>
      </div>
    </template>
  </DataView>
</template>

<style scoped>

</style>
