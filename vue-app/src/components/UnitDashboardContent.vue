<script setup>
    import { ref } from 'vue';
import UnitObservationLog from './UnitObservationLog.vue';

    const tab = ref(1);
</script>

<template>
    <div class="bg-neutral-900 flex flex-col py-2 px-1 md:h-screen">
        <ul class="flex h-10">
            <li class="pt-1 px-1">
                <button :class="['inline-block', 'font-semibold', 'rounded-md', 'py-2', 'px-4', 'mr-2', 'tracking-widest', 'text-xs', 'uppercase', tab === 1 ? 'bg-neutral-800 text-neutral-300 border-2 border-neutral-800' : 'bg-neutral-900 text-neutral-500 border-2 border-neutral-900']" @click="tab = 1">
                    <span class="material-symbols-outlined text-xs inline-block align-top pr-0.5">
                        bid_landscape
                        <!-- dashboard -->
                    </span>
                    Status
                </button>
                
                <button :class="['inline-block', 'font-semibold', 'rounded-md', 'py-2', 'px-4', 'tracking-widest', 'text-xs', 'uppercase', tab === 2 ? 'bg-neutral-800 text-neutral-300 border-2 border-neutral-800' : 'bg-neutral-900 text-neutral-500 border-2 border-neutral-900']" @click="tab = 2">
                    <span class="material-symbols-outlined text-xs inline-block align-top pr-0.5">
                        <!-- menu_book -->
                        summarize
                        <!-- event_note -->
                    </span>
                    Observation Log
                </button>
            </li>
        </ul>
        <!-- <div class="flex h-[calc(100vh_-_2.5rem)]"> -->
        <div class="flex h-full">
            <div v-if="tab === 1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full h-full p-1 mt-1">
                <div class="rounded-md col-span-2 bg-neutral-800 p-4 text-neutral-500">
                    <!-- Current Target -->
                    <div class="flex w-full flex-row-reverse space-y-4 flex-wrap md:flex-nowrap justify-center md:justify-normal">
                        <!-- Planisphere -->
                        <div class="aspect-square w-full md:max-w-48 lg:max-w-72 rounded-full bg-neutral-700">
                            <!-- (Circle placeholder) -->
                            <div class="aspect-square w-full rounded-full bg-neutral-700"></div>
                        </div>

                        <!-- Current target info -->
                        <div class="text-neutral-500 text-center md:text-left w-full">
                            <p class="text-sm">
                                <span class="material-symbols-outlined text-sm inline-block align-bottom pr-0.5">
                                    my_location
                                </span>
                                CURRENT TARGET
                            </p>
                            <h2 class="text-neutral-300 py-2 text-2xl md:py-0 uppercase">TESS Sector 20</h2>
                            <p class="font-mono text-sm py-1">RA 00<span class="align-top text-xs">h</span> 00<span class="align-top text-xs">m</span> 00<span class="align-top text-xs">s</span>,<br> Dec ±00° 00' 00"</p>
                            <p class="text-sm">Observed from __ to __.</p>
                            <p class="text-sm"># frames primary, secondary.</p>
                            <p class="text-sm"># lightcurves detected</p>
                        </div>
                    </div>
                </div>
                <div class="rounded-md row-span-2 bg-neutral-800 p-4 text-neutral-500 col-span-2 lg:col-span-1">[sensors]</div>
                <div class="rounded-md row-span-1 bg-neutral-800 p-4 text-neutral-500 col-span-2 lg:col-span-1">[weather]</div>
                <div class="rounded-md bg-neutral-800 p-4 text-neutral-500 col-span-2 lg:col-span-1">[moon]</div>
            </div>


            <div v-if="tab === 2" class="grid grid-cols-3 grid-flow-row gap-2 w-full h-full p-1  mt-1">
                <div class="rounded-md bg-neutral-800 col-span-3 row-span-1 lg:col-span-2 p-4 lg:mb-2 text-neutral-500">
                    <UnitObservationLog />
                </div>
                <div class="rounded-md bg-neutral-900 p-4 text-neutral-500">[date selection]</div>
            </div>


        </div>
    </div>
</template>