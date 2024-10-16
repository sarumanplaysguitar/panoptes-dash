<script>
// import {usePendingPromises} from 'vuefire'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// TODO: import mrdoob stats.
// TODO: import stars_arr data from data/mag_5_stars.js
import { onMounted, ref } from 'vue';


// const unitsStore = useUnitsStore()
// const unit = computed(() => unitsStore.currentUnit ?? {})

// onServerPrefetch(() => usePendingPromises())

export default {

    // Vue Composition API

    setup() {

        // General utils 🔨
        const PI = Math.PI;

        function degreesToRadians(angle) {
            return angle * PI / 180;
        }

        function smoothstep(x, t1, t2) {
            let k = Math.max(0, Math.min(1, (x - t1)/(t2 - t1)));
            let s = k**2 * (3-2*k);
            return s;
        }

        // Declare Three variables 🌐🎥
        // The canvas DOM element is a ref, so it can be  accessed once Vue has rendered it/the component is mounted inside onMounted() later.
        const mainThreeCanvasRef = ref(null);
        let scene, camera, renderer, controls;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let fov = 45;
        let aspect = width/height;
        let nearLimit = 0.5;
        let farLimit = 80;


        // Declare Panoptes3D variables 🔭
        // QUESTION: DO I NEED TO DECLARE EVERYTHIIING HERE? lotta book-keeping if so.
        // or only... things that need to be accessible to update functions that change them?
        let sky_uniforms, stars_uniforms, ground_uniforms;
        let env_scale_fac = 1; // used for rescaling star positions
        const mesh;
        // Astronomical positions and data, in degrees. 🌙
        // TODO: Get from API later
        let sunAltitude = -10.3;
        let previousSunAltitude = sunAltitude;
        let diurnal = 0.;
        let unitLatitude = 34.;
        let cameraRotX = 0.;
        let cameraRotY = 0.;
        let cameraRotZ = 0.;
        // stars data was imported from data/mag_5_stars.js in stars_arr

        // Declare dev mode debugging variables 🐞
        let stats;

        // Initialize Three.js scene, camera, and renderer and Pan3D objects 🌐🎥🌳🔭
        const initScene = () => {

            // Scene 🌐
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x3A3A3A);
            scene.fog = new THREE.Fog(0xffffff, -7, 15);

            // Camera + Renderer 🎥
            const camera = new THREE.PerspectiveCamera(fov, aspect, nearLimit, farLimit);
            camera.position.set(3, 0.6, 3); // xyz

            renderer = new THREE.WebGLRenderer({
                canvas: mainThreeCanvasRef.value,
                alpha: false,
                antialias: true,
                precision: 'highp'
            });
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.NoToneMapping;

            // Orbit controls 🎮
            // TODO

            // Lighting 💡
            lighting();

            // Objects
            makeCube();
        }

        const lighting = () => {
            // Add lighting
            const light1 = new THREE.PointLight(0xffffff, 1000, 0);
            light1.position.set(10, 10, 10);
            scene.add(light1);

            const ambientLight = new THREE.AmbientLight(0xffffff);
            ambientLight.intensity = 500;
            scene.add(ambientLight);
        }

        const makeCube = () => {
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            
            const material = new THREE.MeshPhongMaterial({
                color: 0x555555,
                specular: 0xffffff,
                shininess: 50,
                shading: THREE.SmoothShading
            });

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        }

        const animate = () => {
            const time = performance.now() * 0.001; // convert ms to seconds

            if (mesh) {
                mesh.rotation.x = time * 0.5;
                mesh.rotation.y = time * 1;
            }
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        // Mount the scene (Vue lifecycle hook)
        onMounted(() => {
            initScene();
            animate();
            window.addEventListener('resize', resizeCanvas);
        });

        // Return the Three canvas for <template>
        return {
            mainThreeCanvasRef,
        };
    }
}
</script>

<template>
  <canvas ref="mainThreeCanvas" class="main-three-canvas"></canvas>

    <!-- <Card class="status-card"> -->
    <!-- <template #header> -->
      <!-- <p class="status-header">Moon</p> -->
    <!-- </template> -->
    <!-- <template #content> -->
      <!-- Moon panel -->
      <!-- <div class="pl-2 text-left w-full"> -->
        <!-- <h2 class="text-[1.4rem] pt-11 pl-1">{{ unit?.moon_phase }}</h2> -->
        <!-- <div class="grid grid-cols-3"> -->
          <!-- <div class="p-1 col-span-1"> -->
            <!-- <p class="text-xs uppercase semibold">Illumination</p> -->
            <!-- <p class="text-lg">{{ unit?.moon?.illumination.toFixed(2) * 100 }}%</p> -->
          <!-- </div> -->
          <!-- <div class="p-1 col-span-1"> -->
            <!-- <p class="text-xs uppercase semibold">Moonset</p> -->
            <!-- <p class="text-lg">X:XX AM</p> -->
          <!-- </div> -->
          <!-- <div class="p-1 col-span-1"> -->
            <!-- <p class="text-xs uppercase semibold">Moonrise</p> -->
            <!-- <p class="text-lg">XX:XX AM</p> -->
          <!-- </div> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </template> -->
  <!-- </Card> -->
</template>

<style scoped>
    .main-three-canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>