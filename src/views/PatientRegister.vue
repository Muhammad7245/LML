<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-md grid md:grid-cols-2 overflow-hidden">
      <!-- Left: Register Form -->
      <div class="p-8">
        <h2 class="text-2xl font-bold mb-6">Create Your Account</h2>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Enter your full name"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Replace your existing password input with this block -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Create a password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            >
              <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
            </span>
          </div>
        </div>

        <button
          @click="register"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Register
        </button>

        <p class="text-center text-sm mt-4">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Sign In</router-link>
        </p>
      </div>

      <!-- Right: Same Portal Features -->
      <div class="bg-blue-600 text-white p-8 space-y-4">
        <h3 class="text-lg font-semibold mb-4">Portal Features</h3>
        <ul class="space-y-2">
          <li class="flex items-center">
            <span class="mr-2">📄</span> View and download your laboratory test results
          </li>
          <li class="flex items-center">
            <span class="mr-2">🕒</span> Access your complete testing history
          </li>
          <li class="flex items-center">
            <span class="mr-2">📊</span> Track health trends with visual reports
          </li>
          <li class="flex items-center">
            <span class="mr-2">📅</span> Manage your upcoming appointments
          </li>
          <li class="flex items-center">
            <span class="mr-2">🔗</span> Share results securely with your healthcare providers
          </li>
          <li class="flex items-center">
            <span class="mr-2">🔔</span> Set up notifications for new test results
          </li>
        </ul>
        <a href="#" class="block mt-6 text-white underline">▶️ Watch Portal Tutorial</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Form fields
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

// Router instance for navigation
const router = useRouter()

// Register function
const register = async () => {
  console.log('Registering with:', {
    name: name.value,
    email: email.value,
    password: password.value,
  })

  // Perform registration API call
  await axios.post('http://localhost:5000/api/register', {
    name: name.value,
    email: email.value,
    password: password.value,
  })

  // Redirect to login after registration
  router.push('/login')
}
</script>
