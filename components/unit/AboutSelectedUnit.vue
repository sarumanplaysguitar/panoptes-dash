<script setup>
  import { defineProps, defineEmits, ref, onMounted } from "vue";
  import { usePendingPromises } from "vuefire";
  import * as d3 from "d3";
  import roundedRectSvg from "@/assets/rounded-rect.svg";
  // later: change this to have the country code be determined from the lat/long and replaced below.
  // import flag from "@/assets/country_flags/s/US.svg";

  const dayjs = useDayjs();
  const unitsStore = useUnitsStore();
  const unit = computed(() => unitsStore.currentUnit ? unitsStore.currentUnit : {});

  onServerPrefetch(() => usePendingPromises());

  // Event emitter to expand 3D viewer on side panel (parent component has logic to change state)
  const props = defineProps({
    isPanelExpanded: Boolean,
  });

  const emit = defineEmits(["toggle-panel"]);

  const togglePanel = () => {
    emit("toggle-panel"); // gets emitted onclick
  };

  // fancy button toggle
  const iconButton = ref(null);

  onMounted(() => {
    // Initialize button when component mounts
    initializeButton();
  });
  
  function initializeButton() {
    const container = d3.select(iconButton.value);
    console.log(container);
    const width = 15*1.5;
    const height = 11*1.5;
    const strokeWidth = 1.5;
    const strokeColor = "#ffffff";
    const borderRadius = 2.5;

    // Append SVG to the container
    const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);

    // Append rounded rectangle outline
    svg.html(roundedRectSvg)
      .attr("x", 0)
      .attr("y", 0);

    const rect = svg.append("rect")
      .attr("x", 0 + strokeWidth/2)
      .attr("y", 0 + strokeWidth/2)
      .attr("width", width - strokeWidth)
      .attr("height", height - strokeWidth)
      .attr("rx", borderRadius)
      .attr("ry", borderRadius)
      .style("stroke-width", strokeWidth)
      .style("stroke", strokeColor)
      .style("fill", "none");

    svg.append("clipPath")
      .attr("id", "clip-rect")
      .append("rect")
      .attr("x", 0 + strokeWidth/2)
      .attr("y", 0 + strokeWidth/2)
      .attr("width", width - strokeWidth)
      .attr("height", height - strokeWidth)
      .attr("rx", borderRadius)
      .attr("ry", borderRadius);
    
    // Append vertical line inside the rectangle
    const line = svg.append("line")
      .attr("x1", width / 3.25)
      .attr("y1", height)
      .attr("x2", width / 3.25)
      .attr("y2", 0)
      .attr("stroke", strokeColor)
      .attr("stroke-width", strokeWidth)
      .attr("class", "toggle-line")
      .attr("clip-path", "url(#clip-rect)");
      
    // Button logic (mouseover, click)
    svg.on("mouseover", function() {
      // preview what'll happen if you click the button.

      // "if not expanded" when you hover on the button...
      if (!props.isPanelExpanded) {
        // ... translate the line to the right by___ (open 3D viewer)
        line.transition()
          .duration(200)
          .attr("x1", width)
          .attr("x2", width);
      } else {
        // ... translate the line back to the left (close 3D viewer)
        line.transition()
          .duration(200)
          .attr("x1", width / 3.25)
          .attr("x2", width / 3.25);
      }
    });

    svg.on("mouseout", function() {
      // the line should go back to representing the current site layout

      // "if not expanded" when you stop hovering on the button...
      if(!props.isPanelExpanded) {
        // go back to not expanded
        line.transition()
          .duration(200)
          .attr("x1", width / 3.25)
          .attr("x2", width / 3.25);
      } else {
        // go back to expanded
        line.transition()
          .duration(200)
          .attr("x1", width)
          .attr("x2", width);
      }
    });
  }
</script>

<template>

  
<div 
  class="h-[calc(100vh_-_3.5rem)] grid grid-cols-1 grid-rows-1 md:py-2.5 md:h-screen relative"
  :style="{
    marginRight: isPanelExpanded ? '0.625rem' : '0rem'
  }">

  <!-- Button to open/close 3D viewer -->
  <div 
    class="button-container pt-2" 
    ref="iconButton"
    @click="togglePanel">
  </div>

  <transition name="fade">
    <UnitStatusUnitPanelInfo v-if="!isPanelExpanded" />
  </transition>

 
  <!-- <div class="transition-cover row-start-1 col-start-1 rounded-md h-full"></div> -->

  <!-- <transition name="fade"> -->
    <UnitStatusPanoptes3D :isPanelExpanded="isPanelExpanded" />
  <!-- </transition> -->
  

</div>
<!-- 
    
  <div class="background-col">
    <div class="z-10 row-start-1 col-start-1 bg-opacity-0">
      <div class="flex flex-col place-items-center justify-end h-full">
        <div class="mt-auto flex flex-rows">
          <div class="w-14 h-14 rounded-full"></div>
          <div class="ml-2 pb-2">
            <div class="font-light text-4xl text-white">{{ unit.unit_id }}</div>
            <div class="font-light text-1xl text-white">{{ unit.name }}</div>
            <div
                class="animate-avg-pulse flex font-semibold tracking-widest text-xs uppercase text-white leading-3 items-center">
              <span
                  class="align-self-center animate-avg-ping absolute inline-flex bg-neutral-100 h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
              <span
                  class="align-self-center flex bg-neutral-100 animate-modified-ping h-[0.57rem] w-[0.57rem] me-[0.4rem] rounded-full"></span>
              {{ unit.status?.state }}
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-1 text-neutral-600 text-xs font-semibold leading-3 py-2 martian-mono-300">
          <p>
            {{ dayjs.utc().format('MMM DD') }}
            <span class="text-white">{{ dayjs().utc().format('HH:mm:ss') }}</span>
            UTC
          </p>
          <p>
            {{ unit.local_time?.format('MMM DD') }}
            <span class="text-white">{{ unit.local_time?.format('HH:mm:ss') }}</span>
            {{ unit.local_time?.format('z') }}
          </p>
        </div>
        <div class="text-neutral-600 text-sm mt-2">
          <p class="flex items-center text-white text-sm text-center">
            {{ unit.location?.name }}
          </p>
          <p class="text-center font-mono font-normal pb-4">
            {{ unit.location?.latitude }} {{ unit.location?.longitude }}
            <br/>
            {{ unit.location?.elevation }}
          </p>
          <div class="w-48 h-24 rounded-full ring-neutral-700 ring-2"></div>
        </div>
        <div class="">
          <p class="text-neutral-700 text-xs font-semibold mt-3 pb-2 md:pb-0">© 2024 Project PANOPTES</p>
        </div>
      </div>
    </div>

    <div
        class="z-0 row-start-1 col-start-1 bg-gradient-to-b from-neutral-800 from-55% to-neutral-850 to-65% rounded-md h-full"></div>

  </div> -->
</template>

<style scoped>

.transition-cover {
  display: absolute;
  min-width: 18rem;
  background: linear-gradient(#385974, #576971, #53556A, #344C71);
  /* z-index: 2; */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-out;
}

/* .background-col {
  @apply h-[calc(100vh_-_3.5rem)] grid grid-cols-1 grid-rows-1 md:py-3 md:h-screen
} */


.button-container {
  cursor: pointer;
  position: absolute;
  top: 0.625rem;
  right: 0.5rem;
  z-index: 100;
  opacity: 0.5;
  transition: 0.3s;
}

.button-container:hover {
  opacity: 0.9;
}
</style>
