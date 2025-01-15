<template>
  <VueResizable
    :width="400"
    :minWidth="300"
    :maxWidth="3000"
    :height="420"
    :minHeight="50"
    :maxHeight="3000"
    :active="['b', 'r', 'br']"
    :left="windowHeight"
    :top="165"
    dragSelector=".drag"
    class="widget"    
  >
    <Title @close="close" class="drag h-8" title="Perfil de elevación"></Title>
    <section class="widget__content h-[calc(100%-32px)] !p-0">
        <div id="sketch_widget" class="widget__scrool !h-full">
            <div class="bg-white-100" id="elevationContainer"></div>
        </div>
    </section>
  </VueResizable>
</template>

<script setup>
import Title from "@components/base/Title";

import VueResizable from "vue-resizable";
import { ref, toRefs, onMounted, watch } from "vue";

import ElevationProfile from "@arcgis/core/widgets/ElevationProfile.js";

const emit = defineEmits(["close"]);

const props = defineProps({
  activeView: Object,
  swichView: Boolean,
});

const windowHeight = ref(0);
let elevationProfile = null;

watch(
  () => __props.swichView,
  (newValue, oldValue) => {
    close();
  }
);

const activeView = toRefs(props).activeView.value;

onMounted(() => {
  windowHeight.value = window.innerWidth - 550;
   // console.log("activeView", activeView);
  // elevation profile with all the line profiles
  elevationProfile = new ElevationProfile({
    view: activeView,
    unit: "meters",
    container: "elevationContainer",
    profiles: [
      {
        // displays elevation values from Map.ground
        type: "ground", //autocasts as new ElevationProfileLineGround()
        color: "#61d4a4",
        title: "Ground elevation",
      },
      // {
      //   // displays elevation values from the input line graphic
      //   type: "input", //autocasts as new ElevationProfileLineInput()
      //   color: "#f57e42",
      //   title: "Line elevation"
      // },
      {
        // displays elevation values from a SceneView
        type: "view", //autocasts as new ElevationProfileLineView()
        color: "#8f61d4",
        title: "View elevation",
        // by default ground and all layers are used to compute elevation, but
        // you can define which elements should be included/excluded from the computation
      },
      
      // {
      //   // displays elevation values from a custom source
      //   type: "query",
      //   source: new ElevationLayer({
      //     url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
      //   }),
      //   color: "#d46189",
      //   title: "Custom elevation",
      // },
    ],   
  });

  // view.ui.add(elevationProfile, "bottom-right");
  elevationProfile.visibleElements = {
    legend: true,
    chart: true,
    clearButton: true,
    settingsButton: true,
    sketchButton: true,
    selectButton: false,
    uniformChartScalingToggle: false,
  };
});

const close = () => {
  elevationProfile.destroy();
  emit("close");
};
</script>

<style>

/* .esri-button, .esri-elevation-profile__header button {
    background-color: #0079c1 !important;  
    color: #fff !important;
} */

/* .esri-button--secondary {
  background-color: #0079c1 !important;  
    color: #fff !important;
} */

</style>
