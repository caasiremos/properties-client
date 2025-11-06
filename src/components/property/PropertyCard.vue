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
      'bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group',
      canViewDetails ? 'cursor-pointer' : ''
    ]">
    <div class="relative">
      <!-- Red Top Bar with Badges -->
      <div class="relative">
        <div class="absolute top-0 left-0 right-0 h-12 bg-[#DC2626] rounded-t-2xl z-10"></div>
        
        <!-- Badges Container -->
        <div class="absolute top-0 left-0 right-0 h-12 px-3 flex items-center justify-between z-20">
          <!-- Promoted Badge -->
          <div class="bg-gray-800 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded">
            Promoted
          </div>
          
          <!-- Seeff Logo Badge -->
          <div class="bg-black text-white px-3 py-1 rounded-md">
            <span class="text-xs font-bold tracking-wider" style="font-family: serif;">SEEFF</span>
          </div>
        </div>
      </div>
      
      <!-- Property Image -->
      <div class="relative pt-12">
        <img :src="props.property.image" :alt="props.property.title" class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>

    <div class="p-4">
      <!-- Price -->
      <div class="mb-2">
        <span class="text-lg font-bold text-gray-900">UGX {{ props.property.price.toLocaleString() }}</span>
      </div>

      <!-- Title -->
      <div class="mb-3">
        <h3 class="text-sm text-gray-700 line-clamp-1">
          {{ props.property.bedrooms || 3 }} Bedroom Townhouse in <span class="font-semibold">{{ props.property.location.split(',')[0] }}</span>
        </h3>
      </div>

      <!-- Property Details -->
      <div class="flex items-center justify-between text-xs text-gray-600 mb-3">
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>{{ props.property.bedrooms || 3 }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
          <span>{{ props.property.bathrooms || 4 }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <span>{{ props.property.bathrooms || 4 }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
          </svg>
          <span>{{ props.property.area || 437 }} m²</span>
        </div>
      </div>

      <!-- Location and Favorite -->
      <div class="flex items-center justify-between border-t border-gray-100 pt-3">
        <span class="text-xs text-gray-600">{{ props.property.location.split(',').pop().trim() }}</span>
        <button @click.stop class="text-[#DC2626] hover:scale-110 transition-transform duration-200">
          <HeartIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
    </div>
  </div>
</template>
