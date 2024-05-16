<script setup lang="ts">
const slots = defineProps(['observations'])
const observations = ref(slots.observations)
</script>

<template>
  <DataTable
      stripedRows
      showGridlines
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      size="small"
      :value="observations"
      sortField="time"
      tableStyle="min-width: 50rem">
    <Column field="unit_id" header="ID" sortable>
      <template #body="slotProps">
        <NuxtLink :to="`/unit/${slotProps.data.unit_id}`">{{ slotProps.data.unit_id }}</NuxtLink>
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

<style scoped>

</style>
