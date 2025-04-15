<template>
  <div class="min-h-screen bg-[#f2f6ff] pt-[80px] px-4 pb-12">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-2">Book Your Appointment</h2>
      <p class="text-center text-gray-600 mb-8">Schedule your laboratory appointment online - no phone calls or emails required.</p>

      <div class="bg-white rounded-lg shadow-lg grid lg:grid-cols-2 overflow-hidden">
        <!-- Appointment Form -->
        <div class="p-8">
          <h3 class="text-lg font-bold mb-4">Appointment Details</h3>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium">Service Type</label>
              <select v-model="form.serviceType" class="w-full border rounded px-3 py-2">
                <option disabled value="">Select a service type</option>
                <option>Blood Test</option>
                <option>Covid Test</option>
                <option>Consultation</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium">Test</label>
              <select v-model="form.test" class="w-full border rounded px-3 py-2">
                <option disabled value="">Select a service first</option>
                <option v-if="form.serviceType === 'Blood Test'">Complete Blood Count</option>
                <option v-if="form.serviceType === 'Covid Test'">PCR</option>
                <option v-if="form.serviceType === 'Consultation'">General Health</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium">Preferred Location</label>
              <select v-model="form.location" class="w-full border rounded px-3 py-2">
                <option disabled value="">Select a location</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium">Preferred Date</label>
              <input v-model="form.date" type="date" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium">Preferred Time</label>
              <select v-model="form.time" class="w-full border rounded px-3 py-2">
                <option disabled value="">Select a time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium">Full Name</label>
                <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label class="block text-sm font-medium">Phone Number</label>
                <input v-model="form.phone" type="tel" class="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium">Email Address</label>
              <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium">Special Instructions (Optional)</label>
              <textarea v-model="form.instructions" rows="3" class="w-full border rounded px-3 py-2"></textarea>
            </div>

            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full font-semibold">
              Book Appointment
            </button>
          </form>
        </div>

        <!-- Information Panel -->
        <div class="bg-[#2f3193] text-white p-8 space-y-4">
          <h4 class="font-bold text-lg">What to Expect</h4>
          <ul class="space-y-2 text-sm">
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> Confirmation email with appointment details</li>
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> SMS reminder 24 hours before appointment</li>
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> Results available in patient portal within 24-72 hours</li>
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> Doctor consultation available for result interpretation</li>
          </ul>

          <div>
            <h5 class="font-semibold text-sm">Preparation Guidelines</h5>
            <p class="text-sm mt-1">For most blood tests, fasting for 8-12 hours is required. Drink plenty of water and bring your ID and insurance card.</p>
            <a href="#" class="text-blue-200 hover:underline inline-flex items-center mt-2">View Full Guidelines <i class="fas fa-chevron-right ml-1"></i></a>
          </div>

          <img src="/images/book_appointment/appointment-doctor.png" alt="Doctor Consultation" class="rounded mt-4 w-full h-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'BookAppointment',
  setup() {
    const form = reactive({
      serviceType: '',
      test: '',
      location: '',
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      instructions: ''
    })

    const submitForm = () => {
      console.log('Appointment Form Submitted:', form)
      alert('Appointment submitted successfully!')
      // Reset form (optional)
    }

    return { form, submitForm }
  }
})
</script>

<style scoped>
/* Optional custom styles */
</style>
