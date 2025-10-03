<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  actionText: {
    type: String,
    default: ''
  },
  actionLink: {
    type: String,
    default: '#'
  }
});
</script>

<template>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{{ title }}</h2>
    <p v-if="subtitle" class="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">{{ subtitle }}</p>
    <a v-if="actionText"
       :href="actionLink"
       class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm group transition-colors duration-200">
      {{ actionText }}
      <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
</template>