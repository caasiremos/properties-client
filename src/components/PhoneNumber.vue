<script setup>
import { ref, onMounted } from 'vue';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const emit = defineEmits(['update:modelValue']);

defineProps({
    label: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    spacing: {
        type: String,
        default: 'px-4 py-3'
    }
});

const phone = ref('');
const phoneError = ref('');
const error = ref('');
const iti = ref({});

onMounted(() => {
    const input = document.querySelector("#phone");
    iti.value = intlTelInput(input, {
        loadUtils: () => import("intl-tel-input/utils"),
        initialCountry: 'ug',
        separateDialCode: true,
        containerClass: "w-full",
        countrySearch: false,
        customPlaceholder: () => "",
        onlyCountries: ["ug"],
        nationalMode: false,
        formatOnDisplay: true
    });

    input.addEventListener('input', () => {
        const formattedNumber = iti.value.getNumber();
        iti.value.setNumber(formattedNumber);
    });

    // Disable clicking on the `.iti__selected-country` button
    const selectedCountryButton = document.querySelector(".iti__selected-country");
    if (selectedCountryButton) {
        // Completely disable pointer events
        selectedCountryButton.style.pointerEvents = "none";
    }
});

const updatePhone = () => {
    phoneError.value = '';
    error.value = '';

    if (!iti.value.isValidNumber()) {
        error.value = iti.value.getValidationError();

        if (error.value === 2) {
            phoneError.value = 'Your phone number doesn\'t have enough digits';
        } else if (error.value === 3) {
            phoneError.value = 'Your phone number has too many digits';
        } else {
            phoneError.value = 'Please provide a valid international phone number';
        }
    }

    emit('update:modelValue', iti.value.getNumber());
}
</script>

<template>
    <div>
        <input type="tel" id="phone" v-model="phone"
            class="appearance-none block w-full border border-gray-300 rounded-md shadow-xs placeholder-gray-400 focus:outline-hidden focus:ring-primary-500 focus:border-primary-500"
            :class="[spacing, { 'border-2 border-red-500': !!phoneError }]"
            @input="updatePhone" required />
    </div>
</template>

<style scoped>
.iti {
    --iti-path-flags-1x: url('../../../node modules/intl-tel-input/build/img/flags.webp');
    --iti-path-flags-2x: url('../../../node modules/intl-tel-input/build/img/flags@2x.webp');
    --iti-path-globe-1x: url('../../../node modules/intl-tel-input/build/img/globe.webp');
    --iti-path-globe-2x: url('../../../node modules/intl-tel-input/build/img/globe@2x.webp');
}
</style>
