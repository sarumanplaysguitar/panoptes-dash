import {defineStore} from "pinia";
import {collection, collectionGroup, limit, orderBy, query} from "firebase/firestore";


export const useObservationsStore = defineStore('observations', () => {
    const observationsRef = collectionGroup(useFirestore(), 'observations')
    const observationsQuery = query(observationsRef, orderBy('time', 'desc'), limit(25))
    const observations = useCollection(observationsQuery, {wait: true, ssrKey: 'observations'})

    function getRecentUnitObservations(unitId, limitNum = 25) {
        const unitObsRef = collection(useFirestore(), 'units', unitId, 'observations')
        const unitObsQuery = query(unitObsRef, orderBy('time', 'desc'), limit(limitNum))
        const unitObs = useCollection(unitObsQuery, {wait: true, ssrKey: 'observations-unit'})
        return unitObs
    }

    return {observationsRef, observationsQuery, observations, getRecentUnitObservations}
})
