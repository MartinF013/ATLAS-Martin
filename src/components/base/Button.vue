<script setup>
const className = `px-1 py-1 min-w-max
                flex justify-center gap-3 items-center
                text-light_gray font-normal
                shadow-md`;

defineProps({
  icon: {
    type: String,
    default: null,
  },
  onClick: Function,
});
</script>

<template>
  <button type="button" @click="onClick" :class="className">
    <slot></slot>
    <svg v-if="icon" class="w-5 h-5 icon" :class="icon" alt=""></svg>
  </button>
</template>
