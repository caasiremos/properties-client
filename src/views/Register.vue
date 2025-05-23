<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { HomeIcon } from '@heroicons/vue/24/outline';
import PhoneNumber from '../components/PhoneNumber.vue';
import axios from '@/libs/axios';

const router = useRouter();
const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  agreeToTerms: false
});
const isLoading = ref(false);
const error = ref('');

const handleRegister = async () => {
  try {
    isLoading.value = true;
    error.value = '';

    const response = await axios.post('/api/agents/register', {
      name: formData.value.fullName,
      email: formData.value.email,
      phone_number: formData.value.phone,
      password: formData.value.password,
    });

    router.push({
      path: '/login',
      query: { message: response.data.metadata }
    });
  } catch (err) {
    error.value = err.response.data.meta.message || 'Registration failed. Please try again.';
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
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-600/80 mix-blend-multiply animate-gradient" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,transparent_40%,rgba(0,0,0,0.4))]" />
      
      <!-- Content -->
      <div class="absolute inset-0 flex items-center justify-center p-12">
        <div class="text-white text-center">
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
          <div class="space-y-6 relative transition-all duration-500">
            <h2 class="text-4xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 animate-gradient-x">
              Start Your Property Journey
            </h2>
            <p class="text-xl text-white/90 max-w-lg mx-auto leading-relaxed">
              Join thousands of satisfied clients who found their perfect property through our platform.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Registration Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-md w-full mx-auto">
        <div class="text-center">

          <div class="flex justify-center items-center mb-8">
            <div class="w-48 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
          </div>

          <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Create Account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
              Sign in
            </router-link>
          </p>
        </div>

        <div class="mt-8">
          <form class="space-y-6" @submit.prevent="handleRegister">
            <!-- Full Name Field -->
            <div class="relative">
              <input
                id="fullName"
                v-model="formData.fullName"
                type="text"
                required
                placeholder=" "
                class="peer block w-full rounded-lg border-2 border-gray-300 px-4 pt-5 pb-2 text-gray-900 focus:border-primary-500 focus:ring-0 focus:outline-none transition-colors duration-200"
              />
              <label
                for="fullName"
                class="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary-500"
              >
                Full name
              </label>
            </div>

            <!-- Contact Information -->
            <div class="relative">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                placeholder=" "
                class="peer block w-full rounded-lg border-2 border-gray-300 px-4 pt-5 pb-2 text-gray-900 focus:border-primary-500 focus:ring-0 focus:outline-none transition-colors duration-200"
              />
              <label
                for="email"
                class="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary-500"
              >
                Email address
              </label>
            </div>

            <div class="relative">
              <PhoneNumber
                v-model="formData.phone"
                label="Phone number"
                required
              />
            </div>

            <!-- Password Fields -->
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                type="password"
                required
                placeholder=" "
                class="peer block w-full rounded-lg border-2 border-gray-300 px-4 pt-5 pb-2 text-gray-900 focus:border-primary-500 focus:ring-0 focus:outline-none transition-colors duration-200"
              />
              <label
                for="password"
                class="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary-500"
              >
                Password
              </label>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-center">
              <input
                id="agreeToTerms"
                v-model="formData.agreeToTerms"
                type="checkbox"
                required
                class="h-4 w-4 rounded-sm border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200"
              />
              <label for="agreeToTerms" class="ml-2 block text-sm text-gray-700">
                I agree to the
                <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
                  Terms and Conditions
                </a>
                and
                <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded-lg animate-shake">
              {{ error }}
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="group relative flex w-full justify-center rounded-lg border border-transparent bg-primary-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span v-if="isLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
                <span v-else>Create Account</span>
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