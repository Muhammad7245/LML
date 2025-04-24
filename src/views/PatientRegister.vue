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
          @click="handleRegister"
          class="w-full bg-[#2f3193] hover:bg-blue-700 text-white py-2 px-4 rounded"
          :disabled="auth.loading"
        >
          {{ auth.loading ? 'Registering...' : 'Register' }}
        </button>

        <p v-if="auth.error" class="text-red-500 text-center mt-2 text-sm">
          {{ auth.error }}
        </p>

        <p class="text-center text-sm mt-4">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Sign In</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const router = useRouter()
const auth = useAuthStore()

const handleRegister = async () => {
  const success = await auth.register(name.value, email.value, password.value)
  if (success) {
    router.push('/login')
  }
}
</script>
