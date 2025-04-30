<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">My Profile</h1>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <!-- Personal Info -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4 text-indigo-700">Personal Information</h2>
        <p><strong>Name:</strong> {{ auth.user?.name }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Date of Birth:</strong> {{ user.dob }}</p>
        <p><strong>Gender:</strong> {{ user.gender }}</p>
      </div>

      <!-- Contact Info -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4 text-indigo-700">Contact</h2>
        <p><strong>Email:</strong> {{ auth.user?.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Address:</strong> {{ user.address }}</p>
      </div>

      <!-- Preferences -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4 text-indigo-700">Preferences</h2>
        <p><strong>Language:</strong> {{ user.language }}</p>
        <p><strong>Time Zone:</strong> {{ user.timeZone }}</p>
        <p><strong>Theme:</strong> {{ user.theme }}</p>
      </div>

      <!-- Security -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4 text-indigo-700">Security</h2>
        <p><strong>Role:</strong> {{ auth.user?.role }}</p>
        <p>
          <strong>Two-Factor Auth:</strong> {{ user.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
        </p>
        <p><strong>Last Login:</strong> {{ user.lastLogin }}</p>
      </div>

      <!-- Membership / Status -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4 text-indigo-700">Membership</h2>
        <p><strong>Member Since:</strong> {{ user.joinDate }}</p>
        <p>
          <strong>Status:</strong>
          <span :class="user.status === 'Active' ? 'text-green-600' : 'text-red-600'">
            {{ user.status }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const user = {
  fullName: 'Dr. Jane Smith',
  username: 'janesmith23',
  dob: '1985-07-21',
  gender: 'Female',
  email: 'jane.smith@example.com',
  phone: '+1 234-567-8901',
  address: '123 Maple Street, Springfield, USA',
  language: 'English',
  timeZone: 'GMT-5',
  theme: 'Dark Mode',
  twoFactorEnabled: true,
  lastLogin: '2025-04-23 14:33',
  joinDate: '2023-01-15',
  status: 'Active',
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
</style>
