<script setup>
import Sidebar from '@/components/shared/Sidebar.vue';
import Header from '@/components/shared/Header.vue';
import { ref } from 'vue';

const isSidebarCollapsed = ref(false);

const handleSidebarCollapse = (collapsed) => {
  isSidebarCollapsed.value = collapsed;
};

const handleHeaderSidebarToggle = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div 
        class="shrink-0 transition-all duration-300 ease-in-out"
        :class="isSidebarCollapsed ? 'w-16' : 'w-64'"
      >
        <Sidebar 
          :collapsed="isSidebarCollapsed"
          @sidebar-collapse="handleSidebarCollapse"
        />
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header @sidebar-toggle="handleHeaderSidebarToggle" />

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto p-6">
            <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>