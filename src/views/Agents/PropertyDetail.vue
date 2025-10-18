<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { propertyService } from '@/services/propertyService.js';
import axios from '@/libs/axios';
import {
    MapPinIcon,
    HomeIcon,
    BuildingOfficeIcon,
    PhotoIcon,
    HeartIcon,
    ShareIcon,
    ArrowLeftIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/vue/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const property = ref(null);
const loading = ref(false);
const error = ref(null);
const currentImageIndex = ref(0);
const isFavorite = ref(false);

const propertyId = computed(() => route.params.id);

const formatPrice = (price) => {
    // If price is already a formatted string (like "UGX 34,000,000"), return as is
    if (typeof price === 'string') {
        return price;
    }

    // If price is a number, format it as USD (existing behavior)
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getStatusClass = (status) => {
    const classes = {
        available: 'bg-green-100 text-green-800',
        sold: 'bg-red-100 text-red-800',
        rented: 'bg-blue-100 text-blue-800'
    };
    return classes[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

const nextImage = () => {
    if (property.value?.images?.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % property.value.images.length;
    }
};

const prevImage = () => {
    if (property.value?.images?.length > 0) {
        currentImageIndex.value = currentImageIndex.value === 0
            ? property.value.images.length - 1
            : currentImageIndex.value - 1;
    }
};

const setCurrentImage = (index) => {
    currentImageIndex.value = index;
};

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
    toast.success(isFavorite.value ? 'Added to favorites' : 'Removed from favorites');
};

// Helper function to get true amenities for a property
const getTrueAmenities = (amenities) => {
    if (!amenities || typeof amenities !== 'object') return [];

    return Object.entries(amenities)
        .filter(([key, value]) => value === true && !['bedroom', 'bathroom', 'area'].includes(key))
        .map(([key]) => key.replace(/_/g, ' '));
};

const shareProperty = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: property.value.title,
                text: property.value.description,
                url: window.location.href
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard');
        } catch (err) {
            toast.error('Failed to copy link');
        }
    }
};

const editProperty = () => {
    router.push(`/agent/properties/${propertyId.value}/edit`);
};

const deleteProperty = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
        await axios.delete(`/api/agents/properties/${propertyId.value}`);
        toast.success('Property deleted successfully');
        router.push('/agent/properties');
    } catch (error) {
        toast.error('Failed to delete property');
        console.error('Error deleting property:', error);
    }
};

const fetchProperty = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios.get(`/api/agents/properties/${propertyId.value}`);
        property.value = response.data.data;
    } catch (err) {
        console.error('Error fetching property:', err);
        error.value = 'Failed to load property details. Please try again.';
        toast.error('Failed to load property details');
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.go(-1);
};

