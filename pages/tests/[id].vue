<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const dayjs = useDayjs()
const unitsStore = useUnitsStore()

const unit = computed(() => unitsStore.currentUnit)
const observations = computed(() => unitsStore.currentObservations)

onServerPrefetch(() => usePendingPromises())
</script>
<template>
  <div class="flex flex-row min-h-screen gap-2">
    <div class="basis-1/16">
      <UnitSelector/>
    </div>
    <div class="basis-3/16">
      <Card>
        <template #header>
          <p class="status-header">{{ unit?.id }}</p>
        </template>
        <template #content>
          <pre class="text-xs">
            {{ unit?.about() }}
          </pre>
        </template>
      </Card>
      <Card>
        <template #header>
          <p class="status-header">{{ unit?.id }}</p>
        </template>
        <template #content>
          <pre class="text-xs">
<!--            {{ unit?.status?.received_time.toDate() }}-->
          </pre>
        </template>
      </Card>
    </div>
    <div>
      <Card>
        <template #header>Observations</template>
        <template #content>
          <RecentObservationsTable :observations="observations"/>
        </template>
      </Card>
    </div>
    <RouterView/>
  </div>
</template>
