<script setup lang="ts">

import {collection, limit, orderBy, query, where} from "firebase/firestore";
import type {Collection} from "yaml/dist/nodes/Collection";

const route = useRoute()
const db = useFirestore()
const dayjs = useDayjs()
const colorMode = useColorMode()

const colorPreference = computed(() => colorMode.value)

const sinceValue = 1
const sinceUnit = 'hour'
const docLimit = 100

const fromDate = computed(() => dayjs().subtract(sinceValue, sinceUnit).toDate())

const powerRecords = useCollection(
    query(
        collection(db, 'units', route.params.id, 'metadata', 'power', 'records'),
        where('received_time', '>=', fromDate.value),
        orderBy('received_time', 'desc'),
        limit(docLimit)
    ),
    {wait: true}
)

const stateLabelsCollection = useCollection(
    query(
        collection(db, 'units', route.params.id, 'metadata', 'state', 'records'),
        where('received_time', '>=', fromDate.value),
        orderBy('received_time', 'desc'),
        limit(docLimit)
    )
)

interface Annotation {
  x: any;
  label: { style: { color: string }; text: any }
}

const stateLabelAnnotations: ComputedRef<Annotation[]> = computed(() => {
  return stateLabelsCollection.value.map(rec => {
    return {
      x: dayjs(rec.received_time.toDate()).valueOf(),
      label: {
        text: rec.dest,
        style: {
          color: '#000'
        }
      }
    }
  })
})

const ignoreKeys: string[] = ['date', 'received_time', 'ac_ok', 'battery_low']

const powerLabels: ComputedRef<string[]> = computed(() => {
  if (powerRecords.value[0] != null) {
    return Object.keys(powerRecords.value[0]).filter(k => !ignoreKeys.includes(k))
  }
})

interface PlotData {
  name: string,
  data: number[]
}

const getArray = (collectionSet: Collection, labelName: string): PlotData => ({
  name: labelName,
  data: collectionSet.value.map(rec => {
    return [rec.received_time.toDate(), rec[labelName]]
  })
});

const plotData : PlotData = computed(() => {
  if (powerLabels.value != null) {
    return powerLabels.value.map(label => {
      return getArray(powerRecords, label)
    })
  } else {
    return []
  }
})

const plotOptions = computed(() => {
  return {
    chart: {
      id: 'power-plot'
    },
    title: {
      text: 'Power readings'
    },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 500
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    markers: {
      size: 3,
      strokeColors: '#000',
      strokeWidth: 1,
    },
    annotations: {
      xaxis: stateLabelAnnotations.value
    },
    theme: {
      mode: colorPreference.value
    }
  }
})
</script>

<template>
  <ClientOnly v-if="plotData != null">
    <apexchart
        :series="plotData"
        :options="plotOptions"
        width="100%"
        type="line"
    ></apexchart>
  </ClientOnly>
</template>

<style scoped>

</style>
