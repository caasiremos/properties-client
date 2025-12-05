<script setup>
import { ref, computed } from 'vue';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import PropertyCard from '../components/property/PropertyCard.vue';
import PropertyFilters from '../components/filters/PropertyFilters.vue';
import { furnishedProperties } from '../data/properties';

const showFilters = ref(false);
const sortBy = ref('newest');

const propertyTypes = ['Apartment', 'House', 'Villa', 'Studio', 'Penthouse'];
const amenities = [
  'Furnished', 'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Internet', 'Housekeeping', 'Balcony'
];

const selectedFilters = ref({
  priceRange: [0, 6000],
  propertyTypes: [],
  bedrooms: '',
  amenities: []
});

const filteredProperties = computed(() => {
  return furnishedProperties.filter(property => {
    const matchesPrice = property.price >= selectedFilters.value.priceRange[0] && 
                        property.price <= selectedFilters.value.priceRange[1];
    const matchesType = selectedFilters.value.propertyTypes.length === 0 || 
                       selectedFilters.value.propertyTypes.includes(property.type);
    const matchesBedrooms = !selectedFilters.value.bedrooms || 
                           property.bedrooms >= parseInt(selectedFilters.value.bedrooms);
    const matchesAmenities = selectedFilters.value.amenities.length === 0 || 
                            selectedFilters.value.amenities.every(amenity => 
                              property.amenities.includes(amenity));
    
    return matchesPrice && matchesType && matchesBedrooms && matchesAmenities;
  });
});

const sortedProperties = computed(() => {
  const sorted = [...filteredProperties.value];

  switch (sortBy.value) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
    default:
      return sorted;
  }
});

const clearFilters = () => {
  selectedFilters.value = {
    priceRange: [0, 6000],
    propertyTypes: [],
    bedrooms: '',
    amenities: []
  };
};

const toggleFilter = () => {
  showFilters.value = !showFilters.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Furnished Properties</h1>
        <p class="mt-2 text-gray-600">Discover fully furnished properties in Uganda</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div :class="[
          'lg:w-1/4 bg-white rounded-lg shadow-xs p-6',
          showFilters ? 'fixed inset-0 z-40 lg:relative lg:inset-auto overflow-y-auto' : 'hidden lg:block'
        ]">
          <PropertyFilters
            :property-types="propertyTypes"
            :amenities="amenities"
            v-model:selected-filters="selectedFilters"
            @clear-filters="clearFilters"
          />

          <!-- Mobile Close Button -->
          <button @click="toggleFilter"
                  class="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#DC2626] text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200">
            Apply Filters
          </button>
        </div>

        <!-- Main Content -->
        <div class="lg:w-3/4">
          <!-- Controls -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <!-- Mobile Filter Button and Property Count -->
            <div class="flex items-center justify-between w-full sm:w-auto">
              <button @click="toggleFilter"
                      class="lg:hidden flex items-center gap-2 text-gray-700 font-medium">
                <FunnelIcon class="h-5 w-5" />
                <span>Filters</span>
              </button>
              <span class="text-sm text-gray-600 sm:hidden">
                {{ sortedProperties.length }} {{ sortedProperties.length === 1 ? 'property' : 'properties' }}
              </span>
            </div>
            
            <!-- Desktop Property Count and Sort -->
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <span class="hidden sm:inline text-sm text-gray-600">
                {{ sortedProperties.length }} {{ sortedProperties.length === 1 ? 'property' : 'properties' }} found
              </span>
              <select v-model="sortBy"
                      class="w-full sm:w-auto rounded-md border-gray-300 focus:border-[#DC2626] focus:ring-[#DC2626] text-sm">
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <!-- Properties Grid -->
          <div v-if="sortedProperties.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyCard v-for="property in sortedProperties"
                         :key="property.id"
                         :property="property" />
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-16">
            <div class="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p class="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any furnished properties matching your search criteria. Try adjusting your filters.
            </p>
            <button @click="clearFilters"
                    type="button"
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#DC2626] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DC2626] transition-colors duration-200">
              Clear all filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
