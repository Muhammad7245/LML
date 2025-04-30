<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  description: string
  image: string
}>()

const isFlipped = ref(false)

function toggleFlip() {
  isFlipped.value = !isFlipped.value

  if (isFlipped.value) {
    setTimeout(() => {
      isFlipped.value = false
    }, 15000) // Reset flip after 15 seconds
  }
}

</script>

<template>
  <div class="flip-card" @click="toggleFlip">
    <div class="flip-card-inner" :class="{ flipped: isFlipped }">
      <!-- Front Side -->
      <div class="flip-card-front hover:shadow-lg transition-shadow duration-300">
        <img :src="image" alt="" class="w-full h-48 object-cover rounded-t-lg" />
        <div class="p-5">
          <h3 class="font-semibold text-lg text-gray-900 mb-2 transition-colors duration-300 hover:text-[#2f3193]">
            {{ title }}
          </h3>
          <p class="text-gray-600 mb-4">{{ description }}</p>
        </div>
      </div>

      <!-- Back Side -->
      <div class="flip-card-back">
        <div class="p-5 flex flex-col justify-center items-center h-full bg-[#2f3193] text-white rounded-lg">
          <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
          <p class="mb-4 text-center">{{ description }}</p>
          <a href="#" class="text-white font-semibold underline hover:no-underline transition">
            View Tests →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  perspective: 1000px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.flip-card-front {
  background: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
}

.flip-card-back {
  transform: rotateY(180deg);
}

</style>
