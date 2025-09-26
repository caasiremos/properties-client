<script setup>
import Sidebar from '@/components/shared/Sidebar.vue';
import Header from '@/components/shared/Header.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const isSidebarCollapsed = ref(false);
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) {
    isMobileMenuOpen.value = false;
  }
};

const handleSidebarCollapse = (collapsed) => {
  isSidebarCollapsed.value = collapsed;
};

const handleHeaderSidebarToggle = () => {
  if (isMobile.value) {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  }
};

const closeMobileMenu = () => {
  if (isMobile.value) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex h-screen">
      <!-- Desktop Sidebar -->
      <div 
        class="hidden md:block shrink-0 transition-all duration-300 ease-in-out"
        :class="isSidebarCollapsed ? 'w-16' : 'w-64'"
      >
        <Sidebar 
          :collapsed="isSidebarCollapsed"
          :is-mobile="false"
          @sidebar-collapse="handleSidebarCollapse"
        />
      </div>

      <!-- Mobile Backdrop -->
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="closeMobileMenu"
      ></div>

      <!-- Mobile Sidebar -->
      <div
        class="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden"
        :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <Sidebar 
          :collapsed="false"
          :is-mobile="true"
          @close-mobile="closeMobileMenu"
        />
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header @sidebar-toggle="handleHeaderSidebarToggle" />

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto p-4 md:p-6">
            <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>