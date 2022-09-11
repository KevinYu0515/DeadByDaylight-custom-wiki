<template>
  <Dialog
    header="Editting Videos" 
    v-model:visible="isdisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :modal="true"
  >
  <div class="flex align-items-center mt-1 grid">
    <Button label="Upload" @click="clickInput1" class="p-button-success col-2"></Button>
    <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="mp4/*" required/>
    <p class="mx-4" v-if="videoData!=null">{{videoData.name}}</p>
    <Button label="Add" v-if="videoUrl!=null" @click="addToDoc(false)" class="p-button-infor col-2"></Button>
    <Button icon="pi pi-times" v-if="videoUrl!=null" @click="addToDoc(true)" class="p-button-danger mx-2 col-1"></Button>
    <div class="field-checkbox grid col-12" v-if="videoData!=null">
      <div class="col-12" v-show="!checked[1]">
        <Checkbox inputId="trailer"  v-model="checked[0]" :binary="true" />
        <label for="trailer" class="ml-2">Offical Trailer</label>
      </div>
      <div class="col-12" v-show="!checked[0]">
        <Checkbox inputId="review"  v-model="checked[1]" :binary="true" />
        <label for="review" class="ml-2">Game Review</label>
      </div>
    </div>
  </div>
  <hr class="inDialog">
  <table class="ml-1">
    <tr class="videoList" v-for="(videoName, index) in videoList" :key="index">
      <td>{{index+1}}.</td>
      <td>{{videoName}}</td>
      <Button icon="pi pi-times" @click="deleteVideo(index)" class="p-button-text mx-2"></Button>
    </tr>
  </table>
  <template #footer>
        <Button label="Close" icon="pi pi-sign-in" @click="modalStatue(3)" class="p-button-text"/>
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
const props = defineProps(["isdisplay", "killerID","videoList"])
const isdisplay = ref(null)
const killerID = ref(null)
const videoList = ref([])
const checked = ref([false])
onUpdated(() => {
    isdisplay.value = props.isdisplay
    killerID.value = props.killerID
    videoList.value = props.videoList
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
}

const addToDoc = isClear => {
    if(!isClear){
      const checkedValue = checked.value[0] ? "Trailer" : "Review"
      emits("uploadVideo", videoData.value, checkedValue)
    }
    videoUrl.value = null
    videoData.value = null
}

const deleteVideo = video => {
  console.log(video)
  emits("deleteVideo", video)
}

const modalStatue = (i, isClear) => {
    emits("childmodal", i, isClear)
}

const emits = defineEmits(["childmodal", "uploadVideo", "deleteVideo"])
</script>

<style lang="scss" scoped>

 table {
    border-collapse: collapse;
    max-width: 100%;
    td{
      text-align: center;
      font-family: "Amaranth";
      text-align: left;
      color:rgb(17, 41, 176);
      padding: 8px;
    }
    th {
      text-align: center;
      font-family: "Amaranth";
      text-align: left;
      color:rgb(35, 35, 28);
      padding: 8px;
    }
}

</style>