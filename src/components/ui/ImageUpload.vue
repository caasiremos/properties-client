<template>
  <div class="space-y-4">
    <!-- Upload Zone -->
    <div
      class="relative group cursor-pointer"
      @click="triggerFileInput"
    >
      <div
        class="flex flex-col items-center justify-center px-6 py-12 border-2 border-gray-300 border-dashed rounded-xl transition-all duration-300 hover:border-primary-400 hover:bg-primary-50/30"
        :class="{
          'border-primary-500 bg-primary-50 scale-[1.02] shadow-lg': isDragging,
          'border-gray-300 bg-gray-50/50': !isDragging
        }"
        @drop="handleDrop"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @dragenter.prevent
      >
        <!-- Upload Icon with Animation -->
        <div class="relative mb-4">
          <div class="absolute inset-0 bg-primary-100 rounded-full animate-pulse opacity-20"></div>
          <svg
            class="relative h-16 w-16 text-gray-400 group-hover:text-primary-500 transition-colors duration-300"
            :class="{ 'text-primary-500 animate-bounce': isDragging }"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div
            v-if="isDragging"
            class="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 animate-ping"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <!-- Main Upload Text -->
        <div class="text-center space-y-2">
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              type="button"
              class="relative bg-primary-600 cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              @click.stop="triggerFileInput"
            >
              Choose Files
            </button>
            <input
              ref="fileInput"
              type="file"
              :multiple="multiple"
              :accept="accept"
              class="sr-only"
              @change="handleFileSelect"
            >
            <span class="text-gray-500 font-medium">or drag & drop here</span>
          </div>

          <!-- File Format Info -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-gray-500">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ acceptText }}
            </span>
            <span class="hidden sm:inline">•</span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Max {{ maxSizeMB }}MB per file
            </span>
            <span class="hidden sm:inline">•</span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Up to {{ maxFiles }} files
            </span>
          </div>

          <!-- Drag Active Indicator -->
          <div
            v-if="isDragging"
            class="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium animate-pulse"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Drop files here to upload
          </div>
        </div>
      </div>

      <!-- Subtle gradient overlay on hover -->
      <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="text-red-600 text-sm mt-2">
      {{ errorMessage }}
    </div>

    <!-- Image Preview Grid -->
    <div v-if="images.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="(image, index) in images" :key="index" class="relative group">
        <div class="aspect-square overflow-hidden rounded-lg border border-gray-200">
          <img
            :src="imagePreview(image)"
            :alt="`Image ${index + 1}`"
            class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          >
        </div>
        <button
          type="button"
          @click="removeImage(index)"
          class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors duration-200 shadow-lg opacity-0 group-hover:opacity-100"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {{ image.name || `Image ${index + 1}` }}
        </div>
      </div>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading" class="mt-4">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-primary-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
      <p class="text-sm text-gray-600 mt-1">Uploading... {{ uploadProgress }}%</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  maxFiles: {
    type: Number,
    default: 10
  },
  maxSizeMB: {
    type: Number,
    default: 10
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  autoUpload: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'error', 'upload-progress', 'upload-complete']);

const fileInput = ref(null);
const isDragging = ref(false);
const errorMessage = ref('');
const uploading = ref(false);
const uploadProgress = ref(0);
const dragCounter = ref(0);

const images = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const inputId = computed(() => `file-upload-${Math.random().toString(36).substr(2, 9)}`);

const acceptText = computed(() => {
  if (props.accept === 'image/*') return 'PNG, JPG, GIF';
  return props.accept.toUpperCase().replace(/\*/g, '').replace(/,/g, ', ');
});

const maxFileSize = computed(() => props.maxSizeMB * 1024 * 1024);

const imagePreview = (image) => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  if (typeof image === 'string') {
    return image;
  }
  if (image.url) {
    return image.url;
  }
  if (image.preview) {
    return image.preview;
  }
  return '';
};

const validateFiles = (files) => {
  const validFiles = [];
  const errors = [];

  Array.from(files).forEach(file => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      errors.push(`${file.name} is not an image file`);
      return;
    }

    // Check file size
    if (file.size > maxFileSize.value) {
      errors.push(`${file.name} is larger than ${props.maxSizeMB}MB`);
      return;
    }

    // Check max files limit
    if (props.multiple && images.value.length + validFiles.length >= props.maxFiles) {
      errors.push(`Maximum ${props.maxFiles} files allowed`);
      return;
    }

    validFiles.push(file);
  });

  if (errors.length > 0) {
    errorMessage.value = errors.join(', ');
    setTimeout(() => {
      errorMessage.value = '';
    }, 5000);
  }

  return validFiles;
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  event.stopPropagation();
  const files = event.target.files;
  if (files && files.length > 0) {
    addFiles(files);
  }
  // Reset input value to allow selecting the same file again
  event.target.value = '';
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  dragCounter.value = 0;

  const files = event.dataTransfer.files;
  if (files && files.length > 0) {
    addFiles(files);
  }
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDragEnter = (event) => {
  event.preventDefault();
  dragCounter.value++;
  if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
    isDragging.value = true;
  }
};

const handleDragLeave = (event) => {
  event.preventDefault();
  dragCounter.value--;
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
};

const addFiles = (files) => {
  const validFiles = validateFiles(files);

  if (validFiles.length > 0) {
    if (props.multiple) {
      images.value = [...images.value, ...validFiles];
    } else {
      images.value = [validFiles[0]];
    }

    if (props.autoUpload) {
      uploadFiles(validFiles);
    }
  }
};

const removeImage = (index) => {
  const removedImage = images.value[index];
  images.value.splice(index, 1);

  // Clean up object URL if it's a File
  if (removedImage instanceof File) {
    URL.revokeObjectURL(imagePreview(removedImage));
  }
};

const uploadFiles = async (files) => {
  uploading.value = true;
  uploadProgress.value = 0;

  try {
    // Simulate upload progress
    const interval = setInterval(() => {
      uploadProgress.value += 10;
      if (uploadProgress.value >= 90) {
        clearInterval(interval);
      }
    }, 200);

    emit('upload-progress', { files, progress: uploadProgress.value });

    // Simulate upload completion
    await new Promise(resolve => setTimeout(resolve, 2000));

    clearInterval(interval);
    uploadProgress.value = 100;

    emit('upload-complete', { files, success: true });

    setTimeout(() => {
      uploading.value = false;
      uploadProgress.value = 0;
    }, 1000);

  } catch (error) {
    emit('error', error);
    uploading.value = false;
    uploadProgress.value = 0;
  }
};

const clearAll = () => {
  images.value = [];
  errorMessage.value = '';
  uploading.value = false;
  uploadProgress.value = 0;
};

// Cleanup object URLs on unmount
onUnmounted(() => {
  images.value.forEach(image => {
    if (image instanceof File) {
      URL.revokeObjectURL(imagePreview(image));
    }
  });
});

// Expose methods for parent component
defineExpose({
  clearAll,
  uploadFiles,
  removeImage
});
</script>