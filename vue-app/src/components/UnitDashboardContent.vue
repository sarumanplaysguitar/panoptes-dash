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
        <div class="flex">
            <div v-if="tab === 1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full p-1 pb-2 mt-1">

                <!-- TODO: convert the below cards into components -->

                <!-- Card: Current Target -->
                <!-- Display if observing; otherwise summarize last run and point to obs log page -->
                <div class="grid grid-cols-1 md:grid-cols-[8rem_1fr] auto-rows-min gap-y-8 md:gap-y-4 rounded-md col-span-1 md:col-span-2 bg-neutral-950 px-4 pb-4 pt-2.5 text-neutral-500">

                    <!-- Recent image -->
                    <div class="flex flex-col col-span-1 text-neutral-500 text-center md:text-left w-full justify-center md:justify-normal">
                        <!-- Header + Info -->
                            <p class="text-sm uppercase pb-0 content-center md:content-left">
                                <span class="material-symbols-outlined text-sm align-bottom pr-1">
                                    photo_camera
                                </span>
                                Preview
                            </p>

                            <div class="flex flex-col w-full justify-center md:justify-normal">
                                <div class="rounded-t bg-[url('@/assets/mock_cmos_data.png')] backdrop-blur-sm w-full aspect-square"></div>
                                <div class="rounded-b bg-neutral-800 px-2 py-1 text-neutral-500 text-sm">
                                    <span class="text-sm align-bottom material-symbols-outlined">
                                        schedule
                                    </span> 10 min ago
                                </div>
                            </div>
                        </div>

                    <!-- Current Target -->
                    <div class="flex w-full col-span-1 md:ml-4 flex-wrap md:flex-nowrap justify-center md:justify-normal">

                        <!-- Header + Info -->
                        <div class="text-neutral-500 text-center md:text-left w-full">
                            <p class="text-sm uppercase pb-0">
                                <span class="material-symbols-outlined text-sm align-bottom pr-1">
                                    my_location
                                </span>
                                Current Target
                            </p>
                            <h2 class="text-neutral-300 text-2xl uppercase">TESS Sector 20</h2>
                            
                            <!-- Coords -->
                            <!-- TODO: Copy-paste (convenient formatting) button? -->
                            <div class="flex flex-col md:flex-row flex-wrap items-center p-1 gap-2 md:justify-normal">

                                <!-- RA -->
                                <div class="flex justify-center">
                                    <div class="border-2 border-neutral-800 rounded-l ml-0 outline outline-1 outline-neutral-800 py-0 px-2">
                                        <p class="inline-block align-middle font-sans text-xs">
                                            RA
                                        </p>
                                    </div>
                                    <div class="border-1 border-neutral-800 bg-neutral-800 rounded-r ml-0 outline outline-1 outline-neutral-800 py-0 px-2">
                                        <p class="inline-block align-middle font-mono text-xs">
                                            00<sup class="text-[0.5rem]">h</sup> 
                                            00<sup class="text-[0.5rem]">m</sup> 
                                            00<sup class="text-[0.5rem]">s</sup> 
                                            <!-- ^ that is the hackiest thing ever. make your own superscript class later -->
                                        </p>
                                    </div>
                                </div>

                                <!-- Dec -->

                                <div class="flex justfify-center">
                                    <div class="border-2 border-neutral-800 rounded-l ml-0 outline outline-1 outline-neutral-800 py-0 px-2">
                                        <p class="inline-block align-middle font-sans text-xs">
                                            Dec
                                        </p>
                                    </div>
                                    <div class="border-1 border-neutral-800 bg-neutral-800 rounded-r ml-0 outline outline-1 outline-neutral-800 py-0 px-2">
                                        <p class="inline-block align-middle font-mono text-xs">
                                            ±00° 00' 00"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p class="text-md">Observing for <span class="font-semibold text-neutral-400">1 hour</span></p>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <div class="bg-neutral-800 rounded p-2">metadata</div>
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
                        Overhead Sky
                    </p>

                    <!-- Planisphere -->
                    <div class="aspect-square w-full rounded-full bg-neutral-700">
                        <!-- (Circle placeholder) -->
                        <div class="aspect-square w-full rounded-full bg-neutral-700"></div>
                    </div>
                </div>

                <!-- Card: Sensors -->
                <div class="rounded-md bg-neutral-800 p-4 text-neutral-500 col-span-1">[sensors]
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos excepturi, in labore adipisci molestias reprehenderit dolorem fuga iure eligendi, atque obcaecati natus perspiciatis repellat inventore quos dicta sint. Alias, sint!
                </div>

                <!-- Card: Weather -->
                <div class="rounded-md bg-neutral-800 p-4 text-neutral-500 col-span-1 md:col-span-2">[weather]
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit nesciunt, tenetur earum placeat explicabo harum doloremque eveniet aliquam assumenda in quae repudiandae corporis voluptatum eum consectetur incidunt eligendi cum architecto?
                </div>
                <div class="rounded-md bg-neutral-800 p-4 text-neutral-500 col-span-1 md:col-span-2">[moon]

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi possimus modi inventore beatae consequuntur facilis, fugiat odit magnam enim officiis quae quisquam exercitationem vitae voluptas omnis, placeat, dignissimos rerum qui?
                </div>
            </div>

            <div v-if="tab === 2" class="grid grid-cols-1 lg:grid-cols-[1fr_12rem] xl:grid-cols-[1fr_16rem] grid-flow-row w-full h-full p-1 md:pb-2 mt-1">
                <!-- Date selection -->
                <div class="rounded-md col-span-1 bg-neutral-900 p-4 text-neutral-500 lg:order-last">
                    <p>[<span class="material-symbols-outlined text-sm">
                        calendar_month
                    </span> date selection for past log entries]</p>
                    <p class="lg:hidden italic text-xs pt-2">(TODO: minimize on lg+ screens.)</p>
                </div>
                <!-- Log -->
                <div class="rounded-md bg-neutral-800 col-span-1 row-span-1 p-4 text-neutral-500">
                    <UnitObservationLog />
                </div>
            </div>


        </div>
    </div>
</template>