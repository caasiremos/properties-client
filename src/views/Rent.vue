<script setup>
import { ref, computed } from 'vue';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import PropertyCard from '../components/property/PropertyCard.vue';
import PropertyFilters from '../components/filters/PropertyFilters.vue';
import { rentalProperties } from '../data/rentalProperties';

const showFilters = ref(false);
const sortBy = ref('newest');

const propertyTypes = ['Apartment', 'House', 'Studio', 'Villa', 'Commercial', 'Penthouse'];
const amenities = [
  'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Internet', 'Furnished', 'Housekeeping'
];

const selectedFilters = ref({
  priceRange: [0, 5000],
  propertyTypes: [],
  bedrooms: '',
  amenities: []
});

const filteredProperties = computed(() => {
  return rentalProperties.filter(property => {
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

const clearFilters = () => {
  selectedFilters.value = {
    priceRange: [0, 5000],
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
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Properties for Rent</h1>
        <p class="mt-2 text-gray-600">Find your perfect rental property in Uganda</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div :class="[
          'lg:w-1/4 bg-white rounded-lg shadow-sm p-6',
          showFilters ? 'fixed inset-0 z-40 lg:relative lg:inset-auto' : 'hidden lg:block'
        ]">
          <PropertyFilters
            :property-types="propertyTypes"
            :amenities="amenities"
            v-model:selected-filters="selectedFilters"
            @clear-filters="clearFilters"
          />

          <!-- Mobile Close Button -->
          <button @click="toggleFilter"
                  class="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-6 py-2 rounded-full shadow-lg">
            Apply Filters
          </button>
        </div>

        <!-- Main Content -->
        <div class="lg:w-3/4">
          <!-- Controls -->
          <div class="flex justify-between items-center mb-6">
            <button @click="toggleFilter"
                    class="lg:hidden flex items-center text-gray-700">
              <FunnelIcon class="h-5 w-5 mr-2" />
              Filters
            </button>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">
                {{ filteredProperties.length }} properties found
              </span>
              <select v-model="sortBy"
                      class="rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500">
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <!-- Properties Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyCard v-for="property in filteredProperties"
                         :key="property.id"
                         :property="property" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>