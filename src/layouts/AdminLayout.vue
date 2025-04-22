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
          <RouterLink
            to="/admin-booking-panel"
            class="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
            :class="{ 'bg-blue-100 font-semibold': $route.name === 'admin-booking-panel' }"
          >
            <CalendarDaysIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Bookings</span>
          </RouterLink>
  
          <RouterLink to="/dashboard" class="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
            <ChartBarIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Dashboard</span>
          </RouterLink>
  
          <RouterLink to="/users" class="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
            <UsersIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Users</span>
          </RouterLink>
  
          <RouterLink to="/settings" class="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
            <Cog6ToothIcon class="h-5 w-5 text-gray-600" />
            <span v-if="!sidebarCollapsed">Settings</span>
          </RouterLink>
        </nav>
      </aside>
  
      <!-- Main content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Topbar -->
        <header class="flex items-center justify-between bg-white p-4 shadow">
          <div class="text-xl font-semibold">Admin Dashboard</div>
          <div class="flex items-center gap-4">
            <button class="text-gray-600 hover:text-blue-600">
              <BellIcon class="h-5 w-5" />
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
  