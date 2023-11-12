import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/TableView.vue')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../views/SelectView.vue')
  },
  {
    path: '/vue-select',
    name: 'vue-select',
    component: () => import('../views/VUESELECTView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
