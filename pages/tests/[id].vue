<script setup lang="ts">
import type {PanUnit} from "~/composables/panUnit";

const unitsStore = useUnitsStore()
const unit: ComputedRef<null | PanUnit> = computed(() => unitsStore.currentUnit)
</script>
<template>
  <div class="flex flex-row min-h-screen">
    <div class="basis-1/16">
      <UnitSelector/>
    </div>

    <div>
      <Card>
        <template #header>
          <p class="status-header">{{ unit?.id }}</p>
        </template>
        <template #content>
          <pre>
            {{ unit.about() }}
          </pre>
        </template>
      </Card>
    </div>
    <RouterView/>
  </div>
</template>
