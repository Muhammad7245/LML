import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookAppointment from '../views/BookAppointment.vue'
import Locations from '../views/Locations.vue'
import PatientReports from '../views/PatientReports.vue'
import TestCatalog from '../views/TestCatalog.vue'
import Faq from '../views/Faq.vue'
import AboutView from '../views/AboutView.vue'

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

  ],
})

export default router
