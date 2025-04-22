import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookAppointment from '../views/BookAppointment.vue'
import Locations from '../views/Locations.vue'
import PatientReports from '../views/PatientReports.vue'
import TestCatalog from '../views/TestCatalog.vue'
import Faq from '../views/Faq.vue'
import AboutView from '../views/AboutView.vue'
import PatientLogin from '@/views/PatientLogin.vue'
import PatientRegister from '@/views/PatientRegister.vue'

import AdminLayout from '@/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/book-appointment',
      name: 'book-appointment',
      component: () => import('../views/BookAppointment.vue'),
    },
    {
      path: '/locations',
      name: 'locations',
      component: () => import('../views/Locations.vue'),
    },
    {
      path: '/patient-reports',
      name: 'patient-reports',
      component: () => import('../views/PatientReports.vue'),
    },
    {
      path: '/test-catalog',
      name: 'test-catalog',
      component: () => import('../views/TestCatalog.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/Faq.vue'),
    },
    
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    { path: '/login', component: PatientLogin },
    { path: '/register', component: PatientRegister },
    // {
    //   path: '/admin-booking-panel',
    //   name: 'admin-booking-panel',
    //   component: () => import('../Admin/AdminBookingPanel.vue'),
    // },
    
    // ✅ Admin route using AdminLayout
    {
      path: '/admin-booking-panel',
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-booking-panel',
          component: () => import('../Admin/AdminBookingPanel.vue'),
        },
        {
          path: '/users',
          name: 'admin-users',
          component: () => import('../Admin/AdminUsers.vue'),
        },
        {
          path: '/settings',
          name: 'admin-settings',
          component: () => import('../Admin/AdminSettings.vue'),
        },
        {
          path: '/dashboard',
          name: 'admin-dashboard',
          component: () => import('../Admin/AdminDashboard.vue'),
        },
      ],
    },

  ],
})

export default router
