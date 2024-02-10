<template>
  <!-- 警告視窗 -->
  <Dialog 
    header="Warning" 
    v-model:visible="isDisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
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
    v-model:visible="isDisplay2" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '60vw'}" :modal="true"
  >
  <p style="white-space:pre-wrap">{{content}}</p>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="modelStatue(2)" class="p-button-text"/>
    </template>
  </Dialog>
</template>

<script>
import { ref } from "vue";
export default {
  name:"WarningDialog",
  props:{ isDisplay:{ type: Boolean, default: false },
          isDisplay2:{ type: Boolean, default: false },
          location:{ type: String },
          title:{ type: String },
          content:{ type: String },
        },
  emits:["childModel"],
  setup(){
    const input1 = ref(null);
    const clickInput1 = () => input1.value.click();
    return { input1, clickInput1 };
  },
  methods:{
    modelStatue(i, isClear) {
      this.$emit("childModel", i, isClear);
    },
  },
};
</script>
