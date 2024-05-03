<script setup lang="ts">
import {collectionGroup, limit, orderBy, query} from "firebase/firestore";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card'

const db = useFirestore()
const observationsRef = collectionGroup(db, 'observations')
const observationsQuery = query(observationsRef, orderBy('time', 'desc'), limit(25))
const observations = useCollection(observationsQuery, {wait: true, ssrKey: 'observations'})
</script>

<template>
  Observations

  <Card>
    <template #content>
      <DataTable
          stripedRows
          showGridlines
          size="small"
          :value="observations"
          sortField="time"
          tableStyle="min-width: 50rem">
        <Column field="unit_id" header="ID" sortable>
          <template #body="slotProps">
            <NuxtLink :to="`/units/${slotProps.data.unit_id}`">{{ slotProps.data.unit_id }}</NuxtLink>
          </template>
        </Column>
        <Column field="sequence_id" header="Sequence ID" sortable></Column>
        <Column field="time" header="Time (relative)" sortable>
          <template #body="slotProps">
            {{ $dayjs().to($dayjs(slotProps.data.time.toDate()).utc()) }}
          </template>
        </Column>
        <Column field="time" header="Time (UTC)" sortable>
          <template #body="slotProps">
            {{ $dayjs(slotProps.data.time.toDate()).utc().format() }}
          </template>
        </Column>
        <Column field="time" header="Time (local)" sortable>
          <template #body="slotProps">
            {{ $dayjs(slotProps.data.time.toDate().toLocaleString()).format() }}
          </template>
        </Column>
        <Column field="num_images" header="Images" sortable></Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped>

</style>
