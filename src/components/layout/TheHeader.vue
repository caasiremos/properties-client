<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const isMenuOpen = ref(false);

const navigation = [
  { name: 'Buy', href: '/buy' },
  { name: 'Rent', href: '/rent' },
  { name: 'Sell', href: '/sell' },
  { name: 'Agents', href: '/agents' },
  { name: 'News & Advice', href: '/news' },
];

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <header class="bg-white shadow-md">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-primary-600">
            Property256
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-8">
          <router-link v-for="item in navigation" 
                      :key="item.name"
                      :to="item.href"
                      class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
            {{ item.name }}
          </router-link>
        </div>

        <!-- User Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <button @click="navigateToLogin" 
                  class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
            Login
          </button>
          <button @click="navigateToRegister"
                  class="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium">
            Register
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" 
                  class="text-gray-700 hover:text-primary-600">
            <span class="sr-only">Open menu</span>
            <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMenuOpen" class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <router-link v-for="item in navigation" 
                      :key="item.name"
                      :to="item.href"
                      class="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
            {{ item.name }}
          </router-link>
        </div>
        <div class="border-t border-gray-200 pb-3 pt-4">
          <div class="flex items-center px-5">
            <button @click="navigateToLogin"
                    class="block w-full text-center text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
              Login
            </button>
          </div>
          <div class="mt-3 px-2">
            <button @click="navigateToRegister"
                    class="block w-full text-center bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-base font-medium">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>