import {useRoute} from "vue-router";
import {defineStore} from "pinia";
import {collection} from "firebase/firestore";
import {firestoreDefaultConverter, useCollection} from "vuefire";


export const useUnitsStore = defineStore('units', () => {
    const route = useRoute()

    // A reference to the 'units' collection.
    const unitsRef = collection(useFirestore(), 'units').withConverter({
            toFirestore: firestoreDefaultConverter.toFirestore,
            fromFirestore: (snapshot) => {
                const data = firestoreDefaultConverter.fromFirestore(snapshot)
                if (!data) return null
                return data
            }
        },
        {wait: true, ssrKey: 'units-collection'}
    )

    // All units in the 'units' collection.
    const units = useCollection(() => unitsRef, {wait: true})

    // The currently active unitID.
    const currentUnitId = computed(() =>
        route.params.id
            ? route.params.id
            : null
    )

    // The currently active unit document.
    const currentUnitDoc = computed(() =>
        currentUnitId.value
            ? units.value.find((unit) => unit.id === currentUnitId.value)
            : null
    )

    // The metadata of the currently active unit.
    const currentUnitMetadata = useCollection(() => {
        if (!currentUnitId.value) return null
        return collection(useFirestore(), 'units', currentUnitId.value, 'metadata')
    })

    // The currently active unit.
    const currentUnit = computed(() => {
        if (!currentUnitId.value) return null
        let pan_unit = new PanUnit(currentUnitId.value)

        // Put all the currentDoc values into object.
        currentUnitDoc.value && Object.keys(currentUnitDoc.value).forEach((key) => {
            pan_unit[key] = currentUnitDoc.value[key]
        })

        pan_unit.config = currentUnitMetadata.value?.find((metadata) => metadata.id === 'config')
        pan_unit.power = currentUnitMetadata.value?.find((metadata) => metadata.id === 'power')
        pan_unit.weather = currentUnitMetadata.value?.find((metadata) => metadata.id === 'weather')
        pan_unit.status = currentUnitMetadata.value?.find((metadata) => metadata.id === 'status')
        pan_unit.safety = currentUnitMetadata.value?.find((metadata) => metadata.id === 'safety')

        return pan_unit
    })

    return {unitsRef, units, currentUnitId, currentUnitDoc, currentUnitMetadata, currentUnit}
})
