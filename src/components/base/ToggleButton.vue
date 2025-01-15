<!-- filepath: /c:/Trabajo/atlas-queretaro/src/components/base/ToggleButton.vue -->
<script setup>
import { toRefs, computed } from "vue";

const props = defineProps({
  label: String,
  inputValue: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:inputValue"]);
const { inputValue } = toRefs(props);

const __inputValue = computed({
  get: () => inputValue.value,
  set: (value) => {
    emit("update:inputValue", value);
  },
});
</script>

<template>
  <div class="toggle-field">
    <label class="toggle-switch">
      <input type="checkbox" v-model="__inputValue" :disabled="disabled">
      <span class="slider"></span>
    </label>
    <label>{{ label }}</label>
  </div>
</template>

<style scoped>
.toggle-field {
  display: flex;
  align-items: center;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>