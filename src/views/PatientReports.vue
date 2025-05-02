<template>
  <!-- Welcome/Login Message -->
  <div class="max-w-6x2 ">
    <div
      v-if="auth.user"
      class="welcome-message bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg shadow-md text-xl md:text-2xl font-semibold text-gray-800 flex items-center"
    >
      <i class="fas fa-user-circle mr-3 text-3xl text-blue-600"></i>
      <span>
        Welcome back to your Patient Portal,
        <span
          class="font-extrabold text-indigo-700 px-2 py-1 rounded-md glow bg-white bg-opacity-50 shadow-sm"
        >
          {{ formatUserName(auth.user.name) }}!
        </span>
      </span>
    </div>
     <!-- Patient Reports Section (only if Not logged in) -->
    <div v-else class="text-center py-21 bg-red-50 border border-red-200 rounded-lg shadow">
      <h1 class="error-heading text-xl md:text-2xl font-bold text-red-700 mb-4">
        Authentication Required
      </h1>
      <p class="text-red-600 mb-4">Please log in to view and manage your patient reports.</p>
      <RouterLink
        to="/login"
        class="inline-block px-6 py-2  bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition duration-200"
      >
        Go to Login
      </RouterLink>
    </div>
    
  </div>

  <!-- Patient Reports Section (only if logged in) -->
  <div v-if="auth.user" class="min-h-screen bg-[#f2f6ff] py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="patient-reports-container mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Your Reports</h1>
      </div>

      <!-- Loading State -->
       <div v-if="loading" class="text-center py-10">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p class="text-lg text-gray-600">Loading your reports...</p>
       </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-10 px-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
         <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
         <p class="text-lg font-semibold text-red-700">Could not load reports</p>
         <p class="text-red-600 mt-2">{{ error }}</p>
         <button @click="fetchPatientPdfs" class="mt-4 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-100 transition duration-200">
            Retry
         </button>
      </div>

      <!-- No Reports State -->
       <div v-else-if="!patientPdfs.length" class="text-center py-10 px-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md">
          <i class="fas fa-folder-open text-4xl text-yellow-500 mb-4"></i>
          <p class="text-lg font-semibold text-yellow-700">No Reports Found</p>
          <p class="text-yellow-600 mt-2">There are currently no reports uploaded for your account.</p>
          <p class="text-sm text-gray-500 mt-3">If you believe this is an error, please contact support.</p>
       </div>

   <!-- Reports List/Grid -->
<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
  <div
    v-for="pdf in patientPdfs"
    :key="pdf.filename"
    class="report-card bg-[#333595] rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col "
  >
    <div class="p-5 space-y-2">
      <div class="flex items-center">
        <i class="fas fa-file-pdf text-2xl text-red-500 mr-2"></i>
        <h2 class="text-lg font-semibold text-white truncate" :title="pdf.title">
          {{ pdf.title }}
        </h2>
      </div>
      
      <p v-if="pdf.description" class="text-sm text-white">
        {{ pdf.description }}
      </p>
      <p class="text-xs text-gray-400">
        <i class="fas fa-calendar-alt mr-1"></i> Uploaded: {{ formatDate(pdf.uploadedAt) }}
      </p>
      <p class="text-xs text-gray-400">
        <i class="fas fa-database mr-1"></i> Size: {{ formatFileSize(pdf.size) }}
      </p>

      <!-- Tags -->
      <div v-if="pdf.tags?.length" class="flex flex-wrap gap-1 mt-2">
        <span
          v-for="tag in pdf.tags"
          :key="tag"
          class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Embedded PDF Preview -->
    <div class="aspect-video bg-gray-100">
      <iframe
        :src="`${API_BASE_URL}/pdfs/${pdf.filename}`"
        type="application/pdf"
        width="100%"
        height="100%"
        class="w-full h-full border-t border-gray-200"
        frameborder="0"
      ></iframe>
    </div>

    <!-- View in New Tab -->
    <div class="p-4 bg-gray-50 border-t">
      <a
        :href="`${API_BASE_URL}/pdfs/${pdf.filename}`"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
      >
        <i class="fas fa-external-link-alt mr-1"></i> Open Fullscreen
      </a>
    </div>
  </div>
