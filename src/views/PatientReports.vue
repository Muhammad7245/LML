<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6">Appointments</h1>

    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full text-sm text-left text-gray-700">
        <thead class="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th class="py-3 px-5">Date</th>
            <th class="py-3 px-5">Name</th>
            <th class="py-3 px-5">Email</th>
            <th class="py-3 px-5">Phone</th>
            <th class="py-3 px-5">Service Type</th>
            <th class="py-3 px-5">Test</th>
            <th class="py-3 px-5">Time</th>
            <th class="py-3 px-5">Location</th>
            <th class="py-3 px-5">Price</th>
            <th class="py-3 px-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="appointment in appointments"
            :key="appointment._id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="py-3 px-5">{{ appointment.date }}</td>
            <td class="py-3 px-5">{{ appointment.name }}</td>
            <td class="py-3 px-5">{{ appointment.email }}</td>
            <td class="py-3 px-5">{{ appointment.phone }}</td>
            <td class="py-3 px-5">{{ appointment.serviceType }}</td>
            <td class="py-3 px-5">{{ appointment.test }}</td>
            <td class="py-3 px-5">{{ appointment.time }}</td>
            <td class="py-3 px-5">{{ appointment.location }}</td>
            <td class="py-3 px-5">Rs {{ appointment.price }}</td>
            <td class="py-3 px-5 text-center">
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
            <td colspan="10" class="text-center py-6 text-gray-500">No appointments found.</td>
          </tr>
        </tbody>
      </table>
    </div>
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
}

const appointments = ref<Appointment[]>([])

const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/all-appointments');
    console.log(response)
    appointments.value = response.data.allappointments
  } catch (error) {
    console.error('Error fetching appointments:', error)
  }
}

const editAppointment = (id: string) => {
  // Handle edit logic here
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

onMounted(() => {
  fetchAppointments()
})
</script>

<style>
/* Optional: Better alignment of icons */
i.fas {
  font-size: 1rem;
}
</style>
