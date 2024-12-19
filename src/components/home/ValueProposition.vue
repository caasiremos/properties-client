<script setup>
import { ChartBarIcon, UsersIcon, CheckBadgeIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';

const stats = [
  { id: 1, name: 'Total Properties', value: '200,000+', icon: ChartBarIcon },
  { id: 2, name: 'Active Users', value: '50,000+', icon: UsersIcon },
  { id: 3, name: 'Successful Transactions', value: '15,000+', icon: CheckBadgeIcon },
  { id: 4, name: 'Property Value', value: '$2B+', icon: CurrencyDollarIcon },
];

const features = [
  {
    title: 'Virtual Tours',
    description: 'Experience properties from anywhere with our immersive 3D virtual tours',
    icon: '🏠'
  },
  {
    title: 'Verified Listings',
    description: 'All properties are verified by our team for authenticity',
    icon: '✓'
  },
  {
    title: 'Professional Photos',
    description: 'High-quality professional photography for all listed properties',
    icon: '📸'
  },
  {
    title: 'Fixed Fee Structure',
    description: 'Transparent pricing with no hidden costs',
    icon: '💰'
  }
];
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 mb-16">
        <div v-for="stat in stats" 
             :key="stat.id"
             class="bg-gray-50 rounded-lg p-6 text-center">
          <component :is="stat.icon" 
                    class="h-8 w-8 mx-auto mb-3 text-primary-600" />
          <div class="text-2xl font-bold text-gray-900 mb-1">{{ stat.value }}</div>
          <div class="text-sm text-gray-600">{{ stat.name }}</div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="feature in features" 
             :key="feature.title"
             class="text-center">
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>