<script setup>
import {collection} from 'firebase/firestore'

const db = useFirestore()
const units = useCollection(collection(db, 'units'))
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    PANOPTES Dashboard
  </h1>
  <div>
    <ul>
      <li v-for="unit in units">
        {{ unit.id }}
      </li>
    </ul>
  </div>
</template>
