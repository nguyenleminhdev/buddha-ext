import { syncOrigin } from '../service/helper/origin'
import content from './content'
import popup from './popup'
import option from './option'
import { loadEnvHand } from '../service/core/env'
import { IndexedDB } from '../service/helper/indexedDB'
import { keepContentScriptAlive } from '../service/helper/chrome'

// giữ cho bg luôn chạy
keepContentScriptAlive()

// ghi đè origin của các host dưới
syncOrigin([
    'https://test.abc.com',
])

// load config theo biến môi trường
loadEnvHand((e, r) => { })

// khởi tạo kết nối đến db cho background
globalThis.$db = new IndexedDB()

// lắng nghe event được gửi đến
chrome.runtime.onMessage.addListener((
    { from, to, event, data },
    sender,
    sendResponse
) => {
    // chỉ xử lý các event được gửi cho bg
    if (to !== 'BACKGROUND') return true

    switch (from) {
        case 'CONTENT': content(event, data, sendResponse)
            break
        case 'OPTION': option(event, data, sendResponse)
            break
        case 'POPUP': popup(event, data, sendResponse)
            break
    }

    return true
})

export { }