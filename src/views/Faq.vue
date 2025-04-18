<template>
  <div class="max-w-3xl mx-auto px-4 py-5">
    <h2 class="text-4xl font-extrabold text-gray-800 text-center mb-4">Frequently Asked Questions</h2>
    <p class="text-center text-gray-500 mb-8">
      Find answers to common questions about our laboratory services and processes.
    </p>

    <div v-for="(item, index) in faqs" :key="index" class="mb-4">
      <button
        @click="toggle(index)"
        class="w-full flex justify-between items-center bg-white shadow-md rounded-lg px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
      >
        <span>{{ item.question }}</span>
        <svg
          :class="{ 'rotate-180': openIndex === index }"
          class="w-5 h-5 transition-transform"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        v-if="openIndex === index"
        class="bg-gray-50 px-6 py-4 text-gray-600 rounded-b-lg border-t border-gray-200"
      >
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = ref([
  {
    question: 'Do I need a doctor’s order for laboratory tests?',
    answer:
      'Yes, most laboratory tests require a doctor’s order. However, we do offer some direct-to-consumer tests that don’t require a prescription. Please check our test catalog or contact us for more information about specific tests.',
  },
  {
    question: 'How do I prepare for blood tests?',
    answer:
      'Preparation can vary depending on the test. Some may require fasting or avoiding certain medications. Please refer to the test details or contact us for guidance.',
  },
  {
    question: 'How long will it take to get my test results?',
    answer:
      'Most test results are available within 24–72 hours. However, some specialized tests may take longer. You’ll be notified once your results are ready.',
  },
  {
    question: 'Does insurance cover laboratory tests?',
    answer:
      'Most insurance plans do cover medically necessary laboratory tests. Check with your provider or our billing department for more details.',
  },
  {
    question: 'Can I walk in for a test, or do I need an appointment?',
    answer:
      'Appointments are recommended to ensure minimal wait time, but walk-ins are welcome at most of our locations.',
  },
  {
  question: 'Can I eat or drink before my lab test?',
  answer:
    'For some lab tests, fasting is required for accurate results. Please follow the instructions provided or contact us if you',
},
])
</script>

<style scoped>
/* Optional: Smooth transitions for open/close if you want */
</style>
