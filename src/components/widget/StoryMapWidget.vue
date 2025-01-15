<script setup>
import ListLayers from "./StoryMap/ListLayers.vue";
import Button from "@components/base/Button";
import { ref, reactive, toRefs, onMounted } from "vue";
const emit = defineEmits(["layer"]);
const props = defineProps({
  map: Object,
  swichView: Boolean,
});
const nodes = ref(null);
let isOpen = reactive([]);
let option = ref(null);
let section = ref(null);

const map = toRefs(props).map.value;
const allLayers = ref([]);
const id_select = ref("");

const containerRef = ref(null);

onMounted(() => {
  map.layers.forEach(function (capa) {
    // console.log(capa.type);
    if (capa.type != "group" && capa.type != "graphics") {
      capa.visible = false;
    } else {
      capa.visible = true;
    }
  });

  const estructura = obtenerEstructuraDeCapas(map);
  // console.log(estructura)
  nodes.value = estructura; //JSON.stringify(estructura, null, 2)

  for (let i = 0; i < nodes.value.length; i++) {
    isOpen.push(true);
  }
  // console.log(nodes.value);
});

const obtenerEstructuraDeCapas = (map) => {
  const layers = map.layers;
  const estructuraCapas = [];

  // Recorre las capas del mapa
  layers.forEach((layer) => {
    if (obtenerTipoCapa(layer) != "graphics") {
      const capa = obtenerCapa(layer);
      estructuraCapas.push(capa);
    }
  });
  return estructuraCapas;
};

const obtenerCapa = (layer) => {
  let capa = null;
  try {
    capa = {
      id: layer.id,
      title: layer.title,
      type: obtenerTipoCapa(layer),
      description: layer.sourceJSON.description,
    };
  } catch {
    capa = {
      id: layer.id,
      title: layer.title,
      type: obtenerTipoCapa(layer),
      description: "",
    };
  }

  // Si es un grupo de capas, obtén las capas internas
  if (layer.layers && layer.layers.length > 0) {
    capa.layers = [];

    layer.layers.forEach((sublayer) => {
      const subcapa = obtenerCapa(sublayer);
      capa.layers.push(subcapa);
    });
  }

  return capa;
};

const obtenerTipoCapa = (layer) => {
  // Obtén el tipo de la capa
  // Puedes personalizar esta función según los tipos de capas que necesites manejar

  if (layer.type === "group") {
    return "group";
  } else if (layer.type === "feature") {
    allLayers.value.push(layer.id);
    return "feature";
  } else if (layer.type === "map-image") {
    return "map-image";
  } else if (layer.type === "graphics") {
    return "graphics";
  } else {
    return "other";
  }
};

const showList = (item) => {
  isOpen[item] = !isOpen[item];
};

