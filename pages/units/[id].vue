<script setup>
import {collection} from "firebase/firestore";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const route = useRoute()
const db = useFirestore()

const metadataRef = collection(db, 'units', route.params.id, 'metadata')
const metadata = useCollection(metadataRef, {wait: true})

const safety = computed(() => metadata.value.find(doc => doc.id == 'safety'))

function getSeverity(val){
  return val != undefined & val == true ? 'success' : 'danger'
}
</script>

<template>
  Hi {{ route.params.id }}

  <Card>
    <template #content>
      <UnitMetadataPlot/>
    </template>
  </Card>

  <Card>
    <template #title>Safety</template>
    <template #content>
      <Tag :severity="getSeverity(safety?.ac_power)">AC_OK</Tag>
      <br />
      <Tag :severity="getSeverity(safety?.is_dark)">Dark</Tag>
      <br />
      <Tag :severity="getSeverity(safety?.free_space_root)">Free Space (/)</Tag>
      <br />
      <Tag :severity="getSeverity(safety?.free_space_images)">Free Space (images)</Tag>
      <br />
      <Tag :severity="getSeverity(safety?.good_weather)">Weather</Tag>
      <br />
      {{ safety.received_time.toDate().toLocaleString() }}
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
