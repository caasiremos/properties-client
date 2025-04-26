<script setup>
import { ref } from 'vue';
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  HeartIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  WalletIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import axios from '@/libs/axios';

const router = useRouter();

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/agent' },
  { name: 'My Properties', icon: BuildingOfficeIcon, href: '/agent/properties' },
  { name: 'Post a Property', icon: DocumentTextIcon, href: '/agent/properties/create' },
  { name: 'My Wallet', icon: WalletIcon, href: '/agent/wallet' },
  { name: 'My Clients', icon: UserGroupIcon, href: '/agent/clients' },
  { name: 'Saved Properties', icon: HeartIcon, href: '/agent/saved' },
  { name: 'Profile', icon: UserCircleIcon, href: '/agent/profile' },
];

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
  <div class="flex flex-col h-full bg-white border-r border-gray-200">
    <!-- Logo -->
    <div class="p-6">
      <router-link to="/" class="flex flex-col items-center group">
        <div class="flex items-center space-x-1">
          <span class="text-2xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent tracking-tight">
            Find<span class="text-primary-900">Property</span><span class="text-primary-600 font-extrabold">24</span>
          </span>
        </div>
        <div class="mt-2 flex items-center space-x-2 opacity-90 group-hover:opacity-100 transition-opacity">
          <div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent rounded-full"></div>
          <div class="text-xs font-medium text-primary-600/80">Real Estate</div>
          <div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent rounded-full"></div>
        </div>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 space-y-1.5">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="group flex items-center px-4 py-3 text-gray-600 rounded-lg transition-all duration-200 hover:bg-primary-50/70 hover:text-primary-700 relative overflow-hidden"
        :class="{
          'bg-primary-50 text-primary-700 font-medium shadow-sm ring-1 ring-primary-100 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary-600': $route.path === item.href,
          'bg-primary-50/60 text-primary-600 ring-1 ring-primary-100/50': $route.path.startsWith(item.href) && item.href !== '/agent'
        }"
      >
        <component 
          :is="item.icon" 
          class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" 
          :class="{
            'text-primary-600': $route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/agent'),
            'text-gray-400 group-hover:text-primary-500': !$route.path.startsWith(item.href)
          }"
        />
        <span class="font-medium">{{ item.name }}</span>
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