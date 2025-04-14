<script setup lang="ts">
import { ref } from 'vue'


const tabs = [
  'All',
  'Blood Testing',
  'Diagnostic Imaging',
  'Health Screenings',
  'Pathology Services',
  'COVID-19 Testing',
  'Genetic Testing',
]

const activeTab = ref('All')

const tests = [
  {
    category: 'Blood Testing',
    name: 'Complete Blood Count (CBC)',
    description: 'Measures red and white blood cells, hemoglobin, and platelets',
    price: '$45.00',
    turnaround: '24 hours',
  },
  {
    category: 'Blood Testing',
    name: 'Comprehensive Metabolic Panel',
    description: 'Measures glucose, electrolyte, kidney and liver function',
    price: '$65.00',
    turnaround: '24-48 hours',
  },
  {
    category: 'Blood Testing',
    name: 'Lipid Panel',
    description: 'Measures cholesterol levels to assess heart disease risk',
    price: '$50.00',
    turnaround: '24 hours',
  },
  {
    category: 'Blood Testing',
    name: 'HbA1c',
    description: 'Measures average blood glucose levels over the past 2-3 months',
    price: '$55.00',
    turnaround: '24-48 hours',
  },
  {
    category: 'Blood Testing',
    name: 'Thyroid Function Panel',
    description: 'Assesses thyroid function with TSH, T3, and T4 measurements',
    price: '$85.00',
    turnaround: '48 hours',
  },
  {
    category: 'Diagnostic Imaging',
    name: 'X-Ray',
    description: 'Standard X-ray imaging for bones and certain internal organs',
    price: '$95.00',
    turnaround: 'Same day',
  },
  {
    category: 'Diagnostic Imaging',
    name: 'Ultrasound',
    description: 'Imaging using sound waves to examine internal organs',
    price: '$150.00',
    turnaround: 'Same day',
  },
  {
    category: 'Health Screenings',
    name: 'Health Checkup Basic',
    description: 'General health assessment including basic blood work and physical exam',
    price: '$120.00',
    turnaround: '48 hours',
  },
  {
    category: 'COVID-19 Testing',
    name: 'COVID-19 PCR Test',
    description: 'Gold standard for COVID-19 detection',
    price: '$75.00',
    turnaround: '24-48 hours',
  },
  {
    category: 'Genetic Testing',
    name: 'BRCA1/BRCA2 Gene Test',
    description: 'Genetic screening for breast and ovarian cancer risk',
    price: '$300.00',
    turnaround: '5-7 days',
  },
  {
    category: 'Genetic Testing',
    name: 'Carrier Screening',
    description: 'Genetic test to check for inherited conditions before pregnancy',
    price: '$250.00',
    turnaround: '4-6 days',
  },
  {
    category: 'Pathology Services',
    name: 'Biopsy Analysis',
    description: 'Lab analysis of tissue sample to detect disease',
    price: '$200.00',
    turnaround: '3-5 days',
  },
]
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center mb-2">Test Catalog & Pricing</h2>
    <p class="text-center text-gray-600 mb-8">Browse our comprehensive list of available tests with transparent pricing.</p>

    <!-- Tabs -->
    <div class="flex flex-wrap justify-center gap-3 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        class="px-4 py-2 rounded-full border transition duration-300 text-sm font-medium"
        :class="{
          'bg-blue-600 text-white': activeTab === tab,
          'bg-white text-gray-700 border-gray-300 hover:bg-blue-50': activeTab !== tab,
        }"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto shadow rounded-lg border border-gray-200">
  <table class="min-w-full bg-white text-sm border-separate border-spacing-0">
    <thead class="bg-blue-50 text-gray-800 uppercase text-xs">
      <tr>
        <th class="px-6 py-4 text-left border-b border-gray-300">Test Name</th>
        <th class="px-6 py-4 text-left border-b border-gray-300">Description</th>
        <th class="px-6 py-4 text-left border-b border-gray-300">Price</th>
        <th class="px-6 py-4 text-left border-b border-gray-300">Turnaround</th>
        <th class="px-6 py-4 text-left border-b border-gray-300">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="test in tests.filter((t) => activeTab === 'All' || t.category === activeTab)"
        :key="test.name"
        class="hover:bg-gray-50 transition"
      >
        <td class="px-6 py-4 text-gray-900 border-t border-gray-200">{{ test.name }}</td>
        <td class="px-6 py-4 text-gray-700 border-t border-gray-200">{{ test.description }}</td>
        <td class="px-6 py-4 text-gray-900 border-t border-gray-200">{{ test.price }}</td>
        <td class="px-6 py-4 text-gray-700 border-t border-gray-200">{{ test.turnaround }}</td>
        <td class="px-6 py-4 border-t border-gray-200">
          <a href="#" class="text-blue-600 hover:text-blue-800 font-semibold transition">Book</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  </section>
</template>
