<script setup lang="ts">
import {usePendingPromises} from 'vuefire'
import {PanUnit} from '~/composables/panUnit'

const unitsStore = useUnitsStore()

const unit = computed(() => {
  const u = unitsStore.currentUnit
  if (!u) return null
  const metadata = unitsStore.currentMetadata
  let pan_unit = new PanUnit(u.id)
  pan_unit.config = metadata.config
  pan_unit.status = metadata.status
  pan_unit.safety = metadata.safety
  pan_unit.power = metadata.power
  pan_unit.weather = metadata.weather

  return pan_unit
})

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
          <pre>
            Hi
          </pre>
        </template>
      </Card>
    </div>
    <RouterView/>
  </div>
</template>
