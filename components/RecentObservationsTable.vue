<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const route = useRoute()

const unitsStore = useUnitsStore()
const observations = computed(() => unitsStore.currentObservations ? unitsStore.currentObservations : [])
const images = computed(() => unitsStore.currentImages ? unitsStore.currentImages : [])

observations.value.forEach((observation) => {
  observation.images = images.value.filter((image) => {
    return image.uid.startsWith(observation.sequence_id)
  })
})

const expandedRows = ref([]);

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <div v-if="observations.length">
<!--    {{ observations[0] }}-->
  </div>
  <DataTable
      v-model:expandedRows="expandedRows"
      dataKey="sequence_id"
      size="small"
      :value="observations"
      sortMode="single"
      sortField="sequence_time"
      tableStyle="min-width: 50rem">
    <Column field="unit_id" header="ID" sortable v-if="route.params.id == null">
      <template #body="slotProps">
        <NuxtLink :to="`/unit/${slotProps.data.unit_id}`">{{ slotProps.data.unit_id }}</NuxtLink>
      </template>
    </Column>
    <Column expander style="width: 3rem"></Column>
    <Column field="sequence_time" header="Time (UTC)" sortable>
      <template #body="slotProps">
        {{ slotProps.data.sequence_time.format('llll') }}
        ({{ $dayjs(slotProps.data.sequence_time).fromNow() }})
      </template>
    </Column>
    <Column field="sequence_id" header="Sequence ID" sortable></Column>
    <Column field="field_name" header="Field Name"></Column>
    <Column header="Mount Coordinates">
      <template #body="slotProps">
        <div v-if="slotProps.data.coordinates">
          {{ slotProps.data.coordinates?.mount_ra?.toFixed(3) }}°
          {{ slotProps.data.coordinates?.mount_dec?.toFixed(3) }}°
        </div>
      </template>
    </Column>
    <Column field="image_type" header="Type" sortable></Column>
    <Column header="Image count">
      <template #body="slotProps">
        {{ slotProps.data.images ? slotProps.data.images.length : 'N/A' }}
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-3 bg-black">
        <LazyRecentImagesTable :images="slotProps.data.images"/>
      </div>
    </template>
  </DataTable>
</template>

<style scoped>

</style>
