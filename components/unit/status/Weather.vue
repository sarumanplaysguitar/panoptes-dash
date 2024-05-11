<script setup lang="ts">
import {collection, doc, limit, orderBy, query, where} from "firebase/firestore";

const db = useFirestore()
const route = useRoute()
const colorMode = useColorMode()
const dayjs = useDayjs()

const sinceValue = 1
const sinceUnit = 'hour'
const docLimit = 100

const unitsRef = collection(db, 'units')
const metadataRef = collection(unitsRef, route.params.id, 'metadata')

const configDoc = useDocument(doc(metadataRef, 'config'), {wait: true})
const weatherDoc = useDocument(doc(metadataRef, 'weather'), {wait: true})
const weatherRecords = useCollection(
    query(
        collection(metadataRef, 'weather', 'records'),
        where('received_time', '>=', dayjs().subtract(sinceValue, sinceUnit).toDate()),
        orderBy('received_time', 'desc'),
        limit(docLimit)
    ), {wait: true})

const plotData = computed(() => {
  return [{
    name: 'Ambient Temp',
    data: weatherRecords.value.map((record) => {
      return {x: dayjs(record.date).unix(), y: record.ambient_temp}
    })
  }, {
    name: 'Sky Temp',
    data: weatherRecords.value.map((record) => {
      return {x: dayjs(record.date).unix(), y: record.sky_temp}
    })
  }, {
    name: 'Sky - Ambient Temp',
    data: weatherRecords.value.map((record) => {
      return {
        x: dayjs(record.date).unix(),
        y: (parseFloat(record.sky_temp) - parseFloat(record.ambient_temp)).toFixed(2)
      }
    })
  },
  ]
})

const plotOptions = computed(() => {
  return {
    chart: {
      id: 'weather-plot'
    },
    title: {
      text: 'Temperature readings'
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
      max: 45,
      min: -45,
      title: {
        text: 'Temp (C)'
      }
    },
    markers: {
      size: 3,
      strokeColors: '#000',
      strokeWidth: 1,
    },
    theme: {
      mode: colorMode.preference
    },
    annotations: {
      yaxis: [{
        y: configDoc.value.environment.weather.thresholds.cloudy,
        borderColor: 'danger',
        label: {
          text: 'Cloudy',
          position: 'left',
          offsetX: 60,
          style: {
            color: '#000000'
          }
        }
      }, {
        y: configDoc.value.environment.weather.thresholds.very_cloudy,
        borderColor: '#c95569',
        opacity: 1,
        label: {
          text: 'Very cloudy',
          position: 'left',
          offsetX: 60,
          style: {
            color: '#000000'
          }
        }
      }
      ]
    }
  }
})

function getSeverity(val) {
  return val != null & val ? 'success' : 'danger'
}

</script>

<template>
  <Card class="status-card">
    <template #header>
      <p class="status-header">Weather</p>
    </template>
    <template #content>
      <ClientOnly>
        <apexchart :series="plotData" :options="plotOptions" width="100%"></apexchart>
      </ClientOnly>
      <br/>
      <Tag :severity="getSeverity(weatherDoc.is_safe)">Is Safe</Tag>
      <br />
      <Tag :severity="getSeverity(weatherDoc.cloud_safe)">
        Temp:
        <br/>
        Ambient: {{ weatherDoc.ambient_temp }}°
        <br/>
        Sky: {{ weatherDoc.sky_temp }}°
      </Tag>
      <br/>
      <Tag :severity="getSeverity(weatherDoc.cloud_safe)">Clouds:
        <br/>{{ weatherDoc.cloud_condition }}
      </Tag>
      <br/>
      <Tag :severity="getSeverity(weatherDoc.rain_safe)">Rain:
        <br/> {{ weatherDoc.rain_condition }}
      </Tag>
      <br/>
      <Tag :severity="getSeverity(weatherDoc.wind_safe)">Wind:
        <br/> {{ weatherDoc.wind_condition }}
        {{ weatherDoc.wind_speed }} kph
      </Tag>
      <br/>
    </template>
    <template #footer>
      Last updated: {{ $dayjs().to($dayjs(weatherDoc?.received_time.toDate()).utc()) }}
    </template>
  </Card>
</template>

<style scoped>

</style>
