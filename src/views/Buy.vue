<script setup>
import { ref, computed } from 'vue';
import PropertyCard from '../components/property/PropertyCard.vue';
import { 
  AdjustmentsHorizontalIcon, 
  FunnelIcon,
  XMarkIcon 
} from '@heroicons/vue/24/outline';

const showFilters = ref(false);
const sortBy = ref('newest');
const priceRange = ref([0, 1000000]);
const selectedPropertyTypes = ref([]);
const selectedAmenities = ref([]);
const selectedBedrooms = ref('');

const propertyTypes = [
  'House', 'Apartment', 'Villa', 'Land', 'Commercial'
];

const amenities = [
  'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 'Balcony'
];

const properties = ref([
  {
    id: 1,
    title: 'Luxurious Villa in Kololo',
    price: 450000,
    location: 'Kololo, Kampala',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227',
    type: 'Villa',
    amenities: ['Swimming Pool', 'Security', 'Garden']
  },
  {
    id: 2,
    title: 'Modern Apartment in Nakasero',
    price: 320000,
    location: 'Nakasero, Kampala',
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224',
    type: 'Apartment',
    amenities: ['Gym', 'Parking', 'Balcony']
  },
  {
    id: 3,
    title: 'Elegant Family Home in Muyenga',
    price: 385000,
    location: 'Muyenga, Kampala',
    bedrooms: 5,
    bathrooms: 4,
    area: 3800,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    type: 'House',
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Parking']
  },
  {
    id: 4,
    title: 'Commercial Space in Downtown',
    price: 550000,
    location: 'Central Business District, Kampala',
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    type: 'Commercial',
    amenities: ['Security', 'Parking', 'Gym']
  },
  {
    id: 5,
    title: 'Lakeside Villa in Munyonyo',
    price: 680000,
    location: 'Munyonyo, Kampala',
    bedrooms: 6,
    bathrooms: 5,
    area: 4500,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    type: 'Villa',
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Balcony']
  },
  {
    id: 6,
    title: 'Prime Land in Buziga',
    price: 280000,
    location: 'Buziga, Kampala',
    bedrooms: 0,
    bathrooms: 0,
    area: 8000,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    type: 'Land',
    amenities: ['Security']
  },
  {
    id: 7,
    title: 'Modern Townhouse in Ntinda',
    price: 295000,
    location: 'Ntinda, Kampala',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
    type: 'House',
    amenities: ['Security', 'Parking', 'Garden']
  },
  {
    id: 8,
    title: 'Luxury Penthouse in Naguru',
    price: 420000,
    location: 'Naguru, Kampala',
    bedrooms: 3,
    bathrooms: 3,
    area: 2400,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
    type: 'Apartment',
    amenities: ['Gym', 'Security', 'Balcony', 'Parking']
  },
  {
    id: 9,
    title: 'Commercial Plaza in Bugolobi',
    price: 780000,
    location: 'Bugolobi, Kampala',
    bedrooms: 0,
    bathrooms: 6,
    area: 7500,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    type: 'Commercial',
    amenities: ['Security', 'Parking', 'Gym']
  },
  {
    id: 10,
    title: 'Garden Home in Lubowa',
    price: 365000,
    location: 'Lubowa, Wakiso',
    bedrooms: 4,
    bathrooms: 3,
    area: 3000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    type: 'House',
    amenities: ['Garden', 'Security', 'Parking']
  },
  {
    id: 11,
    title: 'Hillside Villa in Makindye',
    price: 520000,
    location: 'Makindye, Kampala',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
    type: 'Villa',
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Balcony']
  },
  {
    id: 12,
    title: 'Investment Land in Kira',
    price: 180000,
    location: 'Kira, Wakiso',
    bedrooms: 0,
    bathrooms: 0,
    area: 10000,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    type: 'Land',
    amenities: ['Security']
  },
  {
    id: 13,
    title: 'City View Apartment in Nakasero',
    price: 340000,
    location: 'Nakasero, Kampala',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
    type: 'Apartment',
    amenities: ['Gym', 'Security', 'Balcony']
  },
  {
    id: 14,
    title: 'Family Compound in Nalya',
    price: 425000,
    location: 'Nalya, Kampala',
    bedrooms: 6,
    bathrooms: 4,
    area: 5000,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    type: 'House',
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Parking']
  },
  {
    id: 15,
    title: 'Office Complex in Industrial Area',
    price: 620000,
    location: 'Industrial Area, Kampala',
    bedrooms: 0,
    bathrooms: 8,
    area: 8500,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    type: 'Commercial',
    amenities: ['Security', 'Parking', 'Gym']
  },
  {
    id: 16,
    title: 'Lakefront Property in Garuga',
    price: 890000,
    location: 'Garuga, Entebbe',
    bedrooms: 7,
    bathrooms: 6,
    area: 6000,
    image: 'https://images.unsplash.com/photo-1600047509782-20d39509f26c',
    type: 'Villa',
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Balcony']
  },
  {
    id: 17,
    title: 'Modern Studio in Bukoto',
    price: 150000,
    location: 'Bukoto, Kampala',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    image: 'https://images.unsplash.com/photo-1600566753229-20c3d78e4dcd',
    type: 'Apartment',
    amenities: ['Security', 'Parking', 'Balcony']
  },
  {
    id: 18,
    title: 'Development Land in Najjera',
    price: 230000,
    location: 'Najjera, Wakiso',
    bedrooms: 0,
    bathrooms: 0,
    area: 12000,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    type: 'Land',
    amenities: ['Security']
  },
  {
    id: 19,
    title: 'Retail Space in Wandegeya',
    price: 420000,
    location: 'Wandegeya, Kampala',
    bedrooms: 0,
    bathrooms: 4,
    area: 4500,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    type: 'Commercial',
    amenities: ['Security', 'Parking']
  },
  {
    id: 20,
    title: 'Executive Home in Minister\'s Village',
    price: 750000,
    location: 'Minister\'s Village, Ntinda',
    bedrooms: 5,
    bathrooms: 5,
    area: 4800,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    type: 'House',
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Gym', 'Parking']
  }
]);

