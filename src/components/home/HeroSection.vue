<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const activeTab = ref('buy');
const searchQuery = ref('');
const errorMessage = ref('');

const tabs = [
  { id: 'buy', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
  { id: 'furnished', label: 'Furnished' }
];

const isSearchValid = computed(() => {
  return searchQuery.value.trim().length >= 3;
});

const handleSearch = () => {
  const trimmedQuery = searchQuery.value.trim();
  
  // Validate minimum length
  if (trimmedQuery.length < 3) {
    errorMessage.value = 'Please enter at least 3 characters to search';
    return;
  }
  
  // Clear error message
  errorMessage.value = '';
  
  const query = {
    type: activeTab.value,
    q: trimmedQuery
  };
  
  router.push({
    path: '/properties',
    query
  });
};

const setActiveTab = (tabId) => {
  activeTab.value = tabId;
};

// Clear error when user types
const handleInput = () => {
  if (errorMessage.value && searchQuery.value.trim().length >= 3) {
    errorMessage.value = '';
  }
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
            <div class="space-y-2">
              <div class="bg-white rounded-full shadow-2xl flex items-stretch overflow-hidden">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Enter City, suburb or area (min. 3 characters)"
                  class="flex-1 px-6 py-3 text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-0 bg-transparent"
                  @keyup.enter="handleSearch"
                  @input="handleInput"
                  minlength="3"
                />
                <button
                  @click="handleSearch"
                  :disabled="!isSearchValid"
                  :class="[
                    'px-8 py-3 transition-colors duration-200 font-semibold text-base',
                    isSearchValid
                      ? 'bg-[#DC2626] text-white hover:bg-red-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  Search
                </button>
              </div>
              <!-- Error Message -->
              <p v-if="errorMessage" class="text-red-500 text-sm text-center px-4">
                {{ errorMessage }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  </section>
</template>
