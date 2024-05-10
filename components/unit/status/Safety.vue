<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const route = useRoute()
const metadataStore = useMetadataStore()

const safetyDoc = metadataStore.getMetadataDoc(route.params.id, 'safety')
onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <Card class="status-card">
    <template #header>Safety</template>
    <template #content>
      <br/>
      <Tag :severity="metadataStore.getSeverity(safetyDoc?.ac_power)">AC_OK</Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(safetyDoc?.is_dark)">Dark</Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(safetyDoc?.free_space_root)">Free Space (/)</Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(safetyDoc?.free_space_images)">Free Space (images)</Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(safetyDoc?.good_weather)">Weather</Tag>
      <br/>
      Last updated: {{ $dayjs().to($dayjs(safetyDoc?.received_time.toDate()).utc()) }}
    </template>
  </Card>
</template>

<style scoped>

</style>
