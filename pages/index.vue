<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useUnitsStore} from "~/stores/units";


const unitsStore = useUnitsStore()
const units = unitsStore.units

const plotOptions = ref({
  chart: {
    id: 'num-images-plot'
  },
  title: {
    text: 'Number of images per units'
  },
  xaxis: {
    categories: unitsStore.unitIDs
  },
  yaxis: {
    title: {
      text: 'Number of images (log)'
    },
  },
  dataLabels: {
    enabled: false
  }
})

const plotSeries = ref([{
  name: 'numImages',
  data: unitsStore.unitImages
}])
</script>

<template>
  <Card>
    <template #content>
    <ClientOnly> <!-- Cannot use SSR for apexcharts -->
      <apexchart
          :series="plotSeries"
          :options="plotOptions"
          width="500"
          type="bar"
      ></apexchart>
    </ClientOnly>
    </template>
  </Card>
  <DataTable
      stripedRows
      showGridlines
      size="small"
      :value="units"
      tableStyle="min-width: 50rem">
    <Column field="id" header="ID" sortable>
      <template #body="slotProps">
        <NuxtLink :to="`/unit/${slotProps.data.id}`">{{ slotProps.data.id }}</NuxtLink>
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
