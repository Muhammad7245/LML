<template>
    <div class="min-h-screen bg-gray-100 py-8 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">PDF Document Viewer</h1>
        
        <!-- PDF list and viewer container -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- PDF List Panel -->
          <div class="bg-white rounded-lg shadow-md p-4 md:w-1/3">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Available Documents</h2>
            
            <div v-if="loading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            
            <div v-else-if="pdfList.length === 0" class="py-8 text-center text-gray-500">
              <p>No documents available</p>
            </div>
            
            <ul v-else class="divide-y divide-gray-200">
              <li v-for="pdf in pdfList" :key="pdf._id" class="py-3">
                <button 
                  @click="selectPdf(pdf)"
                  class="w-full text-left px-3 py-2 rounded hover:bg-blue-50 flex items-center"
                  :class="{'bg-blue-100': selectedPdf?._id === pdf._id}"
                >
                  <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                    </path>
                  </svg>
                  <div>
                    <div class="font-medium text-gray-800">{{ pdf.originalname }}</div>
                    <div class="text-sm text-gray-500">
                      {{ formatDate(pdf.uploadedAt) }} · {{ formatFileSize(pdf.size) }}
                    </div>
                  </div>
                </button>
              </li>
            </ul>
            
            <div class="mt-6">
              <button 
                @click="openFileUploader"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 4v16m8-8H4"></path>
                </svg>
                Upload New Document
              </button>
              <input 
                ref="fileInput"
                type="file" 
                accept="application/pdf" 
                class="hidden"
                @change="uploadFile"
              />
            </div>
          </div>
          
          <!-- PDF Viewer Panel -->
          <div class="bg-white rounded-lg shadow-md p-4 md:w-2/3 h-screen max-h-[800px]">
            <div v-if="!selectedPdf" class="flex flex-col items-center justify-center h-full text-gray-400">
              <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
              <p class="text-lg">Select a document to view</p>
            </div>
            
            <div v-else class="h-full flex flex-col">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-700">{{ selectedPdf.originalname }}</h2>
                <button 
                  @click="deletePdf(selectedPdf)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                </button>
              </div>
              
              <!-- PDF Embed -->
              <div class="flex-1 bg-gray-100 rounded-md overflow-hidden">
                <iframe :src="pdfUrl" class="w-full h-full" frameborder="0"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notification Toast -->
      <div 
        v-if="notification" 
        class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg"
      >
        {{ notification }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  
  // Define the PDF document interface
  interface PdfDocument {
    _id: string;
    filename: string;
    originalname: string;
    path: string;
    size: number;
    uploadedAt: string;
  }
  
  export default defineComponent({
    name: 'PdfViewer',
    setup() {
      // Base API URL - change this to match your backend URL
      const API_URL = 'http://localhost:5000/api';
      
      // Data refs
      const pdfList = ref<PdfDocument[]>([]);
      const selectedPdf = ref<PdfDocument | null>(null);
      const loading = ref(true);
      const fileInput = ref<HTMLInputElement | null>(null);
      const notification = ref<string | null>(null);
  
      // Computed PDF URL for viewing
      const pdfUrl = computed(() => {
        if (!selectedPdf.value) return '';
        return `${API_URL}/pdf/${selectedPdf.value.filename}`;
      });
  
      // Fetch the list of PDFs
      const fetchPdfList = async () => {
        try {
          loading.value = true;
          const response = await axios.get(`${API_URL}/pdfs`);
          pdfList.value = response.data;
        } catch (error) {
          showNotification('Error loading documents');
          console.error('Error fetching PDFs:', error);
        } finally {
          loading.value = false;
        }
      };
  
      // Select a PDF to view
      const selectPdf = (pdf: PdfDocument) => {
        selectedPdf.value = pdf;
      };
  
      // Open file uploader dialog
      const openFileUploader = () => {
        if (fileInput.value) {
          fileInput.value.click();
        }
      };
  
      // Upload a new PDF file
      const uploadFile = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) return;
        
        const file = target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          showNotification('Uploading document...');
          await axios.post(`${API_URL}/upload-pdf`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          showNotification('Document uploaded successfully');
          await fetchPdfList();
          // Reset file input
          if (target) target.value = '';
        } catch (error) {
          showNotification('Error uploading document');
          console.error('Error uploading PDF:', error);
        }
      };
  
      // Delete a PDF
      const deletePdf = async (pdf: PdfDocument) => {
        if (!confirm(`Are you sure you want to delete "${pdf.originalname}"?`)) {
          return;
        }
        
        try {
          await axios.delete(`${API_URL}/pdf/${pdf.filename}`);
          
          if (selectedPdf.value && selectedPdf.value._id === pdf._id) {
            selectedPdf.value = null;
          }
          
          showNotification('Document deleted successfully');
          await fetchPdfList();
        } catch (error) {
          showNotification('Error deleting document');
          console.error('Error deleting PDF:', error);
        }
      };
  
      // Format date for display
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };
  
      // Format file size for display
      const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' bytes';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
      };
  
      // Show a temporary notification
      const showNotification = (message: string) => {
        notification.value = message;
        setTimeout(() => {
          notification.value = null;
        }, 3000);
      };
  
      // Load PDFs when component mounts
      onMounted(() => {
        fetchPdfList();
      });
  
      return {
        pdfList,
        selectedPdf,
        loading,
        fileInput,
        notification,
        pdfUrl,
        selectPdf,
        openFileUploader,
        uploadFile,
        deletePdf,
        formatDate,
        formatFileSize
      };
    }
  });
  </script>