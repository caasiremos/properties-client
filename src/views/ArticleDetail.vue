<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { articles } from '../data/articles';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();

const article = computed(() => {
  return articles.find(a => a.id === parseInt(route.params.id));
});

const goBack = () => {
  router.push({ name: 'news' });
};
</script>

<template>
  <div v-if="article" class="min-h-screen bg-gray-50">
    <!-- Article Header -->
    <div class="relative h-[400px]">
      <img :src="article.image" 
           :alt="article.title"
           class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
        <button @click="goBack" 
                class="flex items-center text-white mb-4 hover:text-primary-200 transition-colors">
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          Back to News
        </button>
        <h1 class="text-4xl font-bold mb-4">{{ article.title }}</h1>
        <div class="flex items-center space-x-4">
          <span>By {{ article.author }}</span>
          <span>{{ new Date(article.date).toLocaleDateString() }}</span>
          <span>{{ article.readTime }}</span>
          <span class="bg-primary-600 px-3 py-1 rounded-full text-sm">
            {{ article.category }}
          </span>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="prose prose-lg max-w-none" v-html="article.content"></div>
      </div>

      <!-- Share and Actions -->
      <div class="mt-8 flex justify-between items-center">
        <div class="flex space-x-4">
          <button class="text-gray-600 hover:text-primary-600 transition-colors">
            Share
          </button>
          <button class="text-gray-600 hover:text-primary-600 transition-colors">
            Save
          </button>
        </div>
        <button @click="goBack" 
                class="text-primary-600 hover:text-primary-700 transition-colors">
          Back to News
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.prose h2 {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
}

.prose p {
  @apply text-gray-700 mb-4 leading-relaxed;
}

.prose ul, .prose ol {
  @apply my-4 ml-6;
}

.prose li {
  @apply text-gray-700 mb-2;
}

.prose ul li {
  @apply list-disc;
}

.prose ol li {
  @apply list-decimal;
}
</style>