<script setup lang="ts">

</script>

<template>
  <Card class="status-card">
    <template #header>
      <p class="status-header">Moon</p>
    </template>
    <template #content>
      <!-- Moon panel -->
      <div class="pl-2 text-left w-full">
        <h2 class="text-[1.4rem] pt-11 pl-1">New Moon</h2>
        <div class="grid grid-cols-3">
          <div class="p-1 col-span-1">
            <p class="text-xs uppercase semibold">Illumination</p>
            <p class="text-lg">54%</p>
          </div>
          <div class="p-1 col-span-1">
            <p class="text-xs uppercase semibold">Moonset</p>
            <p class="text-lg">2:10 AM</p>
          </div>
          <div class="p-1 col-span-1">
            <p class="text-xs uppercase semibold">Moonrise</p>
            <p class="text-lg">11:53 AM</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>
