<template>
  <div
    v-if="auth.user"
    class="welcome-message bg-blue-100 p-4 rounded shadow-md text-2xl font-extrabold text-gray-800 mb-6"
  >
    <i class="fas fa-user-circle mr-2"></i>
    Welcome to the Patient Portal,<span
      class="text-2xl text-gray-800 font-extrabold px-3 py-1 rounded-full shadow-sm glow"
    >
      {{
        auth.user.name
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      }}!
    </span>
  </div>
  <div v-else>
    <RouterLink to="/login"><div>
      <h1 class="error-heading text-center text-4xl font-extrabold text-red-800 mb-2">Please Login to view and manage patient reports </h1></div></RouterLink>
  </div>
  <div class="patient-reports-container">
    <h1>Patient Reports</h1>
    <p>Here you can view and manage patient reports.</p>
    <!-- Add your content here -->
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<style>
@keyframes glow {
  0% {
    box-shadow: 0 0 0px rgba(59, 130, 246, 0);
  }
  50% {
    box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
  }
  100% {
    box-shadow: 0 0 0px rgba(59, 130, 246, 0);
  }
}
.glow {
  animation: glow 5s ease-in-out 1;
}
</style>
