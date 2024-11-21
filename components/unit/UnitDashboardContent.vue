<script setup>
    import { ref, computed } from 'vue';
    import Slider from 'primevue/slider';
    // import MoonThreeCanvas from './MoonThreeCanvas.vue';
    // import UnitObservationLog from './UnitObservationLog.vue';
    import placeholder_preview from '@/assets/mock_cmos_data.png';

    // Show first tab (Unit Status) on page load
    const tab = ref(1);
    
    // TODO: move these astro placeholders up a level(?)
    const phase_angle = ref(0); // deg
    const tolerance = 0.1; // radians, small (~6 degrees)
    const illumination = computed(() => {
        const radians = (phase_angle.value * Math.PI) / 180;
        return (1 - Math.cos(radians)) / 2.0; // normalized
    });
    const phase_name = "new_moon"

    const previewThumbnail = {
        // backgroundImage:`url(${placeholder_preview})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'none',
        backgroundPosition: 'center',
        backgroundColor: '#212124'
    }
</script>

<template>
  <!-- <Panel header="Observing Log">
    <UnitObservingLog/>
  </Panel>
  <Panel header="Status">
    <UnitStatus/>
  </Panel> -->

  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

  <div class=" flex flex-col py-2 px-1 md:h-screen">
        <ul class="flex h-10">
            <li class="pt-1 px-1">
                <button :class="['inline-block', 'font-semibold', 'rounded-md', 'py-2', 'px-4', 'mr-2', 'tracking-widest', 'text-xs', 'uppercase', tab === 1 ? 'bg-zinc-800 text-zinc-300 border-2 border-zinc-800' : ' text-zinc-500 border-2 border-zinc-900']" @click="tab = 1">
                    <span class="material-symbols-outlined text-zinc-400 !text-xs !inline-block !align-top pr-0.5">
                        bid_landscape
                        <!-- dashboard -->
                    </span>
                    Status
                </button>
                
                <button :class="['inline-block', 'font-semibold', 'rounded-md', 'py-2', 'px-4', 'tracking-widest', 'text-xs', 'uppercase', tab === 2 ? 'bg-zinc-800 text-zinc-300 border-2 border-zinc-800' : ' text-zinc-500 border-2 border-zinc-900']" @click="tab = 2">
                    <span class="material-symbols-outlined text-zinc-400 !text-xs inline-block align-top pr-0.5">
                        <!-- menu_book -->
                        summarize
                        <!-- event_note -->
                    </span>
                    Observing Log
                </button>
            </li>
        </ul>
        <!-- <div class="flex h-[calc(100vh_-_2.5rem)]"> -->
        <div class="flex">
            <div v-if="tab === 1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full p-1 pb-2 mt-1">

                <!-- TODO: convert the below cards into components -->

                <!-- Card: Current Target -->
                <!-- Display if observing; otherwise summarize last run and point to obs log page -->
                <div class="grid grid-cols-1 md:grid-cols-[8rem_1fr] auto-rows-min gap-y-8 md:gap-y-4 rounded-md col-span-1 md:col-span-2 bg-zinc-800 px-4 pb-4 pt-3 text-zinc-500">

                    <!-- Recent image -->
                    <div class="flex flex-col col-span-1 text-zinc-500 text-center md:text-left w-full justify-center md:justify-normal">
                        <!-- Header + Info -->
                            <!-- <p class="text-sm uppercase pb-0 content-center md:content-left">
                                <span class="material-symbols-outlined text-sm align-bottom pr-1">
                                    photo_camera
                                </span>
                                Preview
                            </p> -->

                            <div class="flex flex-col w-full justify-center md:justify-normal">
                                <div class="rounded-t w-full aspect-square mt-1" :style="previewThumbnail"></div>
                                <div class="rounded-b bg-zinc-900 px-2 py-1 text-zinc-500 text-sm">
                                    <span class="!text-sm align-bottom material-symbols-outlined">
                                        schedule
                                    </span> 10 min ago
                                </div>
                            </div>
                        </div>

                    <!-- Current Target -->
                    <div class="flex w-full col-span-1 md:ml-4 flex-wrap md:flex-nowrap justify-center md:justify-normal">

                        <!-- Header + Info -->
                        <div class="text-zinc-500 text-center md:text-left w-full">
                            <p class="text-sm uppercase pb-0">
                                <span class="material-symbols-outlined text-zinc-400 !text-sm align-bottom pr-1">
                                    my_location
                                </span>
                                Current Target
                            </p>
                            <h2 class="placeholder-data text-zinc-300 text-2xl uppercase">TESS Sector 20</h2>
                            
                            <!-- Coords -->
                            <!-- TODO: Copy-paste (convenient formatting) button? -->
                            <div class="flex flex-col md:flex-row flex-wrap items-center p-1 gap-2 md:justify-normal">

                                <!-- RA -->
                                <div class="flex justify-center">
                                    <div class="border-2 border-zinc-700 rounded-l ml-0 py-0 px-2">
                                        <p class="inline-block align-middle font-sans text-xs">
                                            RA
                                        </p>
                                    </div>
                                    <div class="border-1 border-zinc-700 bg-zinc-700 rounded-r ml-0 outline outline-0 outline-zinc-800 py-0 px-2">
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
                                    <div class="border-2 border-zinc-700 rounded-l ml-0 py-0 px-2">
                                        <p class="inline-block align-middle font-sans text-xs">
                                            Dec
                                        </p>
                                    </div>
                                    <div class="border-1 border-zinc-700 bg-zinc-700 rounded-r ml-0 outline outline-0 outline-zinc-800 py-0 px-2">
                                        <p class="inline-block align-middle font-mono text-xs">
                                            ±00° 00' 00"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p class="text-md md:pt-4">Observing for <span class="font-semibold text-zinc-400">1 hour</span></p>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <div class="bg-zinc-900 rounded p-2">metadata</div>
                    </div>
                </div>

                <!-- Another idea- view objects in the scheduler file? (display the YAML neatly) -->

                <!-- Card: Sky Overhead -->
                <div class="rounded-md col-span-1 bg-zinc-800 px-4 pb-4 pt-2.5 text-zinc-500">
                    <UnitStatusOverheadSky />
                </div>

                <!-- Card: Sensors -->
                <div class="rounded-md bg-zinc-800 p-4 text-zinc-500 col-span-1">
                    <p class="text-sm uppercase pb-0">
                        <span class="material-symbols-outlined text-zinc-400 !text-sm align-bottom pr-1">
                            timeline
                        </span>
                        TELEMETRY
                    </p>
                    <p>Power (AC, Weather station, Fan, Mount) - last updated</p>
                    <p>Safety (AC Power, Weather, Storage, etc) - last updated</p>
                    <p>State (ie. slewing)</p>
                    <p>Exposure indicators, for primary/secondary cameras</p>
                </div>

                <!-- Card: Weather -->
                <div class="rounded-md bg-zinc-800 p-4 text-zinc-500 col-span-1 md:col-span-2">
                    <p class="text-sm uppercase pb-0">
                        <span class="material-symbols-outlined text-zinc-400 !text-sm align-bottom pr-1">
                            cloud
                        </span>
                        WEATHER
                    </p>

                    <p>try using NOAA API</p>
                    the temperature and current overhead sky conditions (ie. clear or cloudy or rain or snow). then, some kinda forecast on the other side!
                </div>

                <!-- Card: Moon -->
                <UnitStatusMoon />

                <!-- Card: debug panel -->
                <div class="rounded-md bg-[#221316] p-4 text-red-400 col-span-1 md:col-span-2">
                    <p class="text-sm uppercase pb-0">
                        <span class="material-symbols-outlined text-red-200 !text-sm align-bottom pr-1">
                            asterisk
                        </span>
                        ASTROPY PLACEHOLDERS
                    </p>
                    <div class="text-[#5d3139] font-sans pt-4">
                        <i>Moon phase info (for moon widget, 3D viewer panel):</i>
                    </div>
                    <div class="p-4 pr-56 pt-1 font-mono">
                        <h2 class="text-xl font-bold mb-4">
                            <span class="text-sm pr-2 text-red-300">
                                phase_angle: 
                            </span>

                            {{ phase_angle }}°
                        </h2>
                        <div class="placeholder-slider">
                            <Slider
                                v-model="phase_angle"
                                :min="0"
                                :max="360"
                                class="w-full"
                            />
                        </div>
                        <h2 class="text-xl font-bold">
                            <span class="text-sm pr-2 text-red-300">
                                <span 
                                    class="material-symbols-outlined text-[#5d3139] align-text-bottom mt-2"
                                    style="transform: scale(-1, 1)">
                                    keyboard_return
                                </span>
                                illumination: 
                            </span>
                            {{ Math.round(illumination * 100) }}%
                        </h2>
                        <h2 class="text-xl font-bold">
                            <span class="text-sm pr-2 text-red-300">
                                <span 
                                    class="material-symbols-outlined text-[#5d3139] align-text-bottom"
                                    style="transform: scale(-1, 1)">
                                    keyboard_return
                                </span>
                                phase_name: 
                                <span class="text-red-400">
                                    {{ phase_name }}
                                </span>
                            </span>
                            
                        </h2>
                    </div>
                    <p>-moon illumination % (from astropy)</p>
                    <p>-sidereal time (astropy?)</p>
                    <p>-sun altitude @ location (from astropy)</p>
                    <p>-unit pointing RA & Dec</p>
                </div>
                
            </div>

            <div v-if="tab === 2" class="grid grid-cols-1 lg:grid-cols-[1fr_12rem] xl:grid-cols-[1fr_16rem] grid-flow-row w-full h-full p-1 md:pb-2 mt-1">
                <!-- Date selection -->
                <div class="rounded-md col-span-1  p-4 text-zinc-500 lg:order-last">
                    <p>[<span class="material-symbols-outlined !text-sm">
                        calendar_month
                    </span> date selection for past log entries]</p>
                    <p class="lg:hidden italic text-xs pt-2">(TODO: minimize on lg+ screens.)</p>
                </div>
                <!-- Log -->
                <div class="rounded-md bg-zinc-800 col-span-1 row-span-1 p-4 text-zinc-500">
                  <UnitObservingLog/>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped>
.placeholder-slider {
    background-color: #371d22;
}
</style>