<template>
  <Transition name="modal">
    <div class="modal">
      <div class="modal__message">
        <p class="font-semibold">{{ content }}</p>
        <Button
          v-if="confirm"
          class="bg-navy-500 hover:bg-golden-500 transition ease-in-out duration-300"
          @click="$emit('confirm')"
          >Confirmar</Button
        >
        <Button
          class="bg-navy-500 hover:bg-golden-500 transition ease-in-out duration-300"
          @click="$emit('close')"
          >Cerrar</Button
        >
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from "@components/base/Button";
const emit = defineEmits(["close"]);
defineProps({
  content: String,
  confirm: {
    type: Boolean,
    default: false,
  },
});
</script>
