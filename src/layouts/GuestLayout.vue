<script setup>
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <TheHeader/>
        <main class="flex-1 pt-18">
            <router-view></router-view>
        </main>
        <TheFooter/>
    </div>
</template>