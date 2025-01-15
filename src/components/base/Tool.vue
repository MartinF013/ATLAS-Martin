<script setup>
import { ref, toRefs } from "vue";

const emit = defineEmits(["response"]);
let res = "";
let arrs = "";

defineProps({
  toolType: String,
});

let toolType = toRefs(__props).toolType;
let title = ref("");
if (toolType.value === "buffer") {
  arrs = ["esri-icon-radio-checked"];
  res = ["onBufferTool", "offBufferTool"];
  title.value = "Herramienta Buffer";
} else if (toolType.value === "kml") {
  arrs = ["esri-icon-upload"];
  res = ["onKmlTool", "offKmlTool"];
  title.value = "Herramienta KML";
} else if (toolType.value === "volcan") {
  arrs = ["esri-icon-up-arrow"];
  res = ["onVolcanMoniTool", "offVolcanMoniTool"];
  title.value = "Volcán";
} else if (toolType.value === "measurement") {
  arrs = [
    "esri-icon-measure-line",
    "esri-icon-measure-area",
    "esri-icon-trash",
  ];
  res = ["linear", "area", "clean"];
  title.value = "Herramienta de Medición";
} else if (toolType.value === "pluviometros") {
  arrs = ["esri-icon-line-of-sight"];
  res = ["onPluviometrosTool"];
  title.value = "Pluvimetros";
} else if (toolType.value === "storyMap") {
  arrs = ["esri-icon-play"];
  res = ["storyMap"];
  title.value = "StoryMap";
} else if (toolType.value === "logout") {
  arrs = ["esri-icon-sign-out"];
  res = ["logout"];
  title.value = "Salir";
} else if (toolType.value === "exposedSystem") {
  arrs = ["esri-icon-collection"];
  res = ["onExposedSystem", "offExposedSystem"];
  title.value = "Sistemas Expuestos";
} else if (toolType.value === "elevationProfile") {
  arrs = ["esri-icon-elevation-profile"];
  res = ["onElevationProfile", "offElevationProfile"];
  title.value = "Perfil de elevación";
}else if (toolType.value === "ERG") {
  arrs = ["esri-icon-experimental"];
  res = ["onERGTool", "offERGTool"];
  title.value = "Guía de Respuesta de Emergencia";
}

const tool = (payload) => {
  emit("response", payload);
};
</script>

<template>
  <div>
    <div v-for="(arr, index) in arrs">
      <div
        class="esri-widget--button"
        role="button"
        :title="title"
        @click="tool(res[index])"
      >
        <span
          aria-hidden="true"
          role="presentation"
          :class="arr"
          class="esri-icon"
        ></span>
        <span class="esri-icon-font-fallback-text">Custom Button</span>
      </div>
    </div>
  </div>
</template>
