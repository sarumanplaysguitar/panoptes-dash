import {defineStore} from "pinia";
import {collection} from "firebase/firestore";

export const useUnitsStore = defineStore('units', () => {
    const db = useFirestore()
    const unitsRef = collection(db, 'units')

    const units = computed(() => useCollection(unitsRef, {wait: true}))

    return {units}
})
