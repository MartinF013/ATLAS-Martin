<template>
  <table class="table-kml">
    <thead>
      <tr class="col-span-2">
        KML
      </tr>
      <tr class="h-full"></tr>
    </thead>
    <tbody>
      <tr v-for="kml in kmls">
        <td class="col-span-2">{{ kml.nombre_archivo }}</td>
        <td class="text-center flex flex-row justify-around items-center gap-1">
          <Button
            :class="'h-5 w-3 bg-golden-500 hover:bg-sky-500 transition ease-in-out duration-300 rounded-lg'"
            @click="activeKml(kml)"
            icon="icon_play"
            title="Cargar KML"
          />
          <Button
            :class="'h-5 w-3 bg-red-300 hover:bg-red-500 transition ease-in-out duration-300 rounded-2xl'"
            @click="deleteKml(kml)"
            icon="icon_x_mark"
            title="Eliminar KML"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <Teleport to="body">
    <Transition>
      <Message v-if="open" :content="content" @close="open = false" />
    </Transition>
  </Teleport>
</template>

<script setup>
import Button from "@components/base/Button";
import Message from "@components/base/Message";
import { getKMLs, deleteKML } from "@/utils/kml.js";
import { ref, onMounted } from "vue";
const emit = defineEmits(["kml", "delete"]);
let kmls = ref([]);

const open = ref(false);
const content = ref("Ha ocurrido un error.");

onMounted(() => {
  getKMLs()
    .then((resolve) => {
      kmls.value = resolve;
    })
    .catch((reject) => {
      console.log(reject);
    });
});

const activeKml = (kml) => {
  kmls.value.splice(kml, 1);
  emit("kml", kml);
};
const deleteKml = (kml) => {
  deleteKML(kml.id)
    .then((resolve) => {
      if (resolve) {
        emit("delete");
      }
    })
    .catch((reject) => {
      console.log(reject);
      open.value = true;
      content.value = "Ha ocurrido un error.";
    });
};
</script>
