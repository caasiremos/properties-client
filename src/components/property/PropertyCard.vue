<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { HeartIcon, MapPinIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const token = useStorage('ACCESS_TOKEN');

const props = defineProps({
  property: {
    type: Object,
    required: true,
    validator: (prop) => {
      return ['id', 'title', 'price', 'location'].every(key => key in prop);
    }
  }
});

const isAgent = computed(() => !!token.value);
const canViewDetails = computed(() => isAgent.value);

const handleCardClick = () => {
  if (canViewDetails.value) {
    router.push(`/agent/properties/${props.property.id}`);
  }
};
</script>

<template>
  <div
    @click="handleCardClick"
    :class="[
      'bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group',
      canViewDetails ? 'cursor-pointer' : ''
    ]">
    <div class="relative">
      <img :src="props.property.image" :alt="props.property.title" class="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105" />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex space-x-2">
        <span v-if="props.property.featured" class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
          FEATURED
        </span>
        <span v-if="props.property.new" class="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
          NEW
        </span>
      </div>

      <!-- Favorite button -->
      <button @click.stop class="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200">
        <HeartIcon class="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
      </button>
    </div>

    <div class="p-5">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors duration-200">
          {{ props.property.title }}
        </h3>
        <div class="text-right">
          <span class="text-xl font-bold text-gray-900">${{ props.property.price.toLocaleString() }}</span>
          <div v-if="props.property.price >= 300000" class="text-xs text-gray-500">Premium</div>
        </div>
      </div>

      <div class="flex items-center text-gray-600 mb-4">
        <MapPinIcon class="h-4 w-4 mr-2 text-primary-500" />
        <span class="text-sm font-medium">{{ props.property.location }}</span>
      </div>

      <div class="flex justify-between text-sm text-gray-600 border-t border-gray-100 pt-4">
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span class="font-medium">{{ props.property.bedrooms || props.property.amenities?.bedroom || 0 }} Beds</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
          <span class="font-medium">{{ props.property.bathrooms || props.property.amenities?.bathroom || 0 }} Baths</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
          </svg>
          <span class="font-medium">{{ props.property.area || props.property.amenities?.area || 0 }} sqft</span>
        </div>
      </div>
    </div>
  </div>
</template>