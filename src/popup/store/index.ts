import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common_store', () => {
    /**quản lý việc loading toàn trang */
    const is_loading_full_screen = ref(false)

    return {
        is_loading_full_screen
    }
})