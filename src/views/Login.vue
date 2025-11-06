<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeIcon } from '@heroicons/vue/24/outline';
import axios from '@/libs/axios';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const error = ref('');
const successMessage = ref('');

onMounted(() => {
  if (route.query.message) {
    successMessage.value = route.query.message;
    // Clear the message from URL after displaying
    router.replace({ query: {} });
  }
});

const handleLogin = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    successMessage.value = '';

    const response = await axios.post('/api/agents/login', {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('ACCESS_TOKEN', response.data.data.access_token);
    console.log('response.data.data', response.data.data.agent);
    localStorage.setItem('USERDATA', JSON.stringify(response.data.data.agent));
    
    // Redirect to dashboard
    router.push('/dashboard');
  } catch (err) {
    console.log('error', err.response.data.meta.message);
    error.value = err.response.data.meta.message;
  } finally {
    isLoading.value = false;
  }
};
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
              Find Your Dream Home
            </h2>
            <p class="text-xl text-white/90 max-w-lg mx-auto leading-relaxed">
              Discover the perfect property that matches your lifestyle. Your journey to exceptional living starts here.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Login Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-md w-full mx-auto">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <img src="/logo.svg" alt="FindProperty24" class="h-16 w-auto" />
        </div>
        
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Don't have an account yet?
            <router-link to="/register" class="font-medium text-[#DC2626] hover:text-red-700 transition-colors duration-200">
              Create one now
            </router-link>
          </p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-4 rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder=" "
                class="peer block w-full rounded-lg border-2 border-gray-300 px-4 pt-5 pb-2 text-gray-900 focus:border-[#DC2626] focus:ring-0 focus:outline-none transition-colors duration-200"
              />
              <label
                for="email"
                class="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#DC2626]"
              >
                Email address
              </label>
            </div>

            <div class="relative">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder=" "
                class="peer block w-full rounded-lg border-2 border-gray-300 px-4 pt-5 pb-2 text-gray-900 focus:border-[#DC2626] focus:ring-0 focus:outline-none transition-colors duration-200"
              />
              <label
                for="password"
                class="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#DC2626]"
              >
                Password
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 rounded-sm border-gray-300 text-[#DC2626] focus:ring-[#DC2626] transition-colors duration-200"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <RouterLink to="/forgot-password" class="font-medium text-[#DC2626] hover:text-red-700 transition-colors duration-200">
                  Forgot password?
                </RouterLink>
              </div>
            </div>

            <div v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded-lg animate-shake">
              {{ error }}
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="group relative flex w-full justify-center rounded-lg border border-transparent bg-[#DC2626] py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span v-if="isLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
                <span v-else>Sign in</span>
              </button>
            </div>
          </form>
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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
}

@keyframes ping {
  0%, 100% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.75;
    transform: scale(1.2);
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

.animate-gradient-x {
  background-size: 200% auto;
  animation: gradient-x 8s ease infinite;
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>