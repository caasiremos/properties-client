<script setup>
import { ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const activeTab = ref('buy');
const searchQuery = ref('');

const tabs = [
  { id: 'buy', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
  { id: 'furnished', label: 'Furnished' },
  { id: 'agent', label: 'Agent' }
];

const handleSearch = () => {
  console.log('Search params:', {
    query: searchQuery.value,
    type: activeTab.value
  });
};

const setActiveTab = (tabId) => {
  activeTab.value = tabId;
};
</script>

<template>
  <!-- Hero Section -->
  <section class="px-4 lg:px-16 pt-6 pb-8">
    <div class="relative h-[550px] lg:h-[600px] rounded-2xl overflow-hidden">
      <!-- Background Image -->
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        class="w-full h-full object-cover"
        alt="Luxury Property Interior"
      />

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/50"></div>

    <!-- Content Container -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <!-- Centered Content -->
        <div class="text-center space-y-8">

          <!-- Headline -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your home search starts here
          </h1>

          <!-- Tabs -->
          <div class="flex justify-center">
            <div class="inline-flex bg-[#DC2626] rounded-full overflow-hidden shadow-xl">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="setActiveTab(tab.id)"
                :class="[
                  'px-6 py-3 text-sm font-semibold transition-all duration-200 border-r border-red-500 last:border-r-0 cursor-pointer',
                  activeTab === tab.id
                    ? 'bg-white text-[#DC2626]'
                    : 'bg-[#DC2626] text-white hover:bg-red-700'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="max-w-3xl mx-auto">
            <div class="bg-white rounded-full shadow-2xl flex items-stretch overflow-hidden">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Enter City, suburb or area"
                class="flex-1 px-6 py-3 text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-0 bg-transparent"
                @keyup.enter="handleSearch"
              />
              <button
                @click="handleSearch"
                class="bg-[#DC2626] text-white px-8 py-3 hover:bg-red-700 transition-colors duration-200 font-semibold text-base cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  </section>
</template>
