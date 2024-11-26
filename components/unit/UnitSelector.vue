<script setup>
  import { useSkyColors } from '@/composables/useSkyColors';
  // import Avatar from 'primevue/avatar';

  // sky hex colors calculated in panoptes3D component
  const { groundColor, horizonColor, lowSkyColor, midSkyColor, upperSkyColor, setSkyColors } = useSkyColors();

  const unitsStore = useUnitsStore()
  const units = computed(() => unitsStore.units)

  // import selector_icon from '@/assets/selector_icon.png';

  const backgroundStyle = {
      // backgroundImage: `url(${selector_icon})`,
      backgroundSize: '2.25rem 2.25rem',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
  };
</script>

<template>
  <!-- <div class="bg-zinc-900 flex flex-row gap-3 p-2 md:flex-col md:h-screen md:w-[3.6rem] items-center overflow-y-auto">
        <div class="-rotate-12 font-['Oxanium'] text-xs mt-[0.1rem] ml-2 md:mt-2 md:ml-0 bg-zinc-600 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-300">012</div>
        <div class="-rotate-12 font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-850 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600 ring-2 ring-inset ring-zinc-800">000</div>
        <div class="-rotate-12 font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-850 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600 ring-2 ring-inset ring-zinc-800">007</div>
        <div class="-rotate-12 font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-850 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600 ring-2 ring-inset ring-zinc-800">026</div>
        <div class="-rotate-12 font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-850 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600 ring-2 ring-inset ring-zinc-800">008</div>
    </div> -->

    <div class="flex flex-row gap-3 p-2 h-[3.5m] md:flex-col md:h-screen md:w-[3.6rem] items-center overflow-y-auto">
        <!-- <div class="font-['Oxanium'] text-xs mt-[0.1rem] ml-2 md:mt-2 md:ml-0 bg-zinc-500 min-w-9 min-h-9 rounded-full flex items-top justify-center text-zinc-300 pt-1" :style="backgroundStyle">012</div> -->
        <div class="relative inline-block">

            <div class="placeholder-data font-['Oxanium'] text-xs mt-[0.1rem] ml-2 md:mt-2 md:ml-0 selected-unit-icon min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-100 pt-1">007</div>

            <!-- <div class="placeholder-data font-['Oxanium'] text-xs mt-[0.1rem] ml-2 md:mt-2 md:ml-0 bg-zinc-500 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-200 pt-1">007</div> -->

            <!-- online status ping icon -->
            <span class="align-self-center inline-flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-zinc-900 bg-zinc-100 absolute -bottom-0.5 -right-0.5"></span>

        </div>
        <div class="placeholder-data relative inline-block">
            <div class="font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-800 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-300">000</div>
            <!-- <span class="align-self-center animate-modified-ping inline-flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-zinc-900 bg-zinc-300 absolute -bottom-0.5 -right-0.5"></span> -->
            <span class="align-self-center inline-flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-zinc-900 bg-zinc-300 absolute -bottom-0.5 -right-0.5"></span>

            <!-- <span class="align-self-center flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-zinc-800 bg-zinc-400 absolute -bottom-0.5 -right-0.5"></span> -->
            <!-- <span class="align-self-center flex w-[0.8rem] h-[0.8rem] rounded-full bg-zinc-400 bg-opacity-0 absolute -bottom-0.5 -right-0.5"></span> -->

        </div>

        <div class="placeholder-data relative inline-block">
            <div class="font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-800 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600">012</div>
            <!-- <span class="align-self-center animate-modified-ping inline-flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-zinc-900 bg-zinc-300 absolute -bottom-0.5 -right-0.5"></span> -->
            <!-- <span class="font-['Oxanium'] w-[0.8rem] h-[0.8rem] absolute bottom-1 -right-0.5 text-zinc-500">z</span> -->

            <!-- <span class="align-self-center flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-zinc-800 bg-zinc-400 absolute -bottom-0.5 -right-0.5"></span> -->
            <!-- <span class="align-self-center flex w-[0.8rem] h-[0.8rem] rounded-full bg-zinc-400 bg-opacity-0 absolute -bottom-0.5 -right-0.5"></span> -->

        </div>


        <!-- <div class="font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-800 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600">007</div> -->
        <div class="placeholder-data font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-800 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600">026</div>
        <div class="placeholder-data font-['Oxanium'] text-xs mt-[0.1rem] bg-zinc-800 min-w-9 min-h-9 rounded-full flex items-center justify-center text-zinc-600">008</div>
    </div>
  <!-- <Card>
    <template #content>
      <div class="avatar_bg">
        <div v-for="unit in units">
          <Avatar :label="unit?.unit_id.slice(3)" shape="circle">
            <NuxtLink :to="`${unit?.unit_id}`">{{ unit?.unit_id.slice(3) }}</NuxtLink>
          </Avatar>
        </div>
      </div>
    </template>
  </Card> -->
</template>

<style scoped>

.selected-unit-icon {
  background-image: linear-gradient(
    to top,
    rgba(var(--ground-color), 0.8) 40%,
    rgba(var(--horizon-color), 0.8) 55%,
    rgba(var(--low-sky-color), 0.8) 70%,
    rgba(var(--mid-sky-color), 0.8)
  )
}

</style>