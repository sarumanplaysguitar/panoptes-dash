<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useImageStore} from "@/stores/images.js";
import {useObservationsStore} from "@/stores/observations.js";

const store = useObservationsStore()
const img_store = useImageStore()
</script>

<template>
  <DataTable
      :value="store.observations"
      size="small"
      showGridlines
      stripedRows
      dataKey="id"
      tableStyle="min-width: 50rem">
    <Column field="id" header="Time" sortable></Column>
    <Column field="unit_id" header="Unit" sortable></Column>
    <Column field="image_type" header="Type" sortable></Column>
    <Column field="field_name" header="Field" sortable></Column>
    <Column field="coordinates.mount_ra" header="RA"></Column>
    <Column field="coordinates.mount_dec" header="Dec"></Column>
    <Column field="num_images" header="Images"></Column>
  </DataTable>
</template>


<style>

</style>
