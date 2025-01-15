<template>
  <VueResizable
    :width="300"
    :minWidth="250"
    :maxWidth="350"
    :height="240"
    :minHeight="240"
    :maxHeight="240"
    :left="windowHeight"
    :top="120"
    dragSelector=".drag"
    class="widget"
    :disableAttributes="['w']"
  >
    <Title @close="close" class="drag h-8" :title="'Distancia radial'"></Title>
    <section class="widget__content">
      <Select
        :label="'Unidad'"
        :options="['kilometers', 'meters']"
        :inputValue="_units"
        class="mt-3"
        @change="(payment) => handleChangeSelect(payment, 'country')"
      ></Select>
      <Input
        :label="'Distancia'"
        :type="'number'"
        :inputValue="_distance"
        class="mt-3"
        @change="(payment) => handleChange(payment, 'country')"
      />
      <div class="widget__content--button">
        <Button
          :class="!analize ? '!bg-sky-500' : ''"
          @click="newBuffer(false)"
          :icon="'icon_buffer'"
          :title="'Calcular buffer'"
        />
        <Button
          :class="analize ? '!bg-sky-500' : ''"
          @click="newBuffer(true)"
          :icon="'icon_layer'"
          :title="'Calcular buffer con análisis'"
        />
        <Button
          @click="resetTool"
          :icon="'icon_reload'"
          :title="'Borrar punto'"
        />
      </div>
    </section>
  </VueResizable>
</template>

<script setup>
import Button from "@components/base/Button";
import Title from "@components/base/Title";
import Input from "@components/base/Input";
import Select from "@components/base/Select";

import VueResizable from "vue-resizable";
import { ref, toRefs, onMounted, watch } from "vue";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Draw from "@arcgis/core/views/draw/Draw";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";

const emit = defineEmits(["close"]);

const props = defineProps({
  activeView: Object,
  swichView: Boolean,
});

watch(
  () => __props.swichView,
  (newValue, oldValue) => {
    close();
  }
);

const activeView = toRefs(props).activeView.value;

const bufferLayer = new GraphicsLayer({
  name: "Buffer Zona",
  listMode: "hide",
});
const pointLayer = new GraphicsLayer({
  name: "Buffer Punto",
  listMode: "hide",
});

let _units = ref("");
let _distance = ref(10);
let analize = ref(false);
let _pointToBuffer = null;
const windowHeight = ref(0);

activeView.map.layers.add(pointLayer);
activeView.map.layers.add(bufferLayer);

onMounted(() => {
  enableCreatePointForBuffer();
  windowHeight.value = window.innerWidth - 350;
});

function enableCreatePointForBuffer() {
  const draw = new Draw({
    view: activeView,
  });

  let action = draw.create("point");

  // PointDrawAction.cursor-update
  // Give a visual feedback to users as they move the pointer over the view
  action.on("cursor-update", function (evt) {
    createPointGraphic(evt.coordinates);
  });

  // PointDrawAction.draw-complete
  // Create a point when user clicks on the view or presses "C" key.
  action.on("draw-complete", function (evt) {
    //Si el usuario cerro la ventana, mostrarla

    _pointToBuffer = {
      type: "point", // autocasts as /Point
      x: evt.coordinates[0],
      y: evt.coordinates[1],
      spatialReference: activeView.spatialReference,
    };

    _pointToBuffer.hasZ = false;
    _pointToBuffer.z = undefined;

    bufferPoint(_pointToBuffer, _distance.value, _units.value);
  });
}

function createPointGraphic(coordinates) {
  clearGraphics();

  let point = {
    type: "point", // autocasts as /Point
    x: coordinates[0],
    y: coordinates[1],
    spatialReference: activeView.spatialReference,
  };

  let graphic = new Graphic({
    geometry: point,
    symbol: {
      type: "simple-marker", // autocasts as SimpleMarkerSymbol
      style: "circle",
      color: [255, 0, 0],
      size: "8px",
      outline: {
        // autocasts as SimpleLineSymbol
        color: [255, 255, 255],
        width: 1,
      },
    },
  });

  pointLayer.add(graphic);
}

