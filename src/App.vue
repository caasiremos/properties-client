<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

const route = useRoute();

const authPages = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];

const showHeader = computed(() => {
  return !route.path.startsWith('/dashboard') && !authPages.includes(route.path);
});

const showFooter = computed(() => {
  return !route.path.startsWith('/dashboard') && !authPages.includes(route.path);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <TheHeader v-if="showHeader" />
    <router-view></router-view>
    <TheFooter v-if="showFooter" />
  </div>
</template>