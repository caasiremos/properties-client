<script setup>
import { ref, computed } from 'vue';
import SectionHeader from '../ui/SectionHeader.vue';
import PropertyCard from '../property/PropertyCard.vue';

const activeTab = ref('sale');
const isLoading = ref(false);

const tabs = [
  { id: 'sale', label: 'For Sale', count: 12 },
  { id: 'rent', label: 'For Rent', count: 8 },
  { id: 'new', label: 'New Developments', count: 5 }
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
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3',
    featured: true,
    new: false
  },
  {
    id: 2,
    title: 'Luxury Apartment in Nakasero',
    price: 320000,
    location: 'Nakasero, Kampala',
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3',
    featured: false,
    new: true
  },
  {
    id: 3,
    title: 'Family Home in Ntinda',
    price: 280000,
    location: 'Ntinda, Kampala',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3',
    featured: false,
    new: false
  },
  {
    id: 4,
    title: 'Penthouse in Bugolobi',
    price: 520000,
    location: 'Bugolobi, Kampala',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3',
    featured: true,
    new: false
  },
  {
    id: 5,
    title: 'Studio Apartment in Kisementi',
    price: 120000,
    location: 'Kisementi, Kampala',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3',
    featured: false,
    new: true
  },
  {
    id: 6,
    title: 'Townhouse in Muyenga',
    price: 380000,
    location: 'Muyenga, Kampala',
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3',
    featured: true,
    new: false
  }
];

const filteredProperties = computed(() => {
  if (activeTab.value === 'new') {
    return properties.filter(p => p.new);
  }
  return properties;
});

const switchTab = (tabId) => {
  isLoading.value = true;
  setTimeout(() => {
    activeTab.value = tabId;
    isLoading.value = false;
  }, 300);
};
</script>

<template>
  <section class="px-4 lg:px-16 py-12 bg-gray-50 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="mb-8">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">Featured Listings</h2>
      </div>

      <!-- Property Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard
          v-for="property in properties.slice(0, 3)"
          :key="property.id"
          :property="property"
          class="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        />
      </div>
    </div>
  </section>
</template>