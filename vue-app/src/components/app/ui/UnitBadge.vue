<script setup>
const props = defineProps(['unit_id'])
</script>

<template>
  <div class="relative inline-block">
    <div class="unit-badge">
      <RouterLink :to="`/units/PAN${unit_id}`">{{ unit_id }}</RouterLink>
    </div>
    <span class="active-indicator"></span>
  </div>
</template>

<style scoped>
.unit-badge {
  @apply font-['Oxanium'] text-xs mt-[0.1rem] ml-2 md:mt-2 md:ml-0 bg-neutral-500 min-w-9 min-h-9 rounded-full flex items-center justify-center text-neutral-200 pt-1
}

.active-indicator {
  @apply inline-flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-neutral-900 bg-neutral-300 absolute -bottom-0.5 -right-0.5
}
</style>
