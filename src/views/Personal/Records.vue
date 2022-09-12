<template>
  <div class="records">
    <img class="bg" :src="killerBgImg"/>
    <div class="leftInfor">
      <Button
        label="Delete"  
        class="p-button-danger bs mb-3"
        style="max-width:100%"
        @click="deleteKiller(killerID)"
      />
      <div class="card">
        <div class="imgBox">
          <img :src="killerCover" alt="killer"/>
        </div>
      </div>
      <div class="content">
        <div>
          <h1>{{killerName}}</h1>
          <p>Difficulty Rating： <span class="difficulty">{{killerDifficulty}}</span> </p>
        </div>
      </div>
      <div class="buttonGroup bs">
        <SplitButton label="Settings" icon="pi pi-bars" :model="items"></SplitButton>
        <Button 
          label="Back"  
          class="p-button-success mt-3"
          style="max-width:100%"
          @click="routerTo('/personal')" 
        /> 
      </div>
    </div>

    <div class="container">
      <div class="killerbg" v-if="killerBackground!=null">
        <h1>Background<span class="bgAll" @click="modalStatue(2)">(Read More)</span></h1>
        <hr class="outDialog">
        <p>{{fillterbg(killerBackground)}}</p>
      </div>

      <div class="skills" v-if=" killerSkills!=null">
        <h1>Skills<span><router-link to="/skills">(Read More)</router-link></span></h1>
        <hr class="outDialog">
        <h3>Self Skills</h3>
        <div class="selfSkills flex">
          <div class="selfSkil" v-for="skill in killerSkills" :key="skill"><img :src="skill"/></div>
        </div>
        <h3>Recommand Skills</h3>
        <div class="reSkills flex">
          <div class="reSkil" v-for="skill in reSkills" :key="skill"><img :src="skill"/></div>
        </div>
      </div>

      <div class="infor" v-if="killerWeapon!=null">
        <h1>Infor</h1>
        <hr class="outDialog">
        <table>
          <tr>
            <th>Type</th>
            <th><span class="value">Content</span></th>
          </tr>
          <tr>
            <td>RealName</td>
            <td><span class="value">{{killerRealName}}</span></td>
          </tr>
          <tr>
            <td>Weapon</td>
            <td><span class="value">{{killerWeapon}}</span></td>
          </tr>
          <tr>
            <td>Power</td>
            <td><span class="value">{{killerPower}}</span></td>
          </tr>
          <tr>
            <td>Movement Speed</td>
            <td><span class="value">{{killerMove}}</span></td>
          </tr>
          <tr v-if="killerAltMove">
            <td>Alternate Movement Speed</td>
            <td><span class="value">{{killerAltMove}}</span></td>
          </tr>
          <tr>
            <td>Terror Radius</td>
            <td><span class="value">{{killerTerror}}</span></td>
          </tr>
          <tr v-if="killerAltTerror">
            <td>Alternate Terror Radius</td>
            <td><span class="value">{{killerAltTerror}}</span></td>
          </tr>
          <tr>
            <td>Height</td>
            <td><span class="value">{{killerHeight}}</span></td>
          </tr>
        </table>
      </div>

      <div class="video">
        <div class="videoHeader flex align-items-center">
          <h1> Video </h1>
          <Button label="Edit" @click="modalStatue(3)" class="p-button-success my-2 mx-2"></Button>
        </div>
        <hr class="outDialog">
        <div class="videos">
          <div class="videoBox" 
            v-for="(video, index) in videoUrl" 
            :key="index" 
            @click="routerTo('/video'); 
            passDataToVideos(video)"
          >
              <figure>
                <video class="Demo" :src="video" alt="video"/>
                <figcaption v-if="index == 0">
                  <h1>VIDEO {{index+1}}</h1>
                  <p>{{killerName}} Trailer</p>
                </figcaption>
                <figcaption v-else>
                  <h1>VIDEO {{index+1}}</h1>
                  <p>{{killerName}} Review</p>
                </figcaption>
              </figure>
          </div>
        </div>
      </div>
    </div>
  </div>

   <!-- 紀錄更改 -->
  <append-record
    :isdisplay="displayModal[0]"
    :killerName="killerName"
    @childmodal="modalStatue"
    @uploadData="onUpload"
    @updateSettings="updateSettings"
  ></append-record>

  <!-- 紀錄儲存警告 -->
  <simple-dialog
    :isdisplay="displayModal[1]" 
    :location="`${killerName} Settings`" 
    @childmodal="modalStatue"
  ></simple-dialog>

  <!-- 背景資料全開 -->
  <simple-dialog 
    :isdisplay2="displayModal[2]" 
    :title="`${killerName} Background`" 
    :content="killerBackground"
    @childmodal="modalStatue"
  />

  <!-- 影片更改 -->
  <append-video 
    :isdisplay="displayModal[3]" 
    :killerID="killerID"
    :videoList="videoList"
    @childmodal="modalStatue"
    @uploadVideo="onUploadVideo"
    @deleteVideo="deleteVideo"
  ></append-video>

  <!-- 背景圖片上傳 -->
  <simple-dialog
    :isdisplay3="displayModal[4]"
    :upload-title="`${killerName} Background`"
    uploadItems="bgImg"
    @upload-doc="onUpload"
    @updateSettings="updateSettings"
    @childmodal="modalStatue"
  ></simple-dialog>
