<script setup>
import { onMounted, onBeforeUnmount, ref, defineProps, inject, nextTick } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { stars_vshader, stars_fshader, sky_vshader, sky_fshader, ground_vshader, ground_fshader } from '@/assets/shaders/shaders.js';
import { sky_colors, ambient_light_colors, star_colors, star_color_index, sun_thresholds } from '@/assets/shaders/colors.js'
import { brightest_stars_arr, bright_stars_arr, average_stars_arr, faint_stars_arr, faintest_stars_arr} from '@/assets/data/mag_5_stars.js';

// Bring in state of the side panel 
// (affects whether to reset camera to default upon side panel collapse, in animation fn below)
const props = defineProps({
  isPanelExpanded: Boolean,
});

// const isPanelExpanded = inject('isPanelExpanded')

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
let scene, camera, renderer, controls;
let ambient_light;
let fov = 45;
let nearLimit = 0.5;
let farLimit = 80;
let resizeObserver;
const env_scale_fac = 1;

// Astronomy variables ☀️
// TODO replace these placeholders with props of API or firebase data
let sunAltitude = -5.1;
let previousSunAltitude = sunAltitude;
let dec = 88.;
let ra = -40.;
let unitLatitude = 34.;
console.log(degreesToRadians(ra));

// Unit + scene variables 🔭
let unit, control_box, sky, clouds;
let dec_axis, ra_axis, unitLat, mount, pier;
let debug_cube;


// Initialize Three.js scene, camera, and renderer and Pan3D objects 🌐🎥🌳🔭
const initThree = () => {
  console.log(props.isPanelExpanded);

  const container = document.getElementById('mainThreeCanvasContainer');
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene 🌐
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x26262a);
  // scene.background = new THREE.Color(0xffffff);
  scene.fog = new THREE.Fog(0xffffff, -7, 15);

  // Camera 🎥
  camera = new THREE.PerspectiveCamera(fov, width / height, nearLimit, farLimit);
  camera.position.set(3, 0.6, 3); // xyz

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

  // Orbit controls 🕹️
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.enablePan = false;
  controls.minDistance = 1.5;
  controls.maxDistance = 30;
  controls.enableDamping = true;
  controls.dampingFactor = 0.15;
  controls.update();

  // GLTF Loader 📂
  const loader = new GLTFLoader();

  // HDRI 🌇

  let pmremGenerator = new THREE.PMREMGenerator(renderer);
  new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath('/')
      .load('placeholder_sunset.hdr', function (texture) {

      var envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.compileCubemapShader();

      // scene.background = envMap;
      scene.environment = envMap;

      texture.dispose();
      pmremGenerator.dispose();

      });

  // Lighting 💡
  lighting();

  // Objects ⛅
  // makeCube();
  makeSky();
  loader.load('/model_for_export_bw2.glb', onLoadUnit);
  // loader.load('/control_box.glb', onLoadControlBox);
};

const lighting = () => {

  const ambient_light = new THREE.AmbientLight(0x27272a, 0.5);
  scene.add(ambient_light);

  const sunlight = new THREE.DirectionalLight(0x010101, 150);
  sunlight.position.set(0, 1, 1);
  scene.add(sunlight);
}

function onLoadUnit(gltf) {
    // console.log(gltf);
    unit = gltf.scene;
    // unit.position.x = -2 / Math.sqrt(2);
    // unit.position.z = -2 / Math.sqrt(2);

    scene.add(unit);
    // const dec_axis = unit.getObjectByName("empty_dec", true); // aka head unit
    // line.x -= dec_axis.getWorldPosition.x;
    // console.log(line.position.x)
    // line.position.z += 0.25;
    // line.position.y -= 5;
    // console.log(line.position.x)
    // console.log(dec_axis.getWorldPosition)
    // line.y -= dec_axis.getWorldPosition.y;
    // line.z -= dec_axis.getWorldPosition.z;
    // line.updateMatrixWorld();
    // dec_axis.updateMatrixWorld();
    // line.parent = dec_axis;
    // line.scale.set(6.2, 6.2, 6.2);
}

function onLoadControlBox(gltf) {
  let num_components = gltf.scene.children.length;
    control_box = gltf.scene;
    control_box.position.x = -2 / Math.sqrt(2);
    control_box.position.z = -1 / Math.sqrt(2);
    control_box.rotateY(degreesToRadians(145.));

    for (let i=0; i < num_components; i++) {
        let component = gltf.scene.children[i];

        component.material.transparent = true;
        component.material.opacity = 1.;
    }
    // um maybe traverse model instead ^ but this works anyhow

    scene.add(control_box);
}

const makeCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x555555,
    specular: 0xffffff,
    shininess: 50,
    flatShading: false
  });

  debug_cube = new THREE.Mesh(geometry, material);
  scene.add(debug_cube);
};

const makeAxes = () => {
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
}

