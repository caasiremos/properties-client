<script setup>
import { ref, computed } from 'vue';
import AgentCard from '../components/agents/AgentCard.vue';
import { agents } from '../data/agents';

const searchQuery = ref('');
const selectedSpecialization = ref('');

const specializations = [...new Set(agents.flatMap(agent => agent.specialization))];

const filteredAgents = computed(() => {
  return agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesSpecialization = !selectedSpecialization.value ||
                                 agent.specialization.includes(selectedSpecialization.value);
    return matchesSearch && matchesSpecialization;
  });
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Our Property Agents</h1>
        <p class="mt-2 text-gray-600">Find the right agent to help you buy, sell, or rent</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter -->
      <div class="mb-8 flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input type="text"
                 v-model="searchQuery"
                 placeholder="Search agents by name or location"
                 class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div class="md:w-64">
          <select v-model="selectedSpecialization"
                  class="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500">
            <option value="">All Specializations</option>
            <option v-for="spec in specializations" 
                    :key="spec" 
                    :value="spec">{{ spec }}</option>
          </select>
        </div>
      </div>

      <!-- Agents Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AgentCard v-for="agent in filteredAgents"
                  :key="agent.id"
                  :agent="agent" />
      </div>
    </div>
  </div>
</template>