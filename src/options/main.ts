import { createPinia } from 'pinia'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { loadEnv } from '../service/core/env'
import App from './App.vue'
import { router } from './router'
import 'element-plus/dist/index.css'
import '../assets/css/tailwind.css'
import { waterfall } from 'async'
import { i18n } from '../service/core/i18n'
import { IndexedDB } from '../service/helper/indexedDB'

import type { CbError } from '../service/interface'

waterfall([
    (cb: CbError) => loadEnv(cb),
    (cb: CbError) => {
        globalThis.$db = new IndexedDB()

        cb()
    },
    (cb: CbError) => $db.get('locale', (e, r) => {
        globalThis.$locale = r || 'vn'

        cb()
    }),
    (cb: CbError) => {
        createApp(App)
            .use(createPinia())
            .use(router)
            .use(ElementPlus)
            .use(i18n)
            .mount('#app')

        cb()
    }
])