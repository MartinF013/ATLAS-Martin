<template>
  <li
    class="layers__tree--item"
    v-for="(node, item) in nodes"
    v-on:click="sendInfo(node.id, node.layers)"
    :id="node.id"
  >
    <label
      :class="[
        id_select == node.id ? 'rounded border-2 border-golden-500' : '',
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
            node.type != 'group' ? 'text-xs' : 'text-sm font-semibold',
          ]"
          >{{ node.title }}</span
        >
      </section>
      <section class="item__description" v-if="id_select == node.id">
        {{ node.description }}
      </section>
    </label>
    <ListLayers
      v-if="node.layers && isOpen[item]"
      :nodes="node.layers"
      :option="option"
      :id_select="id_select"
      @layer="(id_layer, nodes) => sendInfo(id_layer, nodes)"
    />
  </li>
</template>
<script setup>
import Button from "@components/base/Button";
import { ref, reactive, toRefs, watch, onMounted } from "vue";
const props = defineProps({
  nodes: Array,
  option: String,
  id_select: String,
});
const emit = defineEmits(["layer"]);
const nodes = toRefs(props).nodes;
let isOpen = reactive([]);
let section = ref(false);

onMounted(() => {
  for (let i = 0; i < nodes.value.length; i++) {
    isOpen.push(true);
  }
});

const sendInfo = (node_id, node_child) => {
  if (!node_child) {
    emit("layer", node_id, node_child);
  }
};
const showList = (item) => {
  isOpen[item] = !isOpen[item];
};
</script>
