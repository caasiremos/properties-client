<script setup>
import Stats from '@/components/dashboard/Stats.vue';
import { 
  UserIcon, 
  HomeIcon, 
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline';

import { rentalProperties } from '@/data/rentalProperties.js';

const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Villa in Kololo',
    price: 'UGX 850M',
    type: 'For Sale',
    status: 'Featured',
    image: 'https://placehold.co/400x300'
  },
  {
    id: 2,
    title: 'Modern Apartment in Nakasero',
    price: 'UGX 2.5M/mo',
    type: 'For Rent',
    status: 'Featured',
    image: 'https://placehold.co/400x300'
  },
  {
    id: 3,
    title: 'Commercial Space in Bugolobi',
    price: 'UGX 450M',
    type: 'For Sale',
    status: 'Featured',
    image: 'https://placehold.co/400x300'
  }
];
</script>

<template>
  <div class="container mx-auto px-4 py-4">
    <Stats />

    <!-- Featured Properties -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900">Featured Properties</h2>
        <a href="/agent/properties" class="text-sm font-medium text-primary-600 hover:text-primary-700">View all properties</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="property in rentalProperties" :key="property.id" class="bg-white rounded-lg shadow-sm overflow-hidden">
          <img :src="property.image" :alt="property.title" class="w-full h-48 object-cover">
          <div class="p-4">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ property.title }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ property.type }}</p>
              </div>
              <p class="text-sm font-medium text-primary-600">{{ property.price }}</p>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {{ property.status }}
              </span>
              <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-700">View details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>