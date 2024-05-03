<script setup lang="ts">
import {doc} from "firebase/firestore"

import {useDayjs} from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

const route = useRoute()
const db = useFirestore()
const obsDoc = useDocument(doc(db, 'units', route.params.id, 'metadata', 'observations'), {wait: true})
</script>

<template>
  <br/>
  sequence_id: {{ obsDoc?.sequence_id }}<br/>
  image_id: {{ obsDoc?.image_id }}<br/>
  Field: {{ obsDoc?.field_name }}<br/>
  Mount Coords: {{ obsDoc?.field_ra }}° {{ obsDoc?.field_dec }}°<br/>
  Solved Coords: {{ obsDoc?.CRVAL1?.toPrecision(5) }}° {{ obsDoc?.CRVAL2?.toPrecision(5) }}°<br/>
  Exptime: {{ obsDoc?.exptime }}s <br/>
  Exposure: {{ obsDoc?.current_exp_num }} / {{ obsDoc?.min_nexp }} [{{ obsDoc?.exp_set_size }}]<br/>
  Moon: frac={{ obsDoc?.moon_fraction.toPrecision(2) }} sep={{ obsDoc?.moon_separation.toPrecision(4)}}°<br />
  {{ $dayjs().to($dayjs(obsDoc?.received_time.toDate()).utc()) }}
</template>

<style scoped>

</style>
