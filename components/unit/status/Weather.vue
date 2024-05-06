<script setup lang="ts">
const route = useRoute()

const metadataStore = useMetadataStore()

const weatherDoc = useDocument(
    metadataStore.getMetadataDoc(route.params.id, 'weather'), {wait: true}
)

</script>

<template>
  <Card class="status-card">
    <template #header>
      <p class="status-header">Weather</p>
    </template>
    <template #content>
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
        <br/> {{ weatherDoc.rain_condition }}</Tag>
      <br/>
      <Tag :severity="metadataStore.getSeverity(weatherDoc.wind_safe)">Wind:
        <br /> {{ weatherDoc.wind_condition }}
        {{ weatherDoc.wind_speed }} kph
      </Tag>
      <br/>
      Last updated: {{ $dayjs().to($dayjs(weatherDoc?.received_time.toDate()).utc()) }}
    </template>
  </Card>
</template>

<style scoped>

</style>