</template>

<script>
import SimpleDialog from "../../components/DialogGroup/SimpleDialog.vue"
import AppendVideo from "../../components/DialogGroup/AppendVideo.vue"
import AppendRecord from "../../components/DialogGroup/AppendRecord.vue"
export default {
  name:"Records",
  components:{ SimpleDialog, AppendVideo, AppendRecord },
  props:{
      killerID:{type: String},
      killerBackground:{type: String},
      killerCover:{type: String},
      killerName:{type:String},
      killerRealName:{type: String},
      killerMove:{type: String},
      killerTerror:{type: String},
      killerAltTerror:{type: String},
      killerHeight:{type: String},
      killerSkills:{type: Array},
      killerAltMove:{type: String},
      killerWeapon:{type: String},
      killerPower:{type: String},
      killerDifficulty:{type: String},
      killerBgImg:{type: String},
      videoNumber:{type: String},
      reSkills:{type: Array}
  },
  methods:{
    fillterbg(background){
      if(!background) return background
      if(background.length > 1000 ){
        return background.slice(0, 1000) + "..."
      }else return background
    },

    passDataToVideos(videoLink){
      this.$router.push({
        path:"/video",
        name:"Video",
        query:{
          videoLink: videoLink
        }
      })
    }
  }
}
</script>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { ref as r, uploadBytes } from "firebase/storage"
import { killersColRef, storage, download } from "@/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()
const Instance = getCurrentInstance()
const displayModal = ref([false])

const videoUrl = ref([])
const videoList = ref([])

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

onMounted(() =>{
  let diff = document.querySelector(".difficulty")
  const textColorMap = {
    "Easy": "rgba(64,176,64)",
    "Moderate": "yellow",
    "Hard": "rgba(229,132,48)",
    "Very Hard": "rgba(239,37,37)"
  }
  const color = textColorMap[diff.textContent]
  document.documentElement.style.setProperty("--difficulty", color)
  
  let videoName = `${Instance.props.killerName}.mp4`
  videoList.value.push(videoName)
  let pathReference = r(storage, `killersVideo/Trailer/${videoName}`)
  download(pathReference, videoUrl.value)
  const videoNumber = parseInt(Instance.props.videoNumber)
  for(let i = 1; i<videoNumber; i++){
    videoName = `${Instance.props.killerName}-00${i}.mp4`
    videoList.value.push(videoName)
    pathReference = r(storage, `killersVideo/Review/${videoName}`)
    download(pathReference, videoUrl.value)
  }
})

const deleteKiller = id => {
  router.push("/personal")
  deleteDoc(doc(killersColRef, id))
}

const deleteVideo = index => {
  console.log(videoList.value, index)
}

// 檢查項目
const isNone = optionsValue => {
  if(!optionsValue || optionsValue.length == 0){
    console.log("該項目不可為空")
    return false
  }else return true
}

//更新資料
const updateSettings = (options, optionsValue) => {
  if(isNone(optionsValue)){
    updateDoc(doc(killersColRef, Instance.props.killerID),{ [options]: optionsValue })
    console.log("updateSettings")
  }
}

// 上傳檔案
const onUpload = (data, file) =>{
  const storageRef = r(storage, `${file}/${data.name}`)
  uploadBytes(storageRef, data).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot)
  })
}

// 上傳影片檔案
const onUploadVideo = (video, kind) =>{
  const videoTrailer = `${Instance.props.killerName}.mp4`
  const videoReview = `${Instance.props.killerName}-00${videoList.value.length}.mp4`
  const videoName = (kind == "Trailer") ? videoTrailer :  videoReview

  const storageRef = r(storage, `killersVideo/${kind}/${videoName}`)
  uploadBytes(storageRef, video).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot)
  })
  updateSettings("videos",videoList.value.length+1)
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