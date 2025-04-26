<script setup>
import { ref } from 'vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useStorage } from '@vueuse/core';
import axios from '@/libs/axios';
import { useRouter } from 'vue-router';

const userData = useStorage('USERDATA');
const router = useRouter();

const user = JSON.parse(userData.value);
const showNotifications = ref(false);
const showUserMenu = ref(false);

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
        <div class="flex items-center space-x-3"></div>

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
              class="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            >
              <div class="py-1">
                <router-link
                  to="/agent/profile"
                  class="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Your Profile
                </router-link>
              </div>
              <div class="py-1">
                <button
                  type="button"
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
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