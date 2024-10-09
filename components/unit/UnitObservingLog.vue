<script lang="ts" setup>

</script>

<template>
  <!-- <RecentObservationsTable /> -->

  <!-- Header -->
  <div class="grid grid-cols-1 grid-rows-2 lg:h-auto lg:grid-cols-[1fr_1fr] lg:grid-rows-1">
    <h1 class="text-xl lg:text-2xl text-center border-0 lg:border-blue-500 text-neutral-300 rounded-md bg-neutral-700 lg:bg-transparent lg:p-0 lg:text-left p-2 opacity-50">
        February 24, 2024
        <span class="material-symbols-outlined !text-md lg:hidden align-middle mb-1 pl-4">
            calendar_month
        </span>
    </h1>

    <div class="lg:text-right text-sm uppercase mt-5 lg:mt-0 text-center">Full Moon
        <div class="inline-block aspect-square rounded-full bg-neutral-300 w-8 align-middle ml-2"></div>
    </div>
  </div>

  <h3 class="text-md lg:text-left py-3 text-center">
      <span class="inline-block align-top material-symbols-outlined !text-[1.25rem] pr-0.5">
          info
      </span>
      4.5 hrs on sky; 2 targets observed
  </h3>

  <div class="h-48 w-full bg-neutral-700 rounded-md opacity-50"></div>
  <div class="relative flex items-center py-2">
      <span class="mx-2 flex-shrink text-neutral-600">
          <span class="material-symbols-outlined !text-md inline-block align-middle pr-0.5">
              play_arrow
              <!-- dashboard -->
          </span>
      </span>
      <div class="flex-grow border-4 border-t border-neutral-700 rounded-sm"></div>
  </div>

    <div class="flex p-2 w-full flex-col gap-y-5">
        <!-- Target 1 -->
        <div class="flex w-full flex-row flex-wrap md:flex-nowrap justify-center md:justify-normal">
            <div class="aspect-square min-w-36 max-h-36 rounded-full bg-neutral-700 mr-2"></div>
            <div class="text-neutral-500 md:pl-4 text-center md:text-left">
                <h2 class="text-neutral-300 py-2 text-lg md:py-0">TESS Sector 20</h2>
                <p class="font-mono text-sm py-1">RA 00<span class="align-top text-xs">h</span> 00<span class="align-top text-xs">m</span> 00<span class="align-top text-xs">s</span>,<br> Dec ±00° 00' 00"</p>
                <p class="text-sm">Observed from __ to __.</p>
                <p class="text-sm"># frames primary, secondary.</p>
                <p class="text-sm"># lightcurves detected</p>
            </div>
        </div>
        <!-- Target 2 -->
        <div class="flex w-full flex-row flex-wrap md:flex-nowrap justify-center md:justify-normal">
            <div class="aspect-square min-w-36 max-h-36 rounded-full bg-neutral-700 mr-2"></div>
            <div class="text-neutral-500 md:pl-4 text-center md:text-left">
                <h2 class="text-neutral-300 py-2 text-lg md:py-0">TESS Sector 23</h2>
                <p class="font-mono text-sm py-1">RA 00<span class="align-top text-xs">h</span> 00<span class="align-top text-xs">m</span> 00<span class="align-top text-xs">s</span>,<br> Dec ±00° 00' 00"</p>
                <p class="text-sm">Observed from __ to __.</p>
                <p class="text-sm"># frames primary, secondary.</p>
                <p class="text-sm"># lightcurves detected</p>
            </div>
        </div>
    </div>
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nesciunt veritatis itaque aperiam suscipit voluptatem voluptatibus sed modi eius consectetur officia maxime voluptate enim quisquam dolores, rem ipsam iste deleniti.</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet ducimus quas perferendis debitis alias, ea sint nostrum obcaecati omnis consequatur, cupiditate consequuntur totam assumenda expedita hic repudiandae culpa voluptatum facere?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto impedit quaerat aspernatur blanditiis eaque quos! Minima facere doloribus inventore vitae impedit unde quis in excepturi beatae, distinctio magni, nesciunt accusamus?</p>
    </div>

</template>

<style scoped>

</style>
