<template>
  <div class="container mx-auto px-4 py-4">
    <!-- Header Section with Gradient Background -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg mb-8">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">Add New Property</h1>
            <p class="text-primary-100">Create a new property listing with detailed information.</p>
          </div>
          <button 
            @click="router.back()" 
            class="mt-4 md:mt-0 bg-white text-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 flex items-center shadow-sm"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Properties
          </button>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div class="border-b border-gray-100 pb-5">
          <h3 class="text-lg font-semibold text-gray-900">Basic Information</h3>
          <p class="mt-1 text-sm text-gray-500">Add the basic details about your property.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
            <input
              v-model="property.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Modern Apartment in City Center"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
            <input
              v-model="property.price"
              type="number"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. 250000"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              v-model="property.type"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option v-for="type in propertyTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="property.status"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option v-for="status in propertyStatus" :key="status" :value="status">{{ status }}</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              v-model="property.location"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Kololo, Kampala"
            >
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="property.description"
              rows="4"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe your property..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Features & Amenities -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div class="border-b border-gray-100 pb-5">
          <h3 class="text-lg font-semibold text-gray-900">Features & Amenities</h3>
          <p class="mt-1 text-sm text-gray-500">Add the features and amenities of your property.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <input
              v-model.number="property.amenities.bedroom"
              type="number"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
            <input
              v-model.number="property.amenities.bathroom"
              type="number"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
            <input
              v-model.number="property.amenities.area"
              type="number"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="amenity in amenitiesList" :key="amenity.key" class="flex items-center">
              <input
                :id="amenity.key"
                type="checkbox"
                v-model="property.amenities[amenity.key]"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label :for="amenity.key" class="ml-2 text-sm text-gray-700">{{ amenity.label }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Images -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div class="border-b border-gray-100 pb-5">
          <h3 class="text-lg font-semibold text-gray-900">Property Images</h3>
          <p class="mt-1 text-sm text-gray-500">Upload high-quality images of your property.</p>
        </div>

        <ImageUpload
          v-model="property.images"
          :max-files="10"
          :max-size-m-b="10"
          multiple
          accept="image/*"
        />
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="router.back()"
          class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Creating...' : 'Create Property' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import ImageUpload from '@/components/ui/ImageUpload.vue';
import axios from '@/libs/axios';

const router = useRouter();
const toast = useToast();

const loading = ref(false);

const property = ref({
  title: '',
  description: '',
  price: '',
  location: '',
  type: 'Apartment',
  status: 'Available',
  amenities: {
    bedroom: 0,
    bathroom: 0,
    area: 0,
    swimming_pool: false,
    gym: false,
    security: false,
    parking: false,
    internet: false,
    air_conditioning: false,
    furnished: false,
    garden: false,
    balcony: false,
    elevator: false
  },
  images: []
});

const propertyTypes = [
  'Apartment',
  'House',
  'Villa',
  'Penthouse',
  'Office',
  'Land',
  'Studio'
];

const propertyStatus = [
  'Available',
  'Sold',
  'Rented'
];

const amenitiesList = [
  { key: 'swimming_pool', label: 'Swimming Pool' },
  { key: 'gym', label: 'Gym' },
  { key: 'security', label: 'Security' },
  { key: 'parking', label: 'Parking' },
  { key: 'internet', label: 'Internet' },
  { key: 'air_conditioning', label: 'Air Conditioning' },
  { key: 'furnished', label: 'Furnished' },
  { key: 'garden', label: 'Garden' },
  { key: 'balcony', label: 'Balcony' },
  { key: 'elevator', label: 'Elevator' }
];


const handleSubmit = async () => {
  loading.value = true;

  try {
    const formData = new FormData();

    // Add basic property data
    formData.append('title', property.value.title);
    formData.append('description', property.value.description);
    formData.append('price', property.value.price);
    formData.append('location', property.value.location);
    formData.append('type', property.value.type);
    formData.append('status', property.value.status);

    // Add amenities as JSON string
    formData.append('amenities', JSON.stringify(property.value.amenities));

    // Add images
    property.value.images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      }
    });

    // Make API call
    await axios.post('/api/agents/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.success('Property created successfully!');
    router.push('/agent/properties');

  } catch (error) {
    console.error('Error creating property:', error);

    // Handle specific error messages
    const errorMessage = error.response?.data?.message ||
                       error.response?.data?.error ||
                       'Failed to create property. Please try again.';

    toast.error(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>