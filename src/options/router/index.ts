import { createRouter, createWebHashHistory } from 'vue-router'

import Test from '../views/Test.vue'

export const routes = [
    { path: '/', redirect: '/test' },
    { path: '/test', component: Test },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})