function bufferPoint(point, distance, units) {
  if (units != "kilometers" && units != "meters") {
    units = "kilometers";
    _units.value = "kilometers";
  }

  clearGraphics();

  const polySym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [140, 140, 222, 0.5],
    outline: {
      color: [0, 0, 0, 0.5],
      width: 2,
    },
  };

  const pointSym = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [255, 0, 0],
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
    size: 7,
  };

  // removes z-values from the point when taken from a SceneView.
  // GeometryEngine does not support 3D geometries.
  point.hasZ = false;
  point.z = undefined;

  pointLayer.add(
    new Graphic({
      geometry: point,
      symbol: pointSym,
    })
  );

  const buffer = geometryEngine.geodesicBuffer(point, distance, units);

  bufferLayer.add(
    new Graphic({
      geometry: buffer,
      symbol: polySym,
    })
  );

  if (analize.value) {
    // console.log(analize.value);
    spatialQueryLayers();
  } else activeView.popup.visible = false;
}

//Consultar las capas
let indexCountLayer;
let layersToQuery = [];
let bufferFeatures = [];
let indexLayerCompleted;

function spatialQueryLayers() {
  bufferFeatures = [];
  layersToQuery = [];
  indexLayerCompleted = 0;

  activeView.map.layers.map(function (lyr) {
    findLayersToQuery(lyr);
  });

  for (
    indexCountLayer = 0;
    indexCountLayer < layersToQuery.length;
    indexCountLayer++
  ) {
    queryFeatures(_pointToBuffer, layersToQuery[indexCountLayer]);
  }
}

function findLayersToQuery(node) {
  // console.log(node.type)
  if (node.visible && node.type == "wfs") {
    if (!layersToQuery.includes(node)) {
      layersToQuery.push(node);
    }
  }
  if (node.visible && node.type == "feature") {
    if (!layersToQuery.includes(node)) {
      layersToQuery.push(node);
    }
  }
  if (node.visible && node.type == "group") {
    node.allLayers.forEach(function (layer, item) {
      findLayersToQuery(layer);
    });
  }
}

function queryFeatures(point, layer) {
  try {
    layer
      .queryFeatures({
        //query object
        distance: _distance.value,
        units: _units.value,
        geometry: point,
        spatialRelationship: "intersects",
        returnGeometry: true,
        returnQueryGeometry: true,
        outFields: ["*"],
      })
      .then((featureSet) => {
        indexLayerCompleted++;

        bufferFeatures.push(...featureSet.features);

        if (layersToQuery.length == indexLayerCompleted) addToPopResults();
      });
  } catch (ex) {
    indexLayerCompleted++;
    //La capa no implementa el metodo queryFeatures y genera una excepcion
  }
}

function addToPopResults() {
  activeView.popup.open({
    features: bufferFeatures,
    featureMenuOpen: true,
    updateLocationEnabled: true,
  });
}

function clearGraphics() {
  pointLayer.removeAll();
  bufferLayer.removeAll();
}

const onChange = (event) => {
  _units.value = event.target.value;
};

const handleChange = (payment, input) => {
  _distance.value = payment;
};
const handleChangeSelect = (payment, input) => {
  _units.value = payment;
};

function newBuffer(bool) {
  analize.value = bool;
  clearGraphics();
  if (_pointToBuffer != null) {
    bufferLayer.removeAll();
    activeView.map.layers.add(bufferLayer);
    bufferPoint(_pointToBuffer, _distance.value, _units.value);
  }
}

const resetTool = () => {
  if (_pointToBuffer != null) {
    clearGraphics();
    _pointToBuffer = null;
    enableCreatePointForBuffer();
  }
};

const close = () => {
  clearGraphics();
  activeView.map.layers.remove(pointLayer);
  activeView.map.layers.remove(bufferLayer);
  _pointToBuffer = null;
  emit("close");
};
</script>

<style>
div.vdr.active::before {
  content: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
