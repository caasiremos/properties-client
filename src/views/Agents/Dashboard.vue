<script setup>
import Stats from '@/components/dashboard/Stats.vue';
</script>

<template>
    <div>
        <Stats />

        <!-- Recent Activity -->
        <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div class="bg-white rounded-lg shadow-xs p-6">
            <p class="text-gray-600">Your recent activities will appear here.</p>
        </div>
        </div>

        <!-- Latest Properties -->
        <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Latest Properties</h2>
        <div class="bg-white rounded-lg shadow-xs p-6">
            <p class="text-gray-600">Your latest property listings will appear here.</p>
        </div>
        </div>
    </div>
</template>