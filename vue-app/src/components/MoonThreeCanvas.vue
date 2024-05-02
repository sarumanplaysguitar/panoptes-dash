<script>
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

    export default {
        name: 'MoonThreeCanvas',

        data() {
            return {
                zoom: 90,
                lightAngle: -Math.PI / 2, // radians
                lightRadius: 10,
                cameraTilt: 0 // radians, should come from latitude.
            }
        },

        // Lifecycle hooks
        mounted() {
            this.initThree();
            window.addEventListener('keydown', this.handleKeyDown);
        },

        beforeDestroy() {
            // For cleanup
            window.removeEventListener('resize', this.onWindowResize);
            window.removeEventListener('keydown', this.handleKeyDown);
            this.stopAnimation();
            this.renderer.dispose();
        },

        methods: {
            initThree() {
                // Scene setup 🖼
                this.scene = new THREE.Scene();
                // this.scene.background = new THREE.Color(0x87ceeb);
                this.scene.background = new THREE.Color(0x262626);

                // Camera setup 🎥
                const width = this.$refs.moonThreeCanvas.offsetWidth;
                const height = this.$refs.moonThreeCanvas.offsetHeight;
                const viewSize = Math.min(width, height); // for square aspect ratio

                this.camera = new THREE.OrthographicCamera(
                    -viewSize / this.zoom,   // Left
                    viewSize / this.zoom,    // Right
                    viewSize / this.zoom,   // Top
                    -viewSize / this.zoom,  // Bottom
                    0.5,          // Near
                    100          // Far
                );

                this.camera.position.z = 5;

                this.renderer = new THREE.WebGLRenderer({ antialias: true });
                this.renderer.setSize(width, height);
                this.renderer.outputEncoding = THREE.sRRBEncoding;
                this.$refs.moonThreeCanvas.appendChild(this.renderer.domElement);

                // Lighting 💡
                this.addSunlight();

                // Objects 🌒
                // this.addMoon();
                // this.addTestToonSphere();
                this.addPhongSphere();

                // Resize canvas with window ↗
                window.addEventListener('resize', this.onWindowResize, false);

                // Render! 🎬
                this.renderScene();
            },

            addPhongSphere() {
                const geometry = new THREE.SphereGeometry(1, 32, 32); // Radius, widthSegments, heightSegments
                const material = new THREE.MeshPhongMaterial({
                    color: 0xd7d7d7,  // A soft blue color
                    specular: 0x222222, // Specular highlights
                    shininess: 25 // Shininess level
                });

                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(0, 0, 0);  // Positioned at the origin for visibility
                this.scene.add(sphere);

                this.renderScene();
            },

            addTestToonSphere() {
                const geometry = new THREE.SphereGeometry(1, 32, 32); // Same sphere geometry
                const gradientMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/gradientMaps/threeTone.jpg');
                gradientMap.minFilter = THREE.NearestFilter;

                const material = new THREE.MeshToonMaterial({
                    color: 0xffffff,  // Set to white for maximum contrast
                    gradientMap: gradientMap
                });

                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(0, 0, 0);
                this.scene.add(sphere);

                this.renderScene();
            },

            addSunlight() {
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
                this.scene.add(ambientLight);

                this.sunlight = new THREE.DirectionalLight(0xffffff, 1.5);
                this.sunlight.position.set(this.lightRadius * Math.cos(this.lightAngle), 0, this.lightRadius * Math.sin(this.lightAngle)); // initialize to aim at world origin, from +x direction
                this.scene.add(this.sunlight);
                this.renderScene();
            },

            handleKeyDown(event) {
                switch(event.key) {
                    case 'd':
                        this.lightAngle -= Math.PI / 36; // -5 deg
                        this.updateSunlightPosition();
                        console.log('A');
                        break;
                    case 'a':
                        this.lightAngle += Math.PI / 36; // +5 deg
                        this.updateSunlightPosition();
                        console.log('D');
                        break;
                    case 's':
                        this.cameraTilt += Math.PI / 36; // +5 deg
                        this.tiltCamera();
                        console.log('S');
                        break;
                    case 'w':
                        this.cameraTilt -= Math.PI / 36; // -5 deg
                        this.tiltCamera();
                        console.log('W');
                        break;
                }
            },

            updateSunlightPosition() {
                // hella trig 📐
                this.sunlight.position.x = this.lightRadius * Math.cos(this.lightAngle);
                this.sunlight.position.z = this.lightRadius * Math.sin(this.lightAngle);
                this.renderScene(); // Manually re-render frame 🎬
            },

            tiltCamera() {
                this.camera.rotation.z = this.cameraTilt; // rotate about z axis
                this.camera.updateProjectionMatrix();
                this.renderScene();
            },

            addMoon() {
                const loader = new GLTFLoader();
                loader.load('/moon.glb', (gltf) => {
                    gltf.scene.traverse((child) => {
                        if (child.isMesh) {
                            const gradientMap = new THREE.TextureLoader().load('/two-tone-gradient-map.png');
                            gradientMap.minFilter = THREE.NearestFilter;
                            child.material = new THREE.MeshToonMaterial({
                                map: child.material.map,
                                gradientMap: gradientMap
                            });
                        }
                    });
                    this.scene.add(gltf.scene);
                    // render scene here? or out in the init...? eh.
                    this.renderScene();
                }, undefined, (error) => {
                    console.error('Red alert red alert: ', error);
                });
            },

            renderScene() {
                this.renderer.render(this.scene, this.camera);
            },

            onWindowResize() {
                // BROKEN BUT NOT PRIORITY RN CUZ IM NOT RESIZING THIS COMPONENT? IDK....
                const width = this.$refs.moonThreeCanvas.offsetWidth;
                const height = this.$refs.moonThreeCanvas.offsetHeight;
                const viewSize = Math.min(width, height); // for square aspect ratio

                // Update the ortho camera & renderer size 🎥
                this.camera.left = -viewSize / this.zoom;
                this.camera.right = viewSize / this.zoom;
                this.camera.top = viewSize / this.zoom;
                this.camera.bottom = -viewSize / this.zoom;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);

                // Manually draw a new frame.
                this.renderScene();
            }
        }
    }
</script>

<template>
    <div ref="moonThreeCanvas" class="moon-three-canvas"></div>
</template>

<style>
    .moon-three-canvas {
        width: 8rem;
        height: 8rem;
    }
</style>