<template>
  <n-input 
    v-model:value="info.lore"
    placeholder="Here to type character lore"
    type="textarea"
    :autosize="{
      minRows: 20,
      maxRows: 25
    }"
  />
  <n-button
    type="primary"
    class="my-2"
    @click="updateData()"
  >Save</n-button>
</template>

<script setup>
import { NButton, NInput } from "naive-ui"
import { computed } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash-es";
const store = useStore();
const props = defineProps({
  characterID: {
    type: String,
    default: ""
  }
})
const info = computed(() => {
  if(store.state.character){
    return cloneDeep(store.state.character.data.killersInfo.find(item => item.id === props.characterID).info);
  }
  return {"lore": ""}
});
const updateData = (() => {
  store.dispatch("character/UPDATEDATA", {
    killerID: props.characterID,
    data: {"info": info.value}
  });
});
</script>