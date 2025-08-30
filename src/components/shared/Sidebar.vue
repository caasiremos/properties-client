<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  HeartIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  WalletIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import axios from '@/libs/axios';

const router = useRouter();
const emit = defineEmits(['sidebar-collapse']);
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const isCollapsed = ref(props.collapsed);

watch(() => props.collapsed, (newVal) => {
  isCollapsed.value = newVal;
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('sidebar-collapse', isCollapsed.value);
};

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
  <div 
    class="flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out"
    :class="isCollapsed ? 'w-16' : 'w-64'"
  >
    <!-- Header with Logo and Toggle -->
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <router-link 
          to="/" 
          class="flex items-center group overflow-hidden"
          :class="isCollapsed ? 'justify-center' : ''"
        >
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">FP</span>
            </div>
          </div>
          <div 
            v-show="!isCollapsed" 
            class="ml-3 transition-opacity duration-200"
            :class="isCollapsed ? 'opacity-0' : 'opacity-100'"
          >
            <div class="text-lg font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
              FindProperty24
            </div>
            <div class="text-xs text-primary-600/70 font-medium">Real Estate</div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1">
      <div
        v-for="item in navigation"
        :key="item.name"
        class="relative group"
      >
        <router-link
          :to="item.href"
          class="group flex items-center text-gray-600 rounded-lg transition-all duration-200 hover:bg-primary-50/70 hover:text-primary-700 relative overflow-hidden"
          :class="[
            isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3',
            {
              'bg-primary-50 text-primary-700 font-medium shadow-sm ring-1 ring-primary-100 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary-600': $route.path === item.href,
              'bg-primary-50/60 text-primary-600 ring-1 ring-primary-100/50': $route.path.startsWith(item.href) && item.href !== '/agent'
            }
          ]"
        >
          <component 
            :is="item.icon" 
            class="w-5 h-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" 
            :class="[
              isCollapsed ? '' : 'mr-3',
              {
                'text-primary-600': $route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/agent'),
                'text-gray-400 group-hover:text-primary-500': !$route.path.startsWith(item.href)
              }
            ]"
          />
          <span 
            v-show="!isCollapsed" 
            class="font-medium transition-opacity duration-200"
            :class="isCollapsed ? 'opacity-0' : 'opacity-100'"
          >
            {{ item.name }}
          </span>
        </router-link>
        
        <!-- Tooltip for collapsed state -->
        <div
          v-if="isCollapsed"
          class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
        >
          {{ item.name }}
          <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </div>
    </nav>

    <!-- Logout Button -->
    <div class="p-3 border-t border-gray-200">
      <div class="relative group">
        <button
          @click="handleLogout"
          class="flex items-center w-full text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-all duration-200"
          :class="isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'"
        >
          <ArrowLeftOnRectangleIcon 
            class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" 
            :class="isCollapsed ? '' : 'mr-3'"
          />
          <span 
            v-show="!isCollapsed" 
            class="font-medium transition-opacity duration-200"
            :class="isCollapsed ? 'opacity-0' : 'opacity-100'"
          >
            Logout
          </span>
        </button>
        
        <!-- Tooltip for collapsed logout button -->
        <div
          v-if="isCollapsed"
          class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
        >
          Logout
          <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </div>
    </div>
  </div>
</template>