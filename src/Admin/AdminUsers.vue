<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
        <!-- Search Input -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users (name or email)..."
            class="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f3194]"
            @input="debouncedSearch"
          />
          <svg
            v-if="!searchQuery"
            class="w-5 h-5 absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <button
            v-else
            @click="clearSearch"
            class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear search"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- User Table Area -->
      <div class="bg-white shadow-md rounded-lg overflow-x-auto">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2f3194]"></div>
          <p class="ml-4 text-gray-600">Loading users...</p>
        </div>

        <!-- No Users State -->
        <div v-else-if="!loading && users.length === 0 && !error" class="py-20 text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-2">
            {{ searchQuery ? `No users found matching "${searchQuery}".` : 'No users available.' }}
          </p>
           <button
             v-if="searchQuery"
             @click="clearSearch"
             class="mt-4 px-4 py-2 bg-[#2f3194] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
           >
             Clear Search
           </button>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="py-20 text-center text-red-600">
           <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
           <p class="mt-2">{{ error }}</p>
           <button @click="retryFetch" class="mt-4 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
            Retry
          </button>
        </div>

        <!-- User Table -->
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#2f3194] text-white">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">PDFs</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span class="text-lg font-medium text-gray-600">{{ getUserInitials(user.name) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name || 'N/A' }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                     <!-- <div class="text-xs text-gray-400">ID: {{ user._id }}</div> -->
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize"
                  :class="{
                    'bg-blue-100 text-blue-800': user.role === 'admin',
                    'bg-gray-100 text-gray-800': user.role === 'user'
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active 
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.pdfs?.length || 0 }} 
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-3 justify-end">
                  <button
                    @click="openPublishModal(user)"
                    class="text-green-600 hover:text-green-900 transition-colors duration-150"
                    title="Publish PDF for this user"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button
                    @click="openEditModal(user)"
                    class="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                     title="Edit user details"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                     </svg>
                  </button>
                  <button
                    @click="openDeleteConfirmation(user)"
                    class="text-red-600 hover:text-red-900 transition-colors duration-150"
                     title="Delete user"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div v-if="!loading && users.length > 0 && pagination.pages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="prevPage"
                :disabled="pagination.page === 1"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
                  { 'opacity-50 cursor-not-allowed': pagination.page === 1 }
                ]"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="pagination.page === pagination.pages"
                :class="[
                  'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
                  { 'opacity-50 cursor-not-allowed': pagination.page === pagination.pages }
                ]"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ ((pagination.page - 1) * pagination.limit) + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>
                  of
                  <span class="font-medium">{{ pagination.total }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="prevPage"
                    :disabled="pagination.page === 1"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                      { 'opacity-50 cursor-not-allowed': pagination.page === 1 }
                    ]"
                  >
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>

                  <template v-for="pageNum in getPageNumbers()" :key="pageNum">
                    <button
                      @click="typeof pageNum === 'number' && goToPage(pageNum)"
                      :class="[
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                        pageNum === pagination.page
                          ? 'z-10 bg-[#e9e9ff] border-[#2f3194] text-[#1e1f60]'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      ]"
                    >
                      {{ pageNum }}
                    </button>
                  </template>

                  <button
                    @click="nextPage"
                    :disabled="pagination.page === pagination.pages"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                       { 'opacity-50 cursor-not-allowed': pagination.page === pagination.pages }
                    ]"
                  >
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <Transition name="modal-fade">
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" @click.self="showEditModal = false">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6" @click.stop>
          <h2 class="text-xl font-bold mb-4 text-gray-800">Edit User</h2>
          <form @submit.prevent="updateUser">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="edit-name">
                Name
              </label>
              <input
                id="edit-name"
                v-model="editUserForm.name"
                type="text"
                class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2f3194]"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="edit-email">
                Email
              </label>
              <input
                id="edit-email"
                v-model="editUserForm.email"
                type="email"
                class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2f3194]"
                required
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="edit-role">
                Role
              </label>
              <select
                id="edit-role"
                v-model="editUserForm.role"
                class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-[#2f3194]"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="flex items-center justify-end space-x-3">
              <button
                type="button"
                @click="showEditModal = false"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center min-w-[120px]"
                :disabled="updating"
              >
                <svg v-if="updating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ updating ? 'Saving...' : 'Save Changes' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <Transition name="modal-fade">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" @click.self="showDeleteModal = false">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6" @click.stop>
          <h2 class="text-xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
          <p class="mb-6 text-gray-600">
            Are you sure you want to delete the user <strong>{{ deletingUser?.name || deletingUser?.email }}</strong>? This will also remove associated data and cannot be undone.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              :disabled="deleting"
            >
              Cancel
            </button>
            <button
              @click="deleteUser"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center min-w-[100px]"
              :disabled="deleting"
            >
               <svg v-if="deleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              <span>{{ deleting ? 'Deleting...' : 'Delete' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Publish PDF Modal -->
    <Transition name="modal-fade">
      <div v-if="showPublishModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" @click.self="closePublishModal">
        <!-- Modal Card -->
        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden" @click.stop>
          <!-- Modal Header -->
          <div class="bg-[#2f3194] px-6 py-4 flex justify-between items-center">
            <h2 class="text-xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Publish PDF for {{ publishingUser?.name }}
            </h2>
            <button @click="closePublishModal" class="text-white hover:text-gray-300">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <form @submit.prevent="uploadPdf" class="space-y-5">
              <!-- PDF Title -->
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="pdfTitle">
                  PDF Title <span class="text-red-500">*</span>
                </label>
                <input
                  id="pdfTitle"
                  v-model="pdfTitle"
                  type="text"
                  placeholder="Enter a descriptive title"
                  class="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2f3194] focus:border-transparent"
                  required
                />
              </div>

              <!-- File Upload Area -->
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="pdfFile">
                  PDF File <span class="text-red-500">*</span>
                </label>
                <div
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2f3194] transition-colors duration-200 cursor-pointer"
                  :class="{ 'border-green-500 bg-green-50': fileSelected, 'border-blue-400 bg-blue-50': dragOver }"
                  @click="triggerFileInput"
                  @dragover.prevent="dragOver = true"
                  @dragleave.prevent="dragOver = false"
                  @drop.prevent="handleFileDrop"
                >
                  <input
                    id="pdfFile"
                    ref="fileInput"
                    type="file"
                    accept=".pdf,application/pdf"
                    class="hidden"
                    @change="handleFileChange"
                  />
                  <div v-if="!fileSelected" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-600">
                      <span class="font-medium text-[#2f3194] hover:underline">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500 mt-1">PDF only (Max 10MB)</p>
                     <p v-if="dragOver" class="mt-2 text-sm font-medium text-blue-600">Drop the file here!</p>
                  </div>
                  <div v-else class="flex items-center justify-center space-x-3">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                       <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>
                    <div class="text-left overflow-hidden">
                      <p class="text-sm font-medium text-gray-900 truncate" :title="pdfFile?.name">{{ pdfFile?.name }}</p>
                      <p class="text-xs text-gray-500">{{ formatFileSize(pdfFile?.size) }}</p>
                    </div>
                    <button
                      type="button"
                      @click.stop="clearSelectedFile"
                      class="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                       title="Remove file"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                 <!-- File validation error -->
                <p v-if="fileError" class="text-red-500 text-xs mt-1">{{ fileError }}</p>
              </div>

              <!-- PDF Description -->
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="pdfDescription">
                  Description (Optional)
                </label>
                <textarea
                  id="pdfDescription"
                  v-model="pdfDescription"
                  placeholder="Add a brief description..."
                  rows="3"
                  class="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2f3194] focus:border-transparent resize-vertical"
                ></textarea>
              </div>

              <!-- Tags Input -->
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="pdfTagInput">
                  Tags (Optional, separate with Enter, Tab, or Comma)
                </label>
                <div class="flex flex-wrap items-center border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-[#2f3194] focus-within:border-transparent min-h-[40px]">
                  <span
                    v-for="(tag, index) in pdfTags"
                    :key="index"
                    class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full m-1"
                  >
                    {{ tag }}
                    <button
                      type="button"
                      @click="removeTag(index)"
                      class="ml-1.5 text-green-600 hover:text-green-800 focus:outline-none"
                       title="Remove tag"
                    >
                      ×
                    </button>
                  </span>
                  <input
                    id="pdfTagInput"
                    v-model="tagInput"
                    @keydown.enter.prevent="addTag"
                    @keydown.tab.prevent="addTag"
                    @keydown.comma.prevent="addTag"
                    @keydown.backspace="removeLastTag"
                    type="text"
                    placeholder="Add tags..."
                    class="flex-1 outline-none p-1 min-w-[120px] text-sm"
                  />
                </div>
              </div>

              <!-- Access Control Options -->
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Access Control
                </label>
                <div class="mt-2 space-x-4 flex items-center">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="radio" v-model="pdfAccess" value="public" class="form-radio accent-[#2f3194] h-4 w-4" />
                    <span class="ml-2 text-gray-700 text-sm">Public</span>
                  </label>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="radio" v-model="pdfAccess" value="private" class="form-radio accent-[#2f3194] h-4 w-4" />
                    <span class="ml-2 text-gray-700 text-sm">Private</span>
                  </label>
                </div>
              </div>

              <!-- Upload Progress -->
              <div v-if="uploading" class="mt-4">
                 <p class="text-sm text-center mb-1 text-gray-600">Uploading... {{ uploadProgress.toFixed(0) }}%</p>
                <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div class="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-300 ease-linear" :style="{ width: `${uploadProgress}%` }"></div>
                </div>
              </div>

              <!-- Action Buttons -->
               <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  @click="closePublishModal"
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                   :disabled="uploading"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-[#2f3194] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center min-w-[140px]"
                  :disabled="uploading || !fileSelected || !pdfTitle.trim() || !!fileError"
                  :class="{ 'opacity-50 cursor-not-allowed': uploading || !fileSelected || !pdfTitle.trim() || !!fileError }"
                >
                   <svg v-if="uploading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                  <span>{{ uploading ? 'Publishing...' : 'Publish PDF' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition name="toast-fade">
       <div
         v-if="notification.message"
         :class="[
           'fixed bottom-5 right-5 px-5 py-3 rounded-md shadow-lg text-white text-sm font-medium z-[100]',
           notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
         ]"
       >
         {{ notification.message }}
       </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import debounce from 'lodash.debounce'
