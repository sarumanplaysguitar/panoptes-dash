<script setup lang="ts">
import {doc} from "firebase/firestore"

import {useDayjs} from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

const route = useRoute()
const db = useFirestore()
const safetyDoc = useDocument(doc(db, 'units', route.params.id, 'metadata', 'safety'), {wait: true})

function getSeverity(val) {
  return val != undefined & val == true ? 'success' : 'danger'
}

</script>

<template>
  <br/>
  <Tag :severity="getSeverity(safetyDoc?.ac_power)">AC_OK</Tag>
  <br/>
  <Tag :severity="getSeverity(safetyDoc?.is_dark)">Dark</Tag>
  <br/>
  <Tag :severity="getSeverity(safetyDoc?.free_space_root)">Free Space (/)</Tag>
  <br/>
  <Tag :severity="getSeverity(safetyDoc?.free_space_images)">Free Space (images)</Tag>
  <br/>
  <Tag :severity="getSeverity(safetyDoc?.good_weather)">Weather</Tag>
  <br/>
  {{ $dayjs().to($dayjs(safetyDoc?.received_time.toDate()).utc()) }}
</template>

<style scoped>

</style>
