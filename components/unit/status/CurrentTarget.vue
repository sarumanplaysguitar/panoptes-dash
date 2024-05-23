<script lang="ts" setup>
import {usePendingPromises} from 'vuefire'

const dayjs = useDayjs()

const unitsStore = useUnitsStore()
const unit = computed(() => unitsStore.currentUnit ?? null)
const recentObservation = computed(() => unit.value ? unit.value.observations[0] : null)
const recentImage = computed(() => recentObservation.value ? recentObservation.value?.images[0] : null)

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <Card class="status-card">
    <template #header>
      <p class="status-header">Current Target</p>
    </template>
    <template #content>
<!--      <div class="col-span-2 md:col-span-2 grid grid-cols-[8rem_1fr] rounded-md py-2 px-4 text-neutral-500">-->
        <div class="text-neutral-500 text-center md:text-left w-full">
          <p class="text-sm uppercase pb-0">
            Current Target
          </p>
          <h2 class="text-neutral-300 text-2xl uppercase">{{ recentObservation?.field_name }}</h2>

          <!-- Coords -->
          <!-- TODO: Copy-paste (convenient formatting) button? -->
          <div class="flex flex-col md:flex-row flex-wrap items-center p-1 gap-2 md:justify-normal">

            <!-- RA -->
            <div class="flex justify-center" v-if="recentObservation?.coordinates?.mount_ra != undefined">
              <div class="border-2 border-neutral-700 rounded-l ml-0 py-0 px-2">
                <p class="inline-block align-middle font-sans text-xs">
                  Mount Coords
                </p>
              </div>
              <div
                  class="border-1 border-neutral-700 rounded-r ml-0 outline outline-0 outline-neutral-800 py-0 px-2">
                <p class="inline-block align-middle font-mono text-xs">
                  {{ recentObservation?.coordinates?.mount_ra }}° {{ recentObservation?.coordinates?.mount_dec }}° <br/>
                </p>
              </div>
            </div>

            <!-- Dec -->

            <div class="flex justify-center">
              <div class="border-2 border-neutral-700 rounded-l ml-0 py-0 px-2">
                <p class="inline-block align-middle font-sans text-xs">
                  Solved Coords
                </p>
              </div>
              <div
                  class="border-1 border-neutral-700 rounded-r ml-0 outline outline-0 outline-neutral-800 py-0 px-2">
                <p class="inline-block align-middle font-mono text-xs">
                  {{ recentImage?.coordinates?.ra.toPrecision(5) }}° {{ recentImage?.coordinates?.dec.toPrecision(5) }}°
                </p>
              </div>
            </div>
          </div>

          <p class="text-md">Observing for
            <span class="font-semibold text-neutral-400">
              {{ $dayjs().to($dayjs(recentObservation?.time.toDate()).utc(), true) }}
            </span>
          </p>
        </div>
<!--      </div>-->
    </template>
    <template #footer>
<!--      Last updated: {{ dayjs(recentImage?.received_time?.toDate().toLocaleString()).from(dayjs()) }}-->
    </template>
  </Card>

</template>

<style scoped>

</style>
