<template>
  <template v-if="info.lore.length === 0">
    <n-skeleton height="300px" width="100%" :sharp="false" />
  </template>
  <template v-else>
    <n-input 
      v-model:value="lore"
      placeholder="Here to type character lore"
      type="textarea"
      @change="disabled = false"
      :autosize="{
        minRows: 15,
        maxRows: 22
      }"
    />
    <n-button
      type="primary"
      class="my-2"
      :disabled="disabled"
      @click="updateData()"
    >Save</n-button>
  </template>
</template>

<script setup>
import { NButton, NInput, NSkeleton, useNotification } from "naive-ui"
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash-es";
const store = useStore();
const disabled = ref(true);
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
const lore = ref(info.value.lore);
const updateData = (() => {
  info.value.lore = lore.value;
  store.dispatch("character/UPDATEDATA", {
    killerID: props.characterID,
    data: {"info": info.value}
  });
  disabled.value = true;
  notify("success", "Updated Success", `Lore has updated success.`);
});
const notification = useNotification();
const notify = (type, title, text) => {
  notification[type]({
    content: title,
    meta: text,
    duration: 2500,
    keepAliveOnHover: true
  });
}
</script>