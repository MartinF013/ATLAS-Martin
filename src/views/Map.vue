<template>
  <div class="map-container">
    <Banner />
    <div>
      <div id="mapDivContainer" class="mapdiv"></div>
      <div id="infoDiv" class="esri-ui-top-left esri-ui-corner">
        <div class="esri-component esri-widget">
          <input
            id="switchbtn"
            @click="switchView"
            class="esri-widget--button esri-widget esri-interactive none-border text-white"
            type="button"
            value="3D"
            tabindex="0"
          />
        </div>
      </div>
      <Transition>
            <ElevationProfileWidget v-if="windowElevationProfile"
                                    :activeView="activeView"
                                    :swichView="swichView"
                                    v-on:close="elevationProfile('offElevationProfile')" />
      </Transition>
      <Transition>
        <BufferWidget
          :activeView="activeView"
          :swichView="swichView"
          v-if="windowBuffer"
          v-on:close="openBufferTool('offBufferTool')"
        />
      </Transition>
      <Transition>
        <ERGWidget
          :activeView="activeView"
          :swichView="swichView"
          v-if="windowERG"
          v-on:close="openERGTool('offERGTool')"
        />
      </Transition>
      <Transition>
        <ExposedSystemsWidget
          :activeView="activeView"
          :graphicsLayer="graphicsLayer"
          :swichView="swichView"
          v-if="windowExposedSystems"
          v-on:close="exposedSystem('offExposedSystem')"
        />
      </Transition>
      <Transition>
        <KmlWidget
          :activeView="activeView"
          v-if="windowKml"
          v-on:close="openKmlTool('offKmlTool')"
        />
      </Transition>
      <Transition>
        <StoryMapWidget
          v-if="windowStoryMap"
          :map="map"
          :swichView="swichView"
          v-on:close="storyMap(false)"
        />
      </Transition>
      <MeasurementWidget
        :activeView="activeView"
        :action="action"
        :measurement="measurement"
        v-if="windowMeasure"
        v-on:close="closeMeasureWidget(measurement)"
      />
      <Tool
        toolType="buffer"
        id="bufferTool2D"
        @response="(msg) => openBufferTool(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="buffer"
        id="bufferTool3D"
        @response="(msg) => openBufferTool(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="kml"
        id="kmlTool2D"
        @response="(msg) => openKmlTool(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="measurement"
        id="toolbarDiv2D"
        @response="(msg) => openMeasurementTool(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="measurement"
        id="toolbarDiv3D"
        @response="(msg) => openMeasurementTool(msg)"
        class="hide-tool"
      />
      <Tool toolType="elevationProfile"
              id="elevationProfile2D"
              :active="windowElevationProfile"
              class="hide-tool"
              @response="(msg) => elevationProfile(msg)" />
        <Tool toolType="elevationProfile"
              id="elevationProfile3D"
              :active="windowElevationProfile"
              class="hide-tool"
              @response="(msg) => elevationProfile(msg)" />
       <Tool toolType="ERG"
              id="ERG2D"
              @response="(msg) => openERGTool(msg)"
              class="hide-tool" />
        <Tool toolType="ERG"
              id="ERG3D"
              @response="(msg) => openERGTool(msg)"
              class="hide-tool" />        
      <Tool
        toolType="logout"
        id="logout2D"
        @response="(msg) => logoutTool(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="logout"
        id="logout3D"
        @response="(msg) => logoutTool(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="exposedSystem"
        id="exposedSystem2D"
        @response="(msg) => exposedSystem(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="exposedSystem"
        id="exposedSystem3D"
        @response="(msg) => exposedSystem(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="storyMap"
        id="storyMap2D"
        @response="(msg) => storyMap(msg)"
        class="hide-tool"
      />
      <Tool
        toolType="storyMap"
        id="storyMap3D"
        @response="(msg) => storyMap(msg)"
        class="hide-tool"
      />
    </div>
  </div>
</template>

