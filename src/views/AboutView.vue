<template>
  <section class="bg-white py-5 px-4">
    <h2 class="text-4xl font-bold text-center mb-20 text-gray-900">About Us</h2>

    <div class="relative w-full ">
      <!-- Navigation Buttons outside the slider container for spacing -->
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

      <!-- SLIDER CONTAINER -->
      <div
        class="relative max-w-6xl mx-auto overflow-hidden rounded-xl bg-[#F3F4F6]"
        style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
        ref="sliderContainer"
        @touchstart="startTouch"
        @touchend="endTouch"
      >
        <!-- Slides Wrapper -->
        <div
          ref="slider"
          class="flex transition-all duration-700 ease-in-out"
          :style="{
            transform: `translateX(-${currentIndex * 100}%)`,
            opacity: transitioning ? 0.7 : 1,
          }"
        >
          <!-- Slides (unchanged) -->
          <div class="min-w-full flex flex-col md:flex-row items-center justify-between px-0">
            <div class="md:w-1/2 p-6">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p class="text-gray-600 mb-4">
                Our mission is to deliver precise, affordable diagnostics using cutting-edge
                technology and compassionate care.
              </p>
              <button
                class="bg-[#2f3193] text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                Learn More
              </button>
            </div>
            <div class="md:w-1/2 p-0">
              <div class="relative rounded-r-xl shadow-md overflow-hidden w-full">
                <img
                  src="/images/lab_images/6.jpg"
                  alt="Mission"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/0"></div>
              </div>
            </div>
          </div>

          <div class="min-w-full flex flex-col md:flex-row items-center justify-between px-0">
            <div class="md:w-1/2 p-6">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Our Experts</h3>
              <p class="text-gray-600 mb-4">
                Our expert team includes top lab technicians and specialists ensuring quick,
                reliable reports.
              </p>
              <button
                class="bg-[#2f3193] text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                Meet the Team
              </button>
            </div>
            <div class="md:w-1/2 p-0">
              <div class="relative rounded-r-xl shadow-md overflow-hidden w-full">
                <img
                  src="/images/lab_images/5.jpg"
                  alt="Mission"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/0"></div>
              </div>
            </div>
          </div>

          <div class="min-w-full flex flex-col md:flex-row items-center justify-between px-0">
            <div class="md:w-1/2 p-6">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Modern Tech</h3>
              <p class="text-gray-600 mb-4">
                Equipped with AI-powered diagnostics and top-tier equipment for the fastest
                turnaround times.
              </p>
              <button
                class="bg-[#2f3193] text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                Explore Technology
              </button>
            </div>
            <div class="md:w-1/2 p-0">
              <div class="relative rounded-r-xl shadow-md overflow-hidden w-full">
                <img
                  src="/images/lab_images/7.jpg"
                  alt="Mission"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/0"></div>
              </div>
            </div>
          </div>
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

// Fade effect on slide change
watch(currentIndex, () => {
  transitioning.value = true
  setTimeout(() => {
    transitioning.value = false
  }, 400)
})

// Manual Slide Navigation
function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides
}
function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides
}

// Scroll Navigation
let isScrolling = false
function handleWheelScroll(e: WheelEvent) {
  if (isScrolling) return
  isScrolling = true

  e.deltaY > 0 ? nextSlide() : prevSlide()

  setTimeout(() => (isScrolling = false), 1000)
}

// Touch Swipe
let touchStartX = 0
function startTouch(e: TouchEvent) {
  touchStartX = e.changedTouches[0].clientX
}
function endTouch(e: TouchEvent) {
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchEndX - touchStartX

  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      nextSlide() // Swipe left
    } else {
      prevSlide() // Swipe right
    }
  }
}

// Auto Slide
let autoSlideInterval: number
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 13000) // 6 seconds
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
/* Optional smoother fade */
</style>
