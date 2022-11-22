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
      component: () => import('../views/AdministrationView.vue'),
      children:[
        // {
        //   path: "/CrearPQR",
        //   name: "CrearPQR",
        //   component: () =>
        //     // import("../module_administration/components/Create_Employees.vue"),
        // },
        {
          path: "/createCategory",
          name: "createCategory",
          component: () =>
            import("../views/CategoryView.vue"),
        },
        {
          path: "/createResponsePQR",
          name: "createResponsePQR",
          component: () =>
            import("../views/ResponsePQRView.vue"),
        },
        {
          path: "/createTraceabily",
          name: "createTraceabily",
          component: () =>
            import("../views/TraceabilyView.vue"),
        }

      ]
    }
  ]
})

export default router