<script setup>
import Tool from "@components/base/Tool";
import BufferWidget from "@components/widget/BufferWidget";
import ERGWidget from "@components/widget/ERGWidget";
import ElevationProfileWidget from "@components/widget/ElevationProfileWidget/";
import ExposedSystemsWidget from "@components/widget/ExposedSystemsWidget";
import KmlWidget from "@components/widget/KmlWidget";
import StoryMapWidget from "@components/widget/StoryMapWidget";
import MeasurementWidget from "@components/widget/MeasurementWidget";
import Banner from "@components/container/Banner";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
import Sketch from "@arcgis/core/widgets/Sketch";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SceneView from "@arcgis/core/views/SceneView";
import TileLayer from "@arcgis/core/layers/TileLayer";
import * as intl from "@arcgis/core/intl";
import Home from "@arcgis/core/widgets/Home";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Viewpoint from "@arcgis/core/Viewpoint";
import Slider from "@arcgis/core/widgets/Slider";

import Extent from "@arcgis/core/geometry/Extent";
import Measurement from "@arcgis/core/widgets/Measurement";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Search from "@arcgis/core/widgets/Search";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Color from "@arcgis/core/Color";
import Point from "@arcgis/core/geometry/Point";
import * as projection from "@arcgis/core/geometry/projection";
import Popup from "@arcgis/core/widgets/Popup";
import PopupTemplate from "@arcgis/core/PopupTemplate";
//  import * as urlUtils from "@arcgis/core/core/urlUtils";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import router from "@/router/index.router.js";

import { onMounted, ref, createApp } from "vue";


const graphicsLayer = new GraphicsLayer({
  listMode: "hide",
});

let activeView = null;
let sceneView = null;
let mapView = null;

let toolsSceneAdded = false;
let toolsMapAdded = false;
let measurement = new Measurement();

intl.setLocale("es-MX");
//  esriConfig.request.corsEnabledServers.push("http://148.213.24.15/Webdir/Camara_volcan/imagen_nevado.html");

let geoLayers = null;

let windowBuffer = ref(false);
let windowERG = ref(false);
const windowExposedSystems = ref(false);
const windowStoryMap = ref(false);
let windowKml = ref(false);
const windowElevationProfile = ref(false);
let windowMeasure = ref(false);

let action = ref("");
let swichView = ref(false);

const queretaroExtent = new Extent({
  xmin: -100.5000,
  ymin: 20.4500,
  xmax: -100.3000,
  ymax: 20.7000,
  spatialReference: {
    wkid: 4326, // Código de referencia espacial para latitud/longitud WGS84
  },
});

const getIdMap = () => {
  
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  
  if (userInfo) {
     return   "92a9dff4ea054c0baec0ff1597e1b18d"
  }else {
      return "92a9dff4ea054c0baec0ff1597e1b18d";
  }

}; 

const map = new WebMap({
  basemap: "hybrid",
  portalItem: {
    id: getIdMap(),
  },
  ground: "world-elevation",
  layers: [graphicsLayer],
});
// When web map is ready, run animation
map.when(() => {
  mapZoomAnimation();
});

onMounted(() => {
  mapInit();

  
});

const mapInit = () => {
  
  //Vista 2D
  mapView = new MapView({
    zoom: 5,
    center: [-100.31, 25.67],
    map: map,
    ui: {
      components: ["attribution"],
    },
    popup: {
      //  autoOpenEnabled: false,
      dockEnabled: true,
      dockOptions: {
        // dock popup at bottom-right side of view
        buttonEnabled: false,
        breakpoint: false,
        position: "bottom-right",
      },
    },
  });

  //Vista 3D
  sceneView = new SceneView({
    center: [-100.31, 25.67],
    map: map,
    ui: {
      components: ["attribution"],
    },
    popup: {
      // autoOpenEnabled: false,
      dockEnabled: true,
      dockOptions: {
        // dock popup at bottom-right side of view
        buttonEnabled: false,
        breakpoint: false,
        position: "bottom-right",
      },
    },
  });

  // Set the activeView to the 2D MapView
  activeView = mapView;

  loadView();
};

const loadView = () => {
  activeView.set({
    container: mapDivContainer,
  });

  addTools();
};

const openMeasurementTool = (msg) => {
  action.value = msg;
  if (msg == "clean") {
    windowMeasure.value = false;
    measurement.clear();
  } else {
    windowMeasure.value = true;
  }
};

function openKmlTool(msg) {
  if (msg === "onKmlTool") windowKml.value = true;

  if (msg === "offKmlTool") windowKml.value = false;
}

