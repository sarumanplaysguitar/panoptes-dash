<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {usePendingPromises} from 'vuefire'

const colorMode = useColorMode()
const whichColor = computed(() => colorMode.preference)

const unitsStore = useUnitsStore()
const units = computed(() => unitsStore.units)
const unitIds = computed(() => units.value.map(unit => unit.id))
const numImages = computed(() => units.value.map(unit => unit.num_images ? unit.num_images : 0))

const plotOptions = computed(() => {
      return {
        chart: {
          id: 'num-images-plot'
        },
        title: {
          text: 'Number of images per units'
        },
        xaxis: {
          categories: unitIds.value
        },
        yaxis: {
          title: {
            text: 'Number of images (log)'
          },
        },
        dataLabels: {
          enabled: false
        },
        theme: {
          mode: whichColor.value
        }
      }
    }
)

const plotSeries = computed(() => {
  return [{
    name: 'numImages',
    data: numImages.value ? numImages.value : []
  }]
})

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <div class="flex flex-row">
    <div class="basis-3/4">
      <Card>
        <template #content>
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
      </Card>
    </div>
    <div class="basis-1/4">
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
    </div>
  </div>
</template>

<style scoped>

</style>
