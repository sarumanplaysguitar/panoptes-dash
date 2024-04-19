import {defineStore} from 'pinia'
import {useCollection} from "vuefire";
import {recentImagesQuery} from "@/firebase.js";

export const useImageStore = defineStore('images', () => {
    const images = useCollection(recentImagesQuery)

    return {images}
})
