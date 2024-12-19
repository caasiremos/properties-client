<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const areas = [
  {
    name: 'Kololo',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3',
    avgPrice: '$450,000',
    listings: 120
  },
  {
    name: 'Nakasero',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3',
    avgPrice: '$380,000',
    listings: 85
  },
  {
    name: 'Ntinda',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3',
    avgPrice: '$280,000',
    listings: 95
  },
  {
    name: 'Bugolobi',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3',
    avgPrice: '$320,000',
    listings: 75
  }
];
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        Popular Areas in Kampala
      </h2>

      <swiper
        :modules="[Navigation, Pagination]"
        :slides-per-view="1"
        :space-between="20"
        :navigation="true"
        :pagination="{ clickable: true }"
        :breakpoints="{
          '640': { slidesPerView: 2 },
          '1024': { slidesPerView: 3 }
        }"
        class="popular-areas-swiper"
      >
        <swiper-slide v-for="area in areas" :key="area.name">
          <div class="relative group overflow-hidden rounded-lg">
            <img :src="area.image" 
                 :alt="area.name"
                 class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-semibold mb-2">{{ area.name }}</h3>
              <div class="flex justify-between text-sm">
                <span>Avg. Price: {{ area.avgPrice }}</span>
                <span>{{ area.listings }} Listings</span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<style>
.popular-areas-swiper {
  padding-bottom: 3rem !important;
}
.popular-areas-swiper .swiper-button-next,
.popular-areas-swiper .swiper-button-prev {
  color: theme('colors.primary.600');
}
.popular-areas-swiper .swiper-pagination-bullet-active {
  background-color: theme('colors.primary.600');
}
</style>