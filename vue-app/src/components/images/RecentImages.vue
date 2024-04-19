<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chip from 'primevue/chip';


import {useImageStore} from "@/stores/images.js";
import CoordsBadge from "@/components/app/ui/CoordsBadge.vue";

const store = useImageStore()
</script>

<template>
  <DataTable :value="store.images" sortField="image_time" showGridlines stripedRows tableStyle="min-width: 50rem">
    <Column field="uid" header="SEQUENCE_ID" sortable>
      <template #body="slotProps">
        <div v-if="slotProps.data.uid">
          {{  slotProps.data.uid.substring(0, slotProps.data.uid.lastIndexOf('_')) }}
        </div>
      </template>
    </Column>
    <Column field="image_time" header="Time" sortable>
      <template #body="slotProps">
        <div v-if="slotProps.data.image_time">
          {{ slotProps.data.image_time.toDate().toLocaleString() }}
        </div>
      </template>
    </Column>
    <Column field="status" header="Status" sortable></Column>
    <Column field="image_type" header="Type" sortable></Column>
    <Column field="coordinates" header="Coords">
      <template #body="slotProps">
        <CoordsBadge v-bind="slotProps.data.coordinates"></CoordsBadge>
      </template>
    </Column>
    <Column field="environment" header="Moon">
      <template #body="slotProps">
        <div v-if="slotProps.data.environment">
          {{ slotProps.data.environment.moonfrac.toLocaleString() }}
        </div>
      </template>
    </Column>
    <Column field="sources.num_detected" header="Detected Stars"></Column>
    <Column field="sources" header="FWHM">
      <template #body="slotProps">
        <div v-if="slotProps.data.sources">
          {{ slotProps.data.sources.photutils_fwhm_median.toLocaleString() }}
          ±{{ slotProps.data.sources.photutils_fwhm_std.toLocaleString() }}
        </div>
      </template>
    </Column>
    <Column field="public_url" header="Link">
      <template #body="slotProps">
        <div v-if="slotProps.data.public_url">
        <a :href="`${slotProps.data.public_url}`" target="_blank">
          <Chip label="FITS"></Chip>
        </a>
        </div>
      </template>
    </Column>
  </DataTable>
</template>


<style>

</style>
