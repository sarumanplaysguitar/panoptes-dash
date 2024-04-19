import './assets/tailwind.css'

import {createApp} from 'vue'
import {VueFire} from 'vuefire'
import {createPinia} from 'pinia'
import PrimeVue from "primevue/config";
import Lara from '@/assets/presets/lara';

import App from './App.vue'
import router from './router.js'
import {firebaseApp} from "@/firebase.js";
import '@/assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueFire, {
    firebaseApp,
    modules: [
        // VueFireAuth(),
    ],
})
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
})
app.use(router)
app.mount('#app')
