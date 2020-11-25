import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import * as api from './libs/api'
import * as cookieTool from './libs/cookieTool'
import VCharts from 'v-charts'
import router from './router.js'
import * as date from "./libs/date"




Vue.use(VCharts);
Vue.use(Vant);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.$date = date
Vue.prototype.$api = api
Vue.prototype.$axios = axios
Vue.prototype.$cookie = cookieTool

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')




