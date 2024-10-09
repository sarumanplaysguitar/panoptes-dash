<script lang="ts" setup>
</script>

<template>
  <!-- Main Layout -->
  <!-- <div class="flex flex-row min-h-screen">
    <div class="basis-1/16">
      <UnitSelector/>
    </div>

    <div class="basis-3/16">
      <Panel header="Unit Info">
      <UnitAboutSelectedUnit/>
      </Panel>
    </div>

    <div class="basis-3/4">
      <UnitDashboardContent/>
    </div>
    <RouterView/>
  </div> -->
  <div class="min-h-screen flex flex-col md:grid md:grid-cols-[3.6rem_18rem_1fr] md:grid-rows-1 bg-neutral-900">
    <div class="h-14 md:h-auto md:col-span-1 md:row-span-1">
      <UnitSelector />
    </div>
    
    <div class="md:h-auto md:col-span-1 md:row-span-1">
      <UnitAboutSelectedUnit/>
    </div>
    
    <div class="md:col-span-1 md:row-span-1 overflow-auto">
      <UnitDashboardContent />
    </div>
    
    <RouterView />
  </div>
</template>

<style scoped>

</style>
