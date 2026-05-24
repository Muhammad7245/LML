<template>
  <section class="bg-white py-12 px-4">
    <h2 class="text-4xl font-bold text-center mb-16 text-gray-900">About Us</h2>

    <div class="relative w-full">
      <!-- Navigation Buttons -->
      <button
        class="absolute top-1/2 -translate-y-1/2 left-2 md:left-8 z-20 bg-white border border-gray-300 shadow-lg p-3 rounded-full hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300"
        @click="prevSlide"
      >
        <ChevronLeftIcon class="w-6 h-6" />
      </button>

      <button
        class="absolute top-1/2 -translate-y-1/2 right-2 md:right-8 z-20 bg-white border border-gray-300 shadow-lg p-3 rounded-full hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300"
        @click="nextSlide"
      >
        <ChevronRightIcon class="w-6 h-6" />
      </button>

      <!-- SLIDER -->
      <div
        ref="sliderContainer"
        class="relative max-w-6xl mx-auto overflow-hidden rounded-2xl bg-[#F3F4F6] shadow-xl"
        @touchstart="startTouch"
        @touchend="endTouch"
      >
        <div
          ref="slider"
          class="flex transition-all duration-700 ease-in-out"
          :style="{
            transform: `translateX(-${currentIndex * 100}%)`,
            opacity: transitioning ? 0.6 : 1,
          }"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="min-w-full flex flex-col md:flex-row items-center justify-between px-0"
          >
            <div class="md:w-1/2 p-6 animate-fade-in">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">{{ slide.title }}</h3>
              <p class="text-gray-600 mb-4">{{ slide.description }}</p>
              <button
                class="bg-[#2f3193] text-white px-5 py-2 rounded hover:bg-blue-700 transition-all duration-300"
              >
                {{ slide.buttonText }}
              </button>
            </div>
            <div class="md:w-1/2">
              <div class="relative rounded-xl shadow-md overflow-hidden w-full">
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="w-full h-80 object-cover md:h-full transition-transform duration-700 hover:scale-105"
                />
                <div class="absolute inset-0 bg-black/0"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicators -->
        <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button
            v-for="(_, index) in slides"
            :key="index"
            class="w-3 h-3 rounded-full"
            :class="{
              'bg-blue-600': currentIndex === index,
              'bg-gray-300': currentIndex !== index,
            }"
            @click="currentIndex = index"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

const currentIndex = ref(0)
const totalSlides = 3
const transitioning = ref(false)
const sliderContainer = ref<HTMLElement | null>(null)

const slides = [
  {
    title: 'Our Mission',
    description:
      'Our mission is to deliver precise, affordable diagnostics using cutting-edge technology and compassionate care.',
    buttonText: 'Learn More',
    image: '/images/lab_images/6.jpg',
  },
  {
    title: 'Our Experts',
    description:
      'Our expert team includes top lab technicians and specialists ensuring quick, reliable reports.',
    buttonText: 'Meet the Team',
    image: '/images/lab_images/5.jpg',
  },
  {
    title: 'Modern Tech',
    description:
      'Equipped with AI-powered diagnostics and top-tier equipment for the fastest turnaround times.',
    buttonText: 'Explore Technology',
    image: '/images/lab_images/7.jpg',
  },
]

watch(currentIndex, () => {
  transitioning.value = true
  setTimeout(() => {
    transitioning.value = false
  }, 400)
})

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides
}
function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides
}

let isScrolling = false
function handleWheelScroll(e: WheelEvent) {
  if (isScrolling) return
  isScrolling = true

  e.deltaY > 0 ? nextSlide() : prevSlide()

  setTimeout(() => (isScrolling = false), 1000)
}

let touchStartX = 0
function startTouch(e: TouchEvent) {
  touchStartX = e.changedTouches[0].clientX
}
function endTouch(e: TouchEvent) {
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchEndX - touchStartX
  if (Math.abs(diff) > 50) {
    diff < 0 ? nextSlide() : prevSlide()
  }
}

let autoSlideInterval: number
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 10000)
}
function stopAutoSlide() {
  clearInterval(autoSlideInterval)
}

onMounted(() => {
  window.addEventListener('wheel', handleWheelScroll, { passive: true })
  startAutoSlide()
})
onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleWheelScroll)
  stopAutoSlide()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-in-out;
}
</style>
