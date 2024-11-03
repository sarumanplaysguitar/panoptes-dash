<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import * as d3 from "d3";

  onMounted(() => {
    // Initialize planisphere when component loads
    initializePlanisphere();
  });

  const planisphere = ref(null);

  function initializePlanisphere() {
    const container = d3.select(planisphere.value);

    const width = 100;
    const height = 100;

    // SVG container
    const svg = container.append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%");
      // .style("background", "white");

    // Create gradient
    let defs = svg.append("defs");

    defs.append("radialGradient")
      .attr("id", "sky-gradient")
      .selectAll("stop")
      .data([
        { offset: "30%", color: "#68bcfb" },
        { offset: "80%", color: "#b9d8eb" },
        { offset: "90%", color: "#ababfd" },
        { offset: "100%", color: "#5e9cf2" }
      ])
      .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

    // Append sky
    svg.append("circle")
      .attr("r", "44%")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .style("fill", "url(#sky-gradient)");

    // Compass rose
    svg.append("text")
      .attr("x", "50%")
      .attr("y", "4%")
      .text("N")
      .attr("font-family", "Inter")
      .attr("font-size", "5px")
      .attr("fill", "#71717a")
      .attr("text-anchor", "middle");
    svg.append("text")
      .attr("x", "97.5%")
      .attr("y", "50%")
      .text("E")
      .attr("font-family", "Inter")
      .attr("font-size", "5px")
      .attr("fill", "#52525b")
      .attr("text-anchor", "middle");
    svg.append("text")
      .attr("x", "2%")
      .attr("y", "50%")
      .text("W")
      .attr("font-family", "Inter")
      .attr("font-size", "5px")
      .attr("fill", "#52525b")
      .attr("text-anchor", "middle");
    svg.append("text")
      .attr("x", "50%")
      .attr("y", "100%")
      .text("S")
      .attr("font-family", "Inter")
      .attr("font-size", "5px")
      .attr("fill", "#52525b")
      .attr("text-anchor", "middle");
  }
</script>

<template>
<p class="text-sm uppercase pb-2">
  <span class="material-symbols-outlined text-zinc-400 !text-sm align-bottom">
      <!-- arrow_circle_up -->
      blur_on
  </span>
  Overhead Sky
</p>

<!-- Planisphere -->
<!-- <div class="aspect-square w-full rounded-full bg-zinc-900"> -->
<!-- </div> -->

<!-- Use tailwind to make d3 canvas size responsive -->
<div class="w-full">

  <!-- planisphere -->
  <div 
    class="planisphere-container"
    ref="planisphere">
  </div>

</div>

</template>

<style scoped>
  .planisphere-container {
    width: 100%;
    aspect-ratio: 1; /* keep it square! */
  }
</style>
