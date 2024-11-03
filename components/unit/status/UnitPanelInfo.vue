<script setup>
    import { defineProps, defineEmits, ref, onMounted } from "vue";
    import { usePendingPromises } from "vuefire";
    import * as d3 from "d3";
    import flag from "@/assets/country_flags/s/US.svg";
    const dayjs = useDayjs();
    const unitsStore = useUnitsStore();
    const unit = computed(() => unitsStore.currentUnit ? unitsStore.currentUnit : {});

    onServerPrefetch(() => usePendingPromises());
</script>

<template>
    <div class="z-10 row-start-1 col-start-1 bg-opacity-0">
      <div class="flex flex-col place-items-center justify-end h-full">
        <!-- <div class="grid grid-cols-1 grid-rows-[1fr_12_12_12_12] place-items-center"> -->
        <!-- <div class="">hiya!</div> -->
        <div class="mt-auto flex flex-rows">
            <div class="w-14 h-14 rounded-full bg-[#ffffff] opacity-50"> </div>
            <div class="ml-2 pb-2">
                <div class="font-light text-4xl text-white">{{ unit.unit_id }}</div>
                <div class="animate-avg-pulse flex font-semibold tracking-widest text-xs uppercase text-white leading-3 items-center">
                    <span class="align-self-center animate-avg-ping absolute inline-flex bg-neutral-100 h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
                    <!-- <span class="relative inline-flex bg-neutral-100 h-[0.5rem] w-[0.5rem] me-[0.4rem] rounded-full"></span> -->
                    <span class="align-self-center flex bg-neutral-100 animate-modified-ping h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
                    <span class="placeholder-data">{{ unit.status?.state }}</span>
                </div>
            </div>
        </div>

        <!-- <button
          class="bg-blue-500 text-white p-2 mt-4"
          @click="togglePanel"
        >
          {{ isPanelExpanded ? 'Collapse Panel' : 'Expand Panel' }}
        </button> -->
        <div class="flex flex-col space-y-1 text-xs text-[#ffffff] font-semibold leading-3 py-2 martian-mono-300">
            <p><span class="opacity-50">UTC</span> <span class="text-white opacity-100">{{ dayjs().utc().format('HH:mm') }}</span> <span class="opacity-50">{{ dayjs.utc().format('MMM DD').toUpperCase() }}</span></p>
            <p><span class="opacity-50">{{ unit.local_time?.format('z') }}</span> <span class="text-white opacity-100">{{ unit.local_time?.format('HH:mm') }}</span> <span class="opacity-50">{{ unit.local_time?.format('MMM DD').toUpperCase() }}</span></p>
        </div>
        <div class="text-[#ffffff] text-sm mt-2">
          <div class="flex justify-center items-center text-white text-sm text-center">
            <img :src="flag" alt="Country Flag" class="inline-block rounded-sm scale-90 pr-[0.35rem]" />
            <span class="placeholder-data">Mt. Wilson, California, USA</span>
            <!-- TODO: format unit.location?.name in google cloud db to full loc like that ^ -->
          </div>
          <p class="text-center font-mono font-normal pb-4 opacity-50">
            {{ Math.round(parseFloat(unit.location?.latitude)) }}°N, {{ Math.round(parseFloat(unit.location?.longitude)) }}°W
          </p>
          <UnitMap />
        </div>
        <div>
          <p class="text-[#ffffff] text-xs font-semibold mt-3 pb-2 opacity-50">© {{ dayjs().year() }} <a href="https://www.projectpanoptes.org/" target="_blank" rel="noopener noreferrer">Project PANOPTES</a></p>
        </div>
      </div>
    </div>
</template>