// TODO move this fn to a composable
function blend_sky_colors(sunAltitude, sun_thresholds, sky_colors) {
  // Returns array of linearly interpolated sky colors (one for each degree breakpoint in sun_thresholds)
  // based on sun's altitude, and blended from a few key, preset sky colors/edge cases (hex codes in sky_colors)
  // Also blends fog and ambient light colors, and sets fog strength to increase after sunset

  const sky_color_lerp_array = [];
  const num_thresholds = sun_thresholds.length;
  // console.log(sky_colors);
  const num_colors = sky_colors['day'].length;
  const sky_colors_keys = Object.keys(sky_colors);

  // Determine what "time of day" it is by seeing which of the 2 thresholds sunAltitude is within
  for (let i = 0; i < num_thresholds; i++) {
  if (sunAltitude >= sun_thresholds[i]) {

      // ambient_light.color.set(ambient_light_colors[sky_colors_keys[i]]);
      // console.log(ambient_light_colors[i]);

      if (sunAltitude == sun_thresholds[i]) {
      // It's equal to an edge case, so nothing to interpolate - just return pre-made sky colors.
      // sky_color_lerp_array = sky_colors[sky_colors_keys[i]];
      for (let j = 0; j < num_colors; j++) {
          const key_color = new THREE.Color(sky_colors[sky_colors_keys[i]][j]);
          sky_color_lerp_array.push(key_color);

          // Update fog color if color calculated was ground (first entry in color table)
          if (j == 0) {
              scene.fog.color = key_color;
              scene.fog.near = -10 + -22 * smoothstep(sunAltitude, 5, -19);
          }
          if (j == 0) ambient_light.color.set(key_color);
      }
      } else {
      // Need to interpolate between 2 thresholds, in order of day -> night (or, higher sun altitude -> lower)
      const upper_threshold = sun_thresholds[i - 1];
      const lower_threshold = sun_thresholds[i];

      const percent = Math.round(((upper_threshold - sunAltitude) / (upper_threshold - lower_threshold) + 0.00001) * 100) / 100;
      // console.log(percent, '%', sun_thresholds[i - 1], 'to', sun_thresholds[i], 'for i: ', i);



      // Create LERP blends of all colors between the two edge case skies
      for (let j = 0; j < num_colors; j++) {
          const start_color = new THREE.Color(sky_colors[sky_colors_keys[i - 1]][j]);
          // Even if this works it's bad and i need to fix it
          const end_color = new THREE.Color(sky_colors[sky_colors_keys[i]][j]);
          // console.log("yo", sky_colors[sky_colors_keys[i]][j]);

          const blend_color = start_color.lerpHSL(end_color, percent);

          sky_color_lerp_array.push(blend_color)

          // Update fog color if color calculated was ground (first entry in color table)
          if (j == 0) {
              scene.fog.color = blend_color;
              scene.fog.near = -10 + -22 * smoothstep(sunAltitude, 5, -19);
          }
          // TODO ERROR! ambient_light was not accessible.
          // if (j == 0) ambient_light.color.set(blend_color);
      }
      }
  }
  // if (sky_color_lerp_array.length != 0) console.log(sky_color_lerp_array);
  if (sky_color_lerp_array.length != 0) break;
  }
  return sky_color_lerp_array;
}

const makeSky = () => {
  // Assign initial sky colors
  const blended_sky_colors = blend_sky_colors(sunAltitude, sun_thresholds, sky_colors);

  const sky_uniforms = {
    u_ground: { value: blended_sky_colors[0] },
    u_horizon: { value: blended_sky_colors[1] },
    u_low: { value: blended_sky_colors[2] },
    u_mid: { value: blended_sky_colors[3] },
    u_upper: { value: blended_sky_colors[4] },
    u_white: { value: new THREE.Color(0xffffff) },
    u_time: { value: 0.0 },
    u_resolution: { value: { x: 0, y: 0 } }
  };

  const sky_material = new THREE.ShaderMaterial({
    uniforms: sky_uniforms,
    vertexShader: sky_vshader,
    fragmentShader: sky_fshader,
    side: THREE.BackSide,
    fog: false
  });

  const sky_geometry = new THREE.SphereBufferGeometry(3.7 * env_scale_fac, 50, 26);
  const sky = new THREE.Mesh(sky_geometry, sky_material);
  scene.add(sky);
}

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

  if (debug_cube) {
    debug_cube.rotation.x = time * 0.5;
    debug_cube.rotation.y = time * 1;
  }

  if (unit) {
      dec_axis = unit.getObjectByName("empty_dec", true); // aka head unit
      ra_axis = unit.getObjectByName("empty_ra", true);
      unitLat = unit.getObjectByName("empty_lat", true);
      mount = unit.getObjectByName("empty_mount", true);
      pier = unit.getObjectByName("empty_pier", true);

      // console.log(ra_axis);
      ra_axis.rotation.x = degreesToRadians(ra);
      dec_axis.rotation.y = degreesToRadians(dec);
      unitLat.rotation.z = degreesToRadians(unitLatitude) * -1;

      
      // line.rotation.x = degreesToRadians(guiControls.RA);
      // line.rotation.y = degreesToRadians(guiControls.Dec  + 180) * 1;
      // line.rotation.z = degreesToRadians(guiControls.Latitude);
  }

  if (!props.isPanelExpanded) {
    // the Panoptes3D side panel is collapsed in the dashboard UI; reset camera view to default.
    // if this is inefficient set up a vue watcher thing instead
    camera.position.set(3, 0.6, 3); // xyz
    controls.target.set(0, 0.5, 0);
    // controls.update();
  }

  controls.update(); // damping
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
