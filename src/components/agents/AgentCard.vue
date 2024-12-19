<script setup>
import { StarIcon } from '@heroicons/vue/24/solid';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';

defineProps({
  agent: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <div class="flex items-start space-x-4">
        <img :src="agent.image" 
             :alt="agent.name"
             class="h-24 w-24 rounded-full object-cover" />
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900">{{ agent.name }}</h3>
          <p class="text-primary-600 font-medium">{{ agent.title }}</p>
          <div class="flex items-center mt-2">
            <StarIcon class="h-5 w-5 text-yellow-400" />
            <span class="ml-1 text-gray-600">
              {{ agent.rating }} ({{ agent.reviews }} reviews)
            </span>
          </div>
        </div>
      </div>

      <div class="mt-4 space-y-2">
        <div class="flex items-center text-gray-600">
          <PhoneIcon class="h-5 w-5 mr-2" />
          <span>{{ agent.phone }}</span>
        </div>
        <div class="flex items-center text-gray-600">
          <EnvelopeIcon class="h-5 w-5 mr-2" />
          <span>{{ agent.email }}</span>
        </div>
      </div>

      <div class="mt-4">
        <div class="text-sm text-gray-600">
          <span class="font-medium">Experience:</span> {{ agent.experience }} years
        </div>
        <div class="text-sm text-gray-600">
          <span class="font-medium">Active Listings:</span> {{ agent.listings }}
        </div>
        <div class="text-sm text-gray-600">
          <span class="font-medium">Languages:</span> {{ agent.languages.join(', ') }}
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="spec in agent.specialization" 
              :key="spec"
              class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
          {{ spec }}
        </span>
      </div>
    </div>
  </div>
</template>