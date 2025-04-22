<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-md grid md:grid-cols-2 overflow-hidden">
      <!-- Left: Login Form -->
      <div class="p-8">
        <h2 class="text-2xl font-bold mb-6">Patient Portal Login</h2>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Username or Email</label>
          <input
            v-model="email"
            type="text"
            placeholder="Enter your username or email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex items-center justify-between mb-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="rememberMe" class="form-checkbox mr-2 text-blue-600" />
            <span class="text-sm">Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <button
          @click="signIn"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Sign In
        </button>

        <p class="text-center text-sm mt-4">
          Don’t have an account?
          <router-link to="/register" class="text-blue-600 hover:underline"
            >Register now</router-link
          >
        </p>
      </div>

      <!-- Right: Features -->
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

// Router instance for navigation
const router = useRouter()

// Form fields
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

// Sign in logic
const signIn = async () => {
  try {
    // Perform login API call
    const response = await axios.post('http://localhost:5000/api/login', {
      email: email.value,
      password: password.value,
    })

    // Handle successful login (e.g., save token, redirect)
    console.log('Login successful:', response.data)
    router.push('/')
  } catch (error) {
    // Handle login error
    console.error('Login failed:', error)
    alert('Invalid email or password. Please try again.')
  }
}

</script>
