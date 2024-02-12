<template>
  <!-- 警告視窗 -->
  <Dialog 
    header="Warning" 
    v-model:visible="refIsDisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '40vw'}" :modal="true"
  >
    <p>你於 「{{location}}」所作的紀錄將不會儲存，確定要退出?</p>
    <template #footer>
    <Button label="Yes" icon="pi pi-check" @click="modelStatue(1); modelStatue(0, true)" class="p-button-text"/>
    <Button label="No" icon="pi pi-times" @click="modelStatue(1)" class="p-button-text"/>
    </template>
  </Dialog>

  <!-- 全部內容視窗 -->
  <Dialog 
    :header="`${title}`" 
    v-model:visible="refIsDisplay2" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '60vw'}" :modal="true"
  >
  <p style="white-space:pre-wrap">{{content}}</p>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="modelStatue(2)" class="p-button-text"/>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({ isDisplay:{ type: Boolean, default: false },
                isDisplay2:{ type: Boolean, default: false },
                location:{ type: String },
                title:{ type: String },
                content:{ type: String },
              });
const refIsDisplay = ref(props.isDisplay);
const refIsDisplay2 = ref(props.isDisplay2);
const emits = defineEmits(["childModel"]);
const modelStatue = (i, isClear) => {
  emits("childModel", i, isClear);
}
</script>
