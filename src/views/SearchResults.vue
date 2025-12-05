<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import PropertyCard from '../components/property/PropertyCard.vue';
import PropertyFilters from '../components/filters/PropertyFilters.vue';
import { getPropertiesByCategory } from '../data/properties';

const route = useRoute();
const router = useRouter();

const showFilters = ref(false);
const sortBy = ref('newest');
const newSearchQuery = ref('');

// Get category from URL params
const category = computed(() => route.query.type || 'buy');
const searchQuery = computed(() => route.query.q || '');

// Property types and amenities based on category
const propertyTypesMap = {
  buy: ['House', 'Apartment', 'Villa', 'Land', 'Commercial'],
  rent: ['Apartment', 'House', 'Studio', 'Villa', 'Commercial'],
  furnished: ['Apartment', 'House', 'Villa', 'Studio', 'Penthouse']
};

const amenitiesMap = {
  buy: ['Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Balcony'],
  rent: ['Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Internet', 'Housekeeping'],
  furnished: ['Furnished', 'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Internet', 'Housekeeping', 'Balcony']
};

const priceRangeMap = {
  buy: [0, 1000000],
  rent: [0, 5000],
  furnished: [0, 6000]
};

const propertyTypes = computed(() => propertyTypesMap[category.value] || propertyTypesMap.buy);
const amenities = computed(() => amenitiesMap[category.value] || amenitiesMap.buy);

// Initialize filters from URL params or defaults
const initializeFilters = () => {
  const params = route.query;
  return {
    priceRange: [
      parseInt(params.price_min) || priceRangeMap[category.value][0],
      parseInt(params.price_max) || priceRangeMap[category.value][1]
    ],
    propertyTypes: params.property_types ? params.property_types.split(',') : [],
    bedrooms: params.bedrooms || '',
    amenities: params.amenities ? params.amenities.split(',') : []
  };
};

const selectedFilters = ref(initializeFilters());

// Get properties based on category
const properties = computed(() => getPropertiesByCategory(category.value));

// Page header text based on category
const pageHeader = computed(() => {
  const headers = {
    buy: 'Properties for Sale',
    rent: 'Properties for Rent',
    furnished: 'Furnished Properties for Rent'
  };
  return headers[category.value] || headers.buy;
});

const pageDescription = computed(() => {
  const descriptions = {
    buy: 'Find your dream property to buy in Uganda',
    rent: 'Find your perfect rental property in Uganda',
    furnished: 'Discover fully furnished rental properties in Uganda'
  };
  return descriptions[category.value] || descriptions.buy;
});

// Filter properties
const filteredProperties = computed(() => {
  let filtered = properties.value;

  // Filter by search query (location)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(property =>
      property.location.toLowerCase().includes(query) ||
      property.title.toLowerCase().includes(query)
    );
  }

  // Filter by price range
  filtered = filtered.filter(property => {
    const matchesPrice = property.price >= selectedFilters.value.priceRange[0] &&
                        property.price <= selectedFilters.value.priceRange[1];
    return matchesPrice;
  });

  // Filter by property type
  if (selectedFilters.value.propertyTypes.length > 0) {
    filtered = filtered.filter(property =>
      selectedFilters.value.propertyTypes.includes(property.type)
    );
  }

  // Filter by bedrooms
  if (selectedFilters.value.bedrooms) {
    filtered = filtered.filter(property =>
      property.bedrooms >= parseInt(selectedFilters.value.bedrooms)
    );
  }

  // Filter by amenities
  if (selectedFilters.value.amenities.length > 0) {
    filtered = filtered.filter(property =>
      selectedFilters.value.amenities.every(amenity =>
        property.amenities.includes(amenity)
      )
    );
  }

  return filtered;
});

// Sorted properties
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

// Update URL when filters change
const updateURL = () => {
  const query = {
    type: category.value
  };

  if (searchQuery.value) {
    query.q = searchQuery.value;
  }

  if (selectedFilters.value.priceRange[0] !== priceRangeMap[category.value][0]) {
    query.price_min = selectedFilters.value.priceRange[0];
  }

  if (selectedFilters.value.priceRange[1] !== priceRangeMap[category.value][1]) {
    query.price_max = selectedFilters.value.priceRange[1];
  }

  if (selectedFilters.value.propertyTypes.length > 0) {
    query.property_types = selectedFilters.value.propertyTypes.join(',');
  }

  if (selectedFilters.value.bedrooms) {
    query.bedrooms = selectedFilters.value.bedrooms;
  }

  if (selectedFilters.value.amenities.length > 0) {
    query.amenities = selectedFilters.value.amenities.join(',');
  }

  router.replace({ query });
};

// Watch for filter changes
watch(selectedFilters, () => {
  updateURL();
}, { deep: true });

// Watch for category changes and reset filters
watch(() => route.query.type, (newType) => {
  if (newType) {
    selectedFilters.value = initializeFilters();
  }
});

const clearFilters = () => {
  selectedFilters.value = {
    priceRange: priceRangeMap[category.value],
    propertyTypes: [],
    bedrooms: '',
    amenities: []
  };
};

const toggleFilter = () => {
  showFilters.value = !showFilters.value;
};

onMounted(() => {
  // Initialize filters from URL params
  selectedFilters.value = initializeFilters();
  // Set initial search query
  newSearchQuery.value = searchQuery.value;
});

// Watch for search query changes from URL
watch(searchQuery, (newVal) => {
  newSearchQuery.value = newVal;
});

const handleNewSearch = () => {
  const trimmedQuery = newSearchQuery.value.trim();
  
  // Validate minimum length
  if (trimmedQuery.length < 3) {
    return;
  }
  
  const query = {
    type: category.value,
    q: trimmedQuery
  };
  
  router.push({
    path: '/properties',
    query
  });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <!-- Title and Description -->
          <div class="flex-1">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ pageHeader }}</h1>
            <p class="mt-2 text-gray-600">{{ pageDescription }}</p>
            <p v-if="searchQuery" class="mt-2 text-sm text-gray-500">
              Search results for: <span class="font-semibold">"{{ searchQuery }}"</span>
            </p>
          </div>
          
          <!-- Search Bar -->
          <div class="w-full lg:w-96">
            <div class="relative">
              <input
                type="text"
                v-model="newSearchQuery"
                placeholder="Search location (min. 3 chars)"
                class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                @keyup.enter="handleNewSearch"
                minlength="3"
              />
              <button
                @click="handleNewSearch"
                :disabled="newSearchQuery.trim().length < 3"
                :class="[
                  'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors duration-200',
                  newSearchQuery.trim().length >= 3
                    ? 'text-[#DC2626] hover:bg-red-50'
                    : 'text-gray-400 cursor-not-allowed'
                ]"
              >
                <MagnifyingGlassIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
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
              We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
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
