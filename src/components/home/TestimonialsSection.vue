<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { StarIcon } from '@heroicons/vue/24/solid';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Nakato',
    role: 'Home Buyer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Property256 made finding my dream home a breeze. Their platform is intuitive and the virtual tours saved me so much time!',
    rating: 5
  },
  {
    id: 2,
    name: 'David Ochen',
    role: 'Property Investor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    content: 'The best real estate platform in Uganda. Their verified listings and professional photos make property investment decisions easier.',
    rating: 5
  },
  {
    id: 3,
    name: 'Patricia Nambi',
    role: 'Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    content: 'As an agent, Property256 has transformed how I showcase properties. The platform brings serious buyers and quality leads.',
    rating: 5
  }
];
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        What Our Clients Say
      </h2>

      <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="30"
        :autoplay="{ delay: 5000 }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          '768': { slidesPerView: 2 },
          '1024': { slidesPerView: 3 }
        }"
        class="testimonials-swiper"
      >
        <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id">
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <img
                :src="testimonial.image"
                :alt="testimonial.name"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
              </div>
            </div>
            <div class="flex mb-4">
              <StarIcon
                v-for="i in testimonial.rating"
                :key="i"
                class="h-5 w-5 text-yellow-400"
              />
            </div>
            <p class="text-gray-600">{{ testimonial.content }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<style>
.testimonials-swiper {
  padding-bottom: 3rem !important;
}
.testimonials-swiper .swiper-pagination-bullet-active {
  background-color: theme('colors.primary.600');
}
</style>