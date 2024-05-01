<script setup>
import {collection, doc} from "firebase/firestore";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';


const route = useRoute()
const db = useFirestore()

const unitDoc = useDocument(doc(db, 'units', route.params.id), {wait: true})
const metadata = useCollection(collection(db, 'units', route.params.id, 'metadata'), {wait: true})

const power = computed(() => metadata.value.find((doc) => doc.id == 'power'))
const weather = computed(() => metadata.value.find((doc) => doc.id == 'weather'))
const safety = computed(() => metadata.value.find((doc) => doc.id == 'safety'))
const state = computed(() => metadata.value.find((doc) => doc.id == 'state'))
const observations = computed(() => metadata.value.find((doc) => doc.id == 'observations'))
</script>

<template>
  Hi {{ unitDoc?.id }}

  <Accordion :multiple="true">
    <AccordionTab v-for="md in metadata" :header="md.id">
      <pre>{{ md }}</pre>
    </AccordionTab>
  </Accordion>
</template>

<style scoped>

</style>
