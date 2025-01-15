<template>
  <VueResizable
    :width="400"
    :minWidth="300"
    :maxWidth="400"
    :height="400"
    :left="windowHeight"
    :top="200"
    dragSelector=".drag"
    class="widget"
    :disableAttributes="['w']"
  >
    <Title @close="close" class="drag" :title="'Sistemas Expuestos'"></Title>

    <div id="sketch_widget" class="widget__scrool">
      <div class="widget__content">
        <section class="grid grid-cols-2 gap-4">
          <Select
            :label="'Unidad'"
            :options="['kilometers', 'meters']"
            :inputValue="units"
            class="mt-3"
            @change="(payment) => handleChange(payment, 'units')"
          ></Select>
          <Input
            :label="'Distancia'"
            :type="'number'"
            :inputValue="distance"
            class="mt-3"
            @change="(payment) => handleChange(payment, 'distance')"
          />
        </section>

        <div class="w-auto px-5">
          <div
            class="bg-light_gray rounded border border-navy-500"
            id="sketchContainer"
          ></div>
        </div>

        <h1 class="text-center text-lg w-full font-bold my-2">
          Total de Habitantes
        </h1>
        <section class="grid grid-cols-2 gap-2 mb-2">
          <label class="flex flex-col gap-2 items-center">
            <img class="w-8 h-14" src="@/assets/icons/muchacha.png" alt="" />
            <h3 class="text-center text-xs">Población Femenina</h3>
            <p class="text-sm font-semibold">
              {{ dataPopulationLivingPlace.POBFEM }}
            </p>
          </label>
          <label class="flex flex-col gap-2 items-center">
            <img class="w-8 h-14" src="@/assets/icons/hombre.png" alt="" />
            <h3 class="text-center text-xs">Población Masculina</h3>
            <p class="text-sm font-semibold">
              {{ dataPopulationLivingPlace.POBMAS }}
            </p>
          </label>
        </section>
        <h1 class="text-center text-lg w-full font-bold">60 y más</h1>
        <section class="grid grid-cols-2 gap-2 mb-2">
          <label class="flex flex-col gap-2 items-center">
            <img class="w-14 h-14" src="@/assets/icons/anciano.png" alt="" />
            <h3 class="text-center text-xs">Población Femenina</h3>
            <p class="text-sm font-semibold">
              {{ dataPopulationLivingPlace.P_60YMAS_F }}
            </p>
          </label>
          <label class="flex flex-col gap-2 items-center">
            <img class="w-14 h-14" src="@/assets/icons/anciano.png" alt="" />
            <h3 class="text-center text-xs">Población Masculina</h3>
            <p class="text-sm font-semibold">
              {{ dataPopulationLivingPlace.P_60YMAS_M }}
            </p>
          </label>
        </section>
        <h1 class="text-center text-lg w-full font-bold my-2">
          Total de Viviendas Habitadas
        </h1>
        <section class="grid grid-cols-2 gap-2 items-center mb-2">
          <img
            class="w-14 h-14 m-auto"
            src="@/assets/icons/vivienda.png"
            alt=""
          />
          <p class="text-sm font-semibold text-center">
            {{ dataPopulationLivingPlace.TVIVHAB }}
          </p>
        </section>
        <section class="grid grid-cols-2 mb-4">
          <label class="flex flex-col gap-2 items-center">
            <h1 class="text-center text-lg w-full font-bold">Escuelas</h1>
            <img class="w-14 h-14" src="@/assets/icons/school.png" alt="" />
            <p class="text-sm font-semibold col-span-2">{{ dataSchool }}</p>
          </label>
          <label class="flex flex-col gap-2 items-center">
            <h1 class="text-center text-lg w-full font-bold">Hospitales</h1>
            <img class="w-14 h-14" src="@/assets/icons/hospital.png" alt="" />
            <p class="text-sm font-semibold col-span-2">{{ dataHealth }}</p>
          </label>
        </section>

        <!-- <h1 class="text-center text-lg w-full font-bold">Total de Hospitales</h1>
      <section class="grid grid-cols-3 gap-2 items-center mb-2">
        <img class="w-14 h-14" src="@/assets/icons/vivienda.png" alt="">
        <p class="text-sm font-semibold col-span-2">{{ dataHealth }}</p>
      </section> -->
      </div>
    </div>
  </VueResizable>
</template>

<script setup>
import Button from "@components/base/Button";
import Input from "@components/base/Input";
import Select from "@components/base/Select";
import Title from "@components/base/Title";
import VueResizable from "vue-resizable";

