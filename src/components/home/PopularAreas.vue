<script setup>
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SectionHeader from '../ui/SectionHeader.vue';
import { StarIcon, HomeIcon, MapPinIcon } from '@heroicons/vue/24/solid';

const isLoading = ref(false);

const areas = [
  {
    name: 'Kololo',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3',
    avgPrice: 450000,
    listings: 120,
    description: 'Prestigious residential area with diplomatic missions',
    rating: 4.8,
    propertyTypes: ['Villas', 'Apartments', 'Townhouses'],
    trending: true,
    amenities: ['International Schools', 'Shopping Centers', 'Restaurants']
  },
  {
    name: 'Nakasero',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3',
    avgPrice: 380000,
    listings: 85,
    description: 'Central business district with modern amenities',
    rating: 4.6,
    propertyTypes: ['Apartments', 'Offices', 'Penthouses'],
    trending: false,
    amenities: ['Business Centers', 'Hotels', 'Shopping Malls']
  },
  {
    name: 'Ntinda',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3',
    avgPrice: 280000,
    listings: 95,
    description: 'Growing residential area with great accessibility',
    rating: 4.4,
    propertyTypes: ['Family Homes', 'Apartments'],
    trending: true,
    amenities: ['Schools', 'Hospitals', 'Market Centers']
  },
  {
    name: 'Bugolobi',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3',
    avgPrice: 320000,
    listings: 75,
    description: 'Upscale area with lake views and modern living',
    rating: 4.7,
    propertyTypes: ['Apartments', 'Penthouses', 'Condos'],
    trending: false,
    amenities: ['Lake Access', 'Restaurants', 'Fitness Centers']
  },
  {
    name: 'Muyenga',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3',
    avgPrice: 520000,
    listings: 65,
    description: 'Exclusive hilltop residences with panoramic views',
    rating: 4.9,
    propertyTypes: ['Luxury Villas', 'Mansions'],
    trending: true,
    amenities: ['Private Security', 'Clubs', 'View Points']
  },
  {
    name: 'Kansanga',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3',
    avgPrice: 350000,
    listings: 88,
    description: 'Vibrant area with entertainment and dining options',
    rating: 4.5,
    propertyTypes: ['Apartments', 'Hostels', 'Homes'],
    trending: false,
    amenities: ['Entertainment', 'Universities', 'Nightlife']
  }
];

const swiperOptions = computed(() => ({
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: '.popular-areas-next',
    prevEl: '.popular-areas-prev'
  },
  pagination: {
    clickable: true,
    dynamicBullets: true
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 28
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 32
    }
  },
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  }
}));
</script>

<template>
  <section class="py-20 bg-gray-50 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <SectionHeader
        title="Popular Areas in Kampala"
        subtitle="Explore the most sought-after neighborhoods with exceptional properties"
        actionText="View all areas"
        actionLink="/areas"
      />

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="flex space-x-2">
              <div class="h-2 bg-gray-200 rounded w-1/4"></div>
              <div class="h-2 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Swiper -->
      <div v-else class="popular-areas-container">
        <swiper v-bind="swiperOptions" class="popular-areas-swiper">
          <swiper-slide v-for="area in areas" :key="area.name">
            <div class="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer">
              <!-- Image Container -->
              <div class="relative h-64 overflow-hidden">
                <img
                  :src="area.image"
                  :alt="area.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                <!-- Overlay with gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

                <!-- Trending Badge -->
                <div v-if="area.trending" class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                  TRENDING
                </div>

                <!-- Quick View Button -->
                <button class="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                  <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </div>

              <!-- Content Area -->
              <div class="p-5">
                <!-- Header with Rating -->
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                      {{ area.name }}
                    </h3>
                    <div class="flex items-center mt-1">
                      <StarIcon class="w-4 h-4 text-yellow-400 mr-1" />
                      <span class="text-sm text-gray-600">{{ area.rating }}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-gray-900">${{ area.avgPrice.toLocaleString() }}</div>
                    <div class="text-xs text-gray-500">avg. price</div>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-sm text-gray-600 mb-4 line-clamp-2">
                  {{ area.description }}
                </p>

                <!-- Stats -->
                <div class="flex justify-between items-center mb-4 text-sm">
                  <div class="flex items-center text-gray-600">
                    <HomeIcon class="w-4 h-4 mr-1 text-primary-500" />
                    <span>{{ area.listings }} Listings</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <MapPinIcon class="w-4 h-4 mr-1 text-primary-500" />
                    <span>Kampala</span>
                  </div>
                </div>

                <!-- Property Types -->
                <div class="flex flex-wrap gap-1 mb-4">
                  <span
                    v-for="(type, index) in area.propertyTypes.slice(0, 2)"
                    :key="index"
                    class="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-md"
                  >
                    {{ type }}
                  </span>
                  <span v-if="area.propertyTypes.length > 2" class="text-xs text-gray-500 px-2 py-1">
                    +{{ area.propertyTypes.length - 2 }} more
                  </span>
                </div>

                <!-- Amenities -->
                <div class="border-t pt-3">
                  <div class="flex items-center text-xs text-gray-500">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>{{ area.amenities[0] }}, {{ area.amenities[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>

        <!-- Navigation Buttons -->
        <div class="flex justify-center mt-8 space-x-4">
          <button class="popular-areas-prev p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button class="popular-areas-next p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.popular-areas-swiper {
  padding-bottom: 4rem !important;
}

.popular-areas-swiper .swiper-button-next,
.popular-areas-swiper .swiper-button-prev {
  color: theme('colors.primary.600');
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.popular-areas-swiper .swiper-button-next:hover,
.popular-areas-swiper .swiper-button-prev:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: scale(1.1);
}

.popular-areas-swiper .swiper-button-next::after,
.popular-areas-swiper .swiper-button-prev::after {
  font-size: 16px;
}

.popular-areas-swiper .swiper-pagination-bullet {
  background: theme('colors.gray.300');
  opacity: 1;
  transition: all 0.3s ease;
}

.popular-areas-swiper .swiper-pagination-bullet-active {
  background: theme('colors.primary.600');
  transform: scale(1.2);
}

/* Custom navigation buttons positioning */
.popular-areas-container {
  position: relative;
}

.popular-areas-prev,
.popular-areas-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.popular-areas-prev {
  left: -20px;
}

.popular-areas-next {
  right: -20px;
}

@media (max-width: 1280px) {
  .popular-areas-prev {
    left: 0;
  }

  .popular-areas-next {
    right: 0;
  }
}

@media (max-width: 768px) {
  .popular-areas-prev,
  .popular-areas-next {
    display: none;
  }
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>