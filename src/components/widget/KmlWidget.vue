<template>
  <VueResizable
    :width="300"
    :minWidth="250"
    :maxWidth="350"
    :height="240"
    :minHeight="240"
    :maxHeight="240"
    :left="windowHeight"
    :top="165"
    dragSelector=".drag"
    class="widget"
    :disableAttributes="['w']"
  >
    <Title @close="close" class="drag" :title="'KML'"></Title>

    <div class="widget__content">
      <section class="grid grid-cols-4 gap-2 my-3">
        <section class="file-select col-span-3" :data-content="fileName">
          <input
            ref="file"
            @change="handleFileUpload"
            type="file"
            accept=".kml, .kmz"
          />
          <label>Archivo</label>
        </section>
        <Button
          @click="senddata"
          :icon="'icon_disk'"
          class="w-10 h-10 p-1.5 bg-navy-500 hover:bg-sky-500 transition ease-in-out duration-300 mx-auto rounded-full"
          title="Guardar KML"
        />
      </section>
      <section class="widget__content--table">
        <TableKml
          @kml="
            (kml) =>
              agregarKmlToMap(kml.url_archivo_consulta, kml.nombre_archivo)
          "
          @delete="deleteKML"
          :key="keyTable"
        />
      </section>
    </div>
  </VueResizable>
  <Teleport to="body">
    <Transition>
      <Message v-if="open" :content="content" @close="open = false" />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition>
      <div class="modal" v-if="showSpinner">
        <div class="m-auto">
          <ring-loader color="#E7AA4C" :size="size"></ring-loader>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import Button from "@components/base/Button";
import Message from "@components/base/Message";
import Title from "@components/base/Title";
import VueResizable from "vue-resizable";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import TableKml from "@components/widget/TableKml";
import { ref, toRefs, onMounted } from "vue";
import { savekml } from "@/utils/kml.js";
import KMLLayer from "@arcgis/core/layers/KMLLayer";

const emit = defineEmits(["close"]);
const props = defineProps({
  activeView: Object,
});

const activeView = toRefs(props).activeView.value;
let file = ref(null);
let keyTable = ref(0);
let fileName = ref("Seleccionar Archivo");
const windowHeight = ref(0);

const open = ref(false);
const content = ref("Ha ocurrido un error.");
const showSpinner = ref(false);

onMounted(() => {
  windowHeight.value = window.innerWidth - 350;
});

const handleFileUpload = (event) => {
  if (
    event.target.files[0].name.split(".").pop() != "kml" &&
    event.target.files[0].name.split(".").pop() != "kmz"
  ) {
    event.target.value = null;
    file.value = null;
    fileName.value = null;
  } else {
    file.value = event.target.files[0];
    fileName.value = event.target.files[0].name;
  }
};

const deleteKML = () => {
  keyTable.value++;
  open.value = true;
  content.value = "Se ha eliminado con éxito.";
};

const close = () => {
  emit("close");
};

const senddata = () => {
  if (file.value) {
    savekml(file.value.files[0], showSpinner)
      .then((resolve) => {
        if (resolve) {
          fileName.value = "Seleccionar Archivo";
          file.value = null;
          agregarKmlToMap(resolve.url, resolve.fileName);
          keyTable.value++;
          open.value = true;
          content.value = "Se ha agregado el KML con éxito.";
        } else {
          open.value = true;
          content.value = "Ha ocurrido un error.";
        }
      })
      .catch((reject) => {
        console.log(reject);
        open.value = true;
        content.value = "Ha ocurrido un error.";
      });
  } else {
    console.log("Selecciona un archivo");
  }
};

const agregarKmlToMap = (kmlUrl, name) => {
  // console.log(kmlUrl);
  // console.log(name);
  let kmllayer = new KMLLayer({
    url: kmlUrl,
    title: name,
  });

  activeView.map.layers.add(kmllayer);
};
</script>
