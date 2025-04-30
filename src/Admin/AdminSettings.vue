<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Optional: Re-use the same Top Navigation Bar component if it's separate -->
    <!-- Or include its HTML structure here if needed -->

    <!-- Main Content -->
    <div class="container mx-auto py-8 px-4">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Settings</h1>
        <p class="text-gray-600 mt-1">Manage application settings and preferences.</p>
      </div>

      <form @submit.prevent="saveSettings">
        <!-- General Settings Card -->
        <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">General Application Settings</h3>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label for="appName" class="block text-sm font-medium text-gray-700 mb-1">Application Name</label>
              <input type="text" id="appName" v-model="settings.general.appName" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
            </div>
            <div>
              <label for="appUrl" class="block text-sm font-medium text-gray-700 mb-1">Application URL</label>
              <input type="url" id="appUrl" v-model="settings.general.appUrl" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
            </div>
             <div>
              <label for="timezone" class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select id="timezone" v-model="settings.general.timezone" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white">
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
                <!-- Add more timezones as needed -->
              </select>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="maintenanceMode" v-model="settings.general.maintenanceMode" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="maintenanceMode" class="ml-2 block text-sm text-gray-900">Enable Maintenance Mode</label>
            </div>
          </div>
        </div>

        <!-- User Management Settings Card -->
        <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">User Management</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center">
              <input type="checkbox" id="allowRegistration" v-model="settings.users.allowRegistration" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="allowRegistration" class="ml-2 block text-sm text-gray-900">Allow Public User Registration</label>
            </div>
             <div>
              <label for="defaultRole" class="block text-sm font-medium text-gray-700 mb-1">Default Role for New Users</label>
              <select id="defaultRole" v-model="settings.users.defaultRole" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white">
                <option value="subscriber">Subscriber</option>
                <option value="editor">Editor</option>
                <option value="customer">Customer</option>
                <!-- Add roles specific to your application -->
              </select>
            </div>
             <div class="flex items-center">
              <input type="checkbox" id="verifyEmail" v-model="settings.users.verifyEmail" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="verifyEmail" class="ml-2 block text-sm text-gray-900">Require Email Verification for New Users</label>
            </div>
          </div>
        </div>

        <!-- Notification Settings Card -->
        <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center">
              <input type="checkbox" id="enableEmail" v-model="settings.notifications.enableEmail" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="enableEmail" class="ml-2 block text-sm text-gray-900">Enable Email Notifications</label>
            </div>
             <div>
              <label for="adminEmail" class="block text-sm font-medium text-gray-700 mb-1">Admin Notification Email</label>
              <input type="email" id="adminEmail" v-model="settings.notifications.adminEmail" placeholder="admin@example.com" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
               <p class="mt-1 text-xs text-gray-500">System notifications will be sent to this address.</p>
            </div>
            <!-- Add SMTP/Email provider settings here if configurable by admin -->
          </div>
        </div>

        <!-- Security Settings Card -->
        <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Security</h3>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label for="minPasswordLength" class="block text-sm font-medium text-gray-700 mb-1">Minimum Password Length</label>
              <input type="number" id="minPasswordLength" v-model.number="settings.security.minPasswordLength" min="6" max="32" class="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="requireStrongPassword" v-model="settings.security.requireStrongPassword" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="requireStrongPassword" class="ml-2 block text-sm text-gray-900">Require Strong Passwords (mixture of letters, numbers, symbols)</label>
            </div>
             <div class="flex items-center">
              <input type="checkbox" id="enable2FA" v-model="settings.security.enable2FA" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="enable2FA" class="ml-2 block text-sm text-gray-900">Allow Users to Enable Two-Factor Authentication</label>
            </div>
             <!-- Add session timeout, lockout policies etc. here -->
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end mt-8">
          <button type="button" @click="cancelChanges" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
            Cancel
          </button>
          <button type="submit" :disabled="isSaving" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>

      </form>

    </div> <!-- End Main Content Container -->
  </div> <!-- End Root Template Div -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router'; // If cancellation needs to navigate back

// const router = useRouter();

// --- Reactive State for Settings ---
// In a real app, load these from an API on component mount
const settings = ref({
  general: {
    appName: 'My Admin Portal',
    appUrl: 'http://localhost:8080', // Example URL
    timezone: 'UTC',
    maintenanceMode: false,
  },
  users: {
    allowRegistration: true,
    defaultRole: 'subscriber',
    verifyEmail: false,
  },
  notifications: {
    enableEmail: true,
    adminEmail: 'admin@example.com',
  },
  security: {
    minPasswordLength: 8,
    requireStrongPassword: true,
    enable2FA: false,
  }
});

const originalSettings = ref(null); // To store fetched settings for cancellation
const isSaving = ref(false);
const isLoading = ref(false); // For loading state

// --- Methods ---

const fetchSettings = async () => {
  isLoading.value = true;
  console.log('Fetching settings from API...');
  try {
    // Replace with your actual API call
    // const response = await fetch('/api/admin/settings');
    // const data = await response.json();
    // settings.value = data;

    // Simulate API delay and set dummy data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real scenario, the fetched data would overwrite the initial defaults above
    console.log('Settings fetched (simulated).');

    // Store a deep copy of fetched settings for potential cancellation
    originalSettings.value = JSON.parse(JSON.stringify(settings.value));

  } catch (error) {
    console.error("Failed to fetch settings:", error);
    // Handle error display to user (e.g., show a notification)
  } finally {
    isLoading.value = false;
  }
};

const saveSettings = async () => {
  isSaving.value = true;
  console.log('Saving settings:', JSON.stringify(settings.value));
  try {
    // Replace with your actual API call to save settings
    // await fetch('/api/admin/settings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(settings.value),
    // });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Settings saved successfully (simulated).');

    // Update original settings after successful save
    originalSettings.value = JSON.parse(JSON.stringify(settings.value));

    // Show success message (e.g., using a toast notification library)
    alert('Settings saved successfully!');

  } catch (error) {
    console.error("Failed to save settings:", error);
     // Show error message
    alert('Failed to save settings. Please try again.');
  } finally {
    isSaving.value = false;
  }
};

const cancelChanges = () => {
    if (originalSettings.value) {
        // Restore settings from the initially fetched state
        settings.value = JSON.parse(JSON.stringify(originalSettings.value));
        console.log('Changes cancelled and settings reverted.');
        // Optionally navigate away or show a notification
        // router.back(); // Example using router
    } else {
        console.log('Cannot cancel, no original settings loaded.');
        // Handle scenario where settings weren't loaded properly
    }
};

// --- Lifecycle Hooks ---
onMounted(() => {
  fetchSettings(); // Load settings when the component mounts
});

</script>

<style scoped>
/* Add specific styles if needed, e.g., for custom toggle switches */
input[type="checkbox"] {
  /* Slightly larger checkbox for easier clicking */
  /* width: 1.1rem;
  height: 1.1rem; */
}
</style>