function openBufferTool(msg) {
  if (msg === "onBufferTool") windowBuffer.value = true;
  else if (msg === "offBufferTool") {
    windowBuffer.value = false;
    activeView.popup.visible = false;
  }
}
function openERGTool(msg) {
  if (msg === "onERGTool") windowERG.value = true;
  else if (msg === "offERGTool") windowERG.value = false;
}

const elevationProfile = (msg) => {
  if (msg === "onElevationProfile") windowElevationProfile.value = true;
  else if (msg === "offElevationProfile") {
    windowElevationProfile.value = false;
  }
}

const storyMap = (msg) => {

  map.layers.map(function (lyr) {
    layersToQuery(lyr);
  });

  windowStoryMap.value = !windowStoryMap.value;
  
};

function layersToQuery(node) {
  if (node.type == "group") {
    node.visible = true;
    node.allLayers.forEach(function (layer) {
      layersToQuery(layer);
    });
  } else if (node.type == "graphics") {
    node.visible = true;
  }  else {
    node.visible = false;
  }
}

const logoutTool = () => {
  localStorage.removeItem("user-info");
  router.push("/");
};

const exposedSystem = (msg) => {
  if (msg === "onExposedSystem") windowExposedSystems.value = true;

  if (msg === "offExposedSystem") windowExposedSystems.value = false;
};

