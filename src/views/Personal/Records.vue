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
          @click="back" 
        /> 
      </div>
    </div>
    <Dialog 
      header="Background Image Upload" 
      v-model:visible="displayModal[4]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
      :style="{width: '30vw'}" :modal="true"
    >
      <Button 
        label="Background Image Upload"  
        class="p-button-warning my-2"
        style="max-width:100%"
        @click="clickInput4" 
      />
      <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[11]" @click="updateSettings(killerID, 11, 'backgroundImage',bgImg.value)" autofocus />
      <div v-if="bgImgData!=null" style="transform:scale(90%)" class="flex justify-content-center align-items-center">                     
        <img :src="bgImg">
      </div>
      <input type="file" name="file" ref="input4" style="display:none" @change="previewBg" accept="image/*"/>
      <template #footer>
        <Button label="Complete" @click=" complete(4)" class="p-button-text"/>
      </template>
    </Dialog>

    <Dialog
      :header="`${killerName} Settings`"
      v-model:visible="displayModal[0]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
      :style="{width: '50vw'}" :modal="true"
    >
      <div class="my-2">
        <h3>Real Name</h3>
        <div class="flex align-items-center my-2">
          <InputText placeholder="Real Name" v-model="state.realName" />
          <Button label="Confirm" class="mx-2"  :disabled="disable[0]" @click="updateSettings(killerID, 0, 'realName', state.realName)" autofocus />
        </div>
      </div>
      <hr class="inDialog">
      
      <div class="my-2">
        <div class="flex align-items-center">
          <h3>Background</h3>
          <Button label="Confirm" class="mx-2"  :disabled="disable[1]" @click="updateSettings(killerID, 1, 'background', state.background)" autofocus />
        </div>
        <Textarea class="my-2" placeholder="Background" v-model="state.background" :autoResize="true" rows="5" cols="80" />
      </div>
      <hr class="inDialog">

      <div class="flex flex-column my-2">
        <div class="flex align-items-center">
          <h3>Movement Speed</h3>
          <InputSwitch class="mx-2" v-model="moveChecked" />
          <p>Switch On if you need to edit alternative movement speed</p>
        </div>
        <div class="flex align-items-center">
          <Textarea class="my-2" placeholder="Movement Speed" v-model="state.move" :autoResize="true" rows="1" cols="20" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[2]" @click="updateSettings(killerID, 2, 'move', state.move)" autofocus />
        </div>
        <div class="altmove" v-show="moveChecked">
          <h3>Altnative Movement Speed</h3>
          <div class="flex align-items-center">
            <Textarea class="my-2" placeholder="Altnative Movement Speed" v-model="state.altMove" :autoResize="true" rows="1" cols="30" />
            <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[3]" @click="updateSettings(killerID, 3, 'altMove', state.altMove)" autofocus />
          </div>
        </div>
      </div>
      <hr class="inDialog">

      <div class="flex flex-column my-2">
        <div class="flex align-items-center">
          <h3>Terror Radius</h3>
          <InputSwitch class="mx-2" v-model="terrorChecked" />
          <p>Switch On if you need to edit alternative Terror Radius</p>
        </div>
        <div class="flex align-items-center">
          <Textarea class="my-2" placeholder="Terror Radius" v-model="state.terror" :autoResize="true" rows="1" cols="20" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[4]" @click="updateSettings(killerID, 4, 'terror', state.terror)" autofocus />
        </div>
        <div class="altmove" v-show="terrorChecked">
          <h3>Altnative Terror Radius</h3>
          <div class="flex align-items-center">
            <Textarea class="my-2" placeholder="Altnative Terror Radius" v-model="state.altTerror" :autoResize="true" rows="1" cols="30" />
            <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[12]" @click="updateSettings(killerID, 12, 'altTerror', state.altTerror)" autofocus />
          </div>
        </div>
      </div>
      <hr class="inDialog">

      <div class="my-2">
        <h3>Height</h3>
        <Dropdown
            v-model.trim="state.height"
            :options="heightOptions"
            optionLabel="hei"
            optionValue="hei"
            placeholder="Height"
            class="my-2"
            style="width:20%"
          />
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[5]" @click="updateSettings(killerID, 5, 'height', state.height)" autofocus />
      </div>
      <hr class="inDialog">

      <div class="my-2">
        <h3>Difficulty Rating</h3>
        <Dropdown
          v-model.trim="state.difficulty"
          :options="drOptions"
          optionLabel="dr"
          optionValue="dr"
          placeholder="Difficulty Rating"
          class="my-2"
          style="width:40%"
        />
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[6]" @click="updateSettings(killerID, 6, 'difficulty', state.difficulty)" autofocus />
      </div>
      <hr class="inDialog">

      <div class="my-2">
        <h3>Weapon And Power</h3>
        <div class="flex align-items-center my-1">
          <InputText placeholder="Weapon" v-model="state.weapon" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[7]" @click="updateSettings(killerID, 7, 'weapon', state.weapon)" autofocus />
          <InputText placeholder="Power" class="mx-2" v-model="state.power" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[8]" @click="updateSettings(killerID, 8, 'power', state.power)" autofocus />
        </div>
      </div>
      <hr class="inDialog">

      <div class="my-2">
        <h3>Skills</h3>
        <Button 
          label="Skills Upload"  
          class="p-button-warning my-2"
          style="max-width:100%"
          @click="clickInput1" 
        />
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[9]" @click="updateSettings(killerID, 9, 'skills',sUrl.value)" autofocus />
        <div class="flex">
          <div class="col-3" v-for="(skill, index) in sData" :key="index">
            <div v-if="skill!=null" style="transform:scale(50%)">                     
              <img :src="sUrl[index]">
            </div>
          </div>
        </div>
        <input type="file" name="file" ref="input1" style="display:none" @change="previewS" accept="image/*" multiple/>
        <Button 
          label="Recommand Skills Upload"
          class="p-button-warning my-2"
          style="max-width:100%"
          @click="clickInput2" 
        /> 
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[10]" @click="updateSettings(killerID, 10, 'recommandSkills', rsUrl.value)" autofocus />
        <div class="flex">
          <div class="col-2" v-for="(skill, index) in rsData" :key="index">
            <div v-if="skill!=null" style="transform:scale(50%)">
              <img :src="rsUrl[index]">
            </div>
          </div>
        </div>
        <input type="file" name="file" ref="input2" style="display:none" @change="previewRS" accept="image/*" multiple/>
      </div>

      <template #footer>
          <Button label="No" icon="pi pi-times" @click="modalStatue(1)" class="p-button-text"/>
          <Button label="Complete" icon="pi pi-check" @click="complete(0)" autofocus />
      </template>
    </Dialog>
    <warning-dialog :isdisplay="displayModal[1]" :location="`${killerName} Settings`" @childmodal="modalStatue"></warning-dialog>

    <div class="container">
      <div class="killerbg" v-if="killerBackground!=null">
        <h1>Background<span class="bgAll" @click="modalStatue(2)">(Read More)</span></h1>
        <warning-dialog 
          :isdisplay2="displayModal[2]" 
          :title="`${killerName} Background`" 
          :content="killerBackground"
          @childmodal="modalStatue"
        />
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
          <AppendVideo 
            :isdisplay="displayModal[3]" 
            :killerID="killerID"
            :videoList="videoList"
            @childmodal="modalStatue"
            @uploadVideo="onUploadVideo"
            @deleteVideo="deleteVideo"
          ></AppendVideo>
        </div>
        <input type="file" name="file" ref="input3" style="display:none" @change="previewVideo" accept="video/*"/>
        <hr class="outDialog">
        <div class="videos">
          <div class="videoBox" 
            v-for="(video, index) in videoUrl" 
            :key="index" 
            @click="toVideo(); 
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
</template>

