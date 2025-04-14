<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
}>()
</script>

<template>
  <div class=" service-card bg-white rounded-lg shadow-md overflow-hidden text-left transform transition-transform duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2">
    <img :src="image" alt="" class="w-full h-48 object-cover" />
    <div class="p-5">
      <h3 class="font-semibold text-lg text-gray-900 mb-2 transition-colors duration-300 hover:text-[#2f3193]">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <a href="#" class="text-blue-600 font-medium hover:text-[#2f3193] transition-colors duration-300">
        View Tests <span class="ml-1">→</span>
      </a>
    </div>
  </div>
</template>

<style scoped>  
.service-card{
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

</style>