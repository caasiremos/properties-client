<script setup>
import { HeartIcon, MapPinIcon } from '@heroicons/vue/24/outline';

defineProps({
  property: {
    type: Object,
    required: true,
    validator: (prop) => {
      return ['id', 'title', 'price', 'location', 'bedrooms', 'bathrooms', 'area', 'image'].every(key => key in prop);
    }
  }
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
    <div class="relative">
      <img :src="property.image" :alt="property.title" class="h-48 w-full object-cover" />
      <button class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
        <HeartIcon class="h-5 w-5 text-gray-600" />
      </button>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ property.title }}</h3>
        <span class="text-primary-600 font-bold">${{ property.price.toLocaleString() }}</span>
      </div>
      <div class="flex items-center text-gray-600 mb-3">
        <MapPinIcon class="h-4 w-4 mr-1" />
        <span class="text-sm">{{ property.location }}</span>
      </div>
      <div class="flex justify-between text-sm text-gray-600 border-t pt-3">
        <span>{{ property.bedrooms }} Beds</span>
        <span>{{ property.bathrooms }} Baths</span>
        <span>{{ property.area }} sqft</span>
      </div>
    </div>
  </div>
</template>