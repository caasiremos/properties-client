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
  <div class="text-center mb-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ title }}</h2>
    <p v-if="subtitle" class="text-gray-600 mb-4">{{ subtitle }}</p>
    <a v-if="actionText" 
       :href="actionLink"
       class="text-primary-600 hover:text-primary-700 font-medium">
      {{ actionText }}
    </a>
  </div>
</template>