<script setup>
import {RouterView} from "vue-router";
import MainMenu from "@/components/app/layout/AppHeader.vue";
</script>

<template>
  <MainMenu></MainMenu>
  <main>
    <div class="min-h-screen bg-neutral-900">
      <RouterView/>
    </div>
  </main>
</template>
