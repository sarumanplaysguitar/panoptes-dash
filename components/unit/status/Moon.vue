<script setup lang="ts">

</script>

<template>
  <div class="col-span-1 md:col-span-2 grid grid-cols-[8rem_1fr] rounded-md bg-neutral-800 py-2 px-4 text-neutral-500">
    <div class="col-span-1">
      <p class="text-sm uppercase pt-1 pb-0">
                                <span class="material-symbols-outlined text-sm align-top pr-1">
                                    circle
                                </span>
        Moon
      </p>

    </div>
    <div class="col-span-1">

      <!-- Moon panel -->
      <div class="text-neutral-500 pl-2 text-left w-full">
        <h2 class="text-neutral-300 text-[1.4rem] pt-11 pl-1">New Moon</h2>
        <div class="grid grid-cols-3">
          <div class="p-1 col-span-1">
            <p class="text-xs uppercase semibold">Illumination</p>
            <p class="text-neutral-300 text-lg">54%</p>
          </div>
          <div class="p-1 col-span-1">
            <p class="text-xs uppercase semibold">Moonset</p>
            <p class="text-neutral-300 text-lg">2:10 AM</p>
          </div>
          <div class="p-1 col-span-1">
            <p class="text-xs uppercase semibold">Moonrise</p>
            <p class="text-neutral-300 text-lg">11:53 AM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
