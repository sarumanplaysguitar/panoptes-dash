<script setup>
import { onMounted, onBeforeUnmount, ref, defineProps, nextTick, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { stars_vshader, stars_fshader, sky_vshader, sky_fshader, ground_vshader, ground_fshader } from '@/assets/shaders/shaders.js';
import { sky_colors, ambient_light_colors, star_colors, star_color_index, sun_thresholds } from '@/assets/shaders/colors.js'
import { brightest_stars_arr, bright_stars_arr, average_stars_arr, faint_stars_arr, faintest_stars_arr} from '@/assets/data/mag_5_stars.js';
import { useSkyColors } from '@/composables/useSkyColors';
import { useSun, useSiderealTime } from '@/composables/useAstro';

// update sky colors calculated in update_colors here, for the rest of app
const { groundColor, horizonColor, lowSkyColor, midSkyColor, upperSkyColor, setSkyColors } = useSkyColors();

const {
  // sidereal time
  current_lst,
  current_gst,
} = useSiderealTime();

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
// TODO replace any placeholders with props of API or firebase data
const { sun_altitude } = useSun();
const previous_sun_altitude = ref(sun_altitude.value);
let dec = 88.;
let ra = -40.;
let unitLatitude = 34.;

let sky_uniforms = {
  u_ground: { value: new THREE.Color(0x09090b) },
  u_horizon: { value: new THREE.Color(0x18181b) },
  u_low: { value: new THREE.Color(0x18181b) },
  u_mid: { value: new THREE.Color(0x18181b) },
  u_upper: { value: new THREE.Color(0x18181b) },
  u_white: { value: new THREE.Color(0x000000) },
  u_time: { value: 0.0 },
  u_resolution: { value: { x: 0, y: 0 } },
};

let ground_uniforms = {
  u_ground_glow: { value: 0.0 },
  u_resolution: { value: { x: 0, y: 0 } }
};

let stars_uniforms = {
  u_time: { value: 0.0 },
  u_diurnal: { value: 0.0 },
  u_resolution: { value: { x: window.innerWidth, y: window.innerHeight } },
  u_scale: { value: window.innerHeight / 2. },
  u_unitLatitude: { value: -1. * degreesToRadians(unitLatitude) }
}

let stars_material;

// Star variables ✨
let brightest_stars_geometry, brightest_stars_data, brightest_stars;
let bright_stars_geometry, bright_stars_data, bright_stars;
let average_stars_geometry, average_stars_data, average_stars;
let faint_stars_geometry, faint_stars_data, faint_stars;

// Unit + scene variables 🔭
let unit, control_box, sky, clouds;
let dec_axis, ra_axis, unitLat, mount, pier;
let debug_cube;


// Initialize Three.js scene, camera, and renderer and Pan3D objects 🌐🎥🌳🔭
const initThree = () => {

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

  makeStars();
  setStarVisibility();
};

const lighting = () => {

  const ambient_light = new THREE.AmbientLight(0x27272a, 0.5);
  scene.add(ambient_light);

  const sunlight = new THREE.DirectionalLight(0x010101, 150);
  sunlight.position.set(0, 1, 1);
  scene.add(sunlight);
};

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
};

// Sky color handling
// TODO replace fns_like_this to fnsLikeThis like bruh wyd