import Graphic from "@arcgis/core/Graphic";
import Sketch from "@arcgis/core/widgets/Sketch";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as query from "@arcgis/core/rest/query.js";
import Query from "@arcgis/core/rest/support/Query.js";

import { ref, toRefs, onMounted, reactive, watch } from "vue";

const emit = defineEmits(["close"]);

const props = defineProps({
  activeView: Object,
  swichView: Boolean,
  graphicsLayer: Object,
});

const activeView = toRefs(props).activeView.value;
const graphicsLayer = toRefs(props).graphicsLayer.value;

let sketchGraphic = null;
let bufferGraphic = null;
const distance = ref(100);
const units = ref("meters");
const windowHeight = ref(0);

//Agregar capas a consultar

// const populationLivingPlace = new FeatureLayer({
//   url: "http://rmgir.proyectomesoamerica.org/server/rest/services/ANR/Datos_Basicos/MapServer/4",
// });
const populationLivingPlace =
  "http://rmgir.proyectomesoamerica.org/server/rest/services/ANR/Datos_Basicos/MapServer/4";

const dataPopulationLivingPlace = reactive({
  POBMAS: 0,
  POBFEM: 0,
  P_60YMAS_M: 0,
  P_60YMAS_F: 0,
  TVIVHAB: 0,
});

// activeView.map.layers.add(populationLivingPlace);

const school =
  "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/39";
// const school = new FeatureLayer({
//   url: "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/39",
// });
const dataSchool = ref(0);

// activeView.map.layers.add(school);

const health =
  "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/37";
// const health = new FeatureLayer({
//   url: "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/37",
// });
const dataHealth = ref(0);

// activeView.map.layers.add(health);

activeView.when(() => {
  const sketch = new Sketch({
    view: activeView,
    container: "sketchContainer",
    layer: graphicsLayer,
    availableCreateTools: ["point", "polyline", "polygon"],
    spatialReference: activeView.spatialReference,
    creationMode: "create",
  });

  sketch.visibleElements = {
    selectionTools: {
      "lasso-selection": false,
      "rectangle-selection": false,
    },
    snappingControls: false,
    undoRedoMenu: false,
    settingsMenu: false,
  };
  sketch.on("create", (event) => {
    cleanMap();

    if (event.state === "complete") {
      const sketchType = event.tool;
      const geometry = event.graphic.geometry;
      let buffer = null;

      if (sketchType === "point") {
        const radius = 1000; // Radio en metros
        buffer = geometryEngine.geodesicBuffer(
          geometry,
          distance.value,
          units.value
        );
        sketchGraphic = new Graphic({
          geometry: geometry,
          symbol: {
            type: "simple-marker",
            color: [231, 170, 76],
            size: "12px",
            outline: {
              color: [42, 170, 225],
              width: 2,
            },
          },
        });

        bufferGraphic = new Graphic({
          geometry: buffer,
          symbol: {
            type: "simple-fill",
            color: [42, 170, 225, 0],
            outline: {
              color: [231, 170, 76],
              width: 2,
            },
          },
        });
        activeView.graphics.add(bufferGraphic);
        activeView.graphics.add(sketchGraphic);

        consultQuery(geometry);
        // spatialQueryLayers(geometry);
      } else if (sketchType === "polyline") {
        const radius = 1000; // Radio en metros
        const multipoint = geometryEngine.union(geometry);
        buffer = geometryEngine.geodesicBuffer(
          multipoint,
          distance.value,
          units.value
        );

        sketchGraphic = new Graphic({
          geometry: geometry,
          symbol: {
            type: "simple-line",
            color: [231, 170, 76],
            width: 2,
          },
        });

        bufferGraphic = new Graphic({
          geometry: buffer,
          symbol: {
            type: "simple-fill",
            color: [42, 170, 225, 0],
            outline: {
              color: [231, 170, 76],
              width: 2,
            },
          },
        });
        activeView.graphics.add(bufferGraphic);
        activeView.graphics.add(sketchGraphic);

        consultQuery(geometry);
        // spatialQueryLayers(geometry);
      } else if (sketchType === "polygon") {
        sketchGraphic = new Graphic({
          geometry: geometry,
          symbol: {
            type: "simple-fill",
            color: [42, 170, 225, 0],
            outline: {
              color: [231, 170, 76],
              width: 2,
            },
          },
        });

        activeView.graphics.add(sketchGraphic);

        distance.value = 0;
        consultQuery(geometry);
        // spatialQueryLayers(geometry);
      }
      // sketch.disable();
    }
  });

  // activeView.ui.add(sketch, "top-right");
});