onMounted(() => {
    fetchProperty();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p class="text-gray-500 mt-4">Loading property details...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex items-center justify-center min-h-screen">
            <div class="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
                <div class="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
                <p class="text-gray-600 mb-6">{{ error }}</p>
                <button
                    @click="goBack"
                    class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    Go Back
                </button>
            </div>
        </div>

        <!-- Property Details -->
        <div v-else-if="property" class="container mx-auto px-4 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <button
                    @click="goBack"
                    class="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <ArrowLeftIcon class="h-5 w-5 mr-2" />
                    Back to Properties
                </button>

                <div class="flex items-center space-x-3">
                    <button
                        @click="toggleFavorite"
                        class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <HeartSolidIcon v-if="isFavorite" class="h-6 w-6 text-red-500" />
                        <HeartIcon v-else class="h-6 w-6 text-gray-600 hover:text-red-500" />
                    </button>
                    <button
                        @click="shareProperty"
                        class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <ShareIcon class="h-6 w-6 text-gray-600" />
                    </button>
                    <button
                        @click="editProperty"
                        class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <PencilIcon class="h-6 w-6 text-green-600" />
                    </button>
                    <button
                        @click="deleteProperty"
                        class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <TrashIcon class="h-6 w-6 text-red-600" />
                    </button>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column - Images and Main Info -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Image Gallery -->
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="relative">
                            <!-- Main Image -->
                            <div class="relative h-96 lg:h-[500px] bg-gray-100">
                                <img
                                    v-if="property.images && property.images.length > 0"
                                    :src="property.images[currentImageIndex] || property.image"
                                    :alt="property.title"
                                    class="w-full h-full object-cover"
                                />
                                <div v-else class="flex items-center justify-center h-full">
                                    <PhotoIcon class="h-16 w-16 text-gray-400" />
                                </div>

                                <!-- Navigation Buttons -->
                                <button
                                    v-if="property.images && property.images.length > 1"
                                    @click="prevImage"
                                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </button>
                                <button
                                    v-if="property.images && property.images.length > 1"
                                    @click="nextImage"
                                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </button>

                                <!-- Status Badge -->
                                <div class="absolute top-4 left-4">
                                    <span :class="[
                                        getStatusClass(property.status),
                                        'px-3 py-1 rounded-full text-sm font-semibold shadow-sm'
                                    ]">
                                        {{ property.status || 'Available' }}
                                    </span>
                                </div>
                            </div>

                            <!-- Thumbnail Gallery -->
                            <div v-if="property.images && property.images.length > 1" class="p-4 border-t border-gray-200">
                                <div class="flex space-x-2 overflow-x-auto">
                                    <button
                                        v-for="(image, index) in property.images"
                                        :key="index"
                                        @click="setCurrentImage(index)"
                                        :class="[
                                            'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200',
                                            currentImageIndex === index
                                                ? 'border-primary-500 scale-105'
                                                : 'border-gray-200 hover:border-gray-300'
                                        ]"
                                    >
                                        <img
                                            :src="image"
                                            :alt="`${property.title} - Image ${index + 1}`"
                                            class="w-full h-full object-cover"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Property Description -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                        <div class="prose prose-gray max-w-none">
                            <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {{ property.description || 'No description available.' }}
                            </p>
                        </div>
                    </div>

                    <!-- Features & Amenities -->
                    <div v-if="property.amenities && getTrueAmenities(property.amenities).length > 0" class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <div
                                v-for="amenity in getTrueAmenities(property.amenities)"
                                :key="amenity"
                                class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <div class="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full"></div>
                                <span class="text-gray-700 font-medium capitalize">{{ amenity }}</span>
                            </div>
                        </div>

                        <!-- Additional amenities as tags for better visibility -->
                        <div class="mt-6 pt-6 border-t border-gray-200">
                            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Overview</h3>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="amenity in getTrueAmenities(property.amenities)"
                                    :key="amenity"
                                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 border border-primary-200">
                                    <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    {{ amenity }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Property Info -->
                <div class="space-y-6">
                    <!-- Price and Basic Info -->
                    <div class="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                        <div class="mb-6">
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ property.title }}</h1>
                            <div class="flex items-center text-gray-600 mb-4">
                                <MapPinIcon class="h-5 w-5 mr-2 text-primary-500" />
                                <span class="font-medium">{{ property.location }}</span>
                            </div>
                            <div class="text-3xl font-bold text-primary-600">
                                {{ formatPrice(property.price) }}
                            </div>
                        </div>

                        <!-- Key Details -->
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="bg-gray-50 rounded-lg p-3">
                                <div class="flex items-center text-gray-600 mb-1">
                                    <HomeIcon class="h-4 w-4 mr-2" />
                                    <span class="text-sm">Type</span>
                                </div>
                                <div class="font-semibold text-gray-900">{{ property.type || 'N/A' }}</div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-3">
                                <div class="flex items-center text-gray-600 mb-1">
                                    <BuildingOfficeIcon class="h-4 w-4 mr-2" />
                                    <span class="text-sm">Bedrooms</span>
                                </div>
                                <div class="font-semibold text-gray-900">{{ property.bedrooms || property.amenities?.bedroom || 0 }}</div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-3">
                                <div class="flex items-center text-gray-600 mb-1">
                                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                    </svg>
                                    <span class="text-sm">Bathrooms</span>
                                </div>
                                <div class="font-semibold text-gray-900">{{ property.bathrooms || property.amenities?.bathroom || 0 }}</div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-3">
                                <div class="flex items-center text-gray-600 mb-1">
                                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                                    </svg>
                                    <span class="text-sm">Area</span>
                                </div>
                                <div class="font-semibold text-gray-900">{{ property.area || property.amenities?.area || 0 }} sqft</div>
                            </div>
                        </div>

                        <!-- Dates -->
                        <div class="border-t border-gray-200 pt-4 space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Listed on</span>
                                <span class="text-gray-900 font-medium">{{ formatDate(property.created_at) }}</span>
                            </div>
                            <div v-if="property.updated_at && property.updated_at !== property.created_at" class="flex justify-between text-sm">
                                <span class="text-gray-600">Last updated</span>
                                <span class="text-gray-900 font-medium">{{ formatDate(property.updated_at) }}</span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="mt-6 space-y-3">
                            <button
                                @click="editProperty"
                                class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center">
                                <PencilIcon class="h-5 w-5 mr-2" />
                                Edit Property
                            </button>
                            <button
                                @click="deleteProperty"
                                class="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center justify-center">
                                <TrashIcon class="h-5 w-5 mr-2" />
                                Delete Property
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>