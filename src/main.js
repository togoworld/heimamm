import Vue from 'vue'  //依赖
import App from './App.vue' //根组件
// import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
// 
