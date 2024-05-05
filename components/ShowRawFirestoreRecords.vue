<script setup>
import {collection} from "firebase/firestore";

const route = useRoute()
const db = useFirestore()

const metadataRef = collection(db, 'units', route.params.id, 'metadata')
const metadata = useCollection(metadataRef, {wait: true})

</script>

<template>
  <Accordion :multiple="true">
    <AccordionTab v-for="md in metadata" :header="md.id">
      <pre>{{ md }}</pre>
    </AccordionTab>
  </Accordion>
</template>
