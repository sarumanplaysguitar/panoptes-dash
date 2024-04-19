import {defineStore} from 'pinia'
import {useCollection} from "vuefire";
import {unitsRef} from "@/firebase.js";

export const useUnitStore = defineStore('units', () => {
    const units = useCollection(unitsRef, {
        once: true,
    })

    return {units}
})
