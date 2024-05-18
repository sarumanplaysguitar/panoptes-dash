<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const dayjs = useDayjs()
const unitsStore = useUnitsStore()

const unit = computed(() => unitsStore.currentUnit)
const unitObservations = computed(() => unitsStore.unitObservationsSource)

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
    </div>
    <div>
      <Card>
        <template #header>Observations</template>
        <template #content>
          <ul>
            <li v-for="observation in unitObservations">
              <pre>
              {{ dayjs(observation.time.toDate()).format('lll') }}
              {{ observation.sequence_id }}
              </pre>
            </li>
          </ul>
        </template>
      </Card>
    </div>
    <RouterView/>
  </div>
</template>
