<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Bars3Icon, XMarkIcon, HomeIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const hasScrolled = ref(false);

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Buy', href: '/buy' },
  { name: 'Sell', href: '/sell' },
  { name: 'Agent', href: '/agents' },
];

const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
};

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 0;
};

const closeMobileMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header :class="[
    'fixed w-full z-50 transition-all duration-300 ease-in-out',
    hasScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
  ]">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex h-18 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <HomeIcon class="h-9 w-9 text-primary-600 transition-all duration-200 group-hover:scale-110" />
              <div class="absolute inset-0 bg-primary-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </div>
            <span class="text-2xl font-bold text-primary-600 transition-colors duration-200 group-hover:text-primary-700">findproperty24</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link v-for="item in navigation"
                      :key="item.name"
                      :to="item.href"
                      :class="[
                        'relative px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg',
                        'text-gray-700 hover:text-primary-600 hover:bg-primary-50',
                        isActiveRoute(item.href) ? 'text-primary-600 bg-primary-50' : ''
                      ]">
            {{ item.name }}
            <div v-if="isActiveRoute(item.href)" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full"></div>
          </router-link>
        </div>

        <!-- User Actions -->
        <div class="hidden md:flex items-center space-x-3">
          <RouterLink :to="{ name: 'login' }"
                  class="relative px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-600
                         hover:bg-primary-50 rounded-lg transition-all duration-200 group">
            <span class="relative z-10">Login</span>
            <div class="absolute inset-0 bg-primary-600 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
          </RouterLink>
          <RouterLink :to="{ name: 'register' }"
                  class="relative px-5 py-2.5 text-sm font-medium text-white bg-primary-600
                         hover:bg-primary-700 rounded-lg transition-all duration-200 transform hover:scale-105
                         shadow-sm hover:shadow-md">
            <span>List Property</span>
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen"
                  class="relative p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50
                         rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <span class="sr-only">{{ isMenuOpen ? 'Close menu' : 'Open menu' }}</span>
            <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6 transition-transform duration-200" />
            <XMarkIcon v-else class="h-6 w-6 transition-transform duration-200" />
          </button>
        </div>
      </div>

      <!-- Mobile menu with enhanced animations -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-show="isMenuOpen" class="md:hidden">
          <div class="px-4 py-6 space-y-2">
            <router-link v-for="item in navigation"
                        :key="item.name"
                        :to="item.href"
                        @click="closeMobileMenu"
                        :class="[
                          'block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                          'text-gray-700 hover:text-primary-600 hover:bg-primary-50',
                          isActiveRoute(item.href) ? 'text-primary-600 bg-primary-50' : ''
                        ]">
              <div class="flex items-center justify-between">
                <span>{{ item.name }}</span>
                <div v-if="isActiveRoute(item.href)" class="w-2 h-2 bg-primary-600 rounded-full"></div>
              </div>
            </router-link>
          </div>

          <div class="border-t border-gray-200 px-4 py-6">
            <div class="space-y-3">
              <RouterLink :to="{ name: 'login' }"
                      @click="closeMobileMenu"
                      class="block w-full px-4 py-3 text-center text-base font-medium
                             text-gray-700 hover:text-primary-600 hover:bg-primary-50
                             rounded-lg transition-all duration-200">
                Login
              </RouterLink>
              <RouterLink :to="{ name: 'register' }"
                      @click="closeMobileMenu"
                      class="block w-full px-4 py-3 text-center text-base font-medium
                             text-white bg-primary-600 hover:bg-primary-700 rounded-lg
                             transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
                List Property
              </RouterLink>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>