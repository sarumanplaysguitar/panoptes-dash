import {collection, doc, type DocumentData} from "firebase/firestore";
import type {UnitI} from "~/composables/interfaces";
import {firestoreDefaultConverter} from "vuefire";

export const getUnit = (unitId: string) => {
    return useDocument(
        doc(collection(useFirestore(), 'units'), unitId).withConverter<UnitI, DocumentData>({
            toFirestore: firestoreDefaultConverter.toFirestore,
            fromFirestore: (snapshot): (DocumentData & { readonly id: string }) | null => {
                const data = firestoreDefaultConverter.fromFirestore(snapshot)

                if (!data) return null

                return data
            },
        }),
        {wait: true}
    )
}
