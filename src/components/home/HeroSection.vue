<script setup>
import { ref } from 'vue';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline';

const propertyTypes = ['Residential', 'Commercial', 'Land', 'Industrial'];
const purposes = ['Buy', 'Rent'];
const selectedType = ref(propertyTypes[0]);
const selectedPurpose = ref(purposes[0]);
const location = ref('');
const minPrice = ref('');
const maxPrice = ref('');
const showAdvancedFilters = ref(false);

const propertyFeatures = [
  { id: 'bedrooms', label: 'Bedrooms', options: ['1+', '2+', '3+', '4+', '5+'] },
  { id: 'bathrooms', label: 'Bathrooms', options: ['1+', '2+', '3+', '4+'] },
  { id: 'amenities', label: 'Amenities', options: ['Swimming Pool', 'Gym', 'Security', 'Parking'] }
];

const selectedFilters = ref({
  bedrooms: '',
  bathrooms: '',
  amenities: []
});

const popularLocations = [
  'Kololo', 'Nakasero', 'Ntinda', 'Bugolobi', 'Muyenga', 'Naguru'
];

const handleSearch = () => {
  console.log('Search params:', {
    type: selectedType.value,
    purpose: selectedPurpose.value,
    location: location.value,
    priceRange: [minPrice.value, maxPrice.value],
    filters: selectedFilters.value
  });
};
</script>

<template>
  <section class="relative h-[700px]">
    <!-- Hero Background with Enhanced Overlay -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        class="w-full h-full object-cover"
        alt="Property Hero"
      />
    </div>

    <!-- Search Container -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Find Your Perfect Home in Uganda
        </h1>
        <p class="text-xl md:text-2xl text-white mb-2 drop-shadow-md">
          200,000+ Properties for Sale and Rent
        </p>
      </div>

      <!-- Search Form -->
      <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 max-w-4xl mx-auto w-full">
        <!-- Main Search Fields -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select v-model="selectedType" 
                    class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white">
              <option v-for="type in propertyTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <select v-model="selectedPurpose"
                    class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white">
              <option v-for="purpose in purposes" :key="purpose" :value="purpose">
                {{ purpose }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text"
                   v-model="location"
                   placeholder="Enter location"
                   class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 placeholder-gray-400" />
          </div>
          <div class="flex flex-col justify-end">
            <button @click="handleSearch"
                    class="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center">
              <MagnifyingGlassIcon class="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </div>

        <!-- Popular Locations -->
        <div class="mb-4">
          <div class="text-sm text-gray-600 mb-2">Popular Locations:</div>
          <div class="flex flex-wrap gap-2">
            <button v-for="loc in popularLocations" 
                    :key="loc"
                    @click="location = loc"
                    class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors">
              {{ loc }}
            </button>
          </div>
        </div>

        <!-- Advanced Filters Toggle -->
        <button @click="showAdvancedFilters = !showAdvancedFilters"
                class="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
          <AdjustmentsHorizontalIcon class="h-4 w-4 mr-1" />
          {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced Filters
        </button>

        <!-- Advanced Filters -->
        <div v-if="showAdvancedFilters" 
             class="mt-4 pt-4 border-t border-gray-200 transition-all duration-300">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <!-- Price Range -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Price Range</label>
              <div class="grid grid-cols-2 gap-2">
                <input type="number" 
                       v-model="minPrice"
                       placeholder="Min Price"
                       class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 placeholder-gray-400" />
                <input type="number"
                       v-model="maxPrice"
                       placeholder="Max Price"
                       class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 placeholder-gray-400" />
              </div>
            </div>

            <!-- Property Features -->
            <div v-for="feature in propertyFeatures" :key="feature.id" class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">{{ feature.label }}</label>
              <select v-if="feature.id !== 'amenities'"
                      v-model="selectedFilters[feature.id]"
                      class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white">
                <option value="">Any</option>
                <option v-for="option in feature.options" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div v-else class="space-y-2">
                <label v-for="option in feature.options" 
                       :key="option"
                       class="flex items-center space-x-2">
                  <input type="checkbox"
                         :value="option"
                         v-model="selectedFilters.amenities"
                         class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span class="text-sm text-gray-700">{{ option }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>