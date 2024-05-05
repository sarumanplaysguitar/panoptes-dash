<script setup>
import {collection} from "firebase/firestore";
import Avatar from 'primevue/avatar';

const db = useFirestore()

const units = useCollection(collection(db, 'units'), {once: true})

</script>

<template>
  <div class="avatar_bg">
    <div class="relative inline-block" v-for="unit in units">
      <Avatar :label="unit.unit_id.slice(3)" class="avatar" shape="circle">
        <NuxtLink :to="`/unit/${unit.unit_id}`">{{ unit.unit_id.slice(3) }}</NuxtLink>
        <span class="avatar_active"></span>
      </Avatar>
    </div>
  </div>
</template>

<style scoped>
.avatar_bg {
  @apply bg-neutral-900 flex flex-row gap-3 p-2 h-[3.5m] md:flex-col md:h-screen md:w-[3.6rem] items-center overflow-y-auto
}

.avatar {
  @apply font-['Oxanium'] text-xs mt-[0.1rem] bg-neutral-800 min-w-9 min-h-9 rounded-full flex items-center justify-center text-neutral-300
}

.avatar_active {
  @apply inline-flex w-[0.8rem] h-[0.8rem] rounded-full border-2 border-neutral-900 bg-neutral-300 absolute -bottom-0.5 -right-0.5
}
</style>
