<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const colorMode = useColorMode()
const dayjs = useDayjs()

const unitsStore = useUnitsStore()
const unit = computed(() => unitsStore.currentUnit ? unitsStore.currentUnit : {})

const weatherThresholds = computed(() => unit.value.weather_thresholds ? unit.value.weather_thresholds : {})
const weatherRecords = computed(() => {
  if (!unit.value.metadata_records) {
    return []
  }
  return unit.value.metadata_records.filter((doc) => doc.record_type === 'weather')
})

const plotData = computed(() => {
  return [{
    name: 'Ambient Temp',
    data: weatherRecords.value.map((record) => {
      return {x: dayjs(record.received_time).format('lll'), y: record.ambient_temp}
    })
  }, {
    name: 'Sky Temp',
    data: weatherRecords.value.map((record) => {
      return {x: dayjs(record.received_time).format('lll'), y: record.sky_temp}
    })
  }, {
    name: 'Sky - Ambient Temp',
    data: weatherRecords.value.map((record) => {
      return {
        x: dayjs(record.received_time).format('lll'),
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
      type: 'datetime',
      labels: {
        datetimeUTC: false
      },
      title: {
        text: 'Time (browser local time)'
      }
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
        y: weatherThresholds.value.cloudy,
        borderColor: '#c95569',
        label: {
          text: 'Cloudy (' + weatherThresholds.value.cloudy + '°)',
          position: 'left',
          offsetX: 60,
          style: {
            color: '#000000'
          }
        }
      }, {
        y: weatherThresholds.value.very_cloudy,
        borderColor: '#c95569',
        opacity: 1,
        label: {
          text: 'Very cloudy (' + weatherThresholds.value.very_cloudy + '°)',
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

onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <Card class="status-card">
    <template #header>
      <p class="status-header">Weather</p>
    </template>
    <template #footer>
      Last updated: {{ $dayjs().to($dayjs(unit.weather?.received_time.toDate()).utc()) }}
    </template>
    <template #content>
      <div class="flex flex-row gap-2">
        <div class="basis-3/4">
          <ClientOnly>
            <apexchart :series="plotData" :options="plotOptions" width="600"></apexchart>
          </ClientOnly>
        </div>
        <div class="basis-1/4">
          <Tag :severity="getSeverity(unit.weather?.is_safe)">Is Safe</Tag>
          <br/>
          <Tag :severity="getSeverity(unit.weather?.cloud_safe)">
            Temp:
            <br/>
            Ambient: {{ unit.weather?.ambient_temp }}°
            <br/>
            Sky: {{ unit.weather?.sky_temp }}°
          </Tag>
          <br/>
          <Tag :severity="getSeverity(unit.weather?.cloud_safe)">Clouds:
            <br/>{{ unit.weather?.cloud_condition }}
          </Tag>
          <br/>
          <Tag :severity="getSeverity(unit.weather?.rain_safe)">Rain:
            <br/> {{ unit.weather?.rain_condition }}
          </Tag>
          <br/>
          <Tag :severity="getSeverity(unit.weather?.wind_safe)">Wind:
            <br/> {{ unit.weather?.wind_condition }}
            {{ unit.weather?.wind_speed }} kph
          </Tag>
          <br/>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>