const filteredProperties = computed(() => {
  return properties.value.filter(property => {
    const matchesPrice = property.price >= priceRange.value[0] && 
                        property.price <= priceRange.value[1];
    const matchesType = selectedPropertyTypes.value.length === 0 || 
                       selectedPropertyTypes.value.includes(property.type);
    const matchesBedrooms = !selectedBedrooms.value || 
                           property.bedrooms >= parseInt(selectedBedrooms.value);
    const matchesAmenities = selectedAmenities.value.length === 0 || 
                            selectedAmenities.value.every(amenity => 
                              property.amenities.includes(amenity));
    
    return matchesPrice && matchesType && matchesBedrooms && matchesAmenities;
  });
});

const toggleFilter = () => {
  showFilters.value = !showFilters.value;
};

const clearFilters = () => {
  selectedPropertyTypes.value = [];
  selectedAmenities.value = [];
  selectedBedrooms.value = '';
  priceRange.value = [0, 1000000];
};
</script>

<template>
  <!-- Rest of the template remains unchanged -->
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Properties for Sale</h1>
        <p class="mt-2 text-gray-600">Find your perfect property in Uganda</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div :class="[
          'lg:w-1/4 bg-white rounded-lg shadow-sm p-6',
          showFilters ? 'fixed inset-0 z-40 lg:relative lg:inset-auto' : 'hidden lg:block'
        ]">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold">Filters</h2>
            <button @click="clearFilters" 
                    class="text-sm text-primary-600 hover:text-primary-700">
              Clear all
            </button>
          </div>

          <!-- Price Range -->
          <div class="mb-6">
            <h3 class="text-sm font-medium mb-2">Price Range</h3>
            <div class="flex gap-4">
              <input type="number" 
                     v-model="priceRange[0]"
                     class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                     placeholder="Min" />
              <input type="number"
                     v-model="priceRange[1]"
                     class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                     placeholder="Max" />
            </div>
          </div>

          <!-- Property Types -->
          <div class="mb-6">
            <h3 class="text-sm font-medium mb-2">Property Type</h3>
            <div class="space-y-2">
              <label v-for="type in propertyTypes" 
                     :key="type" 
                     class="flex items-center">
                <input type="checkbox"
                       v-model="selectedPropertyTypes"
                       :value="type"
                       class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span class="ml-2 text-sm text-gray-700">{{ type }}</span>
              </label>
            </div>
          </div>

          <!-- Bedrooms -->
          <div class="mb-6">
            <h3 class="text-sm font-medium mb-2">Bedrooms</h3>
            <select v-model="selectedBedrooms"
                    class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500">
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <!-- Amenities -->
          <div class="mb-6">
            <h3 class="text-sm font-medium mb-2">Amenities</h3>
            <div class="space-y-2">
              <label v-for="amenity in amenities" 
                     :key="amenity"
                     class="flex items-center">
                <input type="checkbox"
                       v-model="selectedAmenities"
                       :value="amenity"
                       class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span class="ml-2 text-sm text-gray-700">{{ amenity }}</span>
              </label>
            </div>
          </div>

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