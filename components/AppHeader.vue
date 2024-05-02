<script setup lang="ts">

import Menubar from 'primevue/menubar';

const items = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Units',
    route: '/units'
  }
]

</script>

<template>
  <h1 class="text-3xl font-bold underline">
    <NuxtLink to="/">PANOPTES Dashboard</NuxtLink>
  </h1>
  <div class="card">
    <Menubar :model="items">
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
    </Menubar>
  </div>
</template>

<style scoped>

</style>
