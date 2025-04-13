<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

const route = useRoute();

const authPages = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <router-view></router-view>
  </div>
</template>