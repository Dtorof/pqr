import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdministrationView from '../views/AdministrationView.vue'
import UserView from '../views/UserView.vue'
import CustomersView from '../views/CustomersView.vue'
import CategoryView from '../views/CategoryView.vue'
import ResponsePQRView from '../views/ResponsePQRView.vue'
// import TraceabilyView from '../views/TraceabilyView.vue'
import TypePQRView from '../views/TypePQRView.vue'
import PqrView from '../views/PqrView.vue'


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
    },
    {
      path: "/crearPQR",
      name: "CrearPQR",
      component: PqrView
      // import("../"),
    },
    {
      path: "/user",
      name: "user",
      component: UserView 
      // component: () => import("../components/users/User.vue")
    },
    {
      path: "/customer",
      name: "customer",
      component: CustomersView
      // component: () => import("../components/customers/Customer.vue")
    },
    {
      path: "/typePQR",
      name: "typePQR",
      component: TypePQRView
      // component: () => import("../components/category_pqr/Category.vue")
    },
    {
      path: "/category",
      name: "category",
      component: CategoryView
      // component: () => import("../components/category_pqr/Category.vue")
    },
    {
      path: "/responsePQR",
      name: "responsePQR",
      component: ResponsePQRView
      // component: () => import("../components/response_pqr/Response.vue")
    },
    {
      path: "/traceabily",
      name: "traceabily",
      // component: TraceabilyView
      component: () => import("../views/TraceabilyView.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../NotFoundView.vue"),
   },
  ]
  
})

export default router
