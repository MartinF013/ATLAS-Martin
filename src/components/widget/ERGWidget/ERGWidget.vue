<template>
    <VueResizable :width="370" :minWidth="250" :maxWidth="3000"
        :height="showBleveFields || showTable32Fields ? 620 : 550" :minHeight="240" :maxHeight="3000" :left="windowLeft"
        :top="120" dragSelector=".drag" class="widget resizable-widget">
        <Title @close="close" class="drag h-8" :title="'Guía de respuesta ante emergencias'"></Title>
        <section class="widget__content">
            <div class="form-group grid grid-cols-3 gap-2">
                <div class="col-span-2">
                    <h4 class="text-sm font-semibold mb-2">Ubicación del derrame (DD)</h4>
                    <Input :label="'Latitud'" :type="'number'" :inputValue="inputData.latitude" class="mt-0"
                        @change="(payment) => handleChange(payment, 'latitude')" />
                    <Input :label="'Longitud'" :type="'number'" :inputValue="inputData.longitude" class="mt-0"
                        @change="(payment) => handleChange(payment, 'longitude')" />
                </div>
                <div class="col-span-1 w-auto flex justify-center items-center">
                    <Button class="bg-gray-500 hover:bg-blue-300 h-[50px] w-[50px] shadow-md"
                        @click="enableCreateLocation()" :icon="'icon_buffer'"
                        :title="'Crear ubicación del Incidente'" />
                </div>
            </div>

            <h4 class="text-sm font-semibold mb-2">Material</h4>
            <multiselect v-model="selectedMaterial" :options="filteredMaterials" :searchable="true"
                :clear-on-select="false" :close-on-select="true" placeholder="Buscar material..." label="label"
                track-by="value" @search-change="onInput" @select="onSelect"
                class="custom-multiselect  h-15 border rounded-md px-2 py-1" ref="multiselect" :key="refreshKey" />

            <!-- <div v-if="showBleveModal" class="modal"> -->
            <!-- TODO Cambiar texto por el qu se necesite TABL2 o TABL3 -->
            <div v-if="showTable32Modal" class="modal">  
                <div class="modal-content">
                    <p class="modal-title">
                        Para el material que ha seleccionado, es posible mostrar una distancia de evacuación adicional
                        en caso de alto riesgo.
                    </p>  
                    <p class="modal-subtitle">
                        Para permitirlo, active el selector <b>Mostrar zona de aislamiento de alto riesgo</b> y
                        seleccione la capacidad correcta del contenedor.
                    </p>
                    <button @click="closeTable32Modal" class="modal-button">Aceptar</button>
                </div>
            </div>

            <!-- <div v-if="showBleveModal" class="modal"> -->
            <div v-if="showBleveModal" class="modal">
                <div class="modal-content">
                    <p class="modal-title">
                        Para el material que ha seleccionado, es posible mostrar una distancia de evacuación adicional
                        en caso de alto riesgo.
                    </p>
                    <p class="modal-subtitle">
                        Para permitirlo, active el selector <b>Mostrar zona de aislamiento de alto riesgo</b> y
                        seleccione la capacidad correcta del contenedor.
                    </p>
                    <button @click="closeBleveModal" class="modal-button">Aceptar</button>
                </div>
            </div>


            <div class="content-below mt-2">
                <div class="flex space-x-4">
                    <div class="flex flex-col w-1/2">
                        <span
                            class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden ">Magnitud del derrame</span>
                        <Select :label="'Magnitud del derrame'" :options="['Pequeña', 'Grande']"
                            :inputValue="inputData.spillSize" class="mt-2"
                            @change="(payment) => handleChangeSelect(payment, 'spillSize')"></Select>
                    </div>

                    <div class="flex flex-col w-1/2"> <span
                            class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden">Mostrar zona
                            de aislamiento de incendios</span>
                        <ToggleButton class="mt-4" v-model="inputData.fireRisk" />
                    </div>
                </div>

                <div class="flex space-x-4">
                    <div class="flex flex-col w-1/2"> <span
                            class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                            Dirección del viento (hacia dónde sopla)
                        </span>
                        <Input :type="'number'" :inputValue="inputData.windDirection" class="mt-2"
                            @change="(payment) => handleChange(payment, 'windDirection')" />
                    </div>

                    <div class="flex flex-col w-1/2"> <span
                            class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden mb-2">Periodo
                            del derrame</span>
                        <Select :label="'Periodo del derrame'" :options="['Día', 'Noche']"
                            :inputValue="inputData.timeOfDay" class="mt-0"
                            @change="(payment) => handleChangeSelect(payment, 'timeOfDay')"></Select>
                    </div>
                </div>
                <!-- TODO Cambiar campos por los que necesite TABLE2 o TABLE3-->
                 <!-- TODO Ageregar @change="(payment) => handleChangeSelect(payment, 'timeOfDay')" con ss propios paramtros-->
                <div v-if="showBleveFields" class="flex space-x-4 mt-2">
                    <div class="flex flex-col w-1/2">
                        <span
                            class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden ">Mostrar zona de asilamiento de alto riesgo </span>
                            <ToggleButton class="mt-4" v-model="inputData.fireRisk" />
                    </div>

                    <div class="flex flex-col w-1/2">
                        <span class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden mr-4">Capacidad del contnedor (litros)</span>
                        <Select :options="['100', '400', '2000', '4000', '8000', '22000', '42000', '82000', '140000']" class="mt-2 mr-4"
                        
                            v-model="transportContainer.container"
                            :inputValue="'100'" ></Select>
                    </div>
                </div>
                <div v-if="showTable32Fields" class="flex space-x-4 mt-4">
                <div class="flex flex-col w-1/2">
                    <span class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden">Mostrar zona de
                        aislamiento e riesgo</span>
                    <Select :options="['Bajo', 'Moderado', 'Alto']" v-model="windSpeed.speed" class="mt-0"
                        :inputValue="windSpeed.speed || 'Bajo'"></Select>
                </div>

                <div class="flex flex-col w-1/2">
                    <span class="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden">Contenedor de
                        transporte</span>
                    <Select :options="['Vagón cisterna', 'Camión o remolque cisterna']"
                        v-model="transportContainer.container"
                        :inputValue="transportContainer.container || 'Vagón cisterna'" class="mt-0"></Select>
                </div>
            </div>
                <div class="col-span-1 w-auto flex justify-center items-center">
                    <Button class="bg-gray-500 hover:bg-blue-300 h-[50px] w-[50px] shadow-md mr-5"
                        @click="_CreateERGButtonClicked()" :icon="'icon_buffer'" :title="'Crear zonas'" />
                    <Button class="bg-gray-500 hover:bg-blue-300 h-[50px] w-[50px] shadow-md" @click="resetTool()"
                        :icon="'icon_reload'" :title="'Limpiar'" />
                </div>
            </div>
        </section>
    </VueResizable>
