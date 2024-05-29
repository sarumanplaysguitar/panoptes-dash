<script setup lang="ts">
import {ref} from 'vue'
import {AmbientLight, DirectionalLight, GltfModel, OrthographicCamera, Renderer, Scene} from 'troisjs';

const renderer = ref<null | Renderer>(null)
const camera = ref<null | OrthographicCamera>(null)
const sunlight = ref<null | DirectionalLight>(null)
const ambient = ref<null | AmbientLight>(null)

const lightAngle = ref(-0.4 * Math.PI) // radians
const lightRadius = ref(10)
const cameraTilt = ref(Math.PI) // radians

const sunPositionX = computed(() => 0)
const sunPositionY = computed(() => lightRadius.value * Math.sin(lightAngle.value))
const sunPositionZ = computed(() => lightRadius.value * Math.cos(lightAngle.value))
const sunPosition = computed(() => ({x: sunPositionX.value, y: sunPositionY.value, z: sunPositionZ.value}))

const zoom = ref(90)
const width = 200
const height = 200
const viewSize = Math.min(width, height); // for square aspect ratio

const cameraPositionX = computed(() => 0)
const cameraPositionY = computed(() => 0)
const cameraPositionZ = computed(() => 10)
const cameraPosition = computed(() => ({
  x: cameraPositionX.value,
  y: cameraPositionY.value,
  z: cameraPositionZ.value
}))

// Add keypress events.
onMounted(() => {
  if (sunlight.value) {
    // Add a keypress to change the z angle before each render.
    window.addEventListener('keydown', (event) => {
      if (event.key === 'w') {
        lightAngle.value += Math.PI / 36 // 5 degrees
      } else if (event.key === 's') {
        lightAngle.value -= Math.PI / 36 // 5 degrees
      } else if (event.key === 'a') {
        cameraTilt.value -= Math.PI / 36 // 5 degrees
      } else if (event.key === 'd') {
        cameraTilt.value += Math.PI / 36 // 5 degrees
      }

      camera.value.camera.rotation.z = cameraTilt.value
    })
  }
})

</script>

<template>
  <Card>
    <template #content>
      sun position x: {{ sunPositionX }} y: {{ sunPositionY }} z: {{ sunPositionZ }}
      <br>
      cameraTilt {{ cameraTilt }}

      <Renderer ref="renderer" antialias>
        <OrthographicCamera
            ref="camera"
            :position="cameraPosition"
            :near="0.5"
            :far="100"
            :left="-viewSize / zoom"
            :right="viewSize / zoom"
            :top="viewSize / zoom"
            :bottom="-viewSize / zoom"/>
        <Scene background="#262626">
          <AmbientLight ref="ambient" color="#ffffff" :intensity="0.3"/>
          <DirectionalLight ref="sunlight" color="#ffffff" :intensity="2" :position="sunPosition"/>
          <GltfModel src="/moon.glb"/>
        </Scene>
      </Renderer>
    </template>
  </Card>
</template>

<style scoped>

</style>
