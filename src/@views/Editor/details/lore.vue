<template>
  <Textarea 
    class="my-2" 
    :value="lore"
    v-model="lore"
    placeholder="Here to type background"
    :autoResize="false" 
    rows="20" 
    cols="140" 
  />
  <Button
    label="Save"
    class="p-button-success"
    style="max-width:100%;"
    @click="updateData()"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps(["lore"]);
const emits = defineEmits(["updateData"]);
const lore = ref(props.lore);
const updateData = (() => {
  emits("updateData", props.lore, true);
});

onMounted(() => {
  lore.value = props.lore;
});
</script>