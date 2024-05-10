<script lang="ts" setup>

</script>

<template>
  <!-- Main Layout -->
  <div class="flex flex-row min-h-screen">
    <div class="basis-1/16">
      <UnitSelector/>
    </div>

    <div class="basis-3/16">
      <UnitAboutSelectedUnit/>
    </div>

    <div class="basis-3/4">
<!--      <LazyUnitDashboardContent/>-->
    </div>

    <RouterView/>
  </div>
</template>

<style scoped>

</style>