</template>

<!--Vue 3 Composition API -->
<script setup>

//componetes base
import Button from "@components/base/Button";
import Title from "@components/base/Title";
import Input from "@components/base/Input";
import Select from "@components/base/Select";
import ToggleButton from '@components/base/ToggleButton';

// Componentes vue
import VueResizable from "vue-resizable";
import { ref, toRefs, computed, onMounted, watch, reactive } from "vue";

// Componentes de ArcGIS
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Draw from "@arcgis/core/views/draw/Draw";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import * as projection from "@arcgis/core/geometry/projection";
import Circle from "@arcgis/core/geometry/Circle";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Color from "@arcgis/core/Color.js";

// Datos de materiales
import materials from './guide/materials-es.json';

// Componentes de Vue 3 externos
import Autosuggest from 'vue-autosuggest';
import Multiselect from 'vue-multiselect';
import createERGBZones from './ERGImp';



/// Seccion de Propiedades y funciones del componente_________________________________________________________________________
const windowLeft = ref(0);
const emit = defineEmits(["close"]);
const props = defineProps({
    activeView: Object,
    swichView: Boolean,
});


const activeView = toRefs(props).activeView.value;
watch(
    () => __props.swichView,
    (newValue, oldValue) => {
        close();
    }
);
onMounted(() => {
    //enableCreateLocation();
    loadMaterials();
    windowLeft.value = window.innerWidth - 400;
    // valor de left para que la ventana se muestre centrada
    // windowsLeft.value = parseInt(window.innerWidth / 2) - 185; 

});