import { Transition } from 'vue' // Explicitly import Transition if needed (usually auto-imported)

// --- Interfaces ---
interface User {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  pdfs: string[] // Array of PDF ObjectIds (as per updated User model)
  createdAt?: string
  updatedAt?: string
  __v?: number
}

interface EditUserForm {
  name: string
  email: string
  role: 'user' | 'admin'
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

interface ApiResponse<T> {
  users: T[]
  pagination: Pagination
  message?: string // Optional message from API
}

interface ApiError {
  message: string
}

interface Notification {
    message: string;
    type: 'success' | 'error';
}

// --- Constants ---
const API_BASE_URL = 'http://localhost:5000/api'; // Centralize API URL
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// --- Reactive States ---

// User Management
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const pagination = ref<Pagination>({ page: 1, limit: 10, total: 0, pages: 1 })

// Edit Modal
const showEditModal = ref(false)
const editingUser = ref<User | null>(null)
const editUserForm = ref<EditUserForm>({ name: '', email: '', role: 'user' })
const updating = ref(false)

// Delete Modal
const showDeleteModal = ref(false)
const deletingUser = ref<User | null>(null)
const deleting = ref(false)

// Publish Modal
const showPublishModal = ref(false);
const publishingUser = ref<User | null>(null);
const pdfFile = ref<File | null>(null);
const pdfTitle = ref('');
const pdfDescription = ref('');
const pdfTags = ref<string[]>([]);
const tagInput = ref('');
const pdfAccess = ref<'public' | 'private'>('public'); // Use union type
const uploading = ref(false);
const uploadProgress = ref(0);
const dragOver = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const fileError = ref<string | null>(null); // For file validation errors

// Notification
const notification = ref<Notification>({ message: '', type: 'success' });
let notificationTimeout: number | null = null;


// --- Computed Properties ---
const fileSelected = computed(() => pdfFile.value !== null);


// --- API Functions ---

const fetchUsers = async (query: string = searchQuery.value, page: number = pagination.value.page, limit: number = pagination.value.limit) => {
  loading.value = true
  error.value = null
  try {
    const url = new URL(`${API_BASE_URL}/users`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    if (query) {
      url.searchParams.append('search', query);
    }

    const response = await fetch(url.toString());
    const data: ApiResponse<User> | ApiError = await response.json();

    if (!response.ok) {
        throw new Error((data as ApiError).message || `HTTP error! status: ${response.status}`);
    }

    users.value = (data as ApiResponse<User>).users;
    pagination.value = (data as ApiResponse<User>).pagination;

  } catch (err: any) {
    console.error('Error fetching users:', err);
    error.value = err.message || 'Failed to fetch users. Please check the console.';
    users.value = [] // Clear users on error
    pagination.value = { page: 1, limit: 10, total: 0, pages: 1 } // Reset pagination
    // Do not show notification for fetch errors, use the error message area
  } finally {
    loading.value = false
  }
}

const updateUser = async () => {
  if (!editingUser.value) return;
  updating.value = true;
  try {
    const response = await fetch(`${API_BASE_URL}/users/${editingUser.value._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUserForm.value) // Send only form data
    });
    const data: User | ApiError = await response.json();

    if (!response.ok) {
        throw new Error((data as ApiError).message || `Failed to update user (status: ${response.status})`);
    }

    showNotification('User updated successfully!', 'success');
    fetchUsers(); // Refresh list
    showEditModal.value = false;
  } catch (err: any) {
    console.error('Error updating user:', err);
    showNotification(err.message || 'Failed to update user.', 'error');
  } finally {
    updating.value = false;
  }
}

const deleteUser = async () => {
  if (!deletingUser.value) return;
  deleting.value = true;
  try {
    const response = await fetch(`${API_BASE_URL}/users/${deletingUser.value._id}`, {
      method: 'DELETE'
    });
     const data: { message: string } | ApiError = await response.json();

    if (!response.ok) {
        throw new Error((data as ApiError).message || `Failed to delete user (status: ${response.status})`);
    }

    showNotification('User deleted successfully!', 'success');
     // Adjust pagination if the last item on a page was deleted
     if (users.value.length === 1 && pagination.value.page > 1) {
       pagination.value.page--;
     }
    fetchUsers(); // Refresh list
    showDeleteModal.value = false;
  } catch (err: any) {
    console.error('Error deleting user:', err);
    showNotification(err.message || 'Failed to delete user.', 'error');
  } finally {
    deleting.value = false;
  }
}

const uploadPdf = async () => {
  if (!pdfFile.value || !publishingUser.value || !pdfTitle.value.trim() || fileError.value) return;

  uploading.value = true;
  uploadProgress.value = 0;

  // Simulate smoother progress for better UX
  const progressInterval = setInterval(() => {
      if (uploadProgress.value < 95) { // Don't let simulation hit 100%
          uploadProgress.value += Math.random() * 5;
      }
  }, 200);

  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile.value); // Key matches backend: upload.single('pdf')
    formData.append('title', pdfTitle.value.trim());
    formData.append('userId', publishingUser.value._id); // Target user ID
    formData.append('access', pdfAccess.value);

    if (pdfDescription.value.trim()) {
      formData.append('description', pdfDescription.value.trim());
    }
    // Send tags as a JSON string
    if (pdfTags.value.length > 0) {
      formData.append('tags', JSON.stringify(pdfTags.value));
    }

    // Use fetch for upload (or Axios if preferred)
    const response = await fetch(`${API_BASE_URL}/pdfs`, { // Endpoint matches backend
      method: 'POST',
      body: formData,
      // Note: Do NOT set Content-Type header manually when using FormData,
      // the browser sets it correctly with the boundary.
    });

    // Stop simulation
    clearInterval(progressInterval);
    const data: { message: string, pdf: any } | ApiError = await response.json();

    if (!response.ok) {
      uploadProgress.value = 0; // Reset progress on error
      throw new Error((data as ApiError).message || `PDF upload failed (status: ${response.status})`);
    }

    uploadProgress.value = 100; // Mark as complete

    showNotification('PDF published successfully!', 'success');
    fetchUsers(); // Refresh the user list (user.pdfs count might update)

    // Close modal after a short delay to show completion
    setTimeout(() => {
      closePublishModal();
    }, 700);

  } catch (err: any) {
     clearInterval(progressInterval); // Ensure interval is cleared on error
     uploadProgress.value = 0; // Reset progress
    console.error('Error uploading PDF:', err);
    showNotification(err.message || 'Failed to publish PDF.', 'error');
  } finally {
     // Reset uploading state slightly later than modal close
     setTimeout(() => {
        uploading.value = false;
     }, 800);
  }
};


// --- Event Handlers & Methods ---

const debouncedSearch = debounce(() => {
  pagination.value.page = 1 // Reset to first page on new search
  fetchUsers()
}, 400); // Debounce time

const clearSearch = () => {
  searchQuery.value = ''
  fetchUsers() // Fetch immediately after clearing
}

const retryFetch = () => {
   fetchUsers();
}

// Pagination controls
const prevPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    fetchUsers()
  }
}
const nextPage = () => {
  if (pagination.value.page < pagination.value.pages) {
    pagination.value.page++
    fetchUsers()
  }
}
const goToPage = (pageNum: number) => {
  if (pageNum !== pagination.value.page) {
     pagination.value.page = pageNum
     fetchUsers()
  }
}

// Calculate pagination numbers to display
const getPageNumbers = () => {
  const total = pagination.value.pages
  const current = pagination.value.page
  const delta = 1 // How many pages to show around the current page
  const left = current - delta
  const right = current + delta + 1
  const range: number[] = []
  const rangeWithDots: (number | string)[] = []
  let l: number | null = null

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l > 2) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }
  return rangeWithDots
}


const getUserInitials = (name?: string): string => {
  if (!name || name.trim() === '') return 'NA';
  return name.split(' ')
             .map(n => n[0])
             .filter(char => char && char.match(/[a-zA-Z]/)) // Ensure it's a letter
             .slice(0, 2) // Max 2 initials
             .join('')
             .toUpperCase();
}

// Edit Modal controls
const openEditModal = (user: User) => {
  editingUser.value = { ...user } // Clone user data
  editUserForm.value = {
    name: user.name || '',
    email: user.email,
    role: user.role
  }
  showEditModal.value = true
}

// Delete Modal controls
const openDeleteConfirmation = (user: User) => {
  deletingUser.value = user
  showDeleteModal.value = true
}

// Publish Modal controls
const openPublishModal = (user: User) => {
  publishingUser.value = user;
  resetPublishForm(); // Reset form fields when opening
  showPublishModal.value = true;
};

const closePublishModal = () => {
   // Only reset if not currently uploading
   if (!uploading.value) {
     resetPublishForm();
   }
   showPublishModal.value = false;
}

const resetPublishForm = () => {
  pdfTitle.value = '';
  pdfDescription.value = '';
  pdfFile.value = null;
  fileError.value = null;
  pdfTags.value = [];
  tagInput.value = '';
  pdfAccess.value = 'public';
  uploadProgress.value = 0;
  dragOver.value = false;
  if (fileInput.value) {
    fileInput.value.value = ''; // Clear the native input
  }
};

// File Handling
const triggerFileInput = () => {
  // Only trigger if not uploading
  if (!uploading.value) {
    fileInput.value?.click();
  }
};

const validateFile = (file: File): boolean => {
    fileError.value = null; // Reset error

    // Check file type
    if (!file.type.includes('pdf')) {
        fileError.value = 'Invalid file type. Please select a PDF file.';
        return false;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
        fileError.value = `File is too large (${formatFileSize(file.size)}). Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
        return false;
    }
    return true;
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (validateFile(file)) {
       pdfFile.value = file;
    } else {
       clearSelectedFile(); // Clear if validation fails
    }
  }
};

const handleFileDrop = (event: DragEvent) => {
  dragOver.value = false;
  if (uploading.value) return; // Prevent drop during upload

  if (event.dataTransfer?.files.length) {
    const file = event.dataTransfer.files[0];
     if (validateFile(file)) {
       pdfFile.value = file;
       // Optionally update the native input value as well if needed elsewhere
       // if (fileInput.value) { fileInput.value.files = event.dataTransfer.files; }
    } else {
        clearSelectedFile(); // Clear if validation fails
    }
  }
};

const clearSelectedFile = () => {
  pdfFile.value = null;
  fileError.value = null;
  if (fileInput.value) {
    fileInput.value.value = ''; // Reset the actual input element
  }
};

const formatFileSize = (bytes: number | undefined): string => {
  if (bytes === undefined || bytes === null || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.max(0, Math.floor(Math.log(bytes) / Math.log(k)));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)) + ' ' + sizes[i];
};


// Tag Handling
const addTag = () => {
  const tag = tagInput.value.trim().toLowerCase(); // Normalize tags
  if (tag && tag.length <= 30 && pdfTags.value.length < 10 && !pdfTags.value.includes(tag)) { // Add limits
    pdfTags.value.push(tag);
  }
  tagInput.value = ''; // Clear input after adding
};

const removeTag = (index: number) => {
  pdfTags.value.splice(index, 1);
};

const removeLastTag = (event: KeyboardEvent) => {
   if (tagInput.value === '' && pdfTags.value.length > 0 && event.key === 'Backspace') {
       pdfTags.value.pop();
   }
}

// Notification Handling
const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  notification.value = { message, type };

