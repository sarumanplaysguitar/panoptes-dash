<script setup lang="ts">
import {collection} from 'firebase/firestore'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useCollection, useFirestore} from "vuefire";

const db = useFirestore()
const unitsRef = collection(db, 'units')
const units = useCollection(unitsRef)

const plotOptions = ref({
  chart: {
    id: 'num-images-plot'
  },
  title: {
    text: 'Number of images per units'
  },
  xaxis: {
    categories: units.value.map(u => u.id)
  },
  yaxis: {
    title: {
      text: 'Number of images (log)'
    },
    logarithmic: true
  },

})
const unitImages = computed(() => {
  return units.value.map(u => u.num_images ? parseFloat(u.num_images) : 0)
})

const plotSeries = ref([{
  name: 'numImages',
  data: unitImages
}])
</script>

<template>
  <div>
    <ClientOnly> <!-- Cannot use SSR for apexcharts -->
      <apexchart
          :series="plotSeries"
          :options="plotOptions"
          width="500"
          type="bar"
      ></apexchart>
    </ClientOnly>
  </div>
  <DataTable
      stripedRows
      showGridlines
      size="small"
      :value="units"
      tableStyle="min-width: 50rem">
    <Column field="id" header="ID" sortable>
      <template #body="slotProps">
        <router-link :to="slotProps.data.id"></router-link>
      </template>
    </Column>
    <Column field="name" header="Name" sortable></Column>
    <Column field="latitude" header="Lat (deg)">
      <template #body="slotProps">
        {{ slotProps.data.latitude.toPrecision(5) }}°
        {{ slotProps.data.longitude.toPrecision(5) }}°
        {{ slotProps.data.elevation }}m
      </template>
    </Column>
    <Column field="num_images" header="# Images" sortable></Column>
  </DataTable>
</template>

<style scoped>

</style>