const sendInfo = (node_id, node_child) => {
  if (!node_child) {
    id_select.value = node_id;
    recibeData(node_id);

    const selectedItemRef = document.querySelector(`[id="${node_id}"]`);

    // Verificar si se encontró el elemento seleccionado
    if (selectedItemRef) {
      const container = containerRef.value;
      const containerHeight = container.offsetHeight;
      const selectedItemHeight = selectedItemRef.offsetHeight;
      const scrollTo =
        selectedItemRef.offsetTop -
        containerHeight / 2 +
        selectedItemHeight / 2;

      container.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  }
};

const recibeData = (layerID) => {
  map.layers.map(function (lyr) {
    layersToQuery(lyr, layerID);
  });
};

function layersToQuery(node, layerID) {
  if (node.type == "group") {
    node.visible = true;
    node.allLayers.forEach(function (layer) {
      layersToQuery(layer, layerID);
    });
  } else if (node.type == "graphics") {
    node.visible = true;
  } else if (node.id == layerID) {
    node.visible = true;
    id_select.value = layerID;
  } else {
    node.visible = false;
  }
}

const next = () => {
  // console.log(allLayers.value)
  if (id_select.value) {
    const arregloSinDuplicados = allLayers.value.filter((elemento, indice) => {
      return allLayers.value.indexOf(elemento) === indice;
    });
    const posicion = arregloSinDuplicados.indexOf(id_select.value);
    // console.log(posicion)
    const selectedItemRef = document.querySelector(`[id="${id_select.value}"]`);

    // Verificar si se encontró el elemento seleccionado
    if (selectedItemRef) {
      const container = containerRef.value;
      const containerHeight = container.offsetHeight;
      const selectedItemHeight = selectedItemRef.offsetHeight;
      const scrollTo =
        selectedItemRef.offsetTop -
        containerHeight / 2 +
        selectedItemHeight / 2;

      container.scrollTo({ top: scrollTo, behavior: "smooth" });
    }

    if (posicion < allLayers.value.length) {
      recibeData(allLayers.value[posicion + 1]);
    }
  } else {
    recibeData(allLayers.value[0]);
  }
};

const previous = () => {
  if (id_select.value) {
    const arregloSinDuplicados = allLayers.value.filter((elemento, indice) => {
      return allLayers.value.indexOf(elemento) === indice;
    });
    const posicion = arregloSinDuplicados.indexOf(id_select.value);

    const selectedItemRef = document.querySelector(`[id="${id_select.value}"]`);

    // Verificar si se encontró el elemento seleccionado
    if (selectedItemRef) {
      const container = containerRef.value;
      const containerHeight = container.offsetHeight;
      const selectedItemHeight = selectedItemRef.offsetHeight;
      const scrollTo =
        selectedItemRef.offsetTop -
        containerHeight / 2 +
        selectedItemHeight / 2;

      container.scrollTo({ top: scrollTo, behavior: "smooth" });
    }

    if (posicion > 0) {
      recibeData(allLayers.value[posicion - 1]);
    }
  } else {
    recibeData(allLayers.value[allLayers.value.length - 1]);
  }
};
</script>

<template>
  <div class="story">
    <div class="story__widget">
      <section class="story__widget--up">
        <Button
          @click="previous"
          :icon="'icon_chevron_up_white'"
          :title="'Anterior'"
        />
      </section>
      <section ref="containerRef" class="story__widget--content">
        <div class="layers">
          <ul class="layers__tree" v-for="(node, item) in nodes">
            <li
              class="layers__tree--item"
              v-on:click="sendInfo(node.id, node.layers)"
              :id="node.id"
            >
              <label
                :class="[
                  id_select == node.id
                    ? 'rounded border-2 border-golden-500'
                    : '',
                ]"
              >
                <section class="item__header">
                  <!-- <Transition name="slide-up">
              <Button
                v-if="!isOpen[item]"
                v-show="node.layers"
                :class="[isOpen[item] ? 'bg-sky-500' : 'bg-navy-500']"
                icon="icon_chevron_down_white"
                @click="showList(item)"
              />
              <Button
                v-else-if="isOpen[item]"
                v-show="node.layers"
                :class="[isOpen[item] ? 'bg-sky-500' : 'bg-navy-500']"
                icon="icon_chevron_up_white"
                @click="showList(item)"
              />
            </Transition> -->
                  <span
                    :class="[
                      id_select == node.id && node.type != 'group'
                        ? 'text-golden-500'
                        : 'text-navy-500',
                      node.type != 'group'
                        ? 'text-xs'
                        : 'text-sm font-semibold',
                    ]"
                    >{{ node.title }}</span
                  >
                </section>
                <section class="item__description" v-if="node.id == id_select">
                  {{ node.description }}
                </section>
              </label>
              <ListLayers
                v-if="node.layers && isOpen[item]"
                :nodes="node.layers"
                :option="option"
                :id_select="id_select"
                @layer="(node_id, node_child) => sendInfo(node_id, node_child)"
              />
            </li>
          </ul>
        </div>
      </section>
      <section class="story__widget--down">
        <Button
          @click="next"
          :icon="'icon_chevron_down_white'"
          :title="'Siguiente'"
        />
      </section>
    </div>
  </div>
</template>
