<script setup lang="ts">
const props = defineProps(['images'])
</script>

<template>
  <DataTable
      :value="props.images"
      size="small"
      stripedRows
      showGridLines
      sortMode="single"
      sortField="image_time"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
  >
    <Column field="image_time" header="Time (UTC)" sortable>
      <template #body="slotProps">
        {{ $dayjs(slotProps.data.image_time.toDate()).utc().format('HH:mm:ss') }}
        ({{ $dayjs().to($dayjs(slotProps.data.image_time.toDate()).utc()) }})
      </template>
    </Column>
    <Column field="image_time" header="Time (local)" sortable hidden>
      <template #body="slotProps">
        {{ $dayjs(slotProps.data.image_time.toDate().toLocaleString()).format() }}
      </template>
    </Column>
    <Column field="coordinates.ra" header="Coords">
      <template #body="slotProps">
        {{ slotProps.data.coordinates?.ra.toFixed(3) }}°
        {{ slotProps.data.coordinates?.dec.toFixed(3) }}°
      </template>
    </Column>
    <Column field="camera.exptime" header="Exptime" sortable></Column>
    <Column field="status" header="Status" sortable></Column>
    <Column field="sources.num_detected" header="# Sources"></Column>
    <Column field="sources.photutils_fwhm_median" header="FWHM">
      <template #body="slotProps">
        {{ slotProps.data.sources?.photutils_fwhm_median.toFixed(2) }}
        ±{{ slotProps.data.sources?.photutils_fwhm_std.toFixed(2) }}
      </template>
    </Column>
    <Column field="fits_public_url" header="Image" sortable>
      <template #body="slotProps">
        <Button label="JPG" link>
          <a :href="slotProps.data.fits_public_url.replace('fits.fz', 'jpg')" target="_blank">JPG</a>
        </Button>
        <Button label="FITS" link>
          <a :href="slotProps.data.fits_public_url" target="_blank">FITS</a>
        </Button>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>
