<script setup lang="ts">
import {doc} from "firebase/firestore"

const route = useRoute()
const db = useFirestore()
const safetyDoc = useDocument(doc(db, 'units', route.params.id, 'metadata', 'safety'))

function getSeverity(val) {
  return val != undefined & val == true ? 'success' : 'danger'
}
</script>

<template>
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
  {{ safetyDoc?.received_time.toDate().toLocaleString() }}
</template>

<style scoped>

</style>
