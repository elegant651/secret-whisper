import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/admin-employees',
      name: 'adminEmployees',
      component: () => import('./views/AdminEmployees.vue')
    },
    {
      path: '/admin-reviews',
      name: 'adminReviews',
      component: () => import('./views/AdminReviews.vue')
    },
    {
      path: '/employee-view',
      name: 'employeeView',
      component: () => import('./views/EmployeeView.vue')
    },
    {
      path: '/secret-board',
      name: 'secretBoard',
      component: () => import('./views/SecretBoard.vue')
    },
    {
      path: '/manage-chat',
      name: 'manage-chat',
      component: () => import('./components/ManageChat.vue')
    }
  ]
})
