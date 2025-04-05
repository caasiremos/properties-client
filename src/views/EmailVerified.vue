<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeIcon } from '@heroicons/vue/24/outline';
import axios from '@/libs/axios';

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const error = ref('');
const successMessage = ref('');

onMounted(async () => {
  try {
    isLoading.value = true;
    error.value = '';
    successMessage.value = '';

    // Verify email with hash and id
    const response = await axios.post(`/api/agents/email/verify`, {
      hash: route.query.hash,
      id: route.query.id
    });

    successMessage.value = response.data.message || 'Email verified successfully!';
    
    // Redirect to login after 5 seconds
    setTimeout(() => {
      router.push({
        path: '/login',
        query: { message: successMessage.value }
      });
    }, 5000);
  } catch (err) {
    console.error('Verification error:', err);
    error.value = err.response?.data?.meta?.message || 'Failed to verify email. Please try again later.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Column - Image -->
    <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
      <!-- Background Image -->
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80"
        alt="Luxury modern property"
        class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
      />
      
      <!-- Gradient Overlays -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-600/80 mix-blend-multiply animate-gradient" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,transparent_40%,rgba(0,0,0,0.4))]" />
      
      <!-- Content -->
      <div class="absolute inset-0 flex items-center justify-center p-12">
        <!-- Decorative Elements -->
        <div class="mb-8 relative">
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 relative mb-4">
              <div class="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
              <div class="absolute inset-2 bg-white/20 rounded-full animate-ping opacity-75"></div>
              <HomeIcon class="w-24 h-24 text-white/90 relative z-10 transform hover:rotate-12 transition-transform duration-300" />
            </div>
            <div class="relative">
              <span class="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                FindProperty
                <span class="text-primary-400">24</span>
              </span>
              <div class="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
            </div>
          </div>
        </div>
        
        <!-- Text Content -->
        <div class="space-y-6 relative transform transition-all duration-500">
          <h2 class="text-4xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 animate-gradient-x">
            Email Verification
          </h2>
          <p class="text-xl text-white/90 max-w-lg mx-auto leading-relaxed">
            {{ error ? 'Verification in progress...' : 'Your email is being verified. Please wait...' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Right Column - Verification Message -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-md w-full mx-auto">
        <div class="text-center">
          <div class="flex justify-center items-center mb-8">
            <div class="w-48 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
          </div>

          <!-- Loading/Error/Success Icon -->
          <div v-if="isLoading" class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
            <svg class="animate-spin h-12 w-12 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else-if="error" class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <svg class="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div v-else class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <svg class="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            {{ error ? 'Verification Failed' : successMessage ? 'Email Verified Successfully' : 'Verifying Email...' }}
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            {{ error || successMessage || 'Please wait while we verify your email...' }}
          </p>

          <!-- Loading Animation -->
          <div v-if="!error" class="mt-8">
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-primary-600 h-2.5 rounded-full animate-progress"></div>
            </div>
          </div>

          <div class="mt-8">
            <router-link
              to="/login"
              class="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Go to Login
              <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes progress {
  0% { width: 0%; }
  100% { width: 100%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

.animate-gradient-x {
  background-size: 200% auto;
  animation: gradient-x 8s ease infinite;
}

.animate-progress {
  animation: progress 5s linear forwards;
}
</style>
