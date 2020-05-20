//导包
import Vue from 'vue'  //依赖

import vueRouter from 'vue-router'

import login from '@/views/login'
import layout from '@/views/layout'
import { getToken} from '@/iluts/token'

Vue.use(vueRouter)

let router = new vueRouter({
    routes: [
        { path: '/login', component: login },
        { path: '/layout', component: layout },
        {path:'/',redirect:'/login'}
    ]
})

router.beforeEach((to, from, next) => {
    if (to.fullPath == '/login') {
        next()
    } else {
        const token = getToken()
        if (token) {
            next()
        } else {
            next('/login')
        
        }
    }
})

export default router