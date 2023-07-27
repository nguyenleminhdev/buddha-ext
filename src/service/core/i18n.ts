import { App } from 'vue'

import vn from '../../lang/vn'
import en from '../../lang/en'
import th from '../../lang/th'
import { get } from 'lodash'

export type T = (path: string) => string

const source = {
    vn, vi: vn,
    en, us: en,
    th
}

export const $t: T = (path) => get(source, `${$locale}.${path}`, path)

/**plugin cho vue */
export const i18n = {
    install: (app: App) => {
        app.config.globalProperties.$t = $t
    }
}