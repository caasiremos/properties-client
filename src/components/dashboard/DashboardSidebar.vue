<script setup>
import { ref } from 'vue';
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  HeartIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
  { name: 'My Properties', icon: BuildingOfficeIcon, href: '/dashboard/properties' },
  { name: 'My Clients', icon: UserGroupIcon, href: '/dashboard/clients' },
  { name: 'Saved Properties', icon: HeartIcon, href: '/dashboard/saved' },
  { name: 'Documents', icon: DocumentTextIcon, href: '/dashboard/documents' },
  { name: 'Settings', icon: CogIcon, href: '/dashboard/settings' },
];

const handleLogout = () => {
  // Add logout logic here
  router.push('/login');
};
</script>

<template>
  <div class="flex flex-col h-full bg-white border-r border-gray-200">
    <!-- Logo -->
    <div class="p-6">
      <router-link to="/" class="text-2xl font-bold text-primary-600">
        Property256
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 space-y-1">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 hover:text-primary-600"
        :class="{ 'bg-primary-50 text-primary-600': $route.path === item.href }"
      >
        <component :is="item.icon" class="w-5 h-5 mr-3" />
        {{ item.name }}
      </router-link>
    </nav>

    <!-- Logout Button -->
    <div class="p-4 border-t border-gray-200">
      <button
        @click="handleLogout"
        class="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-gray-50 hover:text-primary-600"
      >
        <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  </div>
</template>