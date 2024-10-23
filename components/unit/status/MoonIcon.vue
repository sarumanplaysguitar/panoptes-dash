<script setup>
    import { defineProps, computed } from "vue";

    // get moon phase (ie. "new_moon" from parent widget)
    // const props = defineProps({
    //     moonPhaseName: String,
    //     latitude: ?,
    // });

    const moonPhaseName = "new_moon";

    const iconUrl = computed(() => new URL(`/moon_phase_icons/${moonPhaseName}.svg`, import.meta.url).href);


    // create d3 canvas for icon
    // const iconCanvas = ref(null);

    // onMounted(() => {
    //     initializeCanvas();
    // });

    // function initializeCanvas() {
    //     const container = d3.select(iconCanvas.value);
    //     const length = 5; //square

    //     // Append SVG to the container
    //     const svg;

    //     // dynamically change which svg is displayed
    // }
</script>

<template>
    <div class="moon-icon" ref="icon-canvas">
        <img :src="`/moon_phase_icons/${moonPhaseName}.svg`" />
    </div>
</template>

<style scoped>
    .moon-icon {
        transform: rotate(80deg);
        width: 0.75rem;
        height: 0.75rem;
        min-width: 0.75rem;
        min-height: 0.75rem;
    }

</style>