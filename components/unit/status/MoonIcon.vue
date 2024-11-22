<script setup>
    import { defineProps, computed } from "vue";

    // get moon phase (ie. "new_moon" from parent widget)
    // const props = defineProps({
    //     moonPhaseName: String,
    //     latitude: ?,
    // });

    const props = defineProps({
        phase_name: {
            type: String,
            required: true,
        },
    });

    const iconUrl = computed(() => {
        return `/moon_phase_icons/${props.phase_name}.svg`});

    console.log(iconUrl)

    // const iconUrl = "/moon_phase_icons/new_moon.svg";


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
    <div class="moon-icon">
        <img :src="iconUrl" />
    </div>
</template>

<style scoped>
    .moon-icon {
        transform: rotate(-124deg);
        width: 0.75rem;
        height: 0.75rem;
        min-width: 0.75rem;
        min-height: 0.75rem;
    }

</style>