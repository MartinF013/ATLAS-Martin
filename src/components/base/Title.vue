<template>
  <section :class="className">
    <span class="font-normal text-base">{{ title }}</span>
    <Button
      @click="close"
      class="w-4 h-6 shadow-none bg-golden-500 hover:bg-sky-500 transition ease-in-out duration-300 rounded-xl"
      :icon="'icon_x_mark'"
    ></Button>
  </section>
</template>

<script setup>
import Button from "@components/base/Button";
const emit = defineEmits(["close"]);

defineProps({
  title: {
    type: String,
    default: "Title",
  },
});

let className = `w-full px-2 py-1 cursor-all-scroll
                flex direction-row items-center justify-between
                text-light_gray bg-navy-500  rounded-t shadow-md z-10`;

const close = () => {
  emit("close");
};
</script>
