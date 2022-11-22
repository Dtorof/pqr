import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdministrationView from '../views/AdministrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/administration',
      name: 'administration',
      component: () => import('../views/AdministrationView.vue')
    }
  ]
})

export default router
