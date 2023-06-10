import { defineStore } from 'pinia';
import { ref } from "vue"
export default defineStore('global', () => {
        let theme = ref('true')
        return {
                theme
        }
    })