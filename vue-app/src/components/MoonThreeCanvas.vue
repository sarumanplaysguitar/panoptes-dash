<script>
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    export default {
        name: 'MoonThreeCanvas',

        data() {
            return {
                zoom: 90,
                // lightAngle: Math.PI / 4,
                lightAngle: -0.4 * Math.PI, // radians
                lightRadius: 10,
                cameraTilt: 0.3 * Math.PI // radians, should come from latitude.
            }
        },

        // Lifecycle hooks
        mounted() {
            this.initThree();
            window.addEventListener('keydown', this.handleKeyDown);
        },

        beforeDestroy() {
            // For cleanup
            // window.removeEventListener('resize', this.onWindowResize);
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
                this.camera.rotation.z = this.cameraTilt; // rotate about z axis
                this.camera.updateProjectionMatrix();

                this.renderer = new THREE.WebGLRenderer({ antialias: true });
                this.renderer.setSize(width, height);
                this.renderer.outputEncoding = THREE.sRGBEncoding;
                this.$refs.moonThreeCanvas.appendChild(this.renderer.domElement);

                // Lighting 💡
                this.addSunlight();

                // Objects 🌒
                const gltfLoader = new GLTFLoader();

                // const addModel = async () => {
                //     const gltf = await gltfLoader.loadAsync('/moon.glb');
                //     const model = gltf.scene.children[0];

                //     const texture = await new THREE.TextureLoader().loadAsync('/two-tone.jpg');
                //     texture.minFilter = texture.magFilter = THREE.NearestFilter;

                //     model.texture = new THREE.MeshToonMaterial({
                //         map: model.material.map,
                //         gradientMap: texture
                //     });

                //     scene.add(model);
                //     this.renderScene();
                // }
                this.addPhongMoon();
                // this.addToonMoon();
                // this.addTestToonSphere();
                // this.addPhongSphere();

                // Resize canvas with window ↗
                // window.addEventListener('resize', this.onWindowResize, false);

                // Render! 🎬
                this.renderScene();

                // const axesHelper = new THREE.AxesHelper( 5 );
                // this.scene.add( axesHelper );
                // this.renderScene();
            },


            // addMoon() {
            //     console.log('i want to die')
            //     const loader = new GLTFLoader();
            //     loader.load('/moon2.glb', (gltf) => {
            //         console.log("Loaded model:", gltf.scene);

            //         gltf.scene.traverse((child) => {
            //             if (child.isMesh) {
            //                 console.log("Original material for mesh:", child.material);

            //                 const gradientMap = new THREE.TextureLoader().load('/two-tone-gradient-map.jpg');
            //                 gradientMap.minFilter = THREE.NearestFilter;
            //                 gradientMap.magFilter = THREE.NearestFilter;

            //                 // Create a new toon material
            //                 const toonMaterial = new THREE.MeshToonMaterial({
            //                     map: child.material.map, // Preserving any existing diffuse map
            //                     gradientMap: gradientMap
            //                 });

            //                 // Assign the new material
            //                 child.material = toonMaterial;

            //                 console.log("New material for mesh:", child.material);
            //             }
            //         });

            //         this.scene.add(gltf.scene);
            //         this.renderScene();
            //     }, undefined, (error) => {
            //         console.error('Error loading the model:', error);
            //     });
            // },


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

            // WORKED?
            addToonMoon() {
                const loader = new GLTFLoader();
                loader.load('/moon2.glb', (gltf) => {
                    gltf.scene.traverse((child) => {
                        if (child.isMesh && child.material.map) {
                            // Create a new Phong material using the existing texture map from the model
                            // child.material = new THREE.MeshPhongMaterial({
                            //     map: child.material.map,  // Use the existing map
                            //     specular: 0x222222,       // Specular color to give it a bit of a shine
                            //     shininess: 25             // Shininess level
                            // });


                            const gradientMap = new THREE.TextureLoader().load('/two-tone.jpg');
                            gradientMap.minFilter = THREE.NearestFilter;
                            gradientMap.magFilter = THREE.NearestFilter;

                            child.material = new THREE.MeshToonMaterial({
                                        map: child.material.map,
                                        gradientMap: gradientMap
                            });
                        }
                    });
                    this.scene.add(gltf.scene);
                    this.renderScene();
                }, undefined, (error) => {
                    console.error('Error loading the model:', error);
                });
            },

            addPhongMoon() {
                const loader = new GLTFLoader();
                loader.load('/moon2.glb', (gltf) => {
                    gltf.scene.traverse((child) => {
                        if (child.isMesh && child.material.map) {
                            // Create a new Phong material using the existing texture map from the model
                            child.material = new THREE.MeshPhongMaterial({
                                map: child.material.map,  // Use the existing map
                                specular: 0x222222,       // Specular color to give it a bit of a shine
                                shininess: 10             // Shininess level

                                // map: child.material.map,  // Use the existing map
                                // specular: 0x222222,       // Specular color to give it a bit of a shine
                                // shininess: 25             // Shininess level
                            });


                            // const gradientMap = new THREE.TextureLoader().load('/two-tone.jpg');
                            // gradientMap.minFilter = THREE.NearestFilter;
                            // gradientMap.magFilter = THREE.NearestFilter;

                            // child.material = new THREE.MeshToonMaterial({
                            //             map: child.material.map,
                            //             gradientMap: gradientMap
                            // });
                        }
                    });
                    this.scene.add(gltf.scene);
                    this.renderScene();
                }, undefined, (error) => {
                    console.error('Error loading the model:', error);
                });
            },



            addMoon() {
                this.loader = new GLTFLoader();
                this.loader.load('/moon2.glb', this.onLoad);
                this.renderScene();
            },

            onLoad(gltf) {
                const mesh = gltf.scene;
                this.scene.add(mesh);
                this.renderScene();
            },

            // addMoon() {
            //     const loader = new GLTFLoader();
            //     loader.load('/moon.glb', (gltf) => {
            //         gltf.scene.traverse((child) => {
            //             if (child.isMesh) {
            //                 const gradientMap = new THREE.TextureLoader().load('/two-tone.jpg');
            //                 gradientMap.minFilter = THREE.NearestFilter;
            //                 gradientMap.magFilter = THREE.NearestFilter;

            //                 child.material = new THREE.MeshToonMaterial({
            //                     map: child.material.map,
            //                     gradientMap: gradientMap
            //                 });
            //             }
            //         });
            //         this.scene.add(gltf.scene);
            //         // render scene here? or out in the init...? eh.
            //         this.renderScene();
            //     }, undefined, (error) => {
            //         console.error('Red alert red alert: ', error);
            //     });
            // },

            addTestToonSphere() {
                const geometry = new THREE.SphereGeometry(1, 32, 32); // Same sphere geometry
                // const gradientMap = new THREE.TextureLoader().load('/two-tone-gradient-map.jpg');
                const gradientMap = new THREE.TextureLoader().load('/two-tone.jpg');
                gradientMap.minFilter = THREE.NearestFilter;
                gradientMap.magFilter = THREE.NearestFilter;

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
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
                this.scene.add(ambientLight);

                this.sunlight = new THREE.DirectionalLight(0xffffff, 2);
                this.sunlight.position.set(0, this.lightRadius * Math.sin(this.lightAngle), -this.lightRadius * Math.cos(this.lightAngle)); // rotate about x-axis; start from the sun aiming from -z axis (new moon)
                this.sunlight.position.z = -this.lightRadius * Math.cos(this.lightAngle);
                this.sunlight.position.y = this.lightRadius * Math.sin(this.lightAngle);
                this.scene.add(this.sunlight);
                this.renderScene();
            },

            handleKeyDown(event) {
                switch(event.key) {
                    case 'w':
                        this.lightAngle -= Math.PI / 36; // -5 deg
                        this.updateSunlightPosition();
                        break;
                    case 's':
                        this.lightAngle += Math.PI / 36; // +5 deg
                        this.updateSunlightPosition();
                        break;
                    case 'd':
                        this.cameraTilt += Math.PI / 36; // +5 deg
                        this.tiltCamera();
                        break;
                    case 'a':
                        this.cameraTilt -= Math.PI / 36; // -5 deg
                        this.tiltCamera();
                        break;
                }
            },

            updateSunlightPosition() {
                // hella trig 📐
                this.sunlight.position.z = -this.lightRadius * Math.cos(this.lightAngle);
                this.sunlight.position.y = this.lightRadius * Math.sin(this.lightAngle);
                this.renderScene();
            },

            tiltCamera() {
                this.camera.rotation.z = this.cameraTilt; // rotate about z axis
                this.camera.updateProjectionMatrix();
                this.renderScene();
            },

            // addMoon() {
            //     const loader = new GLTFLoader();
            //     loader.load('/moon2.glb', (gltf) => {
            //         gltf.scene.traverse((child) => {
            //             if (child.isMesh) {
            //                 const gradientMap = new THREE.TextureLoader().load('/two-tone-gradient-map.png');
            //                 gradientMap.minFilter = THREE.NearestFilter;
            //                 child.material = new THREE.MeshToonMaterial({
            //                     map: child.material.map,
            //                     gradientMap: gradientMap
            //                 });
            //             }
            //         });
            //         this.scene.add(gltf.scene);
            //         // render scene here? or out in the init...? eh.
            //         this.renderScene();
            //     }, undefined, (error) => {
            //         console.error('Red alert red alert: ', error);
            //     });
            // },

            renderScene() {
                this.renderer.render(this.scene, this.camera);
            },

            // onWindowResize() {
            //     // BROKEN BUT NOT PRIORITY RN CUZ IM NOT RESIZING THIS COMPONENT? IDK....
            //     const width = this.$refs.moonThreeCanvas.offsetWidth;
            //     const height = this.$refs.moonThreeCanvas.offsetHeight;
            //     const viewSize = Math.min(width, height); // for square aspect ratio

            //     // Update the ortho camera & renderer size 🎥
            //     this.camera.left = -viewSize / this.zoom;
            //     this.camera.right = viewSize / this.zoom;
            //     this.camera.top = viewSize / this.zoom;
            //     this.camera.bottom = -viewSize / this.zoom;
            //     this.camera.updateProjectionMatrix();
            //     this.renderer.setSize(width, height);

            //     this.renderScene();
            // }
        }
    }
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