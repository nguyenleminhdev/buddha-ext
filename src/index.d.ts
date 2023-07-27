import type { Env, Chrome } from './service/interface'
import type { IndexedDB } from './service/helper/indexedDB'
import type { T } from './service/core/i18n'

/**khai báo các giá trị global */
declare global {
    /**các giá trị của env hiện tại */
    var $env: Env
    /**kiểu dữ liệu cho chrome extension */
    var chrome: Chrome
    /**kiểu dữ liệu của index db */
    var $db: IndexedDB
    /**giá trị locale hiện tại */
    var $locale: string
}

/**vue router bị lỗi type, nên phải hotfix tạm */
declare module 'vue-router'

/**thêm kiểu dữ liệu i18n vào vue */
declare module '@vue/runtime-core' {
    /**thêm kiểu dữ liệu vào $xxxx */
    interface ComponentCustomProperties {
        /**kiểu dữ liuệ cho i18n */
        $t: T
    }
}


export { }