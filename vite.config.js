import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'vue',
            'vue-router',
            '@heroicons/vue',
            '@headlessui/vue'
          ]
        }
      }
    }
  }
})