<script setup>
import { ref } from 'vue';
import SectionHeader from '../ui/SectionHeader.vue';
import PropertyCard from '../property/PropertyCard.vue';

const activeTab = ref('sale');

const tabs = [
  { id: 'sale', label: 'For Sale' },
  { id: 'rent', label: 'For Rent' },
  { id: 'new', label: 'New Developments' }
];

const properties = [
  {
    id: 1,
    title: 'Modern Villa in Kololo',
    price: 450000,
    location: 'Kololo, Kampala',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Luxury Apartment in Nakasero',
    price: 320000,
    location: 'Nakasero, Kampala',
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Family Home in Ntinda',
    price: 280000,
    location: 'Ntinda, Kampala',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3'
  }
];
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        title="Featured Properties"
        subtitle="Discover our hand-picked properties"
        actionText="View all properties"
        actionLink="/properties"
      />

      <!-- Tabs -->
      <div class="flex justify-center mb-8">
        <nav class="flex space-x-4" aria-label="Property categories">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md',
              activeTab === tab.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Property Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :property="property"
        />
      </div>
    </div>
  </section>
</template>