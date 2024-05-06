import {collection, doc, limit, orderBy, query, where} from "firebase/firestore";

const dayjs = useDayjs()

export const useMetadataStore = defineStore('metadata', () => {

    function getMetadataDoc(unitId, docName) {
        return doc(useFirestore(), 'units', unitId, 'metadata', docName)
    }

    function getMetadataAsArray(unitId, collectionName, fieldName) {
        const colRef = collection(useFirestore(), 'units', unitId, 'metadata', collectionName, 'records')
        const colQuery = useCollection(
            query(
                colRef,
                where('received_time', '>=', dayjs().subtract(1, 'day').toDate()),
                orderBy('received_time', 'desc'),
                limit(60)
            ), {
                wait: true,
                ssrKey: fieldName
            })

        const data = computed(() => {
            return colQuery.value.map(u =>
                u[fieldName] != undefined
                    ?
                    [u.received_time.toDate(), u[fieldName]]
                    :
                    [u.received_time.toDate(), 0])
        })

        return {name: fieldName, data: data, otherData: data}
    }

    function getSeverity(val) {
        return val ? 'success' : 'danger'
    }

    return {getMetadataDoc, getMetadataAsArray, getSeverity}
})
