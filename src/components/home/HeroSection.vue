<script setup>
import { ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const propertyTypes = ['Residential', 'Commercial', 'Land', 'Industrial'];
const purposes = ['Buy', 'Rent'];
const selectedType = ref(propertyTypes[0]);
const selectedPurpose = ref(purposes[0]);
const location = ref('');

const popularLocations = [
  'Kololo', 'Nakasero', 'Ntinda', 'Bugolobi', 'Muyenga', 'Naguru'
];

const handleSearch = () => {
  console.log('Search params:', {
    type: selectedType.value,
    purpose: selectedPurpose.value,
    location: location.value
  });
};
</script>

<template>
  <section class="relative h-screen pt-8">
    <!-- Hero Background -->
    <div class="absolute inset-0 -top-18">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        class="w-full h-full object-cover"
        alt="Property Hero"
      />
      <div class="absolute inset-0 bg-gray-900/80"></div>
    </div>

    <!-- Content Container with proper z-index -->
    <div class="relative z-10 h-full flex items-center justify-center">
      <div class="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <!-- Main Content Area -->
        <div class="text-center space-y-4">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
            <span class="text-white">Discover Your Dream</span>
            <br>
            <span class="text-primary-400">Property in Uganda</span>
          </h1>
          <p class="text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-4">
            Browse through 200,000+ verified properties for sale and rent
          </p>

          <!-- Search Form -->
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <!-- Main Search Fields -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select v-model="selectedType"
                        class="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white px-3 py-2 text-gray-900">
                  <option v-for="type in propertyTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Purpose
                </label>
                <select v-model="selectedPurpose"
                        class="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white px-3 py-2 text-gray-900">
                  <option v-for="purpose in purposes" :key="purpose" :value="purpose">
                    {{ purpose }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input type="text"
                       v-model="location"
                       placeholder="Enter location..."
                       class="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400 px-3 py-2 text-gray-900" />
              </div>
              <div class="flex flex-col justify-end">
                <button @click="handleSearch"
                        class="w-full cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center">
                  <MagnifyingGlassIcon class="h-4 w-4 mr-2" />
                  Search
                </button>
              </div>
            </div>

            <!-- Popular Locations -->
            <div class="border-t border-gray-200 pt-3">
              <div class="text-sm text-gray-600 mb-2">
                Popular Locations:
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="loc in popularLocations"
                        :key="loc"
                        @click="location = loc"
                        class="px-3 py-1 text-sm cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors">
                  {{ loc }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>