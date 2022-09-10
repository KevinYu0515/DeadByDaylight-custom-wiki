<template>
  <!-- 警告視窗 -->
  <Dialog 
    header="Warning" 
    v-model:visible="isdisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '40vw'}" :modal="true"
  >
    <p>你於 「{{location}}」所作的紀錄將不會儲存，確定要退出?</p>
    <template #footer>
    <Button label="Yes" icon="pi pi-check" @click="modalStatue(1); modalStatue(0, true)" class="p-button-text"/>
    <Button label="No" icon="pi pi-times" @click="modalStatue(1)" class="p-button-text"/>
    </template>
  </Dialog>

  <!-- 全部內容視窗 -->
  <Dialog 
    :header="`${killerName} Background`" 
    v-model:visible="isdisplay2" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '60vw'}" :modal="true"
  >
  <p>{{content}}</p>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="modalStatue(2)" class="p-button-text"/>
    </template>
  </Dialog>
</template>

<script>
export default {
  name:"WarningDialog",
  props:{ isdisplay:{ type: Boolean, deafult:false },
          isdisplay2:{ type: Boolean, deafult:false },
          location:{ type: String },
          killerName:{ type: String },
          content:{ type: String }
        },
  methods:{
    modalStatue(i, isClear){
      console.log("childmodal", this.isdisplay)
      this.$emit("childmodal", i, isClear)
    }
  },
}
</script>