<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeIcon } from '@heroicons/vue/24/outline';
import axios from '@/libs/axios';

const router = useRouter();
const route = useRoute();
const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const error = ref('');
const successMessage = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    requirements: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  };
};

const handleResetPassword = async () => {
  try {
    if (newPassword.value !== confirmPassword.value) {
      error.value = 'Passwords do not match';
      return;
    }

    const passwordValidation = validatePassword(newPassword.value);
    if (!passwordValidation.isValid) {
      error.value = 'Password does not meet requirements';
      return;
    }

    isLoading.value = true;
    error.value = '';
    successMessage.value = '';

    const { token, email } = route.query;


    const response = await axios.post('/api/agents/reset-password', {
      email: email,
      password: newPassword.value,
      password_confirmation: confirmPassword.value,
      token: token
    });

    successMessage.value = 'Password has been reset successfully. You can now login with your new password.';

    router.push({
      path: '/login',
      query: { message: successMessage.value }
    });

  } catch (err) {
    console.log('err', err.response);
    error.value = err.response?.data?.message || 'Failed to reset password. Please try again.';
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
              Reset Your Password
            </h2>
            <p class="text-xl text-white/90 max-w-lg mx-auto leading-relaxed">
              Don't worry! It happens to the best of us. We'll help you get back into your account.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Reset Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-md w-full mx-auto">
        <div class="text-center">
          <div class="flex flex-col items-center mb-2 transform hover:scale-105 transition-transform duration-300">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-20 h-20 bg-gradient-to-tr from-primary-700 to-primary-500 rounded-2xl shadow-lg flex items-center justify-center mb-4 relative overflow-hidden group">
                <HomeIcon class="h-10 w-10 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </router-link>
          </div>

          <div class="flex justify-center items-center mb-8">
            <div class="w-48 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
          </div>

          <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Reset Password
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Enter your new password.
          </p>
        </div>

        <div class="mt-8">
          <form class="space-y-6" @submit.prevent="handleResetPassword">

            <div v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded-lg animate-shake">
              {{ error }}
            </div>

            <div v-if="successMessage" class="bg-green-50 text-green-600 text-sm p-3 rounded-lg">
              {{ successMessage }}
            </div>

            <!-- New Password Field -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <input
                id="newPassword"
                v-model="newPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder=" "
                class="peer block w-full rounded-lg border-2 border-gray-300 px-4 pt-5 pb-2 text-gray-900 focus:border-primary-500 focus:ring-0 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:bg-white/90"
              />
              <label
                for="newPassword"
                class="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary-500 peer-focus:font-medium"
              >
                New Password
              </label>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-4 text-gray-400 hover:text-primary-500 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            <!-- Confirm Password Field -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder=" "
                class="peer block w-full rounded-lg border-2 border-gray-300 px-4 pt-5 pb-2 text-gray-900 focus:border-primary-500 focus:ring-0 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:bg-white/90"
              />
              <label
                for="confirmPassword"
                class="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary-500 peer-focus:font-medium"
              >
                Confirm New Password
              </label>
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-4 text-gray-400 hover:text-primary-500 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
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
                  Resetting password...
                </span>
                <span v-else>Reset Password</span>
              </button>
            </div>

            <div class="text-center">
              <router-link
                to="/login"
                class="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
              >
                Back to Login
              </router-link>
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