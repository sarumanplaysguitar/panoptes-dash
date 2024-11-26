<script lang="ts" setup>
import { ref } from 'vue';

const isPanelExpanded = ref(false);

const togglePanel = () => {
  isPanelExpanded.value = !isPanelExpanded.value;
};

// lat
// long
// sun altitude
// sidereal time
// observing status

// ALL moon vars:
// phase angle
// computed illumination
// computed phase name
// API calls for moon_rise and moon_set
// remember moon's rotation driven by latitude

</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Unit Selector (fixed) -->
    <div class="h-14 md:h-auto md:w-[3.6rem]">
      <UnitSelector />
    </div>

    <!-- About selected unit (Expandable panel) -->
    <div
      class="md:h-auto panel-transition"
      :class="isPanelExpanded ? 'panel-expanded' : 'panel-collapsed'"
    >
      <UnitAboutSelectedUnit 
        :isPanelExpanded="isPanelExpanded"
        @toggle-panel="togglePanel"
      />
    </div>

    <!-- Unit dashboard content (collapsible) -->
    <div
      class="overflow-auto content-transition"
      :class="isPanelExpanded ? 'content-collapsed' : 'content-expanded'"
    >
      <UnitDashboardContent />
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
/* Panel transition setup */
.panel-transition {
  transition-property: flex-grow, width; /* Animate these properties */
  transition-duration: 700ms, 700ms; /* Duration for both */
}

.panel-expanded {
  /* PROBLEM: WIDTH? */
  /* width: 100%; */
  flex-grow: 1;
  transition-delay: 0.25s; /* Start expanding after 300ms */
}

.panel-collapsed {
  width: 18rem;
  min-width: 18rem;
  flex-grow: 0;
  transition-delay: 0.25s;
}

/* Dashboard content transition setup */
.content-transition {
  transition-property: opacity, width; /* Animate opacity and width */
  transition-duration: 0.25s, 0.25s; /* durations for opacity and width */
}

.content-expanded {
  opacity: 1;
  width: auto;
  transition-delay: 0.25s, 0.25s; /* Fade in after 300ms, width immediate */
}

.content-collapsed {
  opacity: 0;
  width: 0;
  transition-delay: 0ms, 0.25s; /* Immediate fade out, width shrinks after 300ms */
}
</style>
