<script setup>
import { ref, computed } from 'vue';
import { articles } from '../data/articles';
import ArticleCard from '../components/news/ArticleCard.vue';
import FeaturedArticles from '../components/news/FeaturedArticles.vue';

const searchQuery = ref('');
const selectedCategory = ref('');

const categories = [...new Set(articles.map(article => article.category))];

const filteredArticles = computed(() => {
  return articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || article.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">News & Advice</h1>
        <p class="mt-2 text-gray-600">Stay informed with the latest real estate insights and advice</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Featured Articles -->
      <FeaturedArticles :articles="articles" />

      <!-- Search and Filter -->
      <div class="mb-8 flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input type="text"
                 v-model="searchQuery"
                 placeholder="Search articles..."
                 class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div class="md:w-64">
          <select v-model="selectedCategory"
                  class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500">
            <option value="">All Categories</option>
            <option v-for="category in categories" 
                    :key="category" 
                    :value="category">{{ category }}</option>
          </select>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard v-for="article in filteredArticles"
                    :key="article.id"
                    :article="article" />
      </div>
    </div>
  </div>
</template>