let legend;
let bkExpandLegend;
function agregarControlLeyenda() {
  //Herramienta Leyenda
  if (!activeView.ui.find("idExpanderLegend")) {
    legend = null;
    legend = new Legend({
      id: "idLegend",
      view: activeView,
    });

    bkExpandLegend = new Expand({
      id: "idExpanderLegend",
      view: activeView,
      content: legend,
      expanded: false,
      expandTooltip: "Leyenda",
      expandIconClass: "esri-icon-legend",
      group: "top-center",
    });

    activeView.ui.add(bkExpandLegend, "bottom-right");
  } else {
    // legend = null;
    //  legend = new Legend({
    //   id: "idLegend",
    //   view: activeView,
    //});
    // activeView.ui.find("idExpanderLegend").content = legend;
    // activeView.ui.find("idExpanderLegend").content = null;
    //  console.log(activeView.ui.find("idExpanderLegend").content)
    //  activeView.ui.find("idExpanderLegend").content.view = activeView;
    //  activeView.ui.find("idExpanderLegend").view = activeView;
  }
}
//Add tools
function addTools() {
  let toolbarDiv = null;
  //Add Tools just one time for every view
  if (activeView.type.toUpperCase() === "2D") {
    if (toolsMapAdded) return;
    else toolsMapAdded = true;
    bufferTool2D.classList.remove("hide-tool");
    kmlTool2D.classList.remove("hide-tool");
    exposedSystem2D.classList.remove("hide-tool");
    storyMap2D.classList.remove("hide-tool");
    logout2D.classList.remove("hide-tool");
    toolbarDiv2D.classList.remove("hide-tool");
    elevationProfile2D.classList.remove("hide-tool");
    ERG2D.classList.remove("hide-tool");
    toolbarDiv = toolbarDiv2D;
    
  } else {
    if (toolsSceneAdded) return;
    else toolsSceneAdded = true;
    bufferTool3D.classList.remove("hide-tool");
    // kmlTool3D.classList.remove("hide-tool");
    exposedSystem3D.classList.remove("hide-tool");
    storyMap3D.classList.remove("hide-tool");
    logout3D.classList.remove("hide-tool");
    elevationProfile3D.classList.remove("hide-tool");
    toolbarDiv3D.classList.remove("hide-tool");
    ERG3D.classList.remove("hide-tool");
    toolbarDiv = toolbarDiv3D;
  }

  //Herramienta Home
  let vp = new Viewpoint({
    targetGeometry: queretaroExtent ,
    //  rotation: 0,
    //  camera: cam
  });

  let homeWidget = new Home({
    view: activeView,
    viewpoint: vp,
  });

  activeView.ui.add(homeWidget, "bottom-left");

  //Galeria de mapas base
  const basemaps = new BasemapGallery({
    view: activeView,
  });
  const bkExpandBaseGallery = new Expand({
    view: activeView,
    content: basemaps,
    expanded: false,
    expandTooltip: "Galeria de Mapas Base",
    group: "top-left",
  });
  activeView.ui.add(bkExpandBaseGallery, "bottom-right");

  //Herramienta Busqueda
  /* const searchWidget = new Search({
            view: activeView
            });*/

  //Agregar la capa de Edafologia a la busqueda
  //   activeView.map.layers.map(function (lyr) {
  //  if (lyr.visible) {
  //   console.log(lyr.name);
  //    if (lyr.name == "jalisco:Edafologia") {
  // console.log(lyr);

  const searchExtent = {
    geometry: queretaroExtent,
  };

  const sources = [
    {
      url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      placeholder: "",
      filter: searchExtent,
      name: "ArcGIS World Geocoding Service",
      singleLineFieldName: "SingleLine",
    },     
  ];

  const searchWidget = new Search({
    view: activeView,
    // allPlaceholder: "District or Senator",
    includeDefaultSources: false,
    locationEnabled: false,
    sources: sources,
  });
  activeView.ui.add(searchWidget, "bottom-right");

  //   }
  //   }
  ///  });

  //Herramienta lista de capas
  const layerList = new LayerList({
    view: activeView,
    selectionEnabled: true,
    listItemCreatedFunction: async function (event) {
      const item = event.item;
      await item.layer.when();

      // Adds a slider for updating a group layer's opacity
      //if (item.children.length > 1 && item.parent) {
      if (item != null) {
        // console.log("here 2");
        const slider = new Slider({
          min: 0,
          max: 1,
          precision: 2,
          values: [1],
          visibleElements: {
            labels: true,
            rangeLabels: true,
          },
        });

        //create a remove botton
        //<button id="clearButton2D"
        //          @click="clearMeasurements"
        //class="esri-widget--button esri-interactive  none-border"
        //title = "Limpiar Medidas" ></button >

        //  const btnRemove = new Button();
        item.actionsSections = [
          [
            {
              title: "Remover Capa",
              className: "esri-icon-trash",
              id: "remove-layer",
            },
          ],
        ];

        item.panel = {
          content: slider,
          className: "esri-icon-sliders-horizontal",
          title: "Cambiar Transparencia",
        };

        slider.on("thumb-drag", (event) => {
          const { value } = event;
          item.layer.opacity = value;
        });
      }
    },
  });

  layerList.on("trigger-action", (event) => {
    // Capture the action id.
    const id = event.action.id;
    //  console.log(event);

    if (id === "remove-layer") {
      //Remover la capa del mapa
      map.remove(event.item.layer);
    }
  });

  const bkExpandLayerList = new Expand({
    view: activeView,
    content: layerList,
    expanded: false,
    expandTooltip: "Lista de Capas",
    expandIconClass: "esri-icon-layers",
    group: "top-left",
  });
  activeView.ui.add(bkExpandLayerList, "bottom-right");

  //Herramienta de dibujo
  // const sketch = new Sketch({
  //   layer: graphicsLayer,
  //   view: activeView,
  //   // graphic will be selected as soon as it is created
  //   creationMode: "update",
  // });

  const bkExpandMeasure = new Expand({
    id: "measure",
    view: activeView,
    content: toolbarDiv,
    group: "top-left",
    expanded: false,
    expandTooltip: "Herramientas de Medicion",
    expandIconClass: "esri-icon-measure",
  });

  activeView.ui.add(bkExpandMeasure, "bottom-right");

  ///Barra de escala
  let scaleBar = new ScaleBar({
    style: "line",
    unit: "metric",
    view: activeView,
  });
  // Add widget to the bottom left corner of the view
  activeView.ui.add(scaleBar, {
    position: "bottom-left",
  });

  //herramienta de buffer

  if (activeView.type.toUpperCase() === "2D") {
    //Agregar la herramienta de Buffer en vista 2d
    activeView.ui.add(bufferTool2D, "bottom-right");

    //Agregar la herramienta de Story Map en vista 2d
    activeView.ui.add(storyMap2D, "bottom-right");

    //Agregar la herramienta de Sistemas Expuestos en vista 2d
    activeView.ui.add(exposedSystem2D, "bottom-right");

    //Agregar la herramienta de carga de KML en vista 2d
    activeView.ui.add(kmlTool2D, "bottom-right");

    //Agregar herramienta para perfil de elevación
    activeView.ui.add(elevationProfile2D, "bottom-right");

    //Agregar la herramienta de ERG en vista 2d
    activeView.ui.add(ERG2D, "bottom-right");
  }

  if (activeView.type.toUpperCase() === "3D") {
    //Agregar la herramienta de Buffer en vista 3d
    activeView.ui.add(bufferTool3D, "bottom-right");

    //Agregar la herramienta de Story Map en vista 3d
    activeView.ui.add(storyMap3D, "bottom-right");

    //Agregar la herramienta de Sistemas Expuestos en vista 3d
    activeView.ui.add(exposedSystem3D, "bottom-right");

    //Agregar herramienta para perfil de elevación
   activeView.ui.add(elevationProfile3D, "bottom-right");

    //Agregar la herramienta de ERG en vista 3d
    activeView.ui.add(ERG3D, "bottom-right");

  }

  //Agregar el control de leyenda
  // if (activeView.type.toUpperCase() === "2D") {
  //  console.log("Agregando a vista " + activeView.type.toUpperCase());
  //error: si la vista esta en 3d, no agregar el control de leyenda ya que produce un bug, pendiente correccion
  agregarControlLeyenda();

  // Salir de sesión
  if (activeView.type.toUpperCase() === "2D") {
    activeView.ui.add(logout2D, "bottom-right");
  }

  if (activeView.type.toUpperCase() === "3D") {
    activeView.ui.add(logout3D, "bottom-right");
  }

  

  //  }
}

