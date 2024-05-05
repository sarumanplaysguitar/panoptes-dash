<script setup lang="ts">

const route = useRoute()
const metadataStore = useMetadataStore()
const colorMode = useColorMode()

const plotData = ref([
  metadataStore.getMetadataAsArray(route.params.id, 'power', 'fans'),
  metadataStore.getMetadataAsArray(route.params.id, 'power', 'weather_station'),
  metadataStore.getMetadataAsArray(route.params.id, 'power', 'mount'),
  metadataStore.getMetadataAsArray(route.params.id, 'power', 'unused1'),
  metadataStore.getMetadataAsArray(route.params.id, 'power', 'unused3'),
])

const stateLabelData = ref(metadataStore.getMetadataAsArray(route.params.id, 'state', 'dest'))

const stateLabels = computed(() => {
  return stateLabelData.value.data.map((rec) => {
    return rec ? {'x': new Date(rec[0]).getTime(), 'label': {'text': rec[1]}} : {}
  })
})

const plotOptions = computed(() => {
  return {
    chart: {
      id: 'power-plot'
    },
    title: {
      text: 'Power readings'
    },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 500
      }
    },
    xaxis: {
      type: 'datetime'
    },
    annotations: {
      xaxis: stateLabels.value
    },
    theme: {
      mode: colorMode.preference
    }
  }
})
</script>

<template>
  <ClientOnly> <!-- Cannot use SSR for apexcharts -->
    <apexchart
        :series="plotData"
        :options="plotOptions"
        width="100%"
        type="line"
    ></apexchart>
  </ClientOnly>
</template>

<style scoped>

</style>