function blend_sky_colors(sun_altitude, sun_thresholds, sky_colors) {
  // Returns array of linearly interpolated sky colors (THREE.Color objects),
  // one for each degree breakpoint in sun_thresholds,
  // based on sun's altitude, and blended from a few key, preset sky colors/edge cases (hex codes in sky_colors)
  // Also blends fog and ambient light colors, and sets fog strength to increase after sunset

  const sky_color_lerp_array = [];
  const num_thresholds = sun_thresholds.length;
  // console.log(sky_colors);
  const num_colors = sky_colors['day'].length;
  const sky_colors_keys = Object.keys(sky_colors);

  // Determine what "time of day" it is by seeing which of the 2 thresholds sun_altitude is within
  // First handle case where the sun is below (or equal to) the lowest threshold
  if (sun_altitude <= sun_thresholds[num_thresholds - 1]) {
    // Use deepest night colors
    const deepNightColors = sky_colors['deep_night'];
    for (let j = 0; j < num_colors; j++) {
      const key_color = new THREE.Color(deepestNightColors[j]);
      sky_color_lerp_array.push(key_color);

      if (j==0) {
        scene.fog.color = key_color;
        scene.fog.near = -10 + -22 * smoothstep(sun_altitude, 5, -19);
      }
    }
  } else {
    // Handle any "brighter" cases
    for (let i = 0; i < num_thresholds; i++) {
      if (sun_altitude > sun_thresholds[i]) {

          // ambient_light.color.set(ambient_light_colors[sky_colors_keys[i]]);
          // console.log(ambient_light_colors[i]);

          if (sun_altitude == sun_thresholds[i]) {
            // It's equal to an edge case, so nothing to interpolate - just return pre-made sky colors.
            // sky_color_lerp_array = sky_colors[sky_colors_keys[i]];
            for (let j = 0; j < num_colors; j++) {
                const key_color = new THREE.Color(sky_colors[sky_colors_keys[i]][j]);
                sky_color_lerp_array.push(key_color);

                // Update fog color if color calculated was ground (first entry in color table)
                if (j == 0) {
                    scene.fog.color = key_color;
                    scene.fog.near = -10 + -22 * smoothstep(sun_altitude, 5, -19);
                }
                if (j == 0) ambient_light.color.set(key_color);
            }
          } else {
            // Need to interpolate between 2 thresholds, in order of day -> night (or, higher sun altitude -> lower)
            const upper_threshold = sun_thresholds[i - 1];
            const lower_threshold = sun_thresholds[i];

            const percent = Math.round(((upper_threshold - sun_altitude) / (upper_threshold - lower_threshold) + 0.00001) * 100) / 100;
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
                    scene.fog.near = -10 + -22 * smoothstep(sun_altitude, 5, -19);
                }
                // TODO ERROR! ambient_light was not accessible.
                // if (j == 0) ambient_light.color.set(blend_color);
            }
          }
      }

      // if (sky_color_lerp_array.length != 0) console.log(sky_color_lerp_array);
      if (sky_color_lerp_array.length != 0) break;

    }
  }

  // Create a copy of the array in hex format for the composable
  const hexColorsArray = sky_color_lerp_array.map(color => `#${color.getHexString()}`);

  // Pass hexColorsArray to the sky colors composable for use in rest of app
  setSkyColors(hexColorsArray);

  return sky_color_lerp_array;

  console.log('sky_colors:', sky_colors);
  console.log('sky_colors_keys:', sky_colors_keys);
  console.log('Current i:', i);
  console.log('Accessing key:', sky_colors_keys[i - 1]);
}

function update_colors(sky_uniforms, ground_uniforms, new_sky_colors) {
  // Update any colors dependent on sun latitude here, ie. sky and ground
  // also fog...?
  sky_uniforms.u_ground = { value: new_sky_colors[0] },
  sky_uniforms.u_horizon = { value: new_sky_colors[1] },
  sky_uniforms.u_low = { value: new_sky_colors[2] },
  sky_uniforms.u_mid = { value: new_sky_colors[3] },
  sky_uniforms.u_upper = { value: new_sky_colors[4] },
  ground_uniforms.u_ground_glow = { value: new_sky_colors[5] }
  // console.log(new_sky_colors);
}

// Stars

function createStarGeometry(starData, material) {
  // A helper function to create star geometry, based on some arbitrary magnitude classes (bright/faint/etc)
  // (The stars are grouped this way, for now, to stagger when they become visible as the sun sets)
  const geometry = new THREE.BufferGeometry();
  const data = get_star_data(starData, 0., 3. * 0.001);

  return new THREE.Points(
    geometry
      .setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3))
      .setAttribute('star_color', new THREE.Float32BufferAttribute(data.colors, 3))
      .setAttribute('size', new THREE.Float32BufferAttribute(data.sizes, 1).setUsage(THREE.DynamicDrawUsage))
      .setAttribute('twinkle_offset', new THREE.Float32BufferAttribute(data.twinkle_offsets, 1).setUsage(THREE.DynamicDrawUsage)),
    material
  );
}


const makeStars = () => {

  stars_material = new THREE.ShaderMaterial({
    defines: { USE_COLOR: true },
    uniforms: stars_uniforms,
    vertexShader: stars_vshader,
    fragmentShader: stars_fshader,
    transparent: true,
    // depthWrite: false,
  });

  brightest_stars = createStarGeometry(brightest_stars_arr, stars_material);
  bright_stars = createStarGeometry(bright_stars_arr, stars_material);
  average_stars = createStarGeometry(average_stars_arr, stars_material);
  faint_stars = createStarGeometry(faint_stars_arr, stars_material);

  scene.add(brightest_stars, bright_stars, average_stars, faint_stars);
}

