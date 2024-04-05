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
            <div v-if="tab === 1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full h-full p-1 mt-1">

                <!-- TODO: convert the below cards into components -->

                <!-- Card: Current Target -->
                <!-- Display if observing; otherwise summarize last run and point to obs log page -->
                <div class="bg-[url('@/assets/mock_cmos_data.png')] opacity-30 rounded-md col-span-1 md:col-span-2 bg-neutral-800 px-4 pb-4 pt-2.5 text-neutral-500">
                    <!-- Current Target -->
                    <div class="flex w-full flex-row-reverse space-y-4 flex-wrap md:flex-nowrap justify-center md:justify-normal">
                        

                        <!-- Current target info -->
                        <div class="text-neutral-500 text-center md:text-left w-full">
                            <p class="text-sm uppercase pb-0">
                                <span class="material-symbols-outlined text-sm align-bottom">
                                    my_location
                                </span>
                                Current Target
                            </p>
                            <h2 class="text-neutral-300 text-2xl uppercase">TESS Sector 20</h2>
                            <p class="font-mono text-sm py-1">RA 00<span class="align-top text-xs">h</span> 00<span class="align-top text-xs">m</span> 00<span class="align-top text-xs">s</span>,<br> Dec ±00° 00' 00"</p>
                            <p class="text-sm">Observing for <span class="font-semibold text-neutral-400">1 hour</span></p>

                            <div class="rounded-md bg-[url('@/assets/mock_cmos_data.png')] backdrop-blur-sm  w-full h-12 mr-4"></div>

                        </div>
                    </div>
                </div>

                <!-- Another idea- view objects in the scheduler file? (display the YAML neatly) -->

                <!-- Card: Sky Overhead -->
                <div class="rounded-md col-span-1 bg-neutral-800 px-4 pb-4 pt-2.5 text-neutral-500">
                    <p class="text-sm uppercase pb-2">
                        <span class="material-symbols-outlined text-sm align-bottom">
                            <!-- arrow_circle_up -->
                            blur_on
                        </span>
                        Sky Overhead
                    </p>

                    <!-- Planisphere -->
                    <div class="aspect-square w-full rounded-full bg-neutral-700">
                        <!-- (Circle placeholder) -->
                        <div class="aspect-square w-full rounded-full bg-neutral-700"></div>
                    </div>
                </div>

                <!-- Card: Sensors -->
                <div class="rounded-md bg-neutral-800 p-4 text-neutral-500 col-span-1">[sensors]</div>

                <!-- Card: Weather -->
                <div class="rounded-md bg-neutral-800 p-4 text-neutral-500 col-span-1">[weather]</div>
                <div class="rounded-md bg-neutral-800 p-4 text-neutral-500 col-span-1">[moon]

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi possimus modi inventore beatae consequuntur facilis, fugiat odit magnam enim officiis quae quisquam exercitationem vitae voluptas omnis, placeat, dignissimos rerum qui?
                </div>
            </div>

            <div v-if="tab === 2" class="grid grid-cols-1 lg:grid-cols-[1fr_12rem] grid-flow-row gap-2 w-full h-full p-1 mt-1">
                <!-- Date selection -->
                <div class="rounded-md col-span-1 bg-neutral-900 p-4 text-neutral-500 lg:order-last">
                    <p>[<span class="material-symbols-outlined text-sm">
                        calendar_month
                    </span> date selection for past log entries]</p>
                </div>
                <!-- Log -->
                <div class="rounded-md bg-neutral-800 col-span-1 row-span-1 p-4 lg:mb-2 text-neutral-500">
                    <UnitObservationLog />
                </div>
            </div>


        </div>
    </div>
</template>