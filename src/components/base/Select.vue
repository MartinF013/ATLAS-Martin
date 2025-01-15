<script setup>
import { toRefs } from "vue";
//import { ChevronDownIcon } from '@heroicons/vue/solid';
defineProps({
  label: String,
  inputValue: String,
  options: Array,
  error: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
});
const { inputValue, options } = toRefs(__props);
const emit = defineEmits(["change"]);
const handleSelect = (index) => emit("change", options.value[index]);
</script>

<template>
  <label class="select"
    ><input type="checkbox" :disabled="disabled" />
    <div
      class="header"
      :class="[error ? 'error' : 'none', disabled ? 'disabled' : '']"
    >
      <span>{{ inputValue ? inputValue : label }}</span>
      <svg
        class="h-5 w-5 text-primary-soft"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
    <ul v-if="!disabled" class="options" :class="[error ? 'error' : 'none']">
      <li v-for="(option, index) in options" @click="handleSelect(index)">
        {{ option }}
      </li>
    </ul>
  </label>
</template>
