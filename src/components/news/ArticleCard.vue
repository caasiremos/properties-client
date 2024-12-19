<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

const navigateToArticle = () => {
  router.push({ name: 'article-detail', params: { id: props.article.id } });
};
</script>

<template>
  <article 
    @click="navigateToArticle"
    class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
    <img :src="article.image" 
         :alt="article.title"
         class="w-full h-48 object-cover" />
    <div class="p-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-primary-600">{{ article.category }}</span>
        <span class="text-sm text-gray-500">{{ article.readTime }}</span>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ article.title }}</h3>
      <p class="text-gray-600 mb-4">{{ article.summary }}</p>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">By {{ article.author }}</span>
        <span class="text-sm text-gray-500">{{ new Date(article.date).toLocaleDateString() }}</span>
      </div>
    </div>
  </article>
</template>