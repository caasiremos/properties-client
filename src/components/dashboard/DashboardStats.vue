<script setup>
import {
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline';

const stats = [
  {
    name: 'Total Properties',
    value: '12',
    change: '+2.5%',
    changeType: 'increase',
    icon: ChartBarIcon
  },
  {
    name: 'Property Views',
    value: '2.4k',
    change: '+10.1%',
    changeType: 'increase',
    icon: EyeIcon
  },
  {
    name: 'Saved by Users',
    value: '145',
    change: '+3.2%',
    changeType: 'increase',
    icon: HeartIcon
  },
  {
    name: 'Active Inquiries',
    value: '23',
    change: '+5.4%',
    changeType: 'increase',
    icon: UserGroupIcon
  }
];
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="stat in stats"
      :key="stat.name"
      class="bg-white px-6 py-5 rounded-lg shadow-sm"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <component
            :is="stat.icon"
            class="h-6 w-6 text-primary-600"
            aria-hidden="true"
          />
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500">{{ stat.name }}</p>
          <div class="flex items-baseline">
            <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
            <p
              :class="[
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                'ml-2 flex items-baseline text-sm font-semibold'
              ]"
            >
              {{ stat.change }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>