function removerLeyenda() {
  // if (activeView.ui.find(bkExpandLegend)) {
  activeView.ui.remove(bkExpandLegend);
  bkExpandLegend.destroy();
  legend.destroy();
  // }
}
// When the 2D or 3D button is activated, the switchView() function is called
function switchView() {
  //eliminar leyenda
  removerLeyenda();

  //resetear la herramienta de buffer
  swichView.value = !swichView.value;
  // Clone the viewpoint for the MapView or SceneView
  const viewpoint = activeView.viewpoint.clone();
  // Get the view type, either 2d or 3d
  const type = activeView.type;

  // Clear any measurements that had been drawn
  measurement.clear();
  windowMeasure.value = false;
  // Reset the measurement tools in the div
  activeView.container = null;
  activeView = null;
  // Set the view based on whether it switched to 2D MapView or 3D SceneView
  activeView = type.toUpperCase() === "2D" ? sceneView : mapView;

  activeView.set({
    container: mapDivContainer,
    viewpoint: viewpoint,
  });
  // Add the appropriate measurement UI to the bottom-right when activated
  //activeView.ui.add(measurement, "bottom-left");

  // Set the views for the widgets
  //measurement.view = activeView;

  switchbtn.value = type.toUpperCase();

  addTools();

  mapZoomAnimation();

  agregarControlLeyenda();
}

function mapZoomAnimation() {
  var opts1 = {
    duration: 100,
  };

  var opts2 = {
    duration: 1000, // Duration of animation will be 5 seconds
  };

  //ir a punto inicial
  try{
    activeView.goTo({ center: [-100.31, 25.67], zoom: 4 }, opts1);

// setTimeout(function () {    
  activeView.goTo(queretaroExtent, opts2);
// }, 4000);
  } catch (error) {
    console.log(error);
  }
  
}
</script>
<style>
@import "https://js.arcgis.com/4.25/@arcgis/core/assets/esri/themes/light/main.css";

.map-container {
  position: relative;
}
.mapdiv {
  padding: 0;
  margin: 0;
  height: calc(100vh - 50px);
}

#infoDiv {
  position: absolute;
  top: 75px;
  left: 23px;
}

#infoDiv input {
  border: none;
  color: #f1f2f2;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
}
.esri-ui-top-left {
  position: absolute;
  top: 75px;
  left: 0;
}

.esri-ui-inner-container {
  position: absolute;
  left: 10px;
  top: 75px;
}

.active {
  background: #0079c1;
  color: #e4e4e4;
}

.none-border {
  border: none;
}

.hide-tool {
  display: none;
}

#bufferToolDiv {
  position: absolute;
  top: 115px;
  left: 23px;
}

#bufferToolDiv input {
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
}

.kmlButton {
  width: 20px;
}

.esri-ui-top-left {
  position: absolute;
  top: 75px;
  left: 0;
}

.esri-ui-inner-container {
  position: absolute;
  left: 10px;
  top: 75px;
  top: 75px;
}
</style>
