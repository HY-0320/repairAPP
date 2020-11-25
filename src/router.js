import Vue from 'vue'
import Router from 'vue-router'
import login from './components/User/login.vue'
import register from './components/User/register.vue'
import personal from './components/User/personal.vue'
import list from './components/User/list.vue'
import NotFound from "./components/Other/404.vue"

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'personal',
      component: personal
    },
    {
      path: '/personal/login',
      name: 'login',
      component: login
    },
    {
      path: '/personal/login/register',
      name: 'register',
      component: register
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: "/notFound",
      component: NotFound
    }
  ]
})