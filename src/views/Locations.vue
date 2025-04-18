<template>
  <div class="px-4 py-5 max-w-7xl mx-auto">
    <!-- Heading -->
    <div class="text-center mb-10">
      <h2 class="text-4xl font-extrabold text-gray-800">Find a Location</h2>
      <p class="text-gray-500 mt-2 text-lg">
        Visit one of our conveniently located laboratories for your testing needs.
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-2 md:space-x-4 overflow-x-auto pb-4 border-b mb-10">
      <button
        v-for="(location, index) in locations"
        :key="index"
        @click="activeTab = index"
        :class="[
          'px-5 py-2 rounded-full text-sm transition-all duration-300',
          activeTab === index
            ? 'bg-[#2f3193] text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700',
        ]"
      >
        {{ location.name }}
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Location Card -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl">
        <img :src="activeLocation.image" alt="Location Image" class="w-full h-80 object-cover" />
        <div class="p-6 space-y-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-800">{{ activeLocation.name }}</h3>
            <p class="text-gray-500">{{ activeLocation.address }}</p>
          </div>

          <div>
            <p class="text-sm font-medium text-blue-600">🕒 Hours of Operation</p>
            <ul class="text-sm text-gray-600 list-disc list-inside">
              <li v-for="(line, index) in activeLocation.hours" :key="index">{{ line }}</li>
            </ul>
          </div>

          <div class="text-sm text-gray-700 space-y-1">
            <p><strong>📞 Contact:</strong> {{ activeLocation.phone }}</p>
            <p><strong>✉️ Email:</strong> {{ activeLocation.email }}</p>
            <p><strong>🧪 Services:</strong> {{ activeLocation.services }}</p>
          </div>

          <div class="flex space-x-3 pt-2">
            <a href="/book-appointment" class="px-4 py-2 bg-[#2f3193] text-white rounded-md hover:bg-blue-700 transition">
              Book Here
            </a>
            <a
  href="https://maps.app.goo.gl/ZSWAGnKP4QbZ3nvo9"
  target="_blank"
  rel="noopener noreferrer"
  class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
>
  Get Directions
</a>
          </div>
        </div>
      </div>

      <!-- Map Panel -->
      <div class="bg-white rounded-2xl shadow-lg p-6 pt-0 flex flex-col justify-between h-full">
        <div class="rounded-lg overflow-hidden shadow-sm">
          <iframe
            class="w-full h-80 rounded-md"
            frameborder="0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425.4783642135225!2d74.29578855846715!3d31.44643169199146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901a495a23f39%3A0xe48ae1cf85547073!2sLAHORE%20MEDICAL%20LAB%20%26%20DIAGNOSTIC%20CENTER!5e0!3m2!1sen!2s!4v1744955935148!5m2!1sen!2s"
          ></iframe>
        </div>

        <div class="mt-0 space-y-2 text-sm text-gray-700">
          <p><strong>🚗 Parking:</strong> Free parking available in the building garage</p>
          <p><strong>♿ Accessibility:</strong> Accessible entrance and facilities</p>
          <p><strong>💳 Payment Options:</strong> All major insurance, Credit/Debit cards, HSA/FSA</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'

const locations = [
  {
    name: 'Lahore',
    address: 'Lajna Chowk, 21-1, C 1 College Road, Block 1 Sector C-1 Ahmed Avenue, Lahore, 54770, Pakistan',
    hours: ['Monday - Friday: 7:00 AM - 7:00 PM', 'Saturday: 8:00 AM - 2:00 PM', 'Sunday: Closed'],
    phone: '+923004804907',
    email: 'downtown@lahorelab.com',
    services: 'Full laboratory services, Imaging, Specimen collection',
    image: '/images/lab_images/1.png',
  },
  {
    name: 'Sargoda',
    address: '456 Liberty Road, Lahore',
    hours: ['Monday - Friday: 8:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 3:00 PM', 'Sunday: Closed'],
    phone: '+92-42-7654321',
    email: 'gulberg@lahorelab.com',
    services: 'Blood tests, Imaging, Pharmacy',
    image: '/images/lab_images/2.png',
  },
  // Add more locations here
]

const activeTab = ref(0)
const activeLocation = computed(() => locations[activeTab.value])
</script>
