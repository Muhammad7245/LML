<script setup lang="ts">
import ServicesSection from '@/views/ServicesSection.vue'
import TestCatalog from './TestCatalog.vue';
import FaqSection from './Faq.vue';
</script>

<template>
  <div class="main-container">
    <!-- Banner -->
    <div class="relative w-full h-[700px] overflow-hidden">
      <img
        src="/images/banners/home_banner_1.png"
        alt="Banner Image"
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 flex items-center bg-black/40">
        <div class="text-white max-w-xl ml-16">
          <h1 class="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Lahore Medical Lab & Diagnostics Center 
          </h1>
          <p class="text-lg lg:text-xl mb-6">
            Book your laboratory appointments online without phone calls or emails. Fast, reliable results from certified specialists.
          </p>
          <div class="flex gap-4">
            <button class="px-6 py-3 bg-[#2f3193] hover:bg-blue-700 rounded-lg text-white font-semibold transition">
              Book Appointment
            </button>
            <button class="px-6 py-3 bg-white text-black hover:bg-blue-100 rounded-lg font-semibold transition">
              Our Services
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <ServicesSection />
<div class="test-catalog-section">
  <TestCatalog/>
</div>
<div class="FaqSection">
  <FaqSection/>

</div>
    
  </div>
</template>


