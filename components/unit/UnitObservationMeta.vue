<script setup lang="ts">
import {doc} from "firebase/firestore"


const route = useRoute()
const db = useFirestore()
const obsDoc = useDocument(doc(db, 'units', route.params.id, 'metadata', 'observations'), {wait: true})
</script>

<template>
  <pre class="text-xs">
sequence_id: {{ obsDoc?.SEQ_ID }}
image_id: {{ obsDoc?.IMG_ID }}
Field: {{ obsDoc?.FIELD }}
Mount Coords: {{ obsDoc?.field_ra }}° {{ obsDoc?.field_dec }}°
Solved Coords: {{ obsDoc?.CRVAL1?.toPrecision(5) }}° {{ obsDoc?.CRVAL2?.toPrecision(5) }}°
Exptime: {{ obsDoc?.exptime }}s
Exposure: {{ obsDoc?.current_exp_num }} / {{ obsDoc?.min_nexp }} [{{ obsDoc?.exp_set_size }}]
Moon: frac={{ obsDoc?.moon_fraction?.toPrecision(2) }} sep={{ obsDoc?.moon_separation?.toPrecision(4) }}°
    </pre>
</template>

<style scoped>

</style>
