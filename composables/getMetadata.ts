import {collection, doc, type DocumentData} from "firebase/firestore";
import type {MetadataI} from "~/composables/interfaces";
import {firestoreDefaultConverter} from "vuefire";

export const getMetadata = (unitId: string, metadataName: string) => {
    return useDocument(
        doc(collection(useFirestore(), 'units'), unitId, 'metadata', metadataName).withConverter<MetadataI, DocumentData>({
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
