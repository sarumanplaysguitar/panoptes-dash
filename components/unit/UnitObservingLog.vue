<script lang="ts" setup>
import {collection, query, orderBy, limit} from "firebase/firestore";

const route = useRoute()
const db = useFirestore()

const unitId: Ref<UnwrapRef<string | RouteParamValue[]>> = ref(route.params.id)

const observations = computed(() => {
  return useCollection(
      query(
          collection(db, 'units', unitId.value, 'observations'),
          orderBy('time', 'desc'),
          limit(50)
      )
  )
})
</script>

<template>
  <RecentObservationsTable :observations="observations"/>
</template>

<style scoped>

</style>
