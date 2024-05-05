<script setup lang="ts">

import Menubar from 'primevue/menubar';
import ColorMode from "~/components/ColorMode.vue";

const items = [
  {
    label: 'Units',
    route: '/'
  },
  {
    label: 'Observations',
    route: '/observations'
  },
]

</script>

<template>
  <Menubar :model="items">
    <template #start>

    </template>
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon"/>
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon"/>
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2"/>
      </a>
    </template>
    <template #end>
      <ColorMode/>
    </template>
  </Menubar>

</template>

<style scoped>

</style>
