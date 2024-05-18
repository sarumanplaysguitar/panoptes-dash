import {useRoute} from "vue-router";
import {defineStore} from "pinia";
import {collection, limit, orderBy, query, where} from "firebase/firestore";
import {firestoreDefaultConverter, useCollection} from "vuefire";


export const useUnitsStore = defineStore('units', () => {
    const route = useRoute()
    const dayjs = useDayjs()

    const previousHours = ref(24)
    const timePeriod = computed(() => dayjs().subtract(previousHours.value, 'hours'))
    const docLimit = ref(25)


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

    const unitObsRef = (unitId) => {
        return query(
            collection(useFirestore(), 'units', unitId, 'observations'),
            where('time', '>=', timePeriod.value.toDate()),
            orderBy('time', 'desc'),
            limit(docLimit.value)
        )
    }

    // All units in the 'units' collection.
    const unitsSource = useCollection(() =>
        unitsRef, {wait: true}
    )

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

    const unitObservationsSource = useCollection(() => {
            if (!currentUnit.value) return null
            return unitObsRef(currentUnit.value.id)
        }, {wait: true}
    )

    return {unitsSource, units, currentUnit, unitObservationsSource, previousHours, timePeriod, docLimit}
})
