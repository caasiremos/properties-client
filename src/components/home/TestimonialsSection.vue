<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid';

const isVisible = ref(false);

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

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-10 left-10 w-72 h-72 rounded-full filter blur-3xl" style="background-color: var(--color-primary-600);"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full filter blur-3xl" style="background-color: var(--color-primary-500);"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" :class="{ 'animate-fade-in': isVisible }">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          What Our <span style="color: var(--color-primary-600);">Clients Say</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Don't just take our word for it. Hear from satisfied clients who found their perfect properties through our platform.
        </p>
      </div>

      <!-- Testimonials Swiper -->
      <div class="relative" :class="{ 'animate-slide-up': isVisible }">
        <swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="1"
          :space-between="40"
          :autoplay="{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :pagination="{
            clickable: true,
            dynamicBullets: true
          }"
          :breakpoints="{
            '640': { slidesPerView: 1, spaceBetween: 20 },
            '768': { slidesPerView: 2, spaceBetween: 30 },
            '1024': { slidesPerView: 3, spaceBetween: 40 },
            '1280': { slidesPerView: 3, spaceBetween: 50 }
          }"
          class="testimonials-swiper"
        >
          <swiper-slide
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="group testimonial-card">
              <!-- Quote Icon -->
              <div class="absolute -top-4 -right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300" style="color: var(--color-primary-200);">
                <ChatBubbleLeftRightIcon class="w-16 h-16" />
              </div>

              <!-- Content -->
              <div class="relative z-10">
                <!-- Rating Stars -->
                <div class="flex mb-6">
                  <StarIcon
                    v-for="i in testimonial.rating"
                    :key="i"
                    class="h-5 w-5 text-yellow-400 group-hover:text-yellow-500 transition-colors duration-200"
                  />
                </div>

                <!-- Testimonial Text -->
                <blockquote class="text-gray-700 mb-8 leading-relaxed text-lg font-medium italic">
                  "{{ testimonial.content }}"
                </blockquote>

                <!-- Client Info -->
                <div class="flex items-center">
                  <img
                    :src="testimonial.image"
                    :alt="testimonial.name"
                    class="h-14 w-14 rounded-full object-cover transition-all duration-300"
                    style="box-shadow: 0 0 0 4px white; border: 2px solid transparent;"
                  />
                  <div class="ml-4 flex-1">
                    <h4 class="font-bold text-gray-900 text-lg transition-colors duration-200 group-hover:text-primary-600">
                      {{ testimonial.name }}
                    </h4>
                    <p class="text-sm text-gray-600 font-medium">{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-swiper {
  padding-bottom: 4rem !important;
}

.testimonials-swiper .swiper-pagination-bullet {
  background-color: #cbd5e1;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.testimonials-swiper .swiper-pagination-bullet-active {
  background-color: var(--color-primary-600);
  opacity: 1;
  transform: scale(1.2);
}

.testimonial-card {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  position: relative;
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.testimonial-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateY(-0.5rem);
  border-color: var(--color-primary-100);
}


/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
}

/* Staggered animation for testimonial cards */
.testimonials-swiper .swiper-slide {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

/* Hover effects for testimonial content */
.testimonial-card:hover .group-hover\:text-primary-600 {
  color: var(--color-primary-600);
}

.testimonial-card:hover .group-hover\:text-yellow-500 {
  color: #eab308;
}

.testimonial-card:hover .group-hover\:ring-blue-50 {
  --tw-ring-color: #eff6ff;
}

.testimonial-card:hover .group-hover\:opacity-30 {
  opacity: 0.3;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .testimonial-card {
    padding: 1.5rem;
  }

  .testimonial-card h4 {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .testimonial-card blockquote {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

/* Smooth transitions for all interactive elements */
.testimonial-card *,
.testimonial-card *::before,
.testimonial-card *::after {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>