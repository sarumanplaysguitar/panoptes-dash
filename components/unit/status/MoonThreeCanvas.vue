<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { usePendingPromises } from 'vuefire';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const unitsStore = useUnitsStore();
const unit = computed(() => unitsStore.currentUnit ?? {});

const zoom = ref(90);
const lightAngle = ref(0 * Math.PI); // radians
const lightRadius = ref(10);
const cameraTilt = ref(0.3 * Math.PI); // radians, should come from latitude

const moonThreeCanvas = ref(null);

let scene, camera, renderer, sunlight;

const addSunlight = () => {
  const ambientLight = new THREE.AmbientLight(0x27272a, 0.5);
  scene.add(ambientLight);

  // sunlight = new THREE.DirectionalLight(0x64748b, 1);
  sunlight = new THREE.DirectionalLight(0x010101, 150);
  sunlight.position.set(
    0,
    lightRadius.value * Math.sin(lightAngle.value),
    -lightRadius.value * Math.cos(lightAngle.value)
  );
  scene.add(sunlight);
};

const renderScene = () => {
  renderer.render(scene, camera);
};

const updateSunlightPosition = () => {
  sunlight.position.z = -lightRadius.value * Math.cos(lightAngle.value);
  sunlight.position.y = lightRadius.value * Math.sin(lightAngle.value);
  renderScene();
};

const tiltCamera = () => {
  camera.rotation.z = cameraTilt.value;
  camera.updateProjectionMatrix();
  renderScene();
};

const handleKeyDown = (event) => {
  switch (event.key) {
    case 'w':
      lightAngle.value -= Math.PI / 36; // -5 deg
      updateSunlightPosition();
      break;
    case 's':
      lightAngle.value += Math.PI / 36; // +5 deg
      updateSunlightPosition();
      break;
    case 'd':
      cameraTilt.value += Math.PI / 36; // +5 deg
      tiltCamera();
      break;
    case 'a':
      cameraTilt.value -= Math.PI / 36; // -5 deg
      tiltCamera();
      break;
  }
};

const initThree = () => {
  // Scene setup 🖼
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x27272a);

  // Camera setup 🎥
  const width = moonThreeCanvas.value.offsetWidth;
  const height = moonThreeCanvas.value.offsetHeight;
  const viewSize = Math.min(width, height); // for square aspect ratio

  camera = new THREE.OrthographicCamera(
    -viewSize / zoom.value,   // Left
    viewSize / zoom.value,    // Right
    viewSize / zoom.value,   // Top
    -viewSize / zoom.value,  // Bottom
    0.5,          // Near
    100          // Far
  );

  camera.position.z = 5;
  camera.rotation.z = cameraTilt.value;
  camera.updateProjectionMatrix();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  moonThreeCanvas.value.appendChild(renderer.domElement);

  // Lighting 💡
  addSunlight();

  // Objects 🌒
  const loader = new GLTFLoader();
  loader.load('/moon2.glb', (gltf) => {
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material.map) {
        child.material = new THREE.MeshPhongMaterial({
          map: child.material.map,
          specular: 0x222222,
          shininess: 0
        });
      }
    });
    scene.add(gltf.scene);
    renderScene();
  }, undefined, (error) => {
    console.error('Error loading the model:', error);
  });

  renderScene();
};

onMounted(() => {
  initThree();
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  renderer.dispose();
});

onServerPrefetch(() => usePendingPromises());
</script>

<template>
  <div ref="moonThreeCanvas" class="moon-three-canvas"></div>
</template>

<style>
.moon-three-canvas {
  width: 6rem;
  height: 6rem;
}
</style>
