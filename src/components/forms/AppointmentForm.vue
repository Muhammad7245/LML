<template>
  <div
    class="max-w-3xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-2xl transition-opacity duration-700 animate-fade-in relative"
  >
    <h3 class="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">Book an Appointment</h3>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Service Type -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
        <i class="fas fa-stethoscope absolute left-3 top-9 text-gray-400"></i>
        <select
          v-model="form.serviceType"
          :disabled="formDisabled"
          :class="getFieldClass('serviceType')"
        >
          <option disabled value="">Select a service type</option>
          <option>Blood Test</option>
          <option>Diagnostic Imaging</option>
          <option>Pathology Services</option>
          <option>Genetic Testing</option>
          <option>COVID-19 Testing</option>
          <option>Consultation</option>
        </select>
      </div>

      <!-- Test -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">Test</label>
        <i class="fas fa-vials absolute left-3 top-9 text-gray-400"></i>
        <select v-model="form.test" :disabled="formDisabled" :class="getFieldClass('test')">
          <option disabled value="">Select a test</option>
          <option v-for="test in testOptions" :key="test" :value="test">{{ test }}</option>
        </select>
      </div>

      <!-- Location -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
        <i class="fas fa-map-marker-alt absolute left-3 top-9 text-gray-400"></i>
        <select v-model="form.location" :disabled="formDisabled" :class="getFieldClass('location')">
          <option disabled value="">Select a location</option>
          <option>Lahore</option>
          <option>Gugrat</option>
          <option>Sargoda</option>
        </select>
      </div>

      <!-- Date & Time -->
      <div class="grid md:grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
          <i class="fas fa-calendar-day absolute left-3 top-9 text-gray-400"></i>
          <input
            type="date"
            v-model="form.date"
            :disabled="formDisabled"
            :class="getFieldClass('date')"
          />
        </div>

        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
          <i class="fas fa-clock absolute left-3 top-9 text-gray-400"></i>
          <select v-model="form.time" :disabled="formDisabled" :class="getFieldClass('time')">
            <option disabled value="">Select a time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
      </div>

      <!-- Name & Phone -->
      <div class="grid md:grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <i class="fas fa-user absolute left-3 top-9 text-gray-400"></i>
          <input
            type="text"
            v-model="form.name"
            :disabled="formDisabled"
            :class="getFieldClass('name')"
          />
        </div>

        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <i class="fas fa-phone absolute left-3 top-9 text-gray-400"></i>
          <input
            type="tel"
            v-model="form.phone"
            :disabled="formDisabled"
            :class="getFieldClass('phone')"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <i class="fas fa-envelope absolute left-3 top-9 text-gray-400"></i>
        <input
          type="email"
          v-model="form.email"
          :disabled="formDisabled"
          :class="getFieldClass('email')"
        />
      </div>

      <!-- Instructions -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Special Instructions <span class="text-gray-400">(Optional)</span></label
        >
        <textarea
          v-model="form.instructions"
          :disabled="formDisabled"
          rows="3"
          class="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="formDisabled"
          class="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-md shadow-lg transition transform hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <template v-if="isLoading">
            <svg
              class="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Submitting...
          </template>
          <template v-else> Book Appointment </template>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

const form = ref({
  serviceType: '',
  test: '',
  location: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
  instructions: '',
})

const testOptions = ref<string[]>([])

watch(
  () => form.value.serviceType,
  (newService) => {
    switch (newService) {
      case 'Blood Test':
        testOptions.value = [
          'Complete Blood Count(CBC)',
          'Comprehensive Metabolic Panel',
          'Liver Function Test(LFT)',
          'Thyroid Function Test(TFT)',
          'HbA1c',
          'Lipid Panel',
        ]
        break
      case 'Diagnostic Imaging':
        testOptions.value = ['X-Ray', 'Ultrasound']
        break
      case 'Pathology Services':
        testOptions.value = ['Biopsy Analysis']
        break
      case 'COVID-19 Testing':
        testOptions.value = ['COVID-19 PCR Test']
        break
      case 'Genetic Testing':
        testOptions.value = ['BRCA1/BRCA2 Gene Test', 'Carrier Screening']
        break
      case 'Consultation':
        testOptions.value = ['Health Checkup Basic']
        break
      default:
        testOptions.value = []
    }

    // Reset test if it's no longer valid
    if (!testOptions.value.includes(form.value.test)) {
      form.value.test = ''
    }
  },
)

const props = defineProps(['form'])
const emit = defineEmits(['submit', 'success'])

const isConfirmed = ref(false)
const formDisabled = ref(false)
const isLoading = ref(false)
const attemptedSubmit = ref(false)

const apiURL = 'http://localhost:5000/api/book'

const showDialog = ref(false)
const dialogMessage = ref('')

const handleSubmit = async () => {
  formDisabled.value = true
  isLoading.value = true
  attemptedSubmit.value = true

  const requiredFields = [
    'serviceType',
    'test',
    'location',
    'date',
    'time',
    'name',
    'phone',
    'email',
  ]
  const isValid = requiredFields.every((field) => form.value[field as keyof typeof form.value])

  if (isValid) {
    axios
      .post(apiURL, form.value)
      .then((response) => {
        setTimeout(() => {
          dialogMessage.value = 'Your appointment has been successfully booked!'
          showDialog.value = true
          attemptedSubmit.value = false
          formDisabled.value = false
          isLoading.value = false

          Object.keys(form.value).forEach((key) => {
            form.value[key as keyof typeof form.value] = ''
          })

          emit('submit')
          emit('success')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 2000)
        console.log('Response:', response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
        dialogMessage.value = 'An error occurred while booking your appointment. Please try again.'
        showDialog.value = true
      })
  } else {
    formDisabled.value = false
    isLoading.value = false
  }
}

function getFieldClass(field: string) {
  const baseClass = 'w-full pl-10 border rounded-md px-4 py-2 transition focus:outline-none'
  const ringClass = 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'

  const isInvalid = attemptedSubmit.value && !form.value[field as keyof typeof form.value]
  const errorClass = isInvalid
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300'

  return `${baseClass} ${ringClass} ${errorClass}`
}
</script>

<!-- Let me know if you'd like to simulate a real fetch()/axios request or connect this to a backend! -->