  // Clear existing timeout if any
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }

  // Set new timeout
  notificationTimeout = window.setTimeout(() => {
    notification.value = { message: '', type: 'success' }; // Reset notification
    notificationTimeout = null;
  }, 3500); // Display for 3.5 seconds
};

// --- Lifecycle Hooks ---
onMounted(() => {
  fetchUsers()
})

// --- Watchers ---
// Optional: Watch page changes if needed, but fetchUsers is called directly in pagination methods
// watch(() => pagination.value.page, () => {
//   fetchUsers()
// })
</script>

<style scoped>
/* Scoped styles for the component */

/* Style the file input drag-over state */
.border-blue-400 {
    border-color: #60a5fa; /* Tailwind blue-400 */
}
.bg-blue-50 {
    background-color: #eff6ff; /* Tailwind blue-50 */
}

/* Transition for Modals */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Transition for Toast */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.toast-fade-enter-to,
.toast-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}


/* Custom scrollbar for modal body if needed */
.max-h-\[70vh\]::-webkit-scrollbar {
  width: 8px;
}
.max-h-\[70vh\]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.max-h-\[70vh\]::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
.max-h-\[70vh\]::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

/* Prevent layout shift during loading */
.min-w-\[120px\] { min-width: 120px; }
.min-w-\[100px\] { min-width: 100px; }
.min-w-\[140px\] { min-width: 140px; }

/* Ensure tags don't overflow weirdly */
#pdfTagInput {
    background: transparent; /* Inherit background */
}
</style>