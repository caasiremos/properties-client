<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  MapPinIcon, 
  HomeIcon, 
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/vue/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid';
import { getAllProperties } from '../data/properties';

const route = useRoute();
const router = useRouter();

const property = ref(null);
const activeImageIndex = ref(0);
const isFavorite = ref(false);

onMounted(() => {
  const propertyId = parseInt(route.params.id);
  const allProperties = getAllProperties();
  property.value = allProperties.find(p => p.id === propertyId);
  
  if (!property.value) {
    router.push('/');
  }
});

const categoryLabel = computed(() => {
  const labels = {
    buy: 'For Sale',
    rent: 'For Rent',
    furnished: 'Furnished'
  };
  return labels[property.value?.category] || '';
});

const priceLabel = computed(() => {
  if (property.value?.category === 'buy') {
    return 'UGX ' + property.value.price.toLocaleString();
  }
  return 'UGX ' + property.value?.price.toLocaleString() + '/month';
});

const goBack = () => {
  router.back();
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const shareProperty = () => {
  if (navigator.share) {
    navigator.share({
      title: property.value?.title,
      text: `Check out this property: ${property.value?.title}`,
      url: window.location.href
    });
  }
};

const handleContact = (type) => {
  if (type === 'phone') {
    window.location.href = 'tel:+256700000000';
  } else if (type === 'email') {
    window.location.href = 'mailto:info@findproperty24.com';
  }
};
</script>

<template>
  <div v-if="property" class="min-h-screen bg-gray-50">
    <!-- Header with Back Button -->
    <div class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <button @click="goBack" class="flex items-center gap-2 text-gray-600 hover:text-[#DC2626] transition-colors">
            <ArrowLeftIcon class="h-5 w-5" />
            <span class="font-medium">Back</span>
          </button>
          <div class="flex items-center gap-3">
            <button @click="shareProperty" class="p-2 text-gray-600 hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors">
              <ShareIcon class="h-5 w-5" />
            </button>
            <button @click="toggleFavorite" class="p-2 text-gray-600 hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors">
              <HeartIconSolid v-if="isFavorite" class="h-5 w-5 text-[#DC2626]" />
              <HeartIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Property Image -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div class="relative aspect-video">
              <img :src="property.image" :alt="property.title" class="w-full h-full object-cover" />
              <div class="absolute top-4 left-4">
                <span class="bg-[#DC2626] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  {{ categoryLabel }}
                </span>
              </div>
            </div>
          </div>

          <!-- Property Details -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <!-- Price -->
            <div class="mb-4">
              <p class="text-3xl font-bold text-gray-900">{{ priceLabel }}</p>
            </div>

            <!-- Title -->
            <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ property.title }}</h1>

            <!-- Location -->
            <div class="flex items-center gap-2 text-gray-600 mb-6">
              <MapPinIcon class="h-5 w-5" />
              <span>{{ property.location }}</span>
            </div>

            <!-- Property Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-500">Bedrooms</p>
                <p class="text-lg font-semibold text-gray-900">{{ property.bedrooms || 'N/A' }}</p>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-500">Bathrooms</p>
                <p class="text-lg font-semibold text-gray-900">{{ property.bathrooms || 'N/A' }}</p>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-500">Area</p>
                <p class="text-lg font-semibold text-gray-900">{{ property.area }} m²</p>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <HomeIcon class="w-6 h-6 text-gray-600" />
                </div>
                <p class="text-sm text-gray-500">Type</p>
                <p class="text-lg font-semibold text-gray-900">{{ property.type }}</p>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p class="text-gray-600 leading-relaxed">
                This beautiful {{ property.type.toLowerCase() }} is located in {{ property.location }}. 
                {{ property.bedrooms ? `It features ${property.bedrooms} spacious bedrooms and ${property.bathrooms} modern bathrooms.` : '' }}
                The property offers {{ property.area }} square meters of living space, perfect for comfortable living.
              </p>
            </div>

            <!-- Amenities -->
            <div v-if="property.amenities && property.amenities.length > 0" class="mt-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="amenity in property.amenities" 
                      :key="amenity"
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  {{ amenity }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
            
            <!-- Agent Info -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-gray-600 font-semibold">FP</span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">FindProperty24</p>
                  <p class="text-sm text-gray-500">Property Agent</p>
                </div>
              </div>
            </div>

            <!-- Contact Buttons -->
            <div class="space-y-3">
              <button @click="handleContact('phone')"
                      class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#DC2626] text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                <PhoneIcon class="h-5 w-5" />
                <span>Call Agent</span>
              </button>
              <button @click="handleContact('email')"
                      class="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#DC2626] text-[#DC2626] rounded-lg hover:bg-red-50 transition-colors font-medium">
                <EnvelopeIcon class="h-5 w-5" />
                <span>Email Agent</span>
              </button>
            </div>

            <!-- Property ID -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-sm text-gray-500">Property ID</p>
              <p class="text-sm font-semibold text-gray-900">#{{ property.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
