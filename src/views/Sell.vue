<script setup>
import PropertyValuationForm from '../components/sell/PropertyValuationForm.vue';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

const benefits = [
  {
    title: 'Free Property Valuation',
    description: 'Get an accurate estimate of your property\'s worth in the current market'
  },
  {
    title: 'Professional Photography',
    description: 'We provide professional photography services to showcase your property'
  },
  {
    title: 'Wide Exposure',
    description: 'Your property will be marketed to thousands of potential buyers'
  },
  {
    title: 'Expert Guidance',
    description: 'Our experienced agents will guide you through the entire selling process'
  }
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-primary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">Sell Your Property with Confidence</h1>
          <p class="text-xl text-primary-100">Get the best value for your property with our expert guidance</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Benefits Section -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Why Sell with Us?</h2>
          <div class="space-y-6">
            <div v-for="benefit in benefits" 
                 :key="benefit.title"
                 class="flex items-start">
              <CheckCircleIcon class="h-6 w-6 text-primary-600 mt-1 mr-4" />
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ benefit.title }}</h3>
                <p class="text-gray-600">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Valuation Form -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Get a Free Property Valuation</h2>
          <PropertyValuationForm />
        </div>
      </div>
    </div>
  </div>
</template>