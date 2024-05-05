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
      <pre class="text-xs">
        {{ weatherDoc }}
      </pre>
    </template>
  </Card>
</template>

<style scoped>

</style>
