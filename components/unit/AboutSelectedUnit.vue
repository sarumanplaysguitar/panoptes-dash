<script setup>
import {usePendingPromises} from 'vuefire'

const dayjs = useDayjs()
const unitsStore = useUnitsStore()
const unit = computed(() => unitsStore.currentUnit ? unitsStore.currentUnit : {})

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <div class="background-col">
    <div class="z-10 row-start-1 col-start-1 bg-opacity-0">
      <div class="flex flex-col place-items-center justify-end h-full">
        <div class="mt-auto flex flex-rows">
          <div class="w-14 h-14 rounded-full"></div>
          <div class="ml-2 pb-2">
            <div class="font-light text-4xl text-neutral-300">{{ unit.unit_id }}</div>
            <div class="font-light text-1xl text-neutral-300">{{ unit.name }}</div>
            <div
                class="animate-avg-pulse flex font-semibold tracking-widest text-xs uppercase text-neutral-300 leading-3 items-center">
              <span
                  class="align-self-center animate-avg-ping absolute inline-flex bg-neutral-100 h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
              <span
                  class="align-self-center flex bg-neutral-100 animate-modified-ping h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
              {{ unit.status?.state }}
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-1 text-neutral-600 text-xs font-semibold leading-3 py-2 martian-mono-300">
          <p>
            {{ dayjs.utc().format('MMM DD') }}
            <span class="text-neutral-300">{{ dayjs().utc().format('HH:mm:ss') }}</span>
            UTC
          </p>
          <p>
            {{ unit.local_time?.format('MMM DD') }}
            <span class="text-neutral-300">{{ unit.local_time?.format('HH:mm:ss') }}</span>
            {{ unit.local_time?.format('z') }}
          </p>
        </div>
        <div class="text-neutral-600 text-sm mt-2">
          <p class="flex items-center text-neutral-300 text-sm text-center">
            {{ unit.location?.name }}
          </p>
          <p class="text-center font-mono font-normal pb-4">
            {{ unit.location?.latitude }} {{ unit.location?.longitude }}
            <br/>
            {{ unit.location?.elevation }}
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

<style scoped>
.background-col {
  @apply h-[calc(100vh_-_3.5rem)] grid grid-cols-1 grid-rows-1 md:py-3 md:h-screen
}
</style>
