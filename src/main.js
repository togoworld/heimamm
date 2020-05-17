import Vue from 'vue'  //依赖
import App from './App.vue' //根组件
import '@/iluts/request.js'
import '@/plugins/element.js'
import router from '@/router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
// 
