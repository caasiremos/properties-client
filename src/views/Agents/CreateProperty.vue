<template>
  <div class="container mx-auto px-4 py-8">
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
              v-model="property.bedrooms"
              type="number"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
            <input
              v-model="property.bathrooms"
              type="number"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
            <input
              v-model="property.area"
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
            <div v-for="amenity in amenitiesList" :key="amenity" class="flex items-center">
              <input
                :id="amenity"
                type="checkbox"
                v-model="property.amenities"
                :value="amenity"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label :for="amenity" class="ml-2 text-sm text-gray-700">{{ amenity }}</label>
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

        <div class="space-y-4">
          <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label for="images" class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                  <span>Upload images</span>
                  <input 
                    id="images" 
                    type="file" 
                    multiple 
                    accept="image/*"
                    class="sr-only"
                    @change="handleImageUpload"
                  >
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>

          <div v-if="property.images.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in property.images" :key="index" class="relative">
              <img :src="URL.createObjectURL(image)" class="h-24 w-full object-cover rounded-lg">
              <button
                type="button"
                @click="property.images.splice(index, 1)"
                class="absolute top-1 right-1 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
          class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Create Property
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const property = ref({
  title: '',
  description: '',
  price: '',
  location: '',
  type: 'Apartment',
  status: 'Available',
  bedrooms: '',
  bathrooms: '',
  area: '',
  amenities: [],
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
  'Swimming Pool',
  'Gym',
  'Security',
  'Parking',
  'Internet',
  'Air Conditioning',
  'Furnished',
  'Garden',
  'Balcony',
  'Elevator'
];

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  property.value.images = files;
};

const handleSubmit = async () => {
  try {
    // TODO: Implement API call
    toast.success('Property created successfully!');
    router.push('/agent/properties');
  } catch (error) {
    toast.error('Failed to create property');
  }
};
</script>