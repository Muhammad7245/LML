<!-- components/AppointmentSuccessModal.vue
<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">Appointment Confirmed!</h3>
        <p>Your appointment has been successfully booked.</p>
        <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Close</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'AppointmentSuccessModal',
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    }
  })
  </script>
   -->
   <template>
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
          <h3 class="text-lg font-bold mb-4">Appointment Booked</h3>
          <p class="text-gray-600 mb-6">{{ message }}</p>
          <button @click="$emit('close')" class="bg-[#2f3193] text-white px-4 py-2 rounded hover:bg-[#1e2075]">
            Close
          </button>
        </div>
      </div>
    </template>
    
    <script lang="ts">
    import { defineComponent } from 'vue'
    
    export default defineComponent({
      name: 'AppointmentSuccessModal',
      props: {
        message: {
          type: String,
          required: true
        }
      }
    })
    </script>
    