import {defineStore} from "pinia";
import {collection} from "firebase/firestore";
import {firestoreDefaultConverter} from "vuefire";
import {useRoute} from "vue-router";

const dayjs = useDayjs()

export const useMetadataStore = defineStore('metadata', () => {
    const route = useRoute()

    const metadataRef = computed(() =>
        collection(
            useFirestore(),
            'units', route.params.id, 'metadata'
        ).withConverter({
            toFirestore: firestoreDefaultConverter.toFirestore,
            fromFirestore: (snapshot) => {
                const data = firestoreDefaultConverter.fromFirestore(snapshot)
                if (!data) return null
                return data
            }
        }))

    function getMetadataAsArray(unitId, collectionName, fieldName) {
        const colQuery = getMetadata(unitId, collectionName)

        const data = computed(() => {
            return colQuery.value.map(u =>
                u[fieldName] != null
                    ?
                    [u.received_time.toDate(), u[fieldName]]
                    :
                    [u.received_time.toDate(), 0])
        })

        return {name: fieldName, data: data, otherData: data}
    }

    function getSeverity(val) {
        return val != null & val ? 'success' : 'danger'
    }

    return {metadataRef, getMetadataAsArray, getSeverity}
})
