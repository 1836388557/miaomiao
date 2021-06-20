import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui'
import Scroller from '@/components/Scroller'
import Loading from './plugins/loading/index'

Vue.use(Mint)

Vue.use(Loading, {
  title: '正在加载...'
})

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.component('Scroller', Scroller)

Vue.filter('handleImg', (data) => {
  data = data.replace('/w.h', '') + '@1l_1e_1c_128w_180h'
  return data
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
