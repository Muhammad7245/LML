<script setup lang="ts">
import ServiceCard from '@/components/cards/ServiceCard.vue'

const cards = [
  {
    title: 'Blood Testing',
    description:
      'Comprehensive blood panels including CBC, metabolic panels, cholesterol screening, and specialized tests.',
    image: '/images/card_images/1.png',
  },
  {
    title: 'Diagnostic Imaging',
    description:
      'X-rays, ultrasounds, MRIs, and CT scans with expert interpretation by certified radiologists.',
    image: '/images/card_images/2.png',
  },
  {
    title: 'Health Screenings',
    description:
      'Preventive health screenings including cardiac risk assessment, diabetes screening, and cancer markers.',
    image: '/images/card_images/3.png',
  },
  {
    title: 'Pathology Services',
    description:
      'Tissue analysis, cytology, histopathology, and other specialized pathological examinations.',
    image: '/images/card_images/4.png',
  },
  {
    title: 'COVID-19 Testing',
    description: 'PCR, antigen, and antibody testing for COVID-19 with quick turnaround times.',
    image: '/images/card_images/5.png',
  },
  {
    title: 'Genetic Testing',
    description:
      'DNA analysis for hereditary conditions, carrier screening, and pharmacogenetic testing.',
    image: '/images/card_images/6.png',
  },
]
</script>

<template>
  <section class="main-container bg-gray-100 py-16">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-4xl font-extrabold text-gray-800 mb-2">Our Laboratory Services</h2>
      <p class="text-black mb-10">
        Comprehensive diagnostic testing and medical laboratory services with accurate and timely
        results.
      </p>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :description="card.description"
          :image="card.image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