function get_star_data(stars_arr, median_magnitude, base_size) {

  // Each star has data in this order: [x, y, z, vmag, color, con]
  // Get star data and determine the following for each star in this array:
  var star_data;
  var position;
  var mag;
  var size;
  var bv_index;
  var color = new THREE.Color();
  var twinkle_offset;

  // Store that data in the respective arrays, to be returned:
  var star_positions = [];
  // var star_colors = new Float32Array(stars_arr.length * 3);
  var star_colors = [];
  var star_sizes = [];
  var twinkle_offsets = [];

  for (let i = 0; i < stars_arr.length; i++) {
  star_data = stars_arr[i];
  position = star_data.slice(0, 3);

  // Set vertex position: x, y, z
  star_positions.push(position[0] * env_scale_fac);
  star_positions.push(position[1] * env_scale_fac);
  star_positions.push(position[2] * env_scale_fac);

  // Calculate size
  mag = star_data[3];
  size = -1 * mag + 6;
  // console.log(size);
  // size = base_size * (2.5);
  // size = (8 - mag);
  star_sizes.push(size);

  // Determine and set color
  bv_index = star_data[4];
  if (bv_index <= star_color_index[0]) {
      color.setHex(0xc3c2ff);
  } else if (bv_index <= star_color_index[1]) {
      color.setHex(0xb5d6ff);
  } else if (bv_index <= star_color_index[2]) {
      color.setHex(0xe5ebff);
  } else if (bv_index <= star_color_index[3]) {
      color.setHex(0xebffff);
  } else if (bv_index <= star_color_index[4]) {
      color.setHex(0xf9fff0);
  } else if (bv_index <= star_color_index[5]) {
      color.setHex(0xffffc5);
  } else {
      color.setHex(0xffc9c9);
  }

  // star_colors.push([color.r, color.g, color.b]);
  star_colors.push(color.r, color.g, color.b);
  // color.toArray(star_colors, i * 3);
  // if (i == 5) console.log(star_colors);
  // if (i == 1) console.log(star_colors[0]);

  // Unique, random twinkle phase shift
  twinkle_offset = Math.random() * 10
  twinkle_offsets.push(twinkle_offset)
  }

  return { positions: star_positions, colors: star_colors, sizes: star_sizes, twinkle_offsets: twinkle_offsets };

}

function setStarVisibility() {
  // Thresholds for star visibility based on sun altitude
  // Meant to be run if sun altitude changes or every frame.

  const sunAltitude = sun_altitude.value;
  const visibilityThresholds = [
    { threshold: -8, object: brightest_stars },
    { threshold: -10, object: bright_stars },
    { threshold: -13, object: average_stars },
    { threshold: -18, object: faint_stars }
  ];

  visibilityThresholds.forEach(({ threshold, object }) => {
    if (object) object.visible = sunAltitude < threshold;
  });
}

const rotateStars = () => {
  stars_uniforms.u_diurnal.value = degreesToRadians(current_lst.value);
};

// Watch for changes to astronomical variables
watch(() => sun_altitude.value, () => {
  setStarVisibility();
});

watch(() => current_lst.value, () => {
  rotateStars();
});

const makeSky = () => {
  // Assign initial sky colors
  const blended_sky_colors = blend_sky_colors(sun_altitude.value, sun_thresholds, sky_colors);

  sky_uniforms = {
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
  
  if (sky_uniforms?.u_resolution?.value) {
    sky_uniforms.u_resolution.value.x = width;
    sky_uniforms.u_resolution.value.y = height;
  }
  if (ground_uniforms?.u_resolution?.value) {
    ground_uniforms.u_resolution.value.x = width;
    ground_uniforms.u_resolution.value.y = height;
  }
  if (stars_uniforms?.u_resolution?.value) {
    stars_uniforms.u_resolution.value.x = width;
    stars_uniforms.u_resolution.value.y = height;
  }
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

  // Put in shader uniform objects update function?
  sky_uniforms.u_time.value = time;
  stars_uniforms.u_time.value = time;

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

  if (sun_altitude.value != previous_sun_altitude.value) {
    // Update sky colors 🌅
    // Should I only try to do these sorta updates if the sun actually moved a lot (ie. some fraction of a degree)?
    update_colors(sky_uniforms, ground_uniforms, blend_sky_colors(sun_altitude.value, sun_thresholds, sky_colors));
    // console.log(sun_altitude);
    previous_sun_altitude.value = sun_altitude.value;

    // setStarVisibility();
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
    
    // Initialize colors for the composable
    const blended_sky_colors = blend_sky_colors(sun_altitude.value, sun_thresholds, sky_colors);
    const hexColorsArray = blended_sky_colors.map(color => `#${color.getHexString()}`);
    setSkyColors(hexColorsArray);

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
