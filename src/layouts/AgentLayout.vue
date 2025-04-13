<script setup>
import Sidebar from '@/components/shared/Sidebar.vue';
import Header from '@/components/shared/Header.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="w-64 shrink-0">
        <Sidebar />
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header />

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto p-6">
            <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>