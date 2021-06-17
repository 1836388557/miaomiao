import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.filter('handleImg', (data) => {
  data = data.replace('/w.h', '') + '@1l_1e_1c_128w_180h'
  return data
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
