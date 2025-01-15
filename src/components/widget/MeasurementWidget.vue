<template>
  <div></div>
</template>

<script setup>
import { toRefs, ref, onMounted, watch } from "vue";
defineProps({
  activeView: Object,
  action: String,
  measurement: Object,
});
let activeView = toRefs(__props).activeView.value;
let action = ref(__props.action);
let measurement = toRefs(__props).measurement.value;

watch(
  () => __props.action,
  (newValue, oldValue) => {
    if (newValue == "linear") {
      distanceMeasurement();
    } else if (newValue == "area") {
      areaMeasurement();
    }
  }
);
// Add the appropriate measurement UI to the bottom-right when activated
activeView.ui.add(measurement, "bottom-left");

// Set the views for the widgets
measurement.view = activeView;

measurement.watch("activeWidget", function (evt) {
  if (evt != null) {
    if (evt.viewModel.supportedViewType == "2d") {
      evt.viewModel.palette.fillColor = [96, 96, 96, 0.4];
      evt.viewModel.palette.pathWidth = 2.5;
    }
  }
});

if (action.value == "linear") {
  distanceMeasurement();
} else if (action.value == "area") {
  areaMeasurement();
}

// Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
function distanceMeasurement() {
  measurement.clear();
  const type = activeView.type;
  measurement.activeTool =
    type.toUpperCase() === "2D" ? "distance" : "direct-line";
}

// Call the appropriate AreaMeasurement2D or AreaMeasurement3D
function areaMeasurement() {
  measurement.clear();
  measurement.activeTool = "area";
}
</script>