//Consultar las capas

let graphicsPopulationLivingPlace = null;
let graphicsSchool = null;
let graphicsHealth = null;

const consultQuery = (geometry) => {
  const queryObject = new Query();
  queryObject.geometry = geometry;
  queryObject.distance = distance.value;
  queryObject.units = units.value;
  queryObject.outFields = ["*"]; // Obtener todos los campos
  queryObject.returnGeometry = true;

  query
    .executeQueryJSON(populationLivingPlace, queryObject)
    .then((result) => {
      // Resultado de la consulta
      const features = result.features;
      features.forEach((element) => {
        dataPopulationLivingPlace.POBMAS =
          element.attributes.POBMAS + dataPopulationLivingPlace.POBMAS;
        dataPopulationLivingPlace.POBFEM =
          element.attributes.POBFEM + dataPopulationLivingPlace.POBFEM;
        dataPopulationLivingPlace.P_60YMAS_M =
          element.attributes.P_60YMAS_M + dataPopulationLivingPlace.P_60YMAS_M;
        dataPopulationLivingPlace.P_60YMAS_F =
          element.attributes.P_60YMAS_F + dataPopulationLivingPlace.P_60YMAS_F;
        dataPopulationLivingPlace.TVIVHAB =
          element.attributes.TVIVHAB + dataPopulationLivingPlace.TVIVHAB;
      });
      // Haz lo que necesites con los datos obtenidos
      graphicsPopulationLivingPlace = features.map((feature) => {
        return new Graphic({
          geometry: feature.geometry,
          symbol: {
            type: "simple-fill",
            color: [47, 75, 144, 0.3],
            outline: {
              color: [47, 75, 144],
              width: 5,
            },
          },
        });
      });

      graphicsLayer.addMany(graphicsPopulationLivingPlace);

      query
        .executeQueryJSON(school, queryObject)
        .then((result) => {
          // Resultado de la consulta
          const features = result.features;
          dataSchool.value = features.length;
          // Haz lo que necesites con los datos obtenidos
          // Mostrar la geometría en el mapa
          graphicsSchool = features.map((feature) => {
            let symbol = new PictureMarkerSymbol({
              url: "src/assets/icons/school.png",
              width: 25,
              height: 25,
            });

            return new Graphic({
              geometry: feature.geometry,
              symbol: symbol,
            });
          });

          graphicsLayer.addMany(graphicsSchool);
          query
            .executeQueryJSON(health, queryObject)
            .then((result) => {
              // Resultado de la consulta
              const features = result.features;
              dataHealth.value = features.length;
              // Haz lo que necesites con los datos obtenidos
              graphicsHealth = features.map((feature) => {
                let symbol = new PictureMarkerSymbol({
                  url: "src/assets/icons/hospital.png",
                  width: 25,
                  height: 25,
                });

                return new Graphic({
                  geometry: feature.geometry,
                  symbol: symbol,
                });
              });

              graphicsLayer.addMany(graphicsHealth);
            })
            .catch((error) => {
              console.error("Error al ejecutar la consulta:", error);
            });
        })
        .catch((error) => {
          console.error("Error al ejecutar la consulta:", error);
        });
    })
    .catch((error) => {
      console.error("Error al ejecutar la consulta:", error);
    });
};

const cleanMap = () => {
  if (sketchGraphic) {
    dataPopulationLivingPlace.POBMAS = 0;
    dataPopulationLivingPlace.POBFEM = 0;
    dataPopulationLivingPlace.P_60YMAS_M = 0;
    dataPopulationLivingPlace.P_60YMAS_F = 0;
    dataPopulationLivingPlace.TVIVHAB = 0;
    dataSchool.value = 0;
    dataHealth.value = 0;
    graphicsLayer.removeAll();
    activeView.graphics.remove(sketchGraphic);
    sketchGraphic = null;
  }

  if (bufferGraphic) {
    graphicsLayer.removeAll();
    activeView.graphics.remove(bufferGraphic);
    bufferGraphic = null;
  }
};
onMounted(() => {
  windowHeight.value = window.innerWidth - 500;
  console.log(windowHeight.value);
});

watch(
  () => __props.swichView,
  (newValue, oldValue) => {
    close();
  }
);

const handleChange = (payment, field) => {
  const regex = /^[+]?\d*\.?\d+$/;
  switch (field) {
    case "units":
      units.value = payment;
      break;
    case "distance":
      if (regex.test(payment)) {
        distance.value = payment;
      }
      break;
    default:
      break;
  }
};

const close = () => {
  cleanMap();
  emit("close");
};
</script>
