<script setup>
const footerSections = {
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Press Kit', href: '/press' }
    ]
  },
  properties: {
    title: 'Properties',
    links: [
      { name: 'Buy Property', href: '/buy' },
      { name: 'Rent Property', href: '/rent' },
      { name: 'Sell Property', href: '/sell' },
      { name: 'Property Guides', href: '/guides' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Market Analysis', href: '/market-analysis' },
      { name: 'Property News', href: '/news' },
      { name: 'Help Center', href: '/help' },
      { name: 'FAQs', href: '/faqs' }
    ]
  },
};

const socialLinks = [
  { 
    name: 'Facebook', 
    href: '#', 
    icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
  },
  { 
    name: 'Twitter', 
    href: '#', 
    icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'
  },
  { 
    name: 'Instagram', 
    href: '#', 
    icon: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 15.5h-7a2 2 0 01-2-2v-7a2 2 0 012-2h7a2 2 0 012 2v7a2 2 0 01-2 2z'
  },
  { 
    name: 'LinkedIn', 
    href: '#', 
    icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
  }
];
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-2 md:col-span-1">
          <h3 class="text-2xl font-bold text-primary-500 mb-4">Property256</h3>
          <p class="text-gray-400 mb-4">
            Uganda's fastest-growing independent real estate platform.
          </p>
          <div class="flex space-x-4">
            <a v-for="social in socialLinks"
               :key="social.name"
               :href="social.href"
               class="text-gray-400 hover:text-white transition-colors"
               :title="social.name">
              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="{{ social.icon }}" />
              </svg>
              <span class="sr-only">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <!-- Footer Links -->
        <div v-for="(section, key) in footerSections"
             :key="key"
             class="space-y-4">
          <h4 class="text-lg font-semibold">{{ section.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in section.links" :key="link.name">
              <a :href="link.href"
                 class="text-gray-400 hover:text-white transition-colors">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="md:flex md:items-center md:justify-between">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Property256. All rights reserved.
          </p>
          <div class="mt-4 md:mt-0 flex items-center space-x-4">
            <span class="text-gray-400">Payment Methods:</span>
            <div class="flex space-x-2">
              <span class="bg-white text-gray-900 px-2 py-1 rounded text-sm">Visa</span>
              <span class="bg-white text-gray-900 px-2 py-1 rounded text-sm">Mastercard</span>
              <span class="bg-white text-gray-900 px-2 py-1 rounded text-sm">Mobile Money</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>