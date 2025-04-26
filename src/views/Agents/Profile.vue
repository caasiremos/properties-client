<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useStorage } from '@vueuse/core';

const userData = useStorage('USERDATA');

const user = JSON.parse(userData.value);

const passwordForm = ref({
    current_password: '',
    new_password: '',
    confirm_password: ''
});
</script>

<template>
    <div class="container mx-auto px-4 py-4">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Profile</h1>
                <p class="text-gray-600">Manage your profile information</p>

            </div>
        </div>

        <div class="mx-auto bg-white rounded-lg shadow-md">
            <div class="p-6">
                <h1 class="text-2xl font-bold text-gray-800 mb-6">Personal Information</h1>

                <div class="space-y-6">

                    <div class="border-t pt-6">

                        <!-- User Info Section -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-bold text-gray-900 mb-1">
                                    <span class="text-gray-600">Full Name</span>
                                </label>
                                <p class="mt-1 text-gray-800">{{ user.name }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-900 mb-1">
                                    <span class="text-gray-600">Email</span>
                                </label>
                                <p class="mt-1 text-gray-800">{{ user.email }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-900 mb-1">
                                    <span class="text-gray-600">Phone Number</span>
                                </label>
                                <p class="mt-1 text-gray-800">{{ user.phone_number }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mx-auto bg-white rounded-lg shadow-md my-5">
            <div class="p-6">
                <h1 class="text-2xl font-bold text-gray-800 mb-6">Change Password</h1>

                <div class="space-y-6">
                    <!-- Password Section -->
                    <div class="border-t pt-6">
                        <form @submit.prevent="updatePassword" class="space-y-4">
                            <div>
                                <label for="current_password" class="block text-sm font-medium text-gray-600">Current
                                    Password</label>
                                <input type="password" id="current_password" v-model="passwordForm.current_password"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    required />
                            </div>
                            <div>
                                <label for="new_password" class="block text-sm font-medium text-gray-600">New
                                    Password</label>
                                <input type="password" id="new_password" v-model="passwordForm.new_password"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    required />
                            </div>
                            <div>
                                <label for="confirm_password" class="block text-sm font-medium text-gray-600">Confirm
                                    New Password</label>
                                <input type="password" id="confirm_password" v-model="passwordForm.confirm_password"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    required />
                            </div>
                            <button type="submit"
                                class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                :disabled="isLoading">
                                {{ isLoading ? 'Updating...' : 'Update Password' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
    name: 'Profile',
    setup() {
        const toast = useToast()
        const user = ref({
            name: '',
            email: '',
            phone: ''
        })
        const isLoading = ref(false)

        const phoneForm = ref({
            phone: ''
        })

        const passwordForm = ref({
            current_password: '',
            new_password: '',
            confirm_password: ''
        })

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/agent/profile')
                user.value = response.data
                phoneForm.value.phone = response.data.phone
            } catch (error) {
                toast.error('Failed to load profile information')
            }
        }

        const updatePhone = async () => {
            if (!phoneForm.value.phone) {
                toast.error('Phone number is required')
                return
            }

            isLoading.value = true
            try {
                await axios.put('/api/agent/profile/phone', phoneForm.value)
                toast.success('Phone number updated successfully')
                await fetchUserProfile()
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to update phone number')
            } finally {
                isLoading.value = false
            }
        }

        const updatePassword = async () => {
            if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
                toast.error('New passwords do not match')
                return
            }

            isLoading.value = true
            try {
                await axios.put('/api/agent/profile/password', {
                    current_password: passwordForm.value.current_password,
                    new_password: passwordForm.value.new_password
                })
                toast.success('Password updated successfully')
                // Clear password form
                passwordForm.value = {
                    current_password: '',
                    new_password: '',
                    confirm_password: ''
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to update password')
            } finally {
                isLoading.value = false
            }
        }

        onMounted(() => {
            fetchUserProfile()
        })

        return {
            user,
            isLoading,
            phoneForm,
            passwordForm,
            updatePhone,
            updatePassword
        }
    }
}
</script>