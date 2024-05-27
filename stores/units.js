import {useRoute} from "vue-router";
import {defineStore} from "pinia";
import {collection, collectionGroup, limit, orderBy, query, where} from "firebase/firestore";
import {firestoreDefaultConverter, useCollection} from "vuefire";


export const useUnitsStore = defineStore('units', () => {
    const route = useRoute()
    const dayjs = useDayjs()

    const previousHours = ref(24)
    const timePeriod = computed(() => dayjs().subtract(previousHours.value, 'hours'))
    const docLimit = ref(250)


    // A reference to the 'units' collection.
    const unitsRef = computed(() =>
        collection(useFirestore(), 'units').withConverter({
                toFirestore: firestoreDefaultConverter.toFirestore,
                fromFirestore: (snapshot) => {
                    const data = firestoreDefaultConverter.fromFirestore(snapshot)
                    if (!data) return null
                    return data
                }
            }
        )
    )

    // All the observations as a collectionGroup.
    const allObsRef = computed(() =>
        collectionGroup(useFirestore(), 'observations').withConverter({
                toFirestore: firestoreDefaultConverter.toFirestore,
                fromFirestore: (snapshot) => {
                    const data = firestoreDefaultConverter.fromFirestore(snapshot)
                    if (!data) return null

                    // Create an observation_id that doesn't include the camera id.
                    let sequence_parts = data.sequence_id.split('_')
                    data.observation_id = sequence_parts[0] + '_' + sequence_parts[2]
                    data.sequence_time = dayjs.utc(sequence_parts[2], 'YYYYMMDDHHmmss')

                    return data
                }
            }
        )
    )

    // A reference to the 'observations' subcollection of the current unit.
    const unitObsRef = computed(() =>
        collection(useFirestore(), 'units', route.params.id, 'observations').withConverter({
                toFirestore: firestoreDefaultConverter.toFirestore,
                fromFirestore: (snapshot) => {
                    const data = firestoreDefaultConverter.fromFirestore(snapshot)
                    if (!data) return null

                    // Create an observation_id that doesn't include the camera id.
                    let sequence_parts = data.sequence_id.split('_')
                    data.observation_id = sequence_parts[0] + '_' + sequence_parts[2]
                    data.sequence_time = dayjs.utc(sequence_parts[2], 'YYYYMMDDHHmmss')

                    return data
                }
            }
        )
    )

    const unitMetadataRef = computed(() =>
        !route.params.id ? null :
            collection(useFirestore(), 'units', route.params.id, 'metadata').withConverter({
                    toFirestore: firestoreDefaultConverter.toFirestore,
                    fromFirestore: (snapshot) => {
                        const data = firestoreDefaultConverter.fromFirestore(snapshot)
                        if (!data) return null

                        // Change the date string into a dayjs object.
                        data.received_time = data.received_time.toDate()
                        // data.date = dayjs.utc(data.date)

                        return data
                    }
                }
            )
    )

    // Only show and load units that have been recently active.
    const unitsQuery = computed(() => {
        if (!unitsRef.value) return null
        return query(
            unitsRef.value,
            orderBy('unit_id' ),
            orderBy('last_updated', 'desc'),
            limit(100)  // arbitrarily large number of units
        )
    })

    // The query for the observations.
    const observationsQuery = computed(() => {
        return query(
            route.params.id ? unitObsRef.value : allObsRef.value,
            where('time', '>=', timePeriod.value.toDate()),
            orderBy('time', 'desc'),
            limit(docLimit.value)
        )
    })

    const metadataQuery = computed(() => {
        if (!unitMetadataRef.value) return null
        return query(
            unitMetadataRef.value,
            where('received_time', '>=', timePeriod.value.toDate()),
            orderBy('received_time', 'desc'),
            limit(docLimit.value)
        )
    })

    // A reference to the 'images' collectionGroup.
    const allImagesRef = computed(() =>
        collectionGroup(useFirestore(), 'images').withConverter({
                toFirestore: firestoreDefaultConverter.toFirestore,
                fromFirestore: (snapshot) => {
                    const data = firestoreDefaultConverter.fromFirestore(snapshot)
                    if (!data) return null

                    // Create an observation_id that doesn't include the camera id.
                    let sequence_parts = data.uid.split('_')
                    data.observation_id = sequence_parts[0] + '_' + sequence_parts[2]
                    data.sequence_id = sequence_parts[0] + '_' + sequence_parts[1] + '_' + sequence_parts[2]
                    data.sequence_time = sequence_parts[2]
                    data.unit_id = sequence_parts[0]

                    return data
                }
            }
        )
    )

    const imagesQuery = computed(() => {
        return query(
            allImagesRef.value,
            where('image_time', '>=', timePeriod.value.toDate()),
            orderBy('image_time', 'desc'),
        )
    })

    // All units in the 'units' collection.
    const unitsSource = useCollection(() =>
        unitsQuery.value ? unitsQuery.value : null, {wait: true}
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

    const currentObservations = useCollection(() =>
        observationsQuery.value, {wait: true}
    )

    const currentUnitMetadata = useCollection(() =>
        metadataQuery.value, {wait: true}
    )

    const currentImages = useCollection(() =>
        imagesQuery.value, {wait: true}
    )

    const currentUnitImages = computed(() => {
        return currentImages.value
            ? currentImages.value.filter((image) => image.unit_id === route.params.id)
            : []
    })

    // The currently active unit document.
    const currentUnit = computed(() => {
            if (!units.value) return null
            if (!route.params.id) return null

            // Get the active unit and assign observations and images.
            let unit = units.value.find((unit) => unit.id === route.params.id)
            if (unit) {
                unit.observations = currentObservations.value
                // Assign images to each observation based on the observation_id.
                unit.observations.forEach((observation) => {
                    observation.images = currentUnitImages.value.filter((image) => {
                        return image.uid.startsWith(observation.sequence_id)
                    })
                })
                unit.metadata_records = currentUnitMetadata.value
            }
            return unit
        }
    )

    return {
        unitsSource,
        units,
        currentUnit,
        unitObsRef,
        allObsRef,
        allImagesRef,
        observationsQuery,
        currentObservations,
        currentUnitMetadata,
        currentUnitImages,
        currentImages,
        previousHours,
        timePeriod,
        docLimit
    }
})
