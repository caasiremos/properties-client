<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const features = [
  {
    title: 'Property Alerts',
    description: 'Configure a property alert and get notified on new listings matching your search criteria',
    buttonText: 'Sign Up Now',
    buttonAction: () => router.push({ name: 'register' }),
    icon: 'bell'
  },
  {
    title: 'Find A Trusted Agent',
    description: 'Find your dream home on FindProperty24 by searching through the largest database of private property for sale by estate agents.',
    buttonText: 'Search Estate Agents',
    buttonAction: () => router.push('/agents'),
    icon: 'agent'
  },
  {
    title: 'Looking To Buy?',
    description: 'Get all the information you need when buying a property with our comprehensive property guides.',
    buttonText: 'View Property Guides',
    buttonAction: () => router.push('/guides'),
    icon: 'guide'
  }
];
</script>

<template>
  <!-- Info Section -->
  <section class="px-4 lg:px-16 py-12 bg-gray-50">
    <!-- Top Section: Redefining Real Estate & Features -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <!-- Redefining Real Estate -->
        <div class="lg:col-span-1 flex items-center">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Redefining Real Estate in Uganda.
            </h2>
            <div class="w-16 h-1 bg-[#DC2626] mt-3"></div>
          </div>
        </div>

        <!-- Feature Cards -->
        <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
          >
            <!-- Icon -->
            <div class="mb-4">
              <div class="w-14 h-14 bg-[#DC2626] rounded-full flex items-center justify-center">
                <!-- Bell Icon -->
                <svg v-if="feature.icon === 'bell'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <!-- Agent Icon -->
                <svg v-else-if="feature.icon === 'agent'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <!-- Guide Icon -->
                <svg v-else-if="feature.icon === 'guide'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            <!-- Content -->
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">
              {{ feature.description }}
            </p>

            <!-- Button -->
            <button
              @click="feature.buttonAction"
              class="px-6 py-2.5 text-sm font-semibold text-[#DC2626] border-2 border-[#DC2626] rounded-full hover:bg-[#DC2626] hover:text-white transition-all duration-200 cursor-pointer self-start"
            >
              {{ feature.buttonText }}
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Section: App Download -->
      <div class="bg-white rounded-xl p-8 shadow-sm">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          <!-- Left Side: Text Content -->
          <div class="flex-1">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Download Uganda's most trusted property search app
            </h2>
            <p class="text-gray-600 text-base">
              Install the Find Property24 app and start searching smarter.
            </p>
          </div>

          <!-- Right Side: QR Code, Store Buttons & Phone -->
          <div class="flex items-center gap-6 lg:gap-8">
            <!-- QR Code and Store Buttons -->
            <div class="flex flex-col items-center gap-4">
              <!-- QR Code -->
              <div class="flex-shrink-0">
                <div class="w-32 h-32 bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg class="w-28 h-28 text-white" viewBox="0 0 100 100" fill="currentColor">
                    <!-- Simple QR code placeholder pattern -->
                    <rect x="10" y="10" width="20" height="20"/>
                    <rect x="35" y="10" width="5" height="5"/>
                    <rect x="45" y="10" width="5" height="5"/>
                    <rect x="70" y="10" width="20" height="20"/>
                    <rect x="10" y="35" width="5" height="5"/>
                    <rect x="20" y="35" width="5" height="5"/>
                    <rect x="45" y="35" width="10" height="10"/>
                    <rect x="10" y="45" width="5" height="5"/>
                    <rect x="70" y="35" width="5" height="5"/>
                    <rect x="80" y="35" width="5" height="5"/>
                    <rect x="10" y="70" width="20" height="20"/>
                    <rect x="35" y="70" width="5" height="5"/>
                    <rect x="45" y="70" width="5" height="5"/>
                    <rect x="70" y="70" width="20" height="20"/>
                  </svg>
                </div>
                <p class="text-xs text-gray-500 text-center mt-2">Scan to download the app</p>
              </div>

              <!-- Store Buttons -->
              <div class="flex flex-col gap-2">
                <a href="#" class="block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" class="h-10 w-auto hover:opacity-80 transition-opacity" />
                </a>
                <a href="#" class="block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" class="h-10 w-auto hover:opacity-80 transition-opacity" />
                </a>
              </div>
            </div>

            <!-- Phone Mockup -->
            <div class="hidden lg:block flex-shrink-0">
              <div class="w-48 h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop" 
                  alt="Property Search App" 
                  class="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
