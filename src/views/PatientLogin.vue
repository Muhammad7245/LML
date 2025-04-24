<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-md grid md:grid-cols-2 overflow-hidden">
      <!-- Left: Login Form -->
      <div class="p-8">
        <h2 class="text-2xl font-extrabold text-gray-800 mb-6">Patient Portal Login</h2>

        <div class="mb-4">
          <label class="block text-gray-600 font-medium mb-1">Email<span style="color: red;">*</span></label>
          <input
            v-model="email"
            type="text"
            placeholder="Enter your username or email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 font-medium mb-1">Password<span style="color: red;">*</span></label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- <div class="flex items-center justify-between mb-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="rememberMe" class="form-checkbox mr-2 text-blue-600" />
            <span class="text-sm">Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div> -->

        <button
          @click="handleLogin"
          class="w-full bg-[#2f3193] hover:bg-blue-700 text-white py-2 px-4 rounded"
          :disabled="auth.loading"
        >
          {{ auth.loading ? 'Signing in...' : 'Sign In' }}
        </button>

        <p v-if="auth.error" class="text-red-500 text-sm mt-2">{{ auth.error }}</p>

        <p class="text-center text-sm mt-2">
          Don’t have an account?
          <router-link to="/register" class="text-blue-600 hover:underline"
            >Register now</router-link
          >
        </p>
      </div>

      <!-- Right: Portal Features -->
      <div class="bg-[#2f3193] text-white p-8 rounded-r-xl shadow-lg space-y-6 max-w-md mx-auto">
  <h3 class="text-2xl font-bold border-b border-white/30 pb-2">Portal Features</h3>
  <ul class="space-y-4">
    <li class="flex items-start gap-3">
      <svg class="w-5 h-5 text-white mt-1" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7" />
      </svg>
      <span>View and download your laboratory test results</span>
    </li>
    <li class="flex items-start gap-3">
      <svg class="w-5 h-5 text-white mt-1" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7" />
      </svg>
      <span>Access your complete testing history</span>
    </li>
    <li class="flex items-start gap-3">
      <svg class="w-5 h-5 text-white mt-1" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7" />
      </svg>
      <span>Track health trends with visual reports</span>
    </li>
    <li class="flex items-start gap-3">
      <svg class="w-5 h-5 text-white mt-1" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7" />
      </svg>
      <span>Manage your upcoming appointments</span>
    </li>
    <li class="flex items-start gap-3">
      <svg class="w-5 h-5 text-white mt-1" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7" />
      </svg>
      <span>Share results securely with your healthcare providers</span>
    </li>
    <li class="flex items-start gap-3">
      <svg class="w-5 h-5 text-white mt-1" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7" />
      </svg>
      <span>Set up notifications for new test results</span>
    </li>
  </ul>
</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value )
  if (success) {
    router.push('/patient-reports')
  }
}
</script>
