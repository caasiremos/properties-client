<script setup>
import { ref, computed } from 'vue';
import { BellIcon, UserCircleIcon } from '@heroicons/vue/24/outline';
import { useStorage } from '@vueuse/core';
import axios from '@/libs/axios';
import { useRouter, useRoute } from 'vue-router';

const userData = useStorage('USERDATA');
const router = useRouter();
const route = useRoute();

const user = JSON.parse(userData.value);
const showNotifications = ref(false);
const showUserMenu = ref(false);

const pageTitle = computed(() => {
  const path = route.path;
  if (path === '/agent/dashboard') return 'Dashboard';
  if (path === '/agent/properties') return 'My Properties';
  if (path.includes('/agent/properties/create')) return 'Add New Property';
  if (path.includes('/agent/properties/') && path.includes('/edit')) return 'Edit Property';
  if (path === '/agent/profile') return 'Profile Settings';
  if (path === '/agent/messages') return 'Messages';
  return 'Dashboard'; // Default fallback
});

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showUserMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showNotifications.value = false;
};

const handleLogout = async () => {
  try {
    await axios.post('/api/agent/logout');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USERDATA');

    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <header class="bg-white border-b border-gray-200">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="h-8 w-1 rounded-full bg-gradient-to-b from-primary-600 to-primary-400"></div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {{ pageTitle }}
            </h1>
            <p class="text-sm text-gray-500 font-medium">
              {{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- User Menu -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-hidden cursor-pointer"
            >
              <UserCircleIcon class="w-8 h-8" />
              <span class="text-sm font-medium">{{ user.name }}</span>
            </button>

            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div class="py-1">
                <router-link
                  to="/dashboard/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </router-link>
                <button
                  type="button"
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>