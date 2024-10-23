<script setup>
    import { usePendingPromises } from 'vuefire';

    const unitsStore = useUnitsStore();
    const unit = computed(() => unitsStore.currentUnit ?? {});

    onServerPrefetch(() => usePendingPromises());

    const illuminationPct = ref(0);

    const moonPhaseName = moonPhaseNameOf(illuminationPct);

    function moonPhaseNameOf(illuminationPct) {

    }
</script>

<template>
    <div class="col-span-1 grid-rows-[2rem_1fr] md:col-span-2 grid grid-cols-[6rem_1fr] md:grid-cols-[8rem_1fr] rounded-md bg-zinc-800 py-2 px-3 md:px-4 text-zinc-500">
                    
        <div class="row-start-1 col-span-2 text-sm uppercase pt-1 pb-0 flex">
            <!-- <span class="material-symbols-outlined !text-sm align-top pr-1">
                circle
            </span> -->
            <span class="!text-sm pt-1 pr-2">
                <LazyUnitStatusMoonIcon
                    :moonPhaseName="moonPhaseName"
                />
            </span>
            
            New Moon
        </div>

        <div class="row-start-2 col-span-1">
            <div class="md:pl-2 pt-0 pb-3">
                <LazyUnitStatusMoonThreeCanvas />
            </div>
        </div>

        <div class="col-span-1 row-start-2">
            <!-- Moon data table -->
            <div class="text-zinc-500 pl-2 text-left w-full">
                <!-- <span class="sm:hidden md:block text-zinc-300 text-[1.4rem] pl-1">New Moon</span> -->
                <div class="grid grid-cols-3">
                    <div class="p-1 col-span-1 text-center">
                        <p class="text-xs uppercase semibold">Illumination</p>
                        <p class="text-zinc-300 text-lg">54%</p>
                    </div>
                    <div class="p-1 col-span-1 text-center">
                        <p class="text-xs uppercase semibold">Moonset</p>
                        <p class="text-zinc-300 text-lg">2:10<span class="text-sm pl-0.5">AM</span></p>
                    </div>
                    <div class="p-1 col-span-1 text-center">
                        <p class="text-xs uppercase semibold">Moonrise</p>
                        <p class="text-zinc-300 text-lg">11:53<span class="text-sm pl-0.5">AM</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>