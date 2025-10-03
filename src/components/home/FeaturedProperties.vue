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
  <section class="pt-20 pb-16 bg-gray-50 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <SectionHeader
        title="Featured Properties"
        actionLink="/properties"
      />

      <!-- Enhanced Tabs -->
      <div class="flex justify-center mb-12">
        <nav class="inline-flex items-center bg-white rounded-xl shadow-sm border border-gray-200 p-1" aria-label="Property categories">
          <div class="flex items-center space-x-1">
            <button
              v-for="(tab, index) in tabs"
              :key="tab.id"
              @click="switchTab(tab.id)"
              :class="[
                'relative flex items-center justify-center cursor-pointer px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-out',
                'rounded-lg border border-transparent min-w-[100px]',
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg z-10 transform scale-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200'
              ]"
              :style="{
                marginLeft: index === 0 ? '0' : '2px',
                marginRight: index === tabs.length - 1 ? '0' : '2px'
              }"
            >
              <span class="flex items-center justify-center space-x-1.5 whitespace-nowrap">
                <span class="font-medium">{{ tab.label }}</span>
                <span v-if="tab.count"
                      :class="[
                        'inline-flex items-center justify-center text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px]',
                        activeTab === tab.id
                          ? 'bg-primary-700 text-white'
                          : 'bg-gray-100 text-gray-600'
                      ]">
                  {{ tab.count }}
                </span>
              </span>
            </button>
          </div>
        </nav>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="flex space-x-4">
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Property Grid -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-4"
        mode="out-in"
      >
        <div v-if="!isLoading" key="properties" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <PropertyCard
            v-for="property in filteredProperties"
            :key="property.id"
            :property="property"
            class="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          />
        </div>
      </Transition>

      <!-- Empty State -->
      <div v-if="!isLoading && filteredProperties.length === 0" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
        <p class="text-gray-500">Try adjusting your filters or check back later for new listings.</p>
      </div>
    </div>
  </section>
</template>