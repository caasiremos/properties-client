<script setup>
import DashboardSidebar from '../../components/dashboard/DashboardSidebar.vue';
import DashboardHeader from '../../components/dashboard/DashboardHeader.vue';
import DashboardStats from '../../components/dashboard/DashboardStats.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="w-64 flex-shrink-0">
        <DashboardSidebar />
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto p-6">
          <DashboardStats />

          <!-- Recent Activity -->
          <div class="mt-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <p class="text-gray-600">Your recent activities will appear here.</p>
            </div>
          </div>

          <!-- Latest Properties -->
          <div class="mt-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Latest Properties</h2>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <p class="text-gray-600">Your latest property listings will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>