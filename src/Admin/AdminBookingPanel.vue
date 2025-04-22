<template>
  <div class="container mx-auto px-4 py-8 max-w-full">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6">Appointments</h1>

    <div class="overflow-auto bg-white shadow-md rounded-lg">
      <table class="min-w-[1200px] w-full text-sm text-left text-gray-700">
        <thead class="bg-[#2F3193] text-xs uppercase text-white">
          <tr>
            <th class="py-3 px-6 whitespace-nowrap">Date</th>
            <th class="py-3 px-6 whitespace-nowrap">Name</th>
            <!-- <th class="py-3 px-6 whitespace-nowrap">Email</th> -->
            <!-- <th class="py-3 px-6 whitespace-nowrap">Phone</th> -->
            <th class="py-3 px-6 whitespace-nowrap">Service Type</th>
            <th class="py-3 px-6 whitespace-nowrap">Test</th>
            <th class="py-3 px-6 whitespace-nowrap">Time</th>
            <th class="py-3 px-6 whitespace-nowrap">Location</th>
            <th class="py-3 px-6 whitespace-nowrap">Price</th>
            <th class="py-3 px-6 text-center whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="appointment in appointments"
            :key="appointment._id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="py-3 px-6">{{ appointment.date }}</td>
            <td class="py-3 px-6">{{ appointment.name }}</td>
            <!-- <td class="py-3 px-6">{{ appointment.email }}</td> -->
            <!-- <td class="py-3 px-6">{{ appointment.phone }}</td> -->
            <td class="py-3 px-6">{{ appointment.serviceType }}</td>
            <td class="py-3 px-6">{{ appointment.test }}</td>
            <td class="py-3 px-6">{{ appointment.time }}</td>
            <td class="py-3 px-6">{{ appointment.location }}</td>
            <td class="py-3 px-6">Rs {{ appointment.price }}</td>
            <td class="py-3 px-6 text-center">
              <button
                @click="viewAppointment(appointment)"
                class="text-green-600 hover:text-green-800 mr-3 transition"
                title="View"
              >
                <i class="fas fa-eye"></i>
              </button>
              <button
                @click="editAppointment(appointment._id)"
                class="text-blue-600 hover:text-blue-800 mr-3 transition"
                title="Edit"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click="deleteAppointment(appointment._id)"
                class="text-red-600 hover:text-red-800 transition"
                title="Delete"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
          <tr v-if="appointments.length === 0">
            <td colspan="12" class="text-center py-6 text-gray-500">
              No appointments found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  <!-- Modal -->
<transition name="fade-scale">
  <div
    v-if="modalVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform transition-all duration-300"
    >
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        <i class="fas fa-times"></i>
      </button>
      <h2 class="text-xl font-semibold mb-4">Appointment Details</h2>
      <div class="space-y-2 text-sm text-gray-700">
        <p><strong>Date:</strong> {{ selectedAppointment?.date }}</p>
        <p><strong>Name:</strong> {{ selectedAppointment?.name }}</p>
        <p><strong>Email:</strong> {{ selectedAppointment?.email }}</p>
        <p><strong>Phone:</strong> {{ selectedAppointment?.phone }}</p>
        <p><strong>Service Type:</strong> {{ selectedAppointment?.serviceType }}</p>
        <p><strong>Test:</strong> {{ selectedAppointment?.test }}</p>
        <p><strong>Time:</strong> {{ selectedAppointment?.time }}</p>
        <p><strong>Location:</strong> {{ selectedAppointment?.location }}</p>
        <p><strong>Price:</strong> Rs {{ selectedAppointment?.price }}</p>
        <p><strong>Instructions:</strong> {{ selectedAppointment?.instructions }}</p>
      </div>
    </div>
  </div>
</transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Appointment {
  _id: string
  date: string
  name: string
  email: string
  phone: string
  serviceType: string
  test: string
  time: string
  location: string
  price: number
  instructions: string
}

const appointments = ref<Appointment[]>([])
const modalVisible = ref(false)
const selectedAppointment = ref<Appointment | null>(null)

const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/all-appointments')
    appointments.value = response.data.allappointments
  } catch (error) {
    console.error('Error fetching appointments:', error)
  }
}

const viewAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  modalVisible.value = true
  document.body.classList.add('overflow-hidden')
}

const editAppointment = (id: string) => {
  console.log('Edit ID:', id)
}

const deleteAppointment = async (id: string) => {
  try {
    await axios.delete(`http://localhost:5000/api/delete/${id}`)
    appointments.value = appointments.value.filter((item) => item._id !== id)
  } catch (error) {
    console.error('Error deleting appointment:', error)
  }
}
const closeModal = () => {
  modalVisible.value = false
  document.body.classList.remove('overflow-hidden')
}




onMounted(() => {
  fetchAppointments()
})
</script>

<style>
i.fas {
  font-size: 1rem;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

</style>
