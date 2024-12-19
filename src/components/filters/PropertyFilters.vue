<script setup>
import { ref } from 'vue';

const props = defineProps({
  propertyTypes: {
    type: Array,
    required: true
  },
  amenities: {
    type: Array,
    required: true
  },
  selectedFilters: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:selectedFilters', 'clearFilters']);

const updateFilter = (key, value) => {
  emit('update:selectedFilters', {
    ...props.selectedFilters,
    [key]: value
  });
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold">Filters</h2>
      <button @click="$emit('clearFilters')" 
              class="text-sm text-primary-600 hover:text-primary-700">
        Clear all
      </button>
    </div>

    <!-- Price Range -->
    <div>
      <h3 class="text-sm font-medium mb-2">Price Range</h3>
      <div class="flex gap-4">
        <input type="number" 
               :value="selectedFilters.priceRange[0]"
               @input="updateFilter('priceRange', [
                 parseInt($event.target.value) || 0,
                 selectedFilters.priceRange[1]
               ])"
               class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
               placeholder="Min" />
        <input type="number"
               :value="selectedFilters.priceRange[1]"
               @input="updateFilter('priceRange', [
                 selectedFilters.priceRange[0],
                 parseInt($event.target.value) || 0
               ])"
               class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
               placeholder="Max" />
      </div>
    </div>

    <!-- Property Types -->
    <div>
      <h3 class="text-sm font-medium mb-2">Property Type</h3>
      <div class="space-y-2">
        <label v-for="type in propertyTypes" 
               :key="type" 
               class="flex items-center">
          <input type="checkbox"
                 :checked="selectedFilters.propertyTypes.includes(type)"
                 @change="updateFilter('propertyTypes', 
                   $event.target.checked 
                     ? [...selectedFilters.propertyTypes, type]
                     : selectedFilters.propertyTypes.filter(t => t !== type)
                 )"
                 class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span class="ml-2 text-sm text-gray-700">{{ type }}</span>
        </label>
      </div>
    </div>

    <!-- Bedrooms -->
    <div>
      <h3 class="text-sm font-medium mb-2">Bedrooms</h3>
      <select :value="selectedFilters.bedrooms"
              @change="updateFilter('bedrooms', $event.target.value)"
              class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500">
        <option value="">Any</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5+</option>
      </select>
    </div>

    <!-- Amenities -->
    <div>
      <h3 class="text-sm font-medium mb-2">Amenities</h3>
      <div class="space-y-2">
        <label v-for="amenity in amenities" 
               :key="amenity"
               class="flex items-center">
          <input type="checkbox"
                 :checked="selectedFilters.amenities.includes(amenity)"
                 @change="updateFilter('amenities',
                   $event.target.checked
                     ? [...selectedFilters.amenities, amenity]
                     : selectedFilters.amenities.filter(a => a !== amenity)
                 )"
                 class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span class="ml-2 text-sm text-gray-700">{{ amenity }}</span>
        </label>
      </div>
    </div>
  </div>
</template>