<script lang="ts" setup>
import {collection} from "firebase/firestore";

const route = useRoute()
const db = useFirestore()

const unitId: Ref<UnwrapRef<string | RouteParamValue[]>> = ref(route.params.id)

const units = useCollection(collection(db, 'units'))

const unitDoc = computed(() => units.value.find((unit) => unit.id === unitId.value))
const unitMetadata = useCollection(collection(db, 'units', unitId.value, 'metadata'))

const unit: Ref<UnwrapRef<{}>> = ref({})

// Watch the unitDoc for changes and update the unit ref, including metadata.
watch(unitDoc, (newVal) => {
  unit.value = newVal
  unitMetadata.value.forEach((doc) => {
    unit.value[doc.id] = doc
  })
})
</script>

<template>
  <!-- Main Layout -->
  <div class="flex flex-row min-h-screen">
    <div class="basis-1/16">
      <UnitSelector :units="units"/>
    </div>

    <div class="basis-3/16">
      <UnitAboutSelectedUnit :unit="unit"/>
    </div>

    <div class="basis-3/4">
      <UnitDashboardContent :unit="unit"/>
    </div>

    <RouterView/>
  </div>
</template>

<style scoped>

</style>
