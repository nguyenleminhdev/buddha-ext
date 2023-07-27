/**chrome bản cũ <= 97 không có hàm này */
export const check_chrome_support_keep_alive = () => {
    if (
        !chrome || 
        !chrome.runtime || 
        !chrome.runtime.getPlatformInfo
    ) return false

    return true
}

/**khi gọi bất đồng bộ chrome api, bg sẽ sống thêm 30s */
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3)

/**giữ bg luôn chạy */
export const keepContentScriptAlive = () => {
    chrome.runtime.onStartup.addListener(keepAlive)

    keepAlive()
}