</div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'; // Ensure RouterLink is imported if not globally available

// --- Pinia Store & API URL ---
const auth = useAuthStore()
const API_BASE_URL = 'http://localhost:5000/api'; // Make sure this matches your backend setup

// --- Reactive State ---
interface PdfMetadata {
  _id: string; // Assuming your backend sends _id
  filename: string;
  originalname: string;
  title: string;
  uploadedAt: string; // ISO Date string
  size: number;
  tags?: string[];
  access?: 'public' | 'private';
  description?: string;
}

const patientPdfs = ref<PdfMetadata[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// --- Methods ---

// Fetch PDFs for the logged-in user
const fetchPatientPdfs = async () => {
  if (!auth.user?.id) {
    error.value = "User not logged in or user ID is missing.";
    console.error("fetchPatientPdfs: User ID not available.");
    return;
  }

  loading.value = true
  error.value = null
  patientPdfs.value = [] // Clear previous PDFs

  try {
    const response = await fetch(`${API_BASE_URL}/pdfs/user/${auth.user.id}`, {
       method: 'GET',
       headers: {
         // Add authentication headers if your backend requires them (e.g., JWT)
         // 'Authorization': `Bearer ${auth.token}`
         'Content-Type': 'application/json'
       }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }))
      throw new Error(errorData.message || `Failed to fetch reports (status: ${response.status})`);
    }

    const data: PdfMetadata[] = await response.json();
    patientPdfs.value = data;

  } catch (err: any) {
    console.error('Error fetching patient PDFs:', err)
    error.value = err.message || 'An unknown error occurred while fetching reports.'
  } finally {
    loading.value = false
  }
}

// Format User Name (Example: "john doe" -> "John Doe")
const formatUserName = (name?: string): string => {
   if (!name) return 'User';
   return name
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
}

// Format Date (Example: ISO String -> "Oct 26, 2023, 10:30 AM")
const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  try {
     const date = new Date(dateString);
     return date.toLocaleDateString(undefined, { // Use user's locale
         year: 'numeric',
         month: 'short',
         day: 'numeric',
         // hour: 'numeric',
         // minute: '2-digit',
         // hour12: true // Use AM/PM
     });
  } catch (e) {
     console.error("Error formatting date:", e);
     return dateString; // Return original if formatting fails
  }
}

// Format File Size (Bytes -> KB/MB/GB)
const formatFileSize = (bytes: number | undefined): string => {
  if (bytes === undefined || bytes === null || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.max(0, Math.floor(Math.log(bytes) / Math.log(k)));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)) + ' ' + sizes[i];
};


// --- Lifecycle Hook ---
onMounted(() => {
  // Fetch reports only if the user is logged in when the component mounts
  if (auth.user) {
    fetchPatientPdfs()
  }
  // If using Nuxt or SSR, ensure auth state is properly hydrated before this runs
})

// Optional: Watch for login/logout changes to fetch/clear data
// watch(() => auth.user, (newUser) => {
//    if (newUser) {
//       fetchPatientPdfs();
//    } else {
//       patientPdfs.value = []; // Clear data on logout
//       error.value = null;
//       loading.value = false;
//    }
// });

</script>

<style scoped> /* Use scoped CSS */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 3px rgba(99, 102, 241, 0.2); /* Indigo-500 glow */
  }
  50% {
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.6);
  }
}
.glow {
  /* Apply animation only if needed, can be performance intensive */
   animation: glow 3s ease-in-out infinite;
}

.report-card h2 {
   line-height: 1.4; /* Adjust for better title wrapping */
}

/* For description truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Add FontAwesome if not already included globally */
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'); */
iframe {

}

@media (max-width: 768px) {
  iframe {
    max-height: 300px;
  }
}

</style>