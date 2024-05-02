<script setup lang="ts">
import {collection, limit, orderBy, query} from "firebase/firestore";

const route = useRoute()
const db = useFirestore()

function getMetadataAsArray(collectionName: string, fieldName: string) {
  const colRef = collection(db, 'units', route.params.id, 'metadata', collectionName, 'records')
  const colQuery = useCollection(query(colRef, orderBy('received_time', 'desc'), limit(25)), {
    wait: true,
    ssrKey: fieldName
  })

  const data = computed(() => {
    return colQuery.value.map(u => u[fieldName] != undefined ? [u.received_time.toDate(), u[fieldName]] : [u.received_time.toDate(), 0])
  })

  return {name: fieldName, data: data, otherData: data}
}

const plotData = ref([
  getMetadataAsArray('power', 'fans'),
  getMetadataAsArray('power', 'weather_station'),
  getMetadataAsArray('power', 'mount'),
  getMetadataAsArray('power', 'unused1'),
  getMetadataAsArray('power', 'unused3'),
])

const stateLabelData = ref(getMetadataAsArray('state', 'dest'))

const stateLabels = computed(() => {
  const labels = stateLabelData.value.data.map((rec) => {
    return rec ? {'x': new Date(rec[0]).getTime(), 'label': {'text': rec[1]}} : {}
  })
  return labels
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
    }
  }
})
</script>

<template>
  <ClientOnly> <!-- Cannot use SSR for apexcharts -->
    <apexchart
        :series="plotData"
        :options="plotOptions"
        width="500"
        type="line"
    ></apexchart>
  </ClientOnly>
</template>

<style scoped>

</style>
