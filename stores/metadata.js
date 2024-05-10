import {collection, doc, limit, orderBy, query, where} from "firebase/firestore";

const dayjs = useDayjs()

export const useMetadataStore = defineStore('metadata', () => {

    function getMetadataDoc(unitId, docName) {
        return useDocument(doc(useFirestore(), 'units', unitId, 'metadata', docName), {
            wait: true,
            ssrKey: 'metadata-doc'
        })
    }

    function getMetadata(unitId, collectionName, sinceValue = 24, sinceUnit = 'hour') {
        const colRef = collection(
            useFirestore(),
            'units', unitId, 'metadata', collectionName, 'records'
        )
        const colQuery = useCollection(
            query(
                colRef,
                where('received_time', '>=', dayjs().subtract(sinceValue, sinceUnit).toDate()),
                orderBy('received_time', 'desc'),
                limit(100)
            ), {wait: true, ssrKey: 'metadata-collection'})

        return colQuery
    }

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

    return {getMetadataDoc, getMetadata, getMetadataAsArray, getSeverity}
})
