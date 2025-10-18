<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { propertyService } from '@/services/propertyService.js';
import axios from '@/libs/axios';

const properties = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const filterStatus = ref('');
const toast = useToast();

const filteredProperties = computed(() => {
    let result = [...properties.value];

    // Apply search filter
    if (searchQuery.value) {
        const searchTerm = searchQuery.value.toLowerCase();
        result = result.filter(property =>
            property.title.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm) ||
            property.type.toLowerCase().includes(searchTerm)
        );
    }

    // Apply status filter
    if (filterStatus.value) {
        result = result.filter(property =>
            property.status?.toLowerCase() === filterStatus.value.toLowerCase()
        );
    }

    return result;
});

const handleSearch = () => {
    // No need to fetch, computed property will handle filtering
};

const handleFilter = () => {
    // No need to fetch, computed property will handle filtering
};

const deleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
        await axios.delete(`/api/agents/properties/${propertyId}`);
        // Remove property from local state
        properties.value = properties.value.filter(p => p.id !== propertyId);
        toast.success('Property deleted successfully');
    } catch (error) {
        toast.error('Failed to delete property');
        console.error('Error deleting property:', error);
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
};

const getStatusClass = (status) => {
    const classes = {
        available: 'bg-green-100 text-green-800',
        sold: 'bg-red-100 text-red-800',
        rented: 'bg-blue-100 text-blue-800'
    };
    return classes[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

const fetchProperties = async () => {
    loading.value = true;
    try {
        const response = await propertyService.fetchAgentProperties();
        const transformedProperties = propertyService.transformPropertiesData(response.data);
        properties.value = transformedProperties;
    } catch (error) {
        console.error('Error fetching properties:', error);
        toast.error('Failed to load properties. Please try again.');
        properties.value = [];
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchProperties();
});
</script>

<template>
    <div class="container mx-auto px-4 py-4">
        <!-- Header Section with Gradient Background -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg mb-8">
            <div class="max-w-7xl mx-auto px-6 py-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">My Properties</h1>
                        <p class="text-primary-100">Manage your property listings</p>
                    </div>
                    <router-link 
                        to="/agent/properties/create" 
                        class="mt-4 md:mt-0 bg-white text-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 flex items-center shadow-sm">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Add New Property
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white rounded-xl shadow-md mb-8">
            <div class="p-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <div class="relative">
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input 
                                v-model="searchQuery" 
                                type="text" 
                                placeholder="Search properties..." 
                                class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                @input="handleSearch"
                            >
                        </div>
                    </div>
                    <div class="md:w-48">
                        <select 
                            v-model="filterStatus" 
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                            @change="handleFilter"
                        >
                            <option value="">All Status</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p class="text-gray-500 mt-4">Loading properties...</p>
        </div>

        <!-- No Results State -->
        <div v-else-if="filteredProperties.length === 0" class="text-center py-16 bg-white rounded-xl shadow-md">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <p class="text-gray-500 text-lg">No properties found</p>
        </div>

        <!-- Properties Grid -->
        <div v-else class="grid grid-cols-1 gap-6">
            <div v-for="property in filteredProperties" 
                :key="property.id" 
                class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div class="flex flex-col md:flex-row h-full">
                    <!-- Property Image -->
                    <div class="md:w-80 relative shrink-0">
                        <img 
                            :src="property.image || '/placeholder-property.jpg'" 
                            class="w-full h-full object-cover min-h-[200px]"
                            alt="Property"
                        >
                        <span 
                            :class="[
                                getStatusClass(property.status),
                                'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm'
                            ]">
                            {{ property.status || 'Available' }}
                        </span>
                    </div>

                    <!-- Property Details -->
                    <div class="flex-1 p-6 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <div class="flex-1">
                                    <h3 class="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                                        {{ property.title }}
                                    </h3>
                                    <div class="flex items-center text-gray-600">
                                        <svg class="w-4 h-4 mr-1 shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span class="truncate">{{ property.location }}</span>
                                    </div>
                                </div>
                                <div class="text-xl font-bold text-primary-600 ml-4 shrink-0">{{ formatPrice(property.price) }}</div>
                            </div>

                            <!-- Property Features -->
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-4 h-4 mr-1 shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                    </svg>
                                    <span class="truncate">{{ property.type }}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-4 h-4 mr-1 shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                    <span>{{ property.bedrooms }} beds</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-4 h-4 mr-1 shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                    </svg>
                                    <span>{{ property.bathrooms }} baths</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <svg class="w-4 h-4 mr-1 shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                                    </svg>
                                    <span>{{ property.area }} sqft</span>
                                </div>
                            </div>

                            <!-- Amenities -->
                            <div v-if="property.amenities && property.amenities.length > 0">
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        v-for="amenity in property.amenities"
                                        :key="amenity"
                                        v-if="!['Bedroom', 'Bathroom', 'Area'].includes(amenity)"
                                        class="bg-primary-50 text-primary-600 px-2 py-1 rounded-md text-xs font-medium">
                                        {{ amenity }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                            <router-link 
                                :to="'/agent/properties/' + property.id" 
                                class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                View
                            </router-link>
                            <router-link 
                                :to="'/agent/properties/' + property.id + '/edit'" 
                                class="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                                Edit
                            </router-link>
                            <button 
                                @click="deleteProperty(property.id)"
                                class="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>