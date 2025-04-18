<template>
  <section class="bg-white py-16 px-4 md:px-8 lg:px-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      
      <!-- Left Text Section -->
      <div class="md:w-1/2">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">About Our Medical Lab</h2>
        <p class="text-gray-600 text-lg leading-relaxed mb-6">
          We are dedicated to providing top-notch diagnostic and laboratory services using the latest technology and a team of expert professionals. Our mission is to ensure timely and accurate results to support your health and well-being.
        </p>
        <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>

      <!-- Right Image Section -->
      <div class="md:w-1/2">
        <img
          src='/images/lab_images/4.jpg'
          alt="Medical Lab"
          class="rounded-xl shadow-lg w-full"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static section
</script>

<style scoped>
/* Optional: Scoped custom styles */
</style>
