<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';
import * as THREE from 'three';

// General utils 🔨
const PI = Math.PI;

function degreesToRadians(angle) {
    return angle * PI / 180;
}

function smoothstep(x, t1, t2) {
    let k = Math.max(0, Math.min(1, (x - t1) / (t2 - t1)));
    let s = k ** 2 * (3 - 2 * k);
    return s;
}

// Declare Three variables 🌐🎥
const mainThreeCanvasRef = ref(null);
let scene, camera, renderer, controls, mesh; // <-- mesh declared globally
let fov = 45;
let nearLimit = 0.5;
let farLimit = 80;
let resizeObserver;

// Initialize Three.js scene, camera, and renderer and Pan3D objects 🌐🎥🌳🔭
const initThree = () => {
  const container = document.getElementById('mainThreeCanvasContainer');
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene 🌐
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x26262a);
  scene.fog = new THREE.Fog(0xffffff, -7, 15);

  // Camera 🎥
  camera = new THREE.PerspectiveCamera(fov, width / height, nearLimit, farLimit);
  camera.position.set(5, 5, 5); // xyz

  // Renderer 🎥
  renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
    precision: 'highp'
  });

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.NoToneMapping;

  renderer.setSize(width, height);
  container.appendChild(renderer.domElement); // Append the canvas directly to the container

  // Lighting 💡
  lighting();

  // Objects
  makeCube();
};

const lighting = () => {

  const ambientLight = new THREE.AmbientLight(0x27272a, 0.5);
  scene.add(ambientLight);

  const sunlight = new THREE.DirectionalLight(0x010101, 150);
  sunlight.position.set(
    0,
    1, 1);
  scene.add(sunlight);
}

const makeCube = () => {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshPhongMaterial({
    color: 0x555555,
    specular: 0xffffff,
    shininess: 50,
    shading: THREE.SmoothShading
  });

  mesh = new THREE.Mesh(geometry, material); // <-- Assign mesh to global variable
  scene.add(mesh);
};

// Resize the canvas with parent div ↗️
const resizeCanvas = () => {
  const container = document.getElementById('mainThreeCanvasContainer');
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Avoid resizing to zero, which can happen during transitions
  if (width === 0 || height === 0) return;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

// Use ResizeObserver to observe size changes of the parent container
const observeParentSize = () => {
  const container = document.getElementById('mainThreeCanvasContainer');

  resizeObserver = new ResizeObserver(() => {
    resizeCanvas(); // trigger when parent div resizes
  });

  resizeObserver.observe(container); // start observing
}

const animate = () => {
  const time = performance.now() * 0.001; // convert ms to seconds

  if (mesh) { // <-- Ensure mesh is defined before rotating it
    mesh.rotation.x = time * 0.5;
    mesh.rotation.y = time * 1;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

onMounted(() => {
  // Make sure DOM is loaded and container exists
  nextTick(() => {
    initThree();
    animate();

    // set up resize observer and window resize event listener
    observeParentSize();
    window.addEventListener('resize', resizeCanvas);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  if (resizeObserver) resizeObserver.disconnect();
  renderer.dispose();
});
</script>

<template>
  <div 
    id="mainThreeCanvasContainer"
    class="z-0 row-start-1 col-start-1 rounded-md h-full" 
    style="width: 100%; height: 100%;"
    >
      <!-- <canvas ref="mainThreeCanvas" class="main-three-canvas"></canvas> -->
  </div>
</template>

<style scoped>

  #mainThreeCanvasContainer {
    overflow: hidden;
  }
  .main-three-canvas {
    display: absolute;
    /* position: relative; */
  }
</style>
