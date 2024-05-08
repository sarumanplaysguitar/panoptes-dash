<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const dayjs = useDayjs()

const metadataStore = useMetadataStore()

const weatherDoc = useDocument(() => {
  const doc = metadataStore.getMetadataDoc(route.params.id, 'weather')
  return doc != undefined ? doc : null
})

const configDoc = useDocument(metadataStore.getMetadataDoc(route.params.id, 'config'))

const weatherDocs = metadataStore.getMetadata(route.params.id, 'weather')


const plotData = computed(() => {
  return [{
    name: 'Ambient Temp',
    data: weatherDocs.value.map((record) => {
      return {x: dayjs(record.date).unix(), y: record.ambient_temp}
    })
  }, {
    name: 'Sky Temp',
    data: weatherDocs.value.map((record) => {
      return {x: dayjs(record.date).unix(), y: record.sky_temp}
    })
  }, {
    name: 'Sky - Ambient Temp',
    data: weatherDocs.value.map((record) => {
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
      max: 20,
      min: -30,
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
        borderColor: '#c95569',
        strokeDashArray: 5,
        label: {
          text: 'Cloudy',
          position: 'left',
          offsetX: 60,
        }
      }, {
        y: configDoc.value.environment.weather.thresholds.very_cloudy,
        borderColor: '#c95569',
        strokeDashArray: 5,
        label: {
          text: 'Very cloudy',
          position: 'left',
          offsetX: 60,
        }
      }
      ]
    }
  }
})
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
      <Tag :severity="metadataStore.getSeverity(weatherDoc.is_safe)">
        Temp:
        <br/>
        Ambient: {{ weatherDoc.ambient_temp }}°
        <br/>
        Sky: {{ weatherDoc.sky_temp }}°
      </Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(weatherDoc.cloud_safe)">Clouds:
        <br/>{{ weatherDoc.cloud_condition }}
      </Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(weatherDoc.rain_safe)">Rain:
        <br/> {{ weatherDoc.rain_condition }}
      </Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(weatherDoc.wind_safe)">Wind:
        <br/> {{ weatherDoc.wind_condition }}
        {{ weatherDoc.wind_speed }} kph
      </Tag>
      <br/>
      Last updated: {{ $dayjs().to($dayjs(weatherDoc?.received_time.toDate()).utc()) }}
    </template>
  </Card>
</template>

<style scoped>

</style>
