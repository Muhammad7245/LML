<template>
    <div>
      <button @click="showToast('success', 'Operation successful!')">Success</button>
      <button @click="showToast('error', 'Something went wrong.')">Error</button>
      <button @click="showToast('info', 'Here is some information.')">Info</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
import { useToast } from 'vue-toastification'

  
  export default defineComponent({
    name: 'ToastTrigger',
    setup() {
      const toast = useToast()
  
      const showToast = (type: string, message: string) => {
        switch (type) {
          case 'success':
            toast.success(message)
            break
          case 'error':
            toast.error(message)
            break
          case 'info':
            toast.info(message)
            break
          default:
            toast(message)
        }
      }
  
      return { showToast }
    }
  })
  </script>
  
  <style scoped>
  button {
    margin: 5px;
    padding: 8px 16px;
    border: none;
    background-color: #3498db;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #2980b9;
  }
  </style>
  