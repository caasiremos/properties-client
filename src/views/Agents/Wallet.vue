<script setup>
import { ref, onMounted, watch } from 'vue';
import PhoneNumber from '../../components/PhoneNumber.vue';
import { WalletIcon, ChartBarIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import axios from '../../libs/axios';
import Swal from 'sweetalert2';

const walletNumber = ref(null);
const balance = ref(null);
const timeFilter = ref('7');
const showDepositModal = ref(false);
const depositForm = ref({
    phoneNumber: '',
    amount: ''
});
const isSubmitting = ref(false);
const isLoading = ref(false);
const transactions = ref([]);

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UGX'
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const preventExponentialNotation = (e) => {
    if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
    }
};

const getWalletData = async () => {
    try {
        isLoading.value = true;
        const response = await axios.get('/api/agents/wallet', {
            params: { days: timeFilter.value }
        });

      console.log('wallet_identifier', response.data.data);
        if (response.data) {
          walletNumber.value = response?.data?.data?.wallet_identifier || 'WAL-XXXX';
          balance.value = response?.data?.data?.balance || 0;
          transactions.value = response?.data?.data?.transactions || [];
        }
    } catch (error) {
        console.error('Error fetching wallet data:', error);
    } finally {
        isLoading.value = false;
    }
};

const handleDeposit = async () => {
    try {
        isSubmitting.value = true;

        const depositData = {
            phone_number: depositForm.value.phoneNumber,
            amount: Number(depositForm.value.amount)
        };

        const response = await axios.post('/api/agents/deposit', depositData);

        if (response.data) {
            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Payment request in progress!',
                text: 'Please enter your PIN to complete the transaction.',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#0D9488',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
                    window.location.reload();
                }
            });

            // Refresh wallet data
            await getWalletData();

            // Reset form and close modal
            depositForm.value = { phoneNumber: '', amount: '' };
            showDepositModal.value = false;
        }
    } catch (error) {
        console.error('Error making deposit:', error);
        let errorMessage = 'Failed to process deposit. Please try again.';

        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }

        Swal.fire({
            icon: 'error',
            title: 'Deposit Initiation Failed',
            text: errorMessage,
            confirmButtonColor: '#dc3545'
        });
    } finally {
        isSubmitting.value = false;
    }
};

// Watch for time filter changes
watch(timeFilter, () => {
    getWalletData();
});

// Load wallet data on component mount
onMounted(() => {
    getWalletData();
});
</script>

<template>
    <div class="container mx-auto px-4 py-4">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">My Wallet</h1>
                <p class="text-gray-600">Manage your wallet and transactions</p>
            </div>
            <div>
                <button @click="showDepositModal = true"
                    class="flex items-center cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                    <WalletIcon class="h-5 w-5 mr-2" /> <span class="font-semibold">Deposit Money</span>
                </button>
            </div>
        </div>

        <!-- Wallet Card -->
        <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 mb-1">Wallet Number</p>
                    <h3 class="text-lg font-semibold text-gray-800">{{ walletNumber }}</h3>
                </div>
                <div class="flex items-center space-x-8">
                    <div>
                        <p class="text-sm font-medium text-gray-600 mb-1">Available Balance</p>
                        <h2 class="text-3xl font-bold text-gray-800">{{ formatAmount(balance) }}</h2>
                    </div>
                    <div class="p-3 bg-blue-50 rounded-lg">
                        <ChartBarIcon class="w-6 h-6 text-primary-500" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div class="p-6 border-b border-gray-100">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-800">Recent Deposits</h3>
                    <select v-model="timeFilter"
                        class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white">
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Transaction ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone Number</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <!-- Loading State -->
                        <template v-if="isLoading">
                            <tr v-for="i in 5" :key="`loading-${i}`">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="animate-pulse">
                                        <div class="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="animate-pulse">
                                        <div class="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="animate-pulse">
                                        <div class="h-4 bg-gray-200 rounded w-28"></div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="animate-pulse">
                                        <div class="h-4 bg-gray-200 rounded w-20"></div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="animate-pulse">
                                        <div class="h-6 bg-gray-200 rounded-full w-16"></div>
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <!-- Data State -->
                        <template v-else-if="transactions.length > 0">
                            <tr v-for="transaction in transactions" :key="transaction.id">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ formatDate(transaction.created_at) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ transaction.transaction_reference }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ transaction.transaction_phone_number }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                    :class="transaction.type === 'debit' || transaction.amount < 0 ? 'text-red-600' : 'text-green-600'">
                                    {{ transaction.type === 'debit' || transaction.amount < 0 ? '-' : '+' }}{{ formatAmount(Math.abs(transaction.amount)) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="[
                                        'px-2 py-1 text-xs rounded-full',
                                        transaction.transaction_status === 'success' ? 'bg-green-100 text-green-800' :
                                        transaction.transaction_status === 'failed' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    ]">
                                        {{ transaction.transaction_status }}
                                    </span>
                                </td>
                            </tr>
                        </template>

                        <!-- Empty State -->
                        <template v-else>
                            <tr>
                                <td colspan="5" class="px-6 py-12">
                                    <div class="text-center">
                                        <WalletIcon class="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
                                        <p class="mt-1 text-sm text-gray-500">
                                          No deposits have been made yet. Start by making your first deposit.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Deposit Modal -->
        <div v-if="showDepositModal"
            class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
                <div class="flex items-center justify-between p-6 border-b border-gray-100">
                    <div class="flex items-center space-x-2">
                        <WalletIcon class="w-6 h-6 text-primary-500" />
                        <h2 class="text-xl font-semibold text-gray-800">Deposit Money</h2>
                    </div>
                    <button @click="showDepositModal = false" class="text-gray-400 hover:text-gray-500">
                        <XMarkIcon class="w-5 h-5" />
                    </button>
                </div>
                <form @submit.prevent="handleDeposit" class="p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <PhoneNumber v-model="depositForm.phoneNumber" label="Phone number" spacing="px-4 py-2"
                            required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Amount (UGX)</label>
                        <input v-model="depositForm.amount" :min="1000" type="number" name="amount" id="amount"
                            class="block w-full rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            placeholder="0.00" @keypress="preventExponentialNotation" :disabled="isSubmitting" required>
                        <div class="mt-2 flex items-center space-x-2">
                            <InformationCircleIcon class="h-5 w-5 text-gray-400" />
                            <p class="text-sm font-medium text-gray-600">
                                Minimum deposit required: <span class="text-primary-600">UGX 1,000</span>
                            </p>
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full flex items-center justify-center bg-primary-600 text-white mt-8 px-4 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="isSubmitting">
                        <span v-if="isSubmitting">Processing...</span>
                        <span v-else>Confirm Deposit</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
