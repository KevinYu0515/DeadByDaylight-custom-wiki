<template>
  <!-- 警告視窗 -->
  <Dialog 
    header="Warning" 
    v-model:visible="isDisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
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
    :header="`${title}`" 
    v-model:visible="isDisplay2" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '60vw'}" :modal="true"
  >
  <p style="white-space:pre-wrap">{{content}}</p>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="modalStatue(2)" class="p-button-text"/>
    </template>
  </Dialog>

  <!-- 單純上傳視窗 -->
  <Dialog 
      :header="`${uploadTitle} Upload`"
      v-model:visible="isDisplay3" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
      :style="{width: '30vw'}" :modal="true"
    >
      <Button 
        label="Upload"  
        class="p-button-warning my-2"
        style="max-width:100%"
        @click="clickInput1" 
      />
      <div v-if="ImgData!=null" style="transform:scale(90%)" class="flex justify-content-center align-items-center">                     
        <img :src="ImgUrl">
      </div>
      <input type="file" name="file" ref="input1" style="display:none" @change="preview" accept="image/*"/>
      <template #footer>
        <Button label="Confirm" v-show="ImgData" @click="confirm(uploadItems, ImgData, ImgUrl)" class="p-button-text"/>
        <Button label="Close" @click="modalStatue(close3)" class="p-button-text"/>
      </template>
    </Dialog>
</template>

<script>
import { ref } from "vue"
export default {
  name:"WarningDialog",
  props:{ isDisplay:{ type: Boolean, default: false },
          isDisplay2:{ type: Boolean, default: false },
          isDisplay3:{ type: Boolean, default: false },
          close3: { type: Number },
          location:{ type: String },
          title:{ type: String },
          content:{ type: String },
          uploadTitle:{ type: String },
          uploadItems:{ type: String }
        },
  emits:["childModal", "uploadDoc","updateSettings"],
  setup(){
    const input1 = ref(null)
    const clickInput1 = () => input1.value.click()
    return { input1, clickInput1 }
  },
  data() {
    return{
      ImgData: null,
      ImgUrl: null
    }
  },
  methods:{
    modalStatue(i, isClear) {
      this.$emit("childModal", i, isClear)
    },

    preview(event) {
      const files = event.target.files
      const filename = files[0].name
      if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!")
      }
      const fileReader = new FileReader()
      fileReader.addEventListener("load",()=>{
      this.ImgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.ImgData = files[0]
    },

    confirm(select, data, url) { 
      this.$emit("uploadDoc", data, "killersBgImg")
      this.$emit("updateSettings", select, url)
      this.modalStatue(4)
      this.ImgUrl = null
      this.ImgData = null
      this.$router.push("/personal")
    },
  },
}
</script>
