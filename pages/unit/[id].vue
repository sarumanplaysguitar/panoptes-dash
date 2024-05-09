<script lang="ts" setup>

const route = useRoute()
const unitsStore = useUnitsStore()

const unitDoc = useDocument(() => unitsStore.getUnitDoc(route.params.id), {wait: true})
</script>

<template>
  <!-- Main Layout -->
  <div class="flex flex-row min-h-screen">
    <div class="basis-1/16">
      <UnitSelector/>
    </div>

    <div class="basis-3/16">
      <LazyUnitAboutSelectedUnit :unit="unitDoc"/>
    </div>

    <div class="basis-3/4">
      <LazyUnitDashboardContent :unit="unitDoc"/>
    </div>

    <RouterView/>
  </div>
</template>

<style scoped>

</style>
