<script setup>
import {
  HomeIcon,
  EyeIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline';

const stats = [
  {
    name: 'Total Properties',
    value: '12',
    description: 'Active listings',
    icon: HomeIcon,
    color: 'primary'
  },
  {
    name: 'Property Views',
    value: '2.4k',
    description: 'Total views',
    icon: EyeIcon,
    color: 'indigo'
  },
  {
    name: 'Saved Properties',
    value: '145',
    description: 'By potential buyers',
    icon: HeartIcon,
    color: 'rose'
  },
  {
    name: 'Featured Properties',
    value: '23',
    description: 'Featured properties',
    icon: HeartIcon,
    color: 'amber'
  }
];
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    <div
      v-for="stat in stats"
      :key="stat.name"
      class="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex items-start space-x-4">
        <div 
          class="flex-shrink-0 mt-1 p-2 rounded-lg"
          :class="{
            'bg-primary-50': stat.color === 'primary',
            'bg-indigo-50': stat.color === 'indigo',
            'bg-rose-50': stat.color === 'rose',
            'bg-amber-50': stat.color === 'amber'
          }"
        >
          <component
            :is="stat.icon"
            class="w-5 h-5"
            :class="{
              'text-primary-600': stat.color === 'primary',
              'text-indigo-600': stat.color === 'indigo',
              'text-rose-600': stat.color === 'rose',
              'text-amber-600': stat.color === 'amber'
            }"
          />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-600 truncate">{{ stat.name }}</p>
          <p class="mt-2 text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ stat.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>