<script setup>
import {collection} from "firebase/firestore";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const route = useRoute()
const db = useFirestore()

const metadataRef = collection(db, 'units', route.params.id, 'metadata')
const metadata = useCollection(metadataRef, {wait: true})


</script>

<template>
  Hi {{ route.params.id }}

  <Card>
    <template #content>
      <LazyUnitMetadataPlot/>
    </template>
  </Card>

  <Card>
    <template #title>Safety</template>
    <template #content>
      <LazyUnitSafety />
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
