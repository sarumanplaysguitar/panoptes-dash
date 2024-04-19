import {initializeApp} from 'firebase/app'
import {collection, collectionGroup, getFirestore, limit, orderBy, query} from 'firebase/firestore'

export const firebaseApp = initializeApp({
    projectId: 'project-panoptes-01'
})

const db = getFirestore(firebaseApp)
export const unitsRef = collection(db, 'units')
export const observationsRef = collectionGroup(db, 'observations')
export const imagesRef = collectionGroup(db, 'images')
export const recentObservationsQuery = query(observationsRef, orderBy('time', 'desc'), limit(25))
export const recentImagesQuery = query(imagesRef, orderBy('received_time', 'desc'), limit(25))
