<script lang="ts" setup>
const route = useRoute()
const metadataStore = useMetadataStore()
import {useDayjs} from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

const obsDoc = useDocument(
    metadataStore.getMetadataDoc(route.params.id, 'observations'), {wait: true}
)

console.log(obsDoc)
</script>

<template>
  <Card class="status-card">
    <template #header>
      <p class="status-header">Current Target</p>
    </template>
    <template #content>


      <div class="col-span-1 md:col-span-2 grid grid-cols-[8rem_1fr] rounded-md py-2 px-4 text-neutral-500">
        <div
            class="flex flex-col col-span-1 text-neutral-500 text-center md:text-left w-full justify-center md:justify-normal">
          <!-- Header + Info -->


          <div class="flex flex-col w-full justify-center md:justify-normal">
            <div class="rounded-t backdrop-blur-sm w-full aspect-square"></div>
            <div class="rounded-b px-2 py-1 text-neutral-500 text-sm">
              {{ dayjs(obsDoc.received_time.toDate().toLocaleString()).from(dayjs()) }}
            </div>
          </div>
        </div>

        <div class="text-neutral-500 text-center md:text-left w-full">
          <p class="text-sm uppercase pb-0">
            Current Target
          </p>
          <h2 class="text-neutral-300 text-2xl uppercase">{{ obsDoc?.field_name }}</h2>

          <!-- Coords -->
          <!-- TODO: Copy-paste (convenient formatting) button? -->
          <div class="flex flex-col md:flex-row flex-wrap items-center p-1 gap-2 md:justify-normal">

            <!-- RA -->
            <div class="flex justify-center" v-if="obsDoc.field_ra != undefined">
              <div class="border-2 border-neutral-700 rounded-l ml-0 py-0 px-2">
                <p class="inline-block align-middle font-sans text-xs">
                  Mount Coords
                </p>
              </div>
              <div
                  class="border-1 border-neutral-700 rounded-r ml-0 outline outline-0 outline-neutral-800 py-0 px-2">
                <p class="inline-block align-middle font-mono text-xs">
                  {{ obsDoc?.field_ra }}° {{ obsDoc?.field_dec }}° <br/>
                </p>
              </div>
            </div>

            <!-- Dec -->

            <div class="flex justfify-center" v-if="obsDoc.CRVAL1 != undefined">
              <div class="border-2 border-neutral-700 rounded-l ml-0 py-0 px-2">
                <p class="inline-block align-middle font-sans text-xs">
                  Solved Coords
                </p>
              </div>
              <div
                  class="border-1 border-neutral-700 rounded-r ml-0 outline outline-0 outline-neutral-800 py-0 px-2">
                <p class="inline-block align-middle font-mono text-xs">
                  {{ obsDoc?.CRVAL1?.toPrecision(5) }}° {{ obsDoc?.CRVAL2?.toPrecision(5) }}°
                </p>
              </div>
            </div>
          </div>

          <p class="text-md md:pt-4">Observing for <span class="font-semibold text-neutral-400">{{
              $dayjs().to($dayjs(obsDoc?.received_time.toDate()).utc(), true)
            }}</span></p>
        </div>
      </div>
      <LazyUnitObservationMeta/>
    </template>
  </Card>

</template>

<style scoped>

</style>
