import Vue from 'vue'
import VueRouter from 'vue-router'
import Opening from '../views/Opening'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'opening',
    component: Opening,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home')
  },
]

const router = new VueRouter({
  routes
})

export default router
