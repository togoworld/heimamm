//导包
import Vue from 'vue'  //依赖

import vueRouter from 'vue-router'

import login from '@/views/login'
import layout from '@/views/layout'

Vue.use(vueRouter)

let router = new vueRouter({
    routes: [
        { path: '/login', component: login },
        { path: '/layout', component: layout },
        {path:'/',redirect:'/login'}
    ]
})
export default router