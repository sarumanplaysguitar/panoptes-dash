import {collection, doc, type DocumentData} from "firebase/firestore";
import type {ConfigI} from "~/composables/interfaces";
import {firestoreDefaultConverter} from "vuefire";

export const getConfig = (unitId: string) => {
    return useDocument(
        doc(collection(useFirestore(), 'units'), unitId, 'metadata', 'config').withConverter<ConfigI, DocumentData>({
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
