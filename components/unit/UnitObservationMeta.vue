<script setup lang="ts">
import {usePendingPromises} from 'vuefire'

const route = useRoute()

const metadataStore = useMetadataStore()
const obsDoc = metadataStore.getMetadataDoc(route.params.id, 'observations')
onServerPrefetch(() => usePendingPromises())
</script>

<template>
  <pre class="text-xs">
    {{ obsDoc }}
    </pre>
</template>

<style scoped>

</style>
