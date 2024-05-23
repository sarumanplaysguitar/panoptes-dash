<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const unitsStore = useUnitsStore()
const unit = computed(() => unitsStore.currentUnit ? unitsStore.currentUnit : {})
const safetyDoc = computed(() => unit.value?.safety ? unit.value?.safety : {})

const lastUpdated = computed(() =>
    safetyDoc.value?.received_time
        ? safetyDoc.value?.received_time.toDate()
        : null)

function getSeverity(val: string | null) {
  return (val != null & val) ? 'success' : 'danger'
}

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <Card class="status-card">
    <template #header>Safety</template>
    <template #content>
      <br/>
      <Tag :severity="getSeverity(safetyDoc?.ac_power)">AC_OK</Tag>
      <br/>
      <Tag :severity="getSeverity(safetyDoc?.is_dark)">Dark (Sun: {{unit.sun?.position?.toFixed(2)}}°)</Tag>
      <br/>
      <Tag :severity="getSeverity(safetyDoc?.free_space_root)">Free Space ({{ unit?.free_space }}GB)</Tag>
      <br/>
      <Tag :severity="getSeverity(safetyDoc?.good_weather)">Weather</Tag>
      <br/>
    </template>
    <template #footer>
      Last updated: {{ lastUpdated ? $dayjs().to($dayjs(lastUpdated).utc()) : 'N/A' }}
    </template>
  </Card>
</template>

<style scoped>

</style>
