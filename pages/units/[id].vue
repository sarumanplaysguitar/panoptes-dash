<script setup>
const route = useRoute()
</script>

<template>
  Hi {{ route.params.id }}

  <Card>
    <template #content>
      <LazyUnitMetadataPlot/>
    </template>
  </Card>

  <Card>
    <template #title>Safety</template>
    <template #content>
      <LazyUnitSafety/>
    </template>
  </Card>

  <Card>
    <template #content>
      <Inplace :closable="true">
        <template #display>
          <Button severity="secondary">Show records</Button>
        </template>
        <template #content>
          <LazyShowRecords/>
        </template>
      </Inplace>
    </template>
  </Card>

</template>
