import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueTypedJs from 'vue-typed-js'
Vue.use(VueTypedJs)
import store from './store'
Vue.prototype.$axios=axios
Vue.use(ElementUI);
Vue.config.productionTip = false
// 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('passkey')) {
//       config.headers.passkey = localStorage.getItem('passkey');
//     }
 
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
new Vue({
  store,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
