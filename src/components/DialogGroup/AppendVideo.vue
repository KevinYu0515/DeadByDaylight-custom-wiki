<template>
  <Dialog
    header="Editting Videos" 
    v-model:visible="isdisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :modal="true"
  >
  <div class="flex align-items-center">
    <Button label="Upload" @click="clickInput1" class="p-button-success"></Button>
    <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="mp4/*" required/>
    <p class="mx-4" v-if="videoData!=null">{{videoData.name}}</p>
    <Button label="Add" v-if="videoUrl!=null" @click="addToDoc" class="p-button-infor"></Button>
  </div>
  <template #footer>
        <Button label="Close" icon="pi pi-trash" @click="modalStatue(3)" class="p-button-text"/>
    </template>
  </Dialog>
</template>

<script>
export default {
    name:"AppendVideo"
}
</script>

<script setup>
import { defineProps, defineEmits, ref, onUpdated } from "vue"
const props = defineProps(["isdisplay", "killerID"])
const isdisplay = ref(null)
const killerID = ref(null)
onUpdated(() => {
    isdisplay.value = props.isdisplay
    killerID.value = props.killerID
})

const input1 = ref(null)
const clickInput1 = () => {
    input1.value.click()
}

const videoData = ref(null)
const videoUrl = ref(null)
const previewImage = event => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener("load",()=>{
    videoUrl.value = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  videoData.value = files[0]
  emits("uploadVideo", files[0])
}

const addToDoc = () => {
    emits("addToDoc", killerID.value, videoUrl.value)
    videoUrl.value = null
    videoData.value = null
}

const modalStatue = (i, isClear) => {
    emits("childmodal", i, isClear)
}

const emits = defineEmits(["childmodal", "uploadVideo", "addToDoc"])
</script>

<style>

</style>