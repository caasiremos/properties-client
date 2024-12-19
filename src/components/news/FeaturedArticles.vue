<script setup>
import { computed } from 'vue';
import ArticleCard from './ArticleCard.vue';

const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
});

const featuredArticles = computed(() => {
  return props.articles.filter(article => article.featured);
});
</script>

<template>
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ArticleCard v-for="article in featuredArticles"
                  :key="article.id"
                  :article="article" />
    </div>
  </section>
</template>