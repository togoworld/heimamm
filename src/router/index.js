//导包
import Vue from 'vue'  //依赖

import vueRouter from 'vue-router'

import login from '@/views/login'
import layout from '@/views/layout'
import { getToken } from '@/utils/token'

import user from '@/views/layout/user'
import question from '@/views/layout/question'
import chart from '@/views/layout/chart'
import subject from '@/views/layout/subject'
import enterprise from '@/views/layout/enterprise'

Vue.use(vueRouter)

let router = new vueRouter({
    routes: [
        { path: '/login', component: login },
        {
            path: '/layout', component: layout, children: [
                { path: 'user', component: user },
                { path: 'question', component: question },
                { path: 'chart', component: chart },
                { path: 'subject', component: subject },
                { path: 'enterprise', component: enterprise },
                
        ]},
        { path: '/', redirect: '/login' },
        
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