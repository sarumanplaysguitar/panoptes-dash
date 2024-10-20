<script lang="ts" setup>
  import { ref } from 'vue';

  const isPanelExpanded = ref(false);

  const togglePanel = () => {
    isPanelExpanded.value = !isPanelExpanded.value;
  };
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-neutral-900">
    <div class="h-14 md:h-auto md:w-[3.6rem]">
      <UnitSelector />
    </div>

    <!-- About selected unit (Expandable panel) -->
    <div
      class="md:h-auto duration-500 ease bg-blue-300"
      :style="{
        width: isPanelExpanded ? '100%' : '18rem',
        minWidth: '18rem',
        flexGrow: isPanelExpanded ? 1 : 0,
        transitionDelay: isPanelExpanded ? '300ms' : '0ms'  // delay for panel width change
      }">
      <p class="text-white">Unit About Selected Unit</p>
      <button
        class="bg-blue-500 text-white p-2 mt-4"
        @click="togglePanel"
      >
        {{ isPanelExpanded ? 'Collapse Panel' : 'Expand Panel' }}
      </button>
    </div>

    <!-- Unit dashboard content (collapsible) -->
    <transition name="expand-panel">
      <div
        class="overflow-auto transition-opacity duration-500 ease"
        :style="{
          width: isPanelExpanded ? '0' : 'auto',
          opacity: isPanelExpanded ? 0 : 1,
          flexGrow: isPanelExpanded ? 0 : 1,
          transitionDelay: isPanelExpanded ? '0ms' : '300ms'  // Delay for dashboard content collapse when shrinking
        }">
        <UnitDashboardContent />
      </div>
    </transition>

    <RouterView />
  </div>
</template>

<style scoped>
.expand-panel-enter-active,
.expand-panel-leave-active {
  transition: opacity .3s ease;
}

.expand-panel-enter-from {
  opacity: 0;
}

.expand-panel-enter-to {
  opacity: 1;
}

.expand-panel-leave-from {
  opacity: 1;
}

.expand-panel-leave-to {
  opacity: 0;
}
</style>
