import {defineStore} from "pinia";
import {collectionGroup, limit, orderBy, query} from "firebase/firestore";

export const useObservationsStore = defineStore('observations', () => {
    const db = useFirestore()
    const observationsRef = collectionGroup(db, 'observations')
    const observationsQuery = query(observationsRef, orderBy('time', 'desc'), limit(25))
    const observations = useCollection(observationsQuery, {wait: true, ssrKey: 'observations'})

    return {observations}
})
