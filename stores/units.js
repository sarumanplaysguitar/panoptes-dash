import {useRoute} from "vue-router";
import {defineStore} from "pinia";
import {collection} from "firebase/firestore";
import {firestoreDefaultConverter, useCollection} from "vuefire";


export const useUnitsStore = defineStore('units', () => {
    const route = useRoute()
    const timePeriod = 24 // hours

    // A reference to the 'units' collection.
    const unitsRef =
        collection(useFirestore(), 'units').withConverter({
                toFirestore: firestoreDefaultConverter.toFirestore,
                fromFirestore: (snapshot) => {
                    const data = firestoreDefaultConverter.fromFirestore(snapshot)
                    if (!data) return null
                    return data
                }
            }
        )

    // All units in the 'units' collection.
    const unitsSource = useCollection(() =>
        unitsRef, {wait: true})

    // Make a PanUnit object from the unit document.
    const units = computed(() =>
        unitsSource.value
            ? unitsSource.value.map((unit) => {
                let pan_unit = new PanUnit(unit.id)

                // Put all the currentDoc values into object.
                Object.keys(unit).forEach((key) => {
                    pan_unit[key] = unit[key]
                })

                return pan_unit
            })
            : []
    )


    // The currently active unit document.
    const currentUnit = computed(() => {
            return route.params.id
                ? units.value.find((unit) => unit.id === route.params.id)
                : null
        }
    )

    const metadataSource = useCollection(() => {
            return currentUnit.value
                ? collection(
                    useFirestore(),
                    'units', currentUnit.value.id, 'metadata'
                ).withConverter({
                    toFirestore: firestoreDefaultConverter.toFirestore,
                    fromFirestore: (snapshot) => {
                        const data = firestoreDefaultConverter.fromFirestore(snapshot)
                        if (!data) return null

                        data.received_time = data.received_time.toDate()

                        return data
                    }
                })
                : null
        }
    )

    const currentMetadata = computed(() => {
        return currentUnit.value
            ? {
                config: metadataSource.value.find((doc) => doc.id === 'config'),
                power: metadataSource.value.find((doc) => doc.id === 'power'),
                safety: metadataSource.value.find((doc) => doc.id === 'safety'),
                status: metadataSource.value.find((doc) => doc.id === 'status'),
                weather: metadataSource.value.find((doc) => doc.id === 'weather')
            }
            : null
    })

    return {timePeriod, unitsSource, metadataSource, units, currentUnit, currentMetadata}
})
