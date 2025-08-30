<script setup>
import { ref } from 'vue';
import PhoneNumber from '../../components/PhoneNumber.vue';
import { WalletIcon, ChartBarIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';

const walletNumber = ref('WAL-2025-04789');
const balance = ref(2450000.00);
const timeFilter = ref('7');
const showDepositModal = ref(false);
const depositForm = ref({
    phoneNumber: '',
    amount: ''
});
const isSubmitting = ref(false);

const transactions = ref([
    {
        id: 'TRX-001',
        date: '2025-04-26',
        phoneNumber: '+256752222222',
        amount: '5,000.00',
        status: 'completed'
    },
    {
        id: 'TRX-002',
        date: '2025-04-24',
        phoneNumber: '+256752222222',
        amount: '10,000.00',
        status: 'completed'
    },
    {
        id: 'TRX-003',
        date: '2025-04-23',
        phoneNumber: '+256752222222',
        amount: '9,500.00',
        status: 'completed'
    },
    {
        id: 'TRX-004',
        date: '2025-04-22',
        phoneNumber: '+256752222222',
        amount: '9,500.00',
        status: 'completed'
    },
    {
        id: 'TRX-005',
        date: '2025-04-21',
        phoneNumber: '+256752222222',
        amount: '9,500.00',
        status: 'completed'
    }
]);

const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'UGX'
    });
};

const preventExponentialNotation = (e) => {
    if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
    }
};

const handleDeposit = async () => {
    try {
        isSubmitting.value = true;
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Add to transactions
        transactions.value.unshift({
            id: `TRX-${Math.floor(Math.random() * 1000)}`,
            date: new Date().toISOString().split('T')[0],
            phoneNumber: depositForm.value.phoneNumber,
            amount: depositForm.value.amount,
            status: 'completed'
        });

        // Update balance
        balance.value += Number(depositForm.value.amount);

        // Reset form and close modal
        depositForm.value = { phoneNumber: '', amount: '' };
        showDepositModal.value = false;
    } catch (error) {
        console.error('Error making deposit:', error);
    } finally {
        isSubmitting.value = false;
    }
};
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
                        <tr v-for="transaction in transactions" :key="transaction.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ transaction.date }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ transaction.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ transaction.phoneNumber }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                +{{ formatAmount(transaction.amount) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="[
                                    'px-2 py-1 text-xs rounded-full',
                                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                ]">
                                    {{ transaction.status }}
                                </span>
                            </td>
                        </tr>
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
                            placeholder="0.00" @keypress="preventExponentialNotation" :disabled="isLoading" required>
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
