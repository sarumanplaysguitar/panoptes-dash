import {defineStore} from "pinia";
import {collection, doc} from "firebase/firestore";
import {useCollection} from "vuefire";


export const useUnitsStore = defineStore('units', () => {
    const unitsRef = collection(useFirestore(), 'units')
    const units = useCollection(unitsRef, {wait: true})

    const unitImages = computed(() =>
        units.value.map(u => u.num_images ? parseFloat(u.num_images) : 0)
    )

    const unitIDs = computed(() =>
        units.value.map(u => u.unit_id > '' ? parseFloat(u.unit_id) : '')
    )

    function getUnitDoc(unitId) {
        return doc(unitsRef, unitId)
    }

    return {unitsRef, units, unitImages, unitIDs, getUnitDoc}
})
