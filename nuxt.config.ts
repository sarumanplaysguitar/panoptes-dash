// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: {enabled: true},
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    modules: [
        "nuxt-primevue",
        "@nuxtjs/tailwindcss",
        "nuxt-vuefire",
    ],
    vuefire: {
        config: {
            apiKey: "AIzaSyDNzSpa5589wVxoGXTKg-bmYbLWfwiT63M",
            authDomain: "project-panoptes-01.firebaseapp.com",
            projectId: "project-panoptes-01",
            storageBucket: "project-panoptes-01.appspot.com",
            messagingSenderId: "897068131063",
            appId: "1:897068131063:web:f66ef8e66cae47937fe9f2",
            measurementId: "G-FWPP66SEZ3"
        }
    },
    primevue: {
        options: {
            unstyled: true
        },
        importPT: {from: '~/assets/css/presets/wind/'}      //import and apply preset
    }
})
