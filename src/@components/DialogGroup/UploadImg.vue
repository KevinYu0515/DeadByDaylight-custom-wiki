<template>
  <Dialog 
      :header="`${title} Upload`"
      v-model:visible="isDisplay" 
      :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
      :style="{width: '60vw'}" :model="true"
    >
      <Cropper
        :Name="title"
        :killerOption="option"
        @uploadImgSuccess = "cropperHandler"
        ref="child"
      />
      <template #footer>
        <Button label="Close" @click="modelStatue(4)" class="p-button-text"/>
      </template>
    </Dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import Cropper from "@/@components/Tools/Cropper.vue";

const router = useRouter();
const props = defineProps(["title", "option", "isDisplay"]);
const isDisplay = computed(() => props.isDisplay ? props.isDisplay : false);
const title = computed(() => props.title ? props.title : null);
const option = computed(() => props.option ? props.option : null);
const base64 = ref(null);
const cropperHandler = (data, option) => {
  emits("uploadImg", "killersBgImg", data);
  const fileReader = new FileReader();
  fileReader.readAsDataURL(data);
  fileReader.onload = e => {
    base64.value = e.target.result;
    emits("updateSettings", option, base64.value);
  };
  modelStatue(4);
  router.push("/personal");
};

const modelStatue = (i, isClear) => emits("childModel", i, isClear);

const emits = defineEmits(["uploadImg", "updateSettings", "childModel"]);

</script>