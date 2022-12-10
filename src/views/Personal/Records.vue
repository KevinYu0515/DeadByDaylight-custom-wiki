<template>
  <!-- <img class="bg fixed h-auto opacity-10 w-full" :src="killer_information.backgroundImage"/> -->
  <div class="records flex justify-content-center align-items-center">
    <div class="leftInfor flex justify-content-center align-items-center flex-column absolute z-5">
      <Button
        label="Delete"  
        class="p-button-danger bs mb-3"
        style="max-width:100%"
        @click="deleteKiller(killer_information.id)"
      />
      <div class="card relative overflow-hidden">
        <div class="imgBox absolute top-0 left-0 w-full h-full">
          <img class="absolute top-0 left-0 w-full h-full" :src="killer_information.cover" alt="killer"/>
        </div>
      </div>
      <div class="content flex justify-content-center align-items-center relative">
        <div>
          <h1>{{killer_information.name}}</h1>
          <p>Difficulty Rating： <span class="difficulty">{{killer_information.difficulty}}</span> </p>
        </div>
      </div>
      <div class="buttonGroup bs">
        <SplitButton data-type="settings" label="Settings" icon="pi pi-bars" :model="items"></SplitButton>
        <Button 
          label="Back"
          data-type="back"  
          class="p-button-success mt-3"
          @click="routerTo('/personal')" 
        /> 
      </div>
    </div>

    <div class="container flex flex-column relative">
      <div class="perks mb-5 flex justify-content-center align-items-start flex-column relative" v-if="(killer_information.perks[0])">
        <h1>Perks<span><router-link to="/skills">(Read More)</router-link></span></h1>
        <hr class="outDialog">
        <h3>Self Perks</h3>
        <div class="selfPerks flex" v-if="(killer_information.perks[0])">
          <div class="selfPerks__item" v-for="perk in killer_information.perks" :key="perk"><img :src="perk" width="130" height="130"/></div>
        </div>
        <h3>Recommend Perks</h3>
        <div class="recommendPerks flex" v-if="(killer_information.recommendPerks[0])">
          <div class="recommendPerks__item" v-for="perk in killer_information.recommendPerks" :key="perk"><img :src="perk" width="130" height="130"/></div>
        </div>
      </div>

      <div class="infor mb-5 relative">
        <h1>Infor</h1>
        <hr class="outDialog">
        <table>
          <tr>
            <th>Type</th>
            <th><span class="value">Content</span></th>
          </tr>
          <tr>
            <td>RealName</td>
            <td><span class="value">{{killer_information.realName}}</span></td>
          </tr>
          <tr>
            <td>Weapon</td>
            <td><span class="value">{{killer_information.weapon}}</span></td>
          </tr>
          <tr>
            <td>Power</td>
            <td><span class="value">{{killer_information.power}}</span></td>
          </tr>
          <tr>
            <td>Movement Speed</td>
            <td><span class="value">{{killer_information.movementSpeed}}</span></td>
          </tr>
          <tr v-if="killer_information.alternativeMovementSpeed">
            <td>Alternate Movement Speed</td>
            <td><span class="value">{{killer_information.alternativeMovementSpeed}}</span></td>
          </tr>
          <tr>
            <td>Terror Radius</td>
            <td><span class="value">{{killer_information.terrorRadius}}</span></td>
          </tr>
          <tr v-if="killer_information.alternativeTerrorRadius">
            <td>Alternate Terror Radius</td>
            <td><span class="value">{{killer_information.alternativeTerrorRadius}}</span></td>
          </tr>
          <tr>
            <td>Height</td>
            <td><span class="value">{{killer_information.height}}</span></td>
          </tr>
        </table>
      </div>
      <div class="add-ones-container mb-5 relative" v-if="(killer_information.add_ones_images[0])">
        <h1>Add-Ones</h1>
        <div v-for="(add_ones_image, index) in killer_information.add_ones_images" :key="index">
          <div class="add-ones-block">
            <img :src="add_ones_image" width="100" height="100" alt="" class=""/>
            <p class="add-ones-name">{{ killer_information.add_ones_names[index] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

   <!-- 紀錄更改 -->
  <append-record
    :isdisplay="displayModal[0]"
    :killer_information="JSON.stringify(killer_information)"
    @childmodal="modalStatue"
    @uploadData="onUpload"
    @updateSettings="updateSettings"
  ></append-record>

  <!-- 紀錄儲存警告 -->
  <simple-dialog
    :isdisplay="displayModal[1]" 
    :location="`${killer_information.name} Settings`" 
    @childmodal="modalStatue"
  ></simple-dialog>

  <!-- 背景圖片上傳 -->
  <simple-dialog
    :isdisplay3="displayModal[4]"
    :upload-title="`${killer_information.name} Background`"
    :close3= 4
    uploadItems="bgImg"
    @upload-doc="onUpload"
    @updateSettings="updateSettings"
    @childmodal="modalStatue"
  ></simple-dialog>
</template>

<script>
import SimpleDialog from "../../components/DialogGroup/SimpleDialog.vue"
import AppendRecord from "../../components/DialogGroup/AppendRecord.vue"
import json from "../../../python/killers.json"
export default {
  name:"Records",
  components:{ SimpleDialog, AppendRecord },
  props: [ "killer_information" ],
  data () {
    return {
      jsonKillers: json
    }
  },
  methods:{
    fillterbg(background){
      if(!background) return background
      if(background.length > 1000 ){
        return background.slice(0, 1000) + "..."
      }else return background
    },

    passDataToVideos(videoLink, videoIndex, videoUrl, videoBg){
      this.$router.push({
        path:"/video",
        name:"Video",
        query:{
          videoLink: videoLink,
          videoIndex: videoIndex,
          videoUrl: videoUrl,
          videoBg: videoBg
        }
      })
    }
  }
}
</script>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { ref as r, uploadBytes } from "firebase/storage"
import { killersColRef, storage } from "@/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()
const Instance = getCurrentInstance()
const killer_information = JSON.parse(Instance.props.killer_information)
const displayModal = ref([false])

// const videoUrl = ref([])
// const videoList = ref([])

const items =  ref([
{
  label: "Base Information",
  icon: "pi pi-cog",
  command: () => { modalStatue(0) }
},
{
  label: "Background",
  icon: "pi pi-cog",
  command: () => { modalStatue(4) }
}
])

onMounted(() => {
  let diff = document.querySelector(".difficulty")
  const textColorMap = {
    "Easy": "rgba(64,176,64)",
    "Moderate": "yellow",
    "Hard": "rgba(229,132,48)",
    "Very Hard": "rgba(239,37,37)"
  }

  const color = textColorMap[diff.textContent]
  document.documentElement.style.setProperty("--difficulty", color)
  
  // let videoName = `${Instance.props.killerName}.mp4`
  // videoList.value.push(videoName)
  // let pathReference = r(storage, `killersVideo/Trailer/${videoName}`)
  // download(pathReference, videoUrl.value)
  // const videoNumber = parseInt(Instance.props.videoNumber)
  // for(let i = 1; i<videoNumber; i++){
  //   videoName = `${Instance.props.killerName}-00${i}.mp4`
  //   videoList.value.push(videoName)
  //   pathReference = r(storage, `killersVideo/Review/${videoName}`)
  //   download(pathReference, videoUrl.value)
  // }
})

const deleteKiller = id => {
  router.push("/personal")
  deleteDoc(doc(killersColRef, id))
}

//更新資料
const updateSettings = (options, optionsValue) => {
  updateDoc(doc(killersColRef, killer_information.id),{ [options]: optionsValue })
  console.log("updateSettings")
}

// 上傳檔案
const onUpload = (data, file) =>{
  const storageRef = r(storage, `${file}/${data.name}`)
  uploadBytes(storageRef, data).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot)
  })
}

const routerTo = path => {
  router.push(`${path}`)
}

const modalStatue = i => {
  displayModal.value[i] = !displayModal.value[i]
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/records.scss";
</style>

<style scoped>
@import "../../assets/css/index.css";
</style>