<script>
import WarningDialog from "../../components/DialogGroup/WarningDialog.vue"
import AppendVideo from "../../components/DialogGroup/AppendVideo.vue"
export default {
  name:"Records",
  components:{ WarningDialog, AppendVideo },
  data(){
    return{
      heightOptions: ([{hei:"Tall"}, {hei:"Average"}, {hei:"Short"}]),
      drOptions: ([{dr:"Easy"}, {dr:"Moderate"}, {dr:"Hard"}, {dr:"Very Hard"}]),
    }
  },
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
    fillterTerror(terror){
      if(!terror) return terror
      if(terror.length > 15 ){
        return terror.slice(0, 15) + "..."
      }else return terror
    },
    clickInput1() { this.$refs.input1.click() },
    clickInput2() { this.$refs.input2.click() },
    clickInput3() { this.$refs.input3.click() },
    clickInput4() { this.$refs.input4.click() },

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
import { reactive, ref, onMounted, getCurrentInstance } from "vue"
import { ref as r, uploadBytes, getDownloadURL } from "firebase/storage"
import { killersColRef, storage } from "@/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const moveChecked = ref(false)
const terrorChecked = ref(false)
const Instance = getCurrentInstance()
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

const router = useRouter()

const state = reactive({
  move: "",
  altMove: "",
  terror: "",
  altTerror:"",
  height: "",
  weapon: "",
  power: "",
  background: "",
  realName: "",
  difficulty: "",
})

const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const input4 = ref(null)
const displayModal = ref([false])
const disable = ref([false])

const videoUrl = ref([])
const videoList = ref([])
onMounted(() =>{
  let diff = document.querySelector(".difficulty")
  if(diff.textContent == "Easy"){
    document.documentElement.style.setProperty("--difficulty", "rgba(64,176,64)")
  }else if(diff.textContent == "Moderate"){
    document.documentElement.style.setProperty("--difficulty", "yellow")
  }else if(diff.textContent == "Hard"){
    document.documentElement.style.setProperty("--difficulty", "rgba(229,132,48)")
  }else if(diff.textContent == "Very Hard"){
    document.documentElement.style.setProperty("--difficulty", "rgba(239,37,37)")
  }
  
  let videoName = `${Instance.props.killerName}.mp4`
  videoList.value.push(videoName)
  let pathReference = r(storage, `killersVideo/Trailer/${videoName}`)
  getDownloadURL(pathReference)
    .then((url) => {
      videoUrl.value.push(url)
    })
    .catch((error) => {
      console.log(error)
    })
  const videoNumber = parseInt(Instance.props.videoNumber)
  for(let i = 1; i<videoNumber; i++){
    videoName = `${Instance.props.killerName}-00${i}.mp4`
    videoList.value.push(videoName)
    pathReference = r(storage, `killersVideo/Review/${videoName}`)
    getDownloadURL(pathReference)
      .then((url) => {
        videoUrl.value.push(url)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  console.log(videoList.value)
})

const updateVideoNumeber = n => {
  updateDoc(doc(killersColRef, Instance.props.killerID),{ videos: n })
}

const deleteKiller = id => {
  router.push("/personal")
  deleteDoc(doc(killersColRef, id))
}

const deleteVideo = index => {
  console.log(videoList.value, index)
}

const updateSettings = (id, dis, options, optionsValue) => {
  if(options == "skills"){
      updateDoc(doc(killersColRef, id),{ skills: sUrl.value })
      disable.value[dis] = true
    }else if(options == "recommandSkills"){
      updateDoc(doc(killersColRef, id),{ recommandSkills: rsUrl.value })
      disable.value[dis] = true
    }else if(options == "backgroundImage"){
      updateDoc(doc(killersColRef, id),{ bgImg: bgImg.value })
      disable.value[dis] = true
    }
  else if(isNone(optionsValue)){
    console.log("skills pass")
    switch (options){
      case "difficulty":
        updateDoc(doc(killersColRef, id),{ difficulty: state.difficulty })
        break
      case "background":
        updateDoc(doc(killersColRef, id),{ background: state.background })
        break
      case "move":
        updateDoc(doc(killersColRef, id),{ movementSpeed: state.move })
        break
      case "altMove":
        updateDoc(doc(killersColRef, id),{ altnativeMoveSpeed: state.altMove })
        break
      case "terror":
        updateDoc(doc(killersColRef, id),{ terrorRadius: state.terror })
        break 
      case "altTerror":
        updateDoc(doc(killersColRef, id),{ altnativeTerrorRadius: state.altTerror })
        break 
      case "height":
        updateDoc(doc(killersColRef, id),{ height: state.height })
        break
      case "weapon":
        updateDoc(doc(killersColRef, id),{ weapon: state.weapon })
        break
      case "power":
        updateDoc(doc(killersColRef, id),{ power: state.power })
        break
      case "realName":
        updateDoc(doc(killersColRef, id),{ realName: state.realName })
        break
    }
    disable.value[dis] = true
  }
  console.log("updateSettings")
}

const isNone = optionsValue => {
  if(!optionsValue){
    displayModal.value[3] = true
    return false
  }else return true
}

const sUrl = ref([])
const sData = ref([])
const rsUrl = ref([])
const rsData = ref([])
const bgImgData = ref("")
const bgImg = ref("")

const complete = m => {
  sUrl.value = []
  sData.value = []
  rsUrl.value = []
  rsData.value = []
  bgImg.value = ""
  bgImgData.value = ""
  displayModal.value[m] = false
  router.push("/personal")
}

const previewS = event => {
  const files = event.target.files
  for(let i = 0;i<files.length;i++){
    const filename = files[i].name
    if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!")
    }
    const fileReader = new FileReader()
    fileReader.addEventListener("load",()=>{
      sUrl.value[i] = fileReader.result
    })
    fileReader.readAsDataURL(files[i])
    sData.value[i] = files[i]
    onUpload(files[i])
  }
}

const previewRS = event => {
  const files = event.target.files
  for(let i = 0;i<files.length;i++){
    const filename = files[i].name
    if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!")
    }
    const fileReader = new FileReader()
    fileReader.addEventListener("load",()=>{
      rsUrl.value[i] = fileReader.result
    })
    fileReader.readAsDataURL(files[i])
    rsData.value[i] = files[i]
    onUpload(files[i])
  }
}

const previewBg = event => {
  const files = event.target.files
    const filename = files[0].name
    if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!")
    }
    const fileReader = new FileReader()
    fileReader.addEventListener("load",()=>{
      bgImg.value = fileReader.result
    })
    fileReader.readAsDataURL(files[0])
    bgImgData.value = files[0]
    onUploadBgImg(files[0])
}

const onUpload = img =>{
  const storageRef = r(storage, `killersSkills/${img.name}`)
  uploadBytes(storageRef, img).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot)
  })
}

const onUploadBgImg = bg =>{
  const storageRef = r(storage, `killersBgImg/${bg.name}`)
  uploadBytes(storageRef, bg).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot)
  })
}

const onUploadVideo = (video, kind) =>{
  const videoTrailer = `${Instance.props.killerName}.mp4`
  const videoReview = `${Instance.props.killerName}-00${videoList.value.length}.mp4`
  const videoName = (kind == "Trailer") ? videoTrailer :  videoReview

  const storageRef = r(storage, `killersVideo/${kind}/${videoName}`)
  uploadBytes(storageRef, video).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot)
  })
  console.log(videoList.value.length)
  updateVideoNumeber(videoList.value.length+1)
}

const back = () => {
  router.push("/personal")
}

const toVideo = () => {
  router.push("/video")
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