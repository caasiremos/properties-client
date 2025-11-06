<script setup>
import { ref, watch } from 'vue';
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
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import axios from '@/libs/axios';

const router = useRouter();
const emit = defineEmits(['sidebar-collapse', 'close-mobile']);
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  isMobile: {
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

const closeMobile = () => {
  emit('close-mobile');
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
    await axios.post('/api/agents/logout');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USERDATA');

    await router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const handleNavClick = () => {
  if (props.isMobile) {
    closeMobile();
  }
};
</script>

<template>
  <div 
    class="flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out"
    :class="isCollapsed && !isMobile ? 'w-16' : 'w-64'"
  >
    <!-- Header with Logo and Close/Toggle -->
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <router-link 
          to="/" 
          class="flex items-center group overflow-hidden"
          :class="(isCollapsed && !isMobile) ? 'justify-center' : ''"
          @click="handleNavClick"
        >
          <img 
            src="/logo.svg" 
            alt="FindProperty24" 
            class="transition-all duration-200"
            :class="(isCollapsed && !isMobile) ? 'h-8 w-auto' : 'h-10 w-auto'"
          />
        </router-link>
        
        <!-- Mobile Close Button -->
        <button
          v-if="isMobile"
          @click="closeMobile"
          class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
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
          class="group flex items-center text-gray-600 rounded-lg transition-all duration-200 hover:bg-red-50/70 hover:text-[#DC2626] relative overflow-hidden"
          :class="[
            (isCollapsed && !isMobile) ? 'px-3 py-3 justify-center' : 'px-4 py-3',
            {
              'bg-red-50 text-[#DC2626] font-medium shadow-sm ring-1 ring-red-100 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-[#DC2626]': $route.path === item.href,
              'bg-red-50/60 text-red-600 ring-1 ring-red-100/50': $route.path.startsWith(item.href) && item.href !== '/agent'
            }
          ]"
          @click="handleNavClick"
        >
          <component 
            :is="item.icon" 
            class="w-5 h-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" 
            :class="[
              (isCollapsed && !isMobile) ? '' : 'mr-3',
              {
                'text-[#DC2626]': $route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/agent'),
                'text-gray-400 group-hover:text-[#DC2626]': !$route.path.startsWith(item.href)
              }
            ]"
          />
          <span 
            v-show="!(isCollapsed && !isMobile)" 
            class="font-medium transition-opacity duration-200"
            :class="(isCollapsed && !isMobile) ? 'opacity-0' : 'opacity-100'"
          >
            {{ item.name }}
          </span>
        </router-link>
        
        <!-- Tooltip for collapsed state (desktop only) -->
        <div
          v-if="isCollapsed && !isMobile"
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
          class="flex items-center w-full text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#DC2626] transition-all duration-200"
          :class="(isCollapsed && !isMobile) ? 'px-3 py-3 justify-center' : 'px-4 py-3'"
        >
          <ArrowLeftOnRectangleIcon 
            class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" 
            :class="(isCollapsed && !isMobile) ? '' : 'mr-3'"
          />
          <span 
            v-show="!(isCollapsed && !isMobile)" 
            class="font-medium transition-opacity duration-200"
            :class="(isCollapsed && !isMobile) ? 'opacity-0' : 'opacity-100'"
          >
            Logout
          </span>
        </button>
        
        <!-- Tooltip for collapsed logout button (desktop only) -->
        <div
          v-if="isCollapsed && !isMobile"
          class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
        >
          Logout
          <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </div>
    </div>
  </div>
</template>