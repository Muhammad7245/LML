<template>
  <div class="min-h-screen bg-[#f2f6ff] pt-[20px] px- pb-16">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-4xl font-extrabold text-gray-800 mb-2">Book Your Appointment</h2>
      <p class="text-center text-gray-600 mb-8">
        Schedule your laboratory appointment online - no phone calls or emails required.
      </p>

      <div class="bg-white rounded-lg shadow-lg grid lg:grid-cols-2 overflow-hidden">
        <!-- Appointment Form -->
        <div class="p-8">
          <AppointmentForm :form="form" @submit="submitForm" />
        </div>

        <!-- Info Panel -->
        <div class="bg-[#2f3193] text-white p-8 pt-20 space-y-8">
          <h4 class="font-bold text-2xl">What to Expect</h4>
          <ul class="space-y-2 text-sm">
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> Confirmation email with appointment details</li>
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> SMS reminder 24 hours before appointment</li>
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> Results available in patient portal within 24-72 hours</li>
            <li><i class="fas fa-check-circle text-green-400 mr-2"></i> Doctor consultation available for result interpretation</li>
          </ul>

          <div>
            <h5 class="font-semibold text-sm">Preparation Guidelines</h5>
            <p class="text-sm mt-1">For most blood tests, fasting for 8-12 hours is required. Drink plenty of water and bring your ID and insurance card.</p>
            <a href="/faq" class="text-blue-200 hover:underline inline-flex items-center mt-2">
              View Full Guidelines <i class="fas fa-chevron-right ml-1"></i>
            </a>
          </div>

          <img src="/images/book_appointment/appointment-doctor.png" alt="Doctor Consultation" class="rounded mt-4 w-full h-auto" />
        </div>
      </div>

      <AppointmentSuccessModal
        v-if="isDialogVisible"
        :message="dialogMessage"
        @close="isDialogVisible = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import AppointmentForm from '@/components/forms/AppointmentForm.vue'
import AppointmentSuccessModal from '@/components/modals/AppointmentSuccessModal.vue'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'BookAppointment',
  components: {
    AppointmentForm,
    AppointmentSuccessModal
  },
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
      instructions: '',
    })
    const toast = useToast()



    const isDialogVisible = ref(false)
    const dialogMessage = ref('Your appointment has been successfully booked!')

    const submitForm = () => {
      console.log('Appointment Form Submitted:', form)
      toast.success('Appointment successfully booked!')
      isDialogVisible.value = true
    }

    return { form, submitForm, isDialogVisible, dialogMessage }
  }
})
</script>
