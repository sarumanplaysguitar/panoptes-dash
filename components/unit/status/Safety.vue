<script setup lang="ts">
import {useMetadataStore} from "~/stores/metadata";
import Listbox from 'primevue/listbox';


const route = useRoute()

const metadataStore = useMetadataStore()

const safetyDoc = useDocument(
    metadataStore.getMetadataDoc(route.params.id, 'safety'), {wait: true}
)

function getSeverity(val: boolean) {
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
