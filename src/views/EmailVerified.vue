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
      <div class="absolute inset-0 bg-gradient-to-br from-red-900/40 via-red-800/30 to-red-600/20 mix-blend-multiply animate-gradient" />
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-transparent" />
      
      <!-- Content -->
      <div class="absolute inset-0 flex items-center justify-center p-12">
        <div class="text-white text-center">
          <!-- Text Content -->
          <div class="space-y-6 relative transform transition-all duration-500">
            <h2 class="text-5xl font-bold mb-6 leading-tight text-white">
              Email Verification
            </h2>
            <p class="text-xl text-white/90 max-w-lg mx-auto leading-relaxed">
              {{ error ? 'Verification in progress...' : 'Your email is being verified. Please wait...' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Verification Message -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-md w-full mx-auto">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <img src="/logo.svg" alt="FindProperty24" class="h-16 w-auto" />
        </div>
        
        <div class="text-center">

          <!-- Loading/Error/Success Icon -->
          <div v-if="isLoading" class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
            <svg class="animate-spin h-12 w-12 text-[#DC2626]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              <div class="bg-[#DC2626] h-2.5 rounded-full animate-progress"></div>
            </div>
          </div>

          <div class="mt-8">
            <router-link
              to="/login"
              class="inline-flex items-center text-sm font-medium text-[#DC2626] hover:text-red-700 transition-colors duration-200"
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
