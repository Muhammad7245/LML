<template>
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <aside
        class="bg-white shadow-md transition-all duration-300 ease-in-out"
        :class="sidebarCollapsed ? 'w-16' : 'w-64'"
      >
        <div class="flex items-center justify-between p-4 border-b">
          <span class="text-lg font-bold whitespace-nowrap" v-if="!sidebarCollapsed">
            Admin Panel
          </span>
          <button @click="toggleSidebar" class="p-1 text-gray-600 hover:text-blue-600">
            <ChevronRightIcon v-if="sidebarCollapsed" class="h-5 w-5" />
            <ChevronLeftIcon v-else class="h-5 w-5" />
          </button>
        </div>
  
        <nav class="p-4 space-y-2">
          <RouterLink to="/dashboard" class="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
          :class="{ 'bg-blue-100 font-semibold': $route.name === 'admin-dashboard' }">
            <ChartBarIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Dashboard</span>
          </RouterLink>

          <RouterLink
            to="/admin-booking-panel"
            class="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
            :class="{ 'bg-blue-100 font-semibold': $route.name === 'admin-booking-panel' }"
          >
            <CalendarDaysIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Bookings</span>
          </RouterLink>
  
        
  
          <RouterLink to="/users" class="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
          :class="{ 'bg-blue-100 font-semibold': $route.name === 'admin-users' }">
            <UsersIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Users</span>
          </RouterLink>
  
          <RouterLink to="/settings" class="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
          :class="{ 'bg-blue-100 font-semibold': $route.name === 'admin-settings' }">
            <Cog6ToothIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Settings</span>
          </RouterLink>
        </nav>
      </aside>
  
      <!-- Main content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Topbar -->
        <header class="flex items-center justify-between bg-white p-4 shadow">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#2f3194]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="ml-2 text-xl font-bold text-gray-800">Admin Portal</span>
          </div>
          <div class="flex items-center gap-4">
            <button class="relative p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button class="text-gray-600 hover:text-blue-600">
              <UserCircleIcon class="h-5 w-5" />
            </button>
            <button
              class="text-sm px-4 py-1 bg-[#2F3193] text-white rounded hover:bg-blue-600"
              @click="main"
            >
              MAIN
            </button>
          </div>
        </header>
  
        <!-- Router View -->
        <main class="p-6 overflow-y-auto bg-gray-100 flex-1">
          <RouterView />
        </main>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Heroicons imports
import { CalendarDaysIcon, ChartBarIcon, UsersIcon, Cog6ToothIcon, BellIcon, UserCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const sidebarCollapsed = ref(true)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}
const main = () => {
  router.push('/')
}

  </script>
  