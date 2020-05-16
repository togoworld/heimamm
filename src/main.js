import Vue from 'vue'  //依赖
import App from './App.vue' //根组件
// import axios from 'axios'

import router from '@/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
// 
