<script setup>

</script>

<template>
  <Panel header="Observing Log">
    <UnitObservingLog/>
  </Panel>
  <Panel header="Status">
    <UnitStatus/>
  </Panel>
</template>

<style scoped>
.tab-holder {
  @apply bg-neutral-900 flex flex-col py-2 px-1 md:h-screen
}

.tab-panel {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full p-1 pb-2 mt-1
}
</style>
