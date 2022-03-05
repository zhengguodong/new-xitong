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
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  store,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