//____________________________________________________________________________________________________________________________

/// Seccion de propiedades y funciones  para los campos de entrada_____________________________________________________________
//TODO meter nuevos campos para TABLE2 y TABLE3 e inicialirlos 
const inputData = reactive({
    latitude: '',
    longitude: '',
    material: '',
    spillSize: 'Pequeña',
    fireRisk: false,
    windDirection: 0,
    timeOfDay: 'Día'
});

// Propiedades del input de búsqueda de materiales
const inputProps = reactive({
    inputValue: '',
    placeholder: 'Buscar material...'
});

import materialOptions from './guide/materials-es.json';

const handleChange = (payment, input) => {
    if (input === "latitude") inputData.latitude = payment;
    if (input === "longitude") inputData.longitude = payment;
    if (input === "windDirection") inputData.windDirection = payment;
    //TODO meter nuevos campos
};

const handleChangeSelect = (payment, input) => {
    if (input === "spillSize") inputData.spillSize = payment;
    //TODO meter nuevos campos
};

const filteredMaterials = ref([]); // Inicializa como una lista vacía

const onInput = (value) => {
    inputData.material = value;
    filteredMaterials.value = materialOptions.value.filter(material =>
        material.label.toLowerCase().includes(value.toLowerCase())
    );
};
const refreshKey = ref(0);
const onSelect = (selected) => {
    console.log('Material seleccionado:', selected.label);
    inputData.material = selected.label;
    // Forzar una actualización
    refreshKey.value++;

    // Verificar si el material tiene BLEVE
    const material = materialOptions.value.find((m) => m.label.includes(selected.label));
    const materialCatalog = materials.find((m) => m.IDNum === material.value);
    if (materialCatalog && materialCatalog.BLEVE === 'Yes') {
        console.log('El material seleccionado tiene BLEVE');
        console.log(materialCatalog);
        showBleveModal.value = true;
        showBleveFields.value = false; // Ocultar los campos adicionales inicialmente
        showTable32Modal.value = false;
        showTable32Fields.value = false;
    } else if (materialCatalog && materialCatalog.TABLE3 === 'Yes' || materialCatalog.TABLE2 === 'Yes') {
        console.log('El material seleccionado tiene tabla 3');
        console.log(materialCatalog);
        showTable32Modal.value = true;
        showTable32Fields.value = false; // Ocultar los campos adicionales inicialmente
        showBleveModal.value = false;
        showBleveFields.value = false;
    } else {
        console.log(materialCatalog);
        showBleveModal.value = false;
        showBleveFields.value = false;
        showTable32Modal.value = false;
        showTable32Fields.value = false;
    }
};

const closeBleveModal = () => {
    showBleveModal.value = false;
    showBleveFields.value = true; // Mostrar los campos adicionales después de cerrar el modal
};
const closeTable32Modal = () => {
    showTable32Modal.value = false;
    showTable32Fields.value = true; // Mostrar los campos adicionales después de cerrar el modal
};

