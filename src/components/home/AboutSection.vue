<script setup>
</script>

<template>
  <!-- About Section -->
  <section class="px-4 lg:px-16 py-8 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Left Side: House Illustration -->
        <div class="flex justify-center lg:justify-start">
          <div class="w-full max-w-sm">
            <img 
              src="/home-buy.svg" 
              alt="House for sale" 
              class="w-full h-auto"
            />
          </div>
        </div>

        <!-- Right Side: Content -->
        <div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            We're Uganda's #1 property website
          </h2>
          
          <div class="space-y-3 mb-5">
            <p class="text-gray-600 text-sm leading-relaxed">
              Find Property24 is Uganda's largest property search portal and is the first place to start your property search.
            </p>
            
            <p class="text-gray-600 text-sm leading-relaxed">
              Find Property24 lists houses, apartments, vacant land from all of Uganda's leading estate agents, so whether you're looking to buy or rent, you'll find your perfect home on Find Property24.
            </p>
          </div>

          <button class="px-8 py-2.5 bg-[#DC2626] text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg">
            Read More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
