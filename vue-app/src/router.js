import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecentImages from "@/components/images/RecentImages.vue";
import RecentObservations from "@/components/observations/RecentObservations.vue";
import UnitView from "@/views/UnitView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/units/:id',
            component: UnitView
        },
        {
            path: '/observations',
            component: RecentObservations
        },
        {
            path: '/images',
            component: RecentImages
        }
    ]
})

export default router
