import {defineStore} from "pinia";
import {collectionGroup, limit, orderBy, query} from "firebase/firestore";


export const useObservationsStore = defineStore('observations', () => {
    const observationsRef = collectionGroup(useFirestore(), 'observations')
    const observationsQuery = query(observationsRef, orderBy('time', 'desc'), limit(25))
    const observations = useCollection(observationsQuery, {wait: true, ssrKey: 'observations'})

    return {observationsRef, observationsQuery, observations}
})
