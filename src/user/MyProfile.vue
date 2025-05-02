<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4 md:px-8">
    <!-- Not Logged In Message -->
    <div v-if="!isLoggedIn" class="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <div class="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Authentication Required</h2>
        <p class="text-gray-600 text-center mb-8">Please log in to view your profile information and settings.</p>
        <div class="flex justify-center space-x-4">
          <RouterLink 
           to="/login"
          class="bg-[#2f3192] hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-150">
            Log In
          </RouterLink>
          <RouterLink 
          to="/register"
          class="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-6 rounded-lg transition duration-150">
            Sign Up
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Profile Content (When Logged In) -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-md mb-8 overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/3 bg-gradient-to-br from-red-600 to-indigo-500 p-8 text-white">
            <div class="flex justify-center">
              <div class="h-32 w-32 rounded-full bg-white/30 flex items-center justify-center border-4 border-white overflow-hidden">
                <img v-if="user.avatar" :src="user.avatar" alt="Profile Photo" class="h-full w-full object-cover" />
                <span v-else class="text-5xl font-bold text-white">{{ getInitials(auth.user?.name || '') }}</span>
              </div>
            </div>
            <h1 class="text-2xl font-bold mt-6 text-center">{{  auth.user?.name }}</h1>
            <p class="text-indigo-100 text-center mb-6">@{{ auth.user?.email }}</p>
            <div class="flex justify-center space-x-4">
              <button class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
          <div class="md:w-2/3 p-8">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800">Profile Overview</h2>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                :class="user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ user.status }}
              </span>
            </div>
            <div class="grid md:grid-cols-2 gap-y-4">
              <div>
                <p class="text-sm text-gray-500">Email</p>
                <p class="font-medium text-gray-800">{{ auth.user?.email }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Phone</p>
                <p class="font-medium text-gray-800">{{ user.phone }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Member Since</p>
                <p class="font-medium text-gray-800">{{ formatDate(user.joinDate) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Last Login</p>
                <p class="font-medium text-gray-800">{{ user.lastLogin }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Details Section -->
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <!-- Personal Info -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200">
          <div class="flex items-center mb-4">
            <div class="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Personal Information</h2>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Full Name</p>
              <p class="font-medium text-gray-800">{{  auth.user?.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Username</p>
              <p class="font-medium text-gray-800">{{ auth.user?.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Date of Birth</p>
              <p class="font-medium text-gray-800">{{ formatDate(user.dob) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Gender</p>
              <p class="font-medium text-gray-800">{{ user.gender }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200">
          <div class="flex items-center mb-4">
            <div class="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Contact Details</h2>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium text-gray-800">{{ auth.user?.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p class="font-medium text-gray-800">{{ user.phone }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Address</p>
              <p class="font-medium text-gray-800">{{ user.address }}</p>
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200">
          <div class="flex items-center mb-4">
            <div class="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Preferences</h2>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Language</p>
              <p class="font-medium text-gray-800">{{ user.language }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Time Zone</p>
              <p class="font-medium text-gray-800">{{ user.timeZone }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Theme</p>
              <div class="flex items-center">
                <span class="font-medium text-gray-800 mr-2">{{ user.theme }}</span>
                <span class="h-4 w-4 rounded-full bg-gray-800" v-if="user.theme === 'Dark Mode'"></span>
                <span class="h-4 w-4 rounded-full bg-blue-50 border border-gray-300" v-else></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200">
          <div class="flex items-center mb-4">
            <div class="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Security Settings</h2>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Role</p>
              <div class="flex items-center">
                <span class="font-medium text-gray-800">{{ auth.user?.role }}</span>
                <span v-if="auth.user?.role === 'Admin'" class="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">Admin</span>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-500">Two-Factor Authentication</p>
              <div class="flex items-center">
                <span class="font-medium" :class="user.twoFactorEnabled ? 'text-green-600' : 'text-red-600'">
                  {{ user.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
                </span>
                <button v-if="!user.twoFactorEnabled" class="ml-3 text-xs text-indigo-600 hover:text-indigo-800">
                  Enable
                </button>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-500">Password</p>
              <div class="flex items-center">
                <span class="font-medium text-gray-800">•••••••••••</span>
                <button class="ml-3 text-xs text-indigo-600 hover:text-indigo-800">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200">
          <div class="flex items-center mb-4">
            <div class="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Activity</h2>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Member Since</p>
              <p class="font-medium text-gray-800">{{ formatDate(user.joinDate) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Last Login</p>
              <p class="font-medium text-gray-800">{{ user.lastLogin }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <p class="font-medium" :class="user.status === 'Active' ? 'text-green-600' : 'text-red-600'">
                {{ user.status }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div class="flex flex-wrap gap-3">
          <button class="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
          <button class="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Security Settings
          </button>
          <button class="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Preferences
          </button>
          <button @click="handleLogout" class="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref, computed } from 'vue'

const auth = useAuthStore()
const isLoggedIn = computed(() => !!auth.user)

// Logout handler
const handleLogout = () => {
  auth.logout() // Assuming `logout` is a method in your auth store
}

// Mock user data (would normally come from API)
const user = {
  fullName: 'Dr. Jane Smith',
  username: 'janesmith23',
  dob: '1985-07-21',
  gender: 'Female',
  phone: '+1 234-567-8901',
  address: '123 Maple Street, Springfield, USA',
  language: 'English',
  timeZone: 'GMT-5',
  theme: 'Dark Mode',
  twoFactorEnabled: true,
  lastLogin: '2025-04-23 14:33',
  joinDate: '2023-01-15',
  status: 'Active',
  avatar: '' // Can be populated with avatar URL if available
}

// Format date from YYYY-MM-DD to more readable format
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  
  // Check if it contains time as well
  if (dateString.includes(' ')) {
    return dateString // Return as is if it already includes time
  }
  
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  } catch (e) {
    return dateString
  }
}

// Get initials for avatar placeholder
const getInitials = (name: string) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}
</script>

<style scoped>
/* Optional: Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* Smooth transitions */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>