<script setup>
import { ref } from 'vue';
import { ShieldCheckIcon } from '@heroicons/vue/24/solid';

const email = ref('');

const agents = [
  {
    id: 1,
    name: 'Tumusiime Johnson',
    company: 'Simba Realty',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verified: true,
    language: 'English',
    role: 'Estate Agent, Business Owner'
  },
  {
    id: 2,
    name: 'Nakyanzi Olivia Grace',
    company: 'UG Properties',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    verified: true,
    language: 'English',
    role: 'Estate Agent, Business Owner'
  },
  {
    id: 3,
    name: 'Kasumba Robert',
    company: 'UG Properties',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    verified: true,
    language: 'English',
    role: 'Estate Agent, Business Owner'
  }
];

const handleSignup = () => {
  console.log('Email signup:', email.value);
};
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- Newsletter Section -->
      <div class="bg-white rounded-3xl shadow-lg p-5 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-gray-900">
              Get the <span class="font-black">latest property news</span> and <span class="font-black">advice</span> direct to your inbox.
            </h3>
          </div>
        </div>
        
        <div class="flex items-center gap-2 w-full md:w-auto flex-shrink-0">
          <div class="relative flex-1 md:w-72">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <input 
              v-model="email"
              type="email" 
              placeholder="Your email address"
              class="w-full pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-red-600 transition-colors"
            />
          </div>
          <button 
            @click="handleSignup"
            class="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
      </div>

      <!-- Agents Section -->
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
          <span class="border-b-4 border-gray-900 pb-2">Find the best estate agents</span> 
          <span class="text-gray-700"> to guide your through the selling, buying or renting process.</span>
        </h2>
      </div>

      <!-- Agents Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="agent in agents" 
          :key="agent.id"
          class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="flex items-start gap-3 p-5">
            <img 
              :src="agent.image" 
              :alt="agent.name"
              class="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-0.5">{{ agent.name }}</h3>
              <p class="text-gray-600 text-sm mb-2">{{ agent.company }}</p>
              
              <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <ShieldCheckIcon class="w-3.5 h-3.5" />
                  Verified
                </span>
                <span class="inline-flex items-center bg-gray-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {{ agent.language }}
                </span>
              </div>
              
              <p class="text-gray-600 text-xs">{{ agent.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
