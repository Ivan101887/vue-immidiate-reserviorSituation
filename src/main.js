import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "@/assets/scss/main.scss"
import App from './App.vue'
Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
