<script setup>
import { ref } from 'vue';

const formData = ref({
  propertyType: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  location: '',
  amenities: [],
  condition: '',
  name: '',
  email: '',
  phone: ''
});

const propertyTypes = ['House', 'Apartment', 'Villa', 'Land', 'Commercial'];
const amenitiesList = ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Gym'];
const conditions = ['Brand New', 'Excellent', 'Good', 'Needs Renovation'];

const submitForm = () => {
  console.log('Form submitted:', formData.value);
  // Handle form submission
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Property Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Property Type</label>
        <select v-model="formData.propertyType"
                class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="">Select Type</option>
          <option v-for="type in propertyTypes" 
                  :key="type" 
                  :value="type">{{ type }}</option>
        </select>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Location</label>
        <input type="text"
               v-model="formData.location"
               class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
               placeholder="Property Location" />
      </div>

      <!-- Bedrooms -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Bedrooms</label>
        <input type="number"
               v-model="formData.bedrooms"
               class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <!-- Bathrooms -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Bathrooms</label>
        <input type="number"
               v-model="formData.bathrooms"
               class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <!-- Area -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Area (sqft)</label>
        <input type="number"
               v-model="formData.area"
               class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
      </div>

      <!-- Condition -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Property Condition</label>
        <select v-model="formData.condition"
                class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="">Select Condition</option>
          <option v-for="condition in conditions" 
                  :key="condition" 
                  :value="condition">{{ condition }}</option>
        </select>
      </div>
    </div>

    <!-- Amenities -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <label v-for="amenity in amenitiesList" 
               :key="amenity"
               class="flex items-center">
          <input type="checkbox"
                 v-model="formData.amenities"
                 :value="amenity"
                 class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span class="ml-2 text-sm text-gray-700">{{ amenity }}</span>
        </label>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="border-t pt-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text"
                 v-model="formData.name"
                 class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email"
                 v-model="formData.email"
                 class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel"
                 v-model="formData.phone"
                 class="mt-1 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button type="submit"
              class="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
        Get Free Valuation
      </button>
    </div>
  </form>
</template>