import {defineStore} from 'pinia'
import {useCollection} from "vuefire";
import {recentObservationsQuery} from "@/firebase.js";

export const useObservationsStore = defineStore('observations', () => {
    const observations = useCollection(recentObservationsQuery)

    function formatCoords(coords) {
        return coords.mount_ra + '° ' + coords.mount_dec + '°';
    }

    return {observations, formatCoords}
})
