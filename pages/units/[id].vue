<script setup>
import {collection, limit, orderBy, query} from "firebase/firestore";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const route = useRoute()
const db = useFirestore()

const metadataRef = collection(db, 'units', route.params.id, 'metadata')
const metadata = useCollection(metadataRef, {wait: true})

function getMetadataAsArray(collectionName, fieldName) {
  const colRef = collection(db, 'units', route.params.id, 'metadata', collectionName, 'records')
  const colQuery = useCollection(query(colRef, orderBy('received_time', 'desc'), limit(25)), {wait: true})

  const data = computed(() => {
    return colQuery.value.map(u => u[fieldName] ? [u.received_time.toDate(), parseFloat(u[fieldName])] : [u.received_time.toDate(), null])
  })

  return {name: fieldName, data: data}
}

const plotOptions = ref({
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
})

const plotData = ref([
  getMetadataAsArray('power', 'fans'),
  getMetadataAsArray('power', 'weather_station'),
  getMetadataAsArray('power', 'mount'),
  getMetadataAsArray('power', 'unused1'),
  getMetadataAsArray('power', 'unused3'),
])
</script>

<template>
  Hi {{ route.params.id }}

  <Card>
    <template #content>
      <ClientOnly> <!-- Cannot use SSR for apexcharts -->
        <apexchart
            :series="plotData"
            :options="plotOptions"
            width="500"
            type="line"
        ></apexchart>
      </ClientOnly>
    </template>
  </Card>

  <Accordion :multiple="true">
    <AccordionTab v-for="md in metadata" :header="md.id">
      <pre>{{ md }}</pre>
    </AccordionTab>
  </Accordion>
</template>

<style scoped>

</style>
