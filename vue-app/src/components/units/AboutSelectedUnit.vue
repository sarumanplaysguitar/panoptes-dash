<script setup>
import flag from '@/assets/country_flags/s/US.svg';
import {useRoute} from "vue-router";
import {useDocument} from "vuefire";
import {unitsRef} from "@/firebase.js";

const route = useRoute()

const unitDoc = useDocument(unitsRef, route.params.id)

</script>

<template>
  <div class="h-[calc(100vh_-_3.5rem)] grid grid-cols-1 grid-rows-1 md:py-3 md:h-screen">
    <!-- <div class="grid bg-pink-200 rounded-md text-pink-500 outline outline-pink-500"> hey! </div> -->
    <div class="z-10 row-start-1 col-start-1 bg-opacity-0">
      <div class="flex flex-col place-items-center justify-end h-full">
        <!-- <div class="grid grid-cols-1 grid-rows-[1fr_12_12_12_12] place-items-center"> -->
        <!-- <div class="">hiya!</div> -->
        <div class="mt-auto flex flex-rows">
          <div class="w-14 h-14 rounded-full bg-neutral-600"></div>
          <div class="ml-2 pb-2">
            <div class="font-light text-4xl text-neutral-300">
              {{ route.params.id }}
<!--              {{ unitDoc.id }}-->
            </div>
            <div
                class="animate-avg-pulse flex font-semibold tracking-widest text-xs uppercase text-neutral-300 leading-3 items-center">
              <span
                  class="align-self-center animate-avg-ping absolute inline-flex bg-neutral-100 h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
              <!-- <span class="relative inline-flex bg-neutral-100 h-[0.5rem] w-[0.5rem] me-[0.4rem] rounded-full"></span> -->
              <span
                  class="align-self-center flex bg-neutral-100 animate-modified-ping h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
              Observing
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-1 text-neutral-600 text-xs font-semibold leading-3 py-2 martian-mono-300">
          <p>UTC <span class="text-neutral-300">05:05:37</span> FEB 24</p>
          <p>PDT <span class="text-neutral-300">10:05:37</span> FEB 24</p>
        </div>
        <div class="text-neutral-600 text-sm mt-2">
          <p class="flex items-center text-neutral-300 text-sm text-center">
            <img :src="flag" alt="Country Flag" class="inline-block rounded-sm scale-90 grayscale pr-[0.35rem]"/> Mt.
            Wilson, California, USA</p>
          <p class="text-center font-mono font-normal pb-4">
            <!--            {{ unitDoc.latitude }}&deg; {{ unitDoc.longitude }}&deg;-->
          </p>
          <div class="w-48 h-24 rounded-full ring-neutral-700 ring-2"></div>
        </div>
        <div class="">
          <p class="text-neutral-700 text-xs font-semibold mt-3 pb-2 md:pb-0">© 2024 Project PANOPTES</p>
        </div>
      </div>
    </div>

    <div
        class="z-0 row-start-1 col-start-1 bg-gradient-to-b from-neutral-800 from-55% to-neutral-850 to-65% rounded-md h-full"></div>

  </div>
</template>
