import { waterfall } from 'async'
import { useCommonStore as store_popup } from '../../popup/store'
import { useCommonStore as store_option } from '../../options/store'
import { toast, toastError } from './alert'

import type { CbError, Platform } from '../interface'

/**viết lại hàm waterfall để tự động thêm loading và alert */
export const full_loading = (
    from: Platform,
    function_list: Function[],
    success_message?: string
) => {
    // lấy dữ liệu store chính xác
    let commonStore: any
    if (from === 'OPTION') commonStore = store_option()
    if (from === 'POPUP') commonStore = store_popup()

    waterfall([
        // * kích hoạt loading
        (cb: CbError) => {
            if (commonStore) commonStore.is_loading_full_screen = true

            cb()
        },
        ...function_list
    ], e => {
        // tắt loading
        if (commonStore) commonStore.is_loading_full_screen = false

        if (e) return toastError(e)

        // alert nếu có
        if (success_message) toast('success', success_message)
    })
}