const loadMaterials = () => {
    try {
        materialOptions.value = materials.map(material => ({
            label: `${material.IDNum} | ${material.Material}`,
            value: material.IDNum
        }));
        console.log('Materiales cargados:', materialOptions.value);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
};

//____________________________________________________________________________________________________________________________


// Seccion de propiedades y funciones ArcGIS_________________________________________________________________________________

let _pointToIncident = null;

const incidentPointLayer = new GraphicsLayer({
    name: "Punto de incidente",
    // listMode: "hide",
});

const ERGLayer = new GraphicsLayer({
    name: "Analisis quimicos",
    listMode: "hide",
});

activeView.map.layers.add(incidentPointLayer);
activeView.map.layers.add(ERGLayer);

const createPointGraphic = (coordinates) => {
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

    incidentPointLayer.add(graphic);

}

const enableCreateLocation = () => {
    const draw = new Draw({
        view: activeView,
    });

    let action = draw.create("point");

    action.on("cursor-update", function (evt) {
        createPointGraphic(evt.coordinates);
    });


    action.on("draw-complete", function (evt) {
        //Si el usuario cerro la ventana, mostrarla

        _pointToIncident = {
            type: "point", // autocasts as /Point
            x: evt.coordinates[0],
            y: evt.coordinates[1],
            spatialReference: activeView.spatialReference,
        };

        _pointToIncident.hasZ = false;
        _pointToIncident.z = undefined;

        let outSpatialReference = {
            wkid: 4326
        };





        console.log(inputData.latitude, inputData.longitude);
        console.log(_pointToIncident.spatialReference);

        //crear un array de puntos
        let array = [_pointToIncident];

        // projects an array of points
        let projectedPoints = projection.project(array, outSpatialReference);
        projectedPoints.forEach(function (point) {
            console.log(point.x, point.y);
        });

        inputData.latitude = projectedPoints[0].x;
        inputData.longitude = projectedPoints[0].y;

        //console.log(inputData.latitude, inputData.longitude);
        //console.log(_pointToIncident.spatialReference);
        // En este punto se ha obtenido el punto de incidente
        // sera usado al ejecutar el boton de crear zonas de aislamiento 

    });
}

const clearGraphics = () => {
    ERGLayer.removeAll();
    incidentPointLayer.removeAll();
}

const resetTool = () => {
    if (_pointToIncident != null) {
        clearGraphics();
        _pointToIncident = null;
    }

    inputData.latitude = '';
    inputData.longitude = '';
    inputData.material = '';
    inputData.spillSize = 'Pequeña';
    inputData.fireRisk = false;
    inputData.windDirection = 0;
    inputData.timeOfDay = 'Día';

};

const close = () => {
    clearGraphics();
    activeView.map.layers.remove(ERGLayer);
    activeView.map.layers.remove(incidentPointLayer);

    _pointToIncident = null;
    emit("close");
};


//Declaracion de parametros _____________________________________________________________________________________________________

const _selectedMaterial = ref({}); // Material seleccionado
const spillSize = ref({});
const spillTime = ref({});
const useBleve = reactive({});

// Definición del objeto transportContainer
const transportContainer = {
    options: [],
    disabled: false,
    container: null,

    addOption(options) {
        if (Array.isArray(options)) {
            this.options.push(...options);
            if (options.length > 0) {
                this.container = options[0]; //opcion predeterminada
            }
        } else {
            this.options.push(options);
            this.container = options;  //opcion predeterminada
        }
    },

    getOptions() {
        return this.options;
    }
};

const tankCapacity = ref({});
const fire = reactive({});
const windDirection = ref(null);
const nls = reactive({});
const settings = reactive({});


// Función para asignar valores predeterminados
const initializeDefaultsValues = () => {


    // este parametro se debera obtener de la seleccion del material del usuario
    // _selectedMaterial.value = {
    //     GuideNum: 153,
    //     IDNum: 2232,
    //     Material: "2-Cloroetanol",
    //     SM_ISO: 30,
    //     SM_DY: 200,
    //     SM_NTE: 300,
    //     LG_ISO: 60,
    //     LG_DY: 600,
    //     LG_NTE: 1100,
    //     FIRE_ISO: 800
    // };

    //Ejemplo 2
    // _selectedMaterial.value = {
    //     GuideNum: 124,
    //     IDNum: 1017,
    //     Material: "Cloro",
    //     SM_ISO: 60,
    //     SM_DY: 300,
    //     SM_NTE: 1100,
    //     ATM: "Yes",
    //     FIRE_ISO: 800,
    //     TABLE3: "Yes",
    //     RAIL_ISO: 1000,
    //     RAILDYLOW: 9900,
    //     RAILDYMOD: 6400,
    //     RAILDYHI: 5100,
    //     RAILNTELOW: 11000,
    //     RAILNTEMOD: 9000,
    //     RAILNTEHI: 6700,
    //     SEMI_ISO: 600,
    //     SEMIDYLOW: 5800,
    //     SEMIDYMOD: 3400,
    //     SEMIDYHI: 2900,
    //     SEMINTELOW: 6700,
    //     SEMINTEMOD: 5000,
    //     SEMINTEHI: 4100,
    //     MTON_ISO: 300,
    //     MTONDYLOW: 2100,
    //     MTONDYMOD: 1300,
    //     MTONDYHI: 1000,
    //     MTONNTELOW: 4000,
    //     MTONNTEMOD: 2400,
    //     MTONNTEHI: 1300,
    //     STON_ISO: 150,
    //     STONDYLOW: 1500,
    //     STONDYMOD: 800,
    //     STONDYHI: 500,
    //     STONNTELOW: 2900,
    //     STONNTEMOD: 1300,
    //     STONNTEHI: 600
    // };

    //Ejemplo 3
    // Asignar valores predeterminados a los campos de entrada
    _selectedMaterial.value = {
        GuideNum: 115,
        IDNum: 1011,
        Material: "Butano",
        SM_ISO: 100,
        LG_ISO: 800,
        FIRE_ISO: 1600,
        BLEVE: "Yes",
        BLV100L: 307,
        BLV400L: 488,
        BLV2000L: 834,
        BLV4000L: 1050,
        BLV8000L: 1323,
        BLV22000L: 1852,
        BLV42000L: 2200,
        BLV82000L: 2200,
        BLV140000L: 2200
    };

    //se obtiene de la seleccion del usuario
    spillSize.value = {
        size: "SM",       // posibles valores: "SM", "LG" (Pequeña o Grande)
        disabled: false   // estado inicial
    };

    // Valores por defecto para los nuevos campos
    windSpeed.speed = "Bajo"; // Opción por defecto para la velocidad del viento

    // Opciones y valor por defecto para el contenedor de transporte
    transportContainer.options = ['Vagón cisterna', 'Camión o remolque cisterna'];
    transportContainer.container = 'Vagón cisterna'; // Opción por defecto


    //Se obtiene de la seleccion del usuario
    spillTime.value = {
        time: "DY",       // posibles valores: "DY", "NTE" (Durante el día o Noche)
        disabled: false
    };

    // nls parametros constantes no cambian
    nls.bleveSettingsLabel = 'BLEVE';
    nls.fireSettingsLabel = 'Fire';
    nls.downwindSettingsLabel = 'Downwind';
    nls.PASettingsLabel = 'Protective Action';
    nls.IISettingsLabel = 'Isolation';
    nls.spillLocationLabel = 'Spill Location';
    nls.noPAZoneMessage = 'No Protective Action Zone Available';


    // Establecen la configuración de los símbolos de las zonas de aislamiento, debera existir una interfaz para cambiarlos
    settings.spillLocationOutlineColor = {
        type: "simple-line",
        color: "#000001",
        style: "solid",
        transparency: 1,
    };
    settings.spillLocationFillColor = {
        type: "simple-fill",
        color: "#000001",
        transparency: 1,
        style: "diagonal-cross",
    };
    settings.IIZoneOutlineColor = {
        type: "simple-line",
        color: "#ffa500",
        style: "solid",
        transparency: 0,
    };
    settings.IIZoneFillColor = {
        type: "simple-fill",
        color: "#ffa500",
        style: "solid",
        transparency: 0.5,
    };
    settings.PAZoneOutlineColor = {
        type: "simple-line",
        color: "#ffa500",
        style: "solid",
        transparency: 1,
    };
    settings.PAZoneFillColor = {
        type: "simple-fill",
        color: "#ffffff",
        style: "solid",
        transparency: 0,
    };
    settings.downwindZoneOutlineColor = {
        type: "simple-line",
        color: "#ffffff",
        style: "long-dash",
        transparency: 1,
    };
    settings.downwindZoneFillColor = {
        type: "simple-fill",
        color: "#ffa500",
        style: "solid",
        transparency: 0.7,
    };
    settings.fireZoneOutlineColor = {
        type: "simple-line",
        color: "#ff0000",
        style: "solid",
        transparency: 1,
    };
    settings.fireZoneFillColor = {
        type: "simple-fill",
        color: "#ff0000",
        style: "forward-diagonal",
        transparency: 0.5,
    };
    settings.bleveZoneOutlineColor = {
        type: "simple-line",
        color: "#0000ff",
        style: "solid",
        transparency: 1,
    };
    settings.bleveZoneFillColor = {
        type: "simple-fill",
        color: "#000001",
        style: "diagonal-cross",
        transparency: 1,
    };

    //_______________________________________________________________________________________________________________________

    //windSpeed es fijo
    let speed = 5;
    // Determinar la velocidad del viento como LOW, MOD o HI
    if (speed <= 6) {
        windSpeed.speed = "LOW";
    } else if (speed <= 12) {
        windSpeed.speed = "MOD";
    } else {
        windSpeed.speed = "HI";
    }

    //Este check se muestra si el material seleccionado tiene el atributo BLEVE (ejemplo material 1011 si lo tiene pero 1017 no)    
    // opcion seleccionada del usuario para crear la zona de aislamiento de alto riesgo
    useBleve.checked = false;

    //Opcion de usuario para mostrar la zona de aislamiento de incendios
    fire.checked = false;


    //Este select se muestra si el material seleccionado tiene el atributo BLEVE (ejemplo material 1011 si lo tiene pero 1017 no)    
    //Opcion de usuario seleccionada para la capacidad del tanque 
    // las opciones son: BLV100L, BLV400L, BLV2000L, BLV4000L, BLV8000L, BLV22000L, BLV42000L, BLV82000L, BLV140000L    
    tankCapacity.capacity = "BLV100L";

    //Opcion de usuario seleccionada para la dirección del viento 0-360 grados
    windDirection.value = 0;

}

const showBleveModal = ref(false);
const showTable32Modal = ref(false);
const showTable32Fields = ref(false);
const showBleveFields = ref(false);
const windSpeed = reactive({
    speed: "Bajo"
});

const autocompleteConfig = () => {

    // const selectedIndex = $(this.materialType).getSelectedItemIndex();
    // this._selectedMaterial = $(this.materialType).getSelectedItemData(selectedIndex);

    // Muestra mensaje si el material tiene tablas 2 y 3
    // if (this._selectedMaterial.TABLE2) {
    //     new t({ message: `${this.nls.table2Message}${this._selectedMaterial.TIH.replace(/,/g, "\n")}` });
    // }

    let selectedMaterial = _selectedMaterial.value;
    // Configura los elementos de la interfaz según el tipo de material seleccionado
    if (selectedMaterial.TABLE3 && spillSize.size === "LG") {
        windSpeed.disabled = false;
        transportContainer.disabled = false;
        _resetTransportContainerOptions();
    } else {
        windSpeed.disabled = true;
        transportContainer.disabled = true;
    }

    // Configura las opciones BLEVE
    if (selectedMaterial.BLEVE) {

        useBleve.disabled = false;
        tankCapacity.disabled = false;
        //h.removeClass(this.bleveContainer, "ERGHidden");
    } else {
        useBleve.disabled = true;
        tankCapacity.disabled = true;
    }
};
//________________________________________________________________________________

const _resetTransportContainerOptions = () => {

    let selectedMaterial = _selectedMaterial.value;
    // Elimina todas las opciones actuales del contenedor de transporte
    for (let i = this.transportContainer.options.length - 1; i >= 0; i--) {
        this.transportContainer.removeOption(i);
    }

    // Define los tipos de transporte disponibles según el material seleccionado
    let transportOptions = ["rail", "semi"];

    // Agrega opciones adicionales según el ID del material seleccionado
    switch (selectedMaterial.IDNum) {
        case 1005:
            transportOptions.push("ag", "msm");
            break;
        case 1017:
        case 1050:
        case 2186:
        case 1079:
            transportOptions.push("mton", "ston");
            break;
        case 1040:
        case 1052:
            transportOptions.push("ston");
            break;
    }

    // Crea las opciones del contenedor de transporte con etiquetas en función de las traducciones
    const options = transportOptions.map(option => ({
        value: option.toUpperCase(),
        label: this.nls[option]
    }));

    // Agrega las nuevas opciones al contenedor de transporte
    this.transportContainer.addOption(options);
}
//_______________________________________________________________________________ 

const _CreateERGButtonClicked = () => {

    initializeDefaultsValues();
    autocompleteConfig();

    console.log('Crear zonas de aislamiento');
    //TODO Verificar aqi que los datos que se mandan de cada campo sean los correctos
    createERGBZones(
        _selectedMaterial,      // Material seleccionado 
        _pointToIncident,       // Punto del incidente
        spillSize,              // Tamaño del derrame 
        spillTime,              // Tiempo del derrame 
        transportContainer,     // Contenedor de transporte 
        windSpeed,              // Velocidad del viento 
        windDirection,          // Dirección del viento 
        useBleve,               // Indica si BLEVE está habilitado 
        tankCapacity,           // Capacidad del tanque 
        fire,                   // Indica si FIRE está habilitado       
        ERGLayer,               // Capa gráfica donde se agregarán gráficos
        activeView,             // Vista activa del mapa        
        nls,
        settings
    );
}

</script>

<style scoped>
.erg-widget {
    width: 100%;
    padding: 20px;
    background-color: gray;
    border-radius: 8px;
}

.resizable-widget {
    min-width: 400px !important;
}

.resizable-widget .vue-resizable__handle--top,
.resizable-widget .vue-resizable__handle--bottom,
.resizable-widget .vue-resizable__handle--top-left,
.resizable-widget .vue-resizable__handle--top-right,
.resizable-widget .vue-resizable__handle--bottom-left,
.resizable-widget .vue-resizable__handle--bottom-right {
    display: none;
}

.custom-multiselect::v-deep .multiselect__content-wrapper {
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
    position: absolute;
    z-index: 50;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    max-height: 200px;
    /* Ajusta este valor según tus necesidades */
    max-width: 350px;
    overflow-y: auto;
    /* Agrega scroll vertical cuando sea necesario */
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    width: auto;
    max-width: 400px;
    height: auto;
    max-height: 80vh;
    border-radius: 5px;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.modal-content {
    background-color: #f5f5f5;
    /* Fondo gris claro */
    padding: 25px 25px 15px 25px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    color: #333;
    /* Texto más oscuro */
    font-family: Arial, sans-serif;
}

.modal-title {
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
    /* Texto más oscuro */
    line-height: 1.4;
}

.modal-subtitle {
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
    /* Texto más oscuro */
    line-height: 1.4;
}

.modal-button {
    background-color: #e0e0e0;
    /* Gris claro */
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    align-self: flex-end;
    /* Alinea el botón a la derecha */
    margin-bottom: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    /* Sombra sutil */
}

.modal-button:hover {
    background-color: #d0d0d0;
    /* Gris un poco más oscuro al hacer hover */
}


.resizable-widget {
    /* height: 650px !important;  <-  elimina esta linea */
    min-width: 400px !important;
}
</style>