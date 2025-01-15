<script setup>
import { toRefs, computed } from "vue";

defineProps({
  label: String,
  placeholder: String,
  inputValue: String,
  type: {
    type: String,
    default: "text",
  },
  error: Boolean,
  helper: String,
  icon: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change"]);
const { inputValue } = toRefs(__props);
const { type } = toRefs(__props);
const __inputValue = computed({
  get: () => inputValue.value,
  set: (__inputText) => {
    emit("change", __inputText);
  },
});
const validation = (e) => {
  if (type.value == "text") {
    let re =
      /^[a-zA-Z À-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
    var letters = re.test(e.key + "a");
    if (!letters) {
      e.preventDefault();
    }
  }
};
</script>

<template>
  <div class="field">
    <input
      class="box"
      :class="error ? 'error' : ''"
      :type="type"
      placeholder=" "
      v-model="__inputValue"
      @keypress="validation($event)"
      :disabled="disabled"
    />
    <label>{{ label }}</label>
    <span :class="[error ? 'visible' : 'invisible']">{{ helper }}</span>
    <span
      v-if="__inputValue != null && type != 'number' && !icon"
      :class="[!error ? 'check-good' : 'check-bad']"
    ></span>
  </div>
</template>
