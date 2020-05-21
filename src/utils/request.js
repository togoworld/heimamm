import Vue from 'vue'
import axios from 'axios'
import { getToken, removeToken } from '@/utils/token'
import router from '@/router'

//设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
//允许携带cookies
axios.defaults.withCredentials = true

//请求拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getToken();
    if (token) {
        config.headers.token=token
    }
    return 
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
  
//相应拦截器
axios.interceptors.response.use(function (response) {
  // Do something before request is sent
 
  if (response.data.code==206) {
    removeToken();
  router.push('/login')
  }
  return 
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
//放入VUE实例中
Vue.prototype.$axios=axios