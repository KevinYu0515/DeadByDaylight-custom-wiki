<template>
  <div class="records">
    <img class="bg" :src="require('@/assets/picture/trapperBg.png')"/>
    <div class="leftBg">
      <Button
        label="Delete"  
        class="p-button-danger bs"
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
       <Button 
        label="Settings"  
        class="p-button-warning bs"
        style="max-width:100%"
        @click="modalStatue(0)" 
      /> 
      <Button 
        label="Back"  
        class="p-button-success bs"
        style="max-width:100%"
        @click="back" 
      /> 
      <Dialog 
        :header="`${killerName} Settings`"
        v-model:visible="displayModal[0]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
        :style="{width: '50vw'}" :modal="true"
      >
        <h3>Real Name</h3>
        <div class="flex align-items-center my-2">
          <InputText placeholder="Real Name" v-model="state.realName" />
          <Button label="Confirm" class="mx-2"  :disabled="disable[0]" @click="updateSettings(killerID, 0, 'realName', state.realName)" autofocus />
        </div>
        <div class="flex align-items-center">
          <h3>Background</h3>
          <Button label="Confirm" class="mx-2"  :disabled="disable[1]" @click="updateSettings(killerID, 1, 'background', state.background)" autofocus />
        </div>
        <Textarea class="my-2" placeholder="Background" v-model="state.background" :autoResize="true" rows="5" cols="80" />
        <h3>Movement Speed</h3>
        <div class="flex align-items-center my-2">
          <InputText placeholder="Movement Speed" v-model="state.move" />
          <p class="mx-2"></p>
          <Button label="Confirm" class="mx-2"  :disabled="disable[2]" @click="updateSettings(killerID, 2, 'move', state.move)" autofocus />
        </div>
        <h3>Altnative Movement Speed</h3>
        <Textarea class="my-2" placeholder="Altnative Movement Speed" v-model="state.altMove" :autoResize="true" rows="5" cols="30" />
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[3]" @click="updateSettings(killerID, 3, 'altMove', state.altMove)" autofocus />
        <h3>Terror Radius</h3>
        <Textarea class="my-2" placeholder="Terror Radius" v-model="state.terror" :autoResize="true" rows="5" cols="30" />
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[4]" @click="updateSettings(killerID, 4, 'terror', state.terror)" autofocus />
        <h3>Height</h3>
        <Dropdown
            v-model.trim="state.height"
            :options="heightOptions"
            optionLabel="hei"
            optionValue="hei"
            placeholder="Height"
            class="mx-1 my-1"
            style="width:20%"
          />
        <Button label="Confirm" class="mx-2 my-1"  :disabled="disable[5]" @click="updateSettings(killerID, 5, 'height', state.height)" autofocus />
        <h3>Difficulty Rating</h3>
        <Dropdown
          v-model.trim="state.difficulty"
          :options="drOptions"
          optionLabel="dr"
          optionValue="dr"
          placeholder="Difficulty Rating"
          class="mx-1 my-1"
          style="width:40%"
        />
        <Button label="Confirm" class="mx-2 my-1"  :disabled="disable[6]" @click="updateSettings(killerID, 6, 'difficulty', state.difficulty)" autofocus />
        <h3>Weapon And Power</h3>
        <div class="flex align-items-center my-1">
          <InputText placeholder="Weapon" v-model="state.weapon" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[7]" @click="updateSettings(killerID, 7, 'weapon', state.weapon)" autofocus />
          <InputText placeholder="Power" class="mx-2" v-model="state.power" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[8]" @click="updateSettings(killerID, 8, 'power', state.power)" autofocus />
        </div>
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
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="modalStatue(1)" class="p-button-text"/>
            <Button label="Complete" icon="pi pi-check" @click="complete" autofocus />
        </template>
      </Dialog>
      <Dialog 
          header="Warning" 
          v-model:visible="displayModal[1]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '30vw'}" :modal="true"
        >
        <p>你所作的紀錄將不會儲存，確定要退出?</p>
          <template #footer>
            <Button label="Yes" icon="pi pi-check" @click="modalStatue(1); modalStatue(0);" class="p-button-text"/>
            <Button label="No" icon="pi pi-times" @click="modalStatue(1)" class="p-button-text"/>
          </template>
        </Dialog>
    </div>

    <div class="container">
      <div class="killerbg" v-if="killerBackground!=null">
        <h1>Background<span class="bgAll" @click="modalStatue(2)">(Read More)</span></h1>
        <Dialog 
          :header="`${killerName} Background`" 
          v-model:visible="displayModal[2]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '60vw'}" :modal="true"
        >
        <p>{{killerBackground}}</p>
          <template #footer>
            <Button label="No" icon="pi pi-times" @click="modalStatue(2)" class="p-button-text"/>
          </template>
        </Dialog>
        <hr>
        <p>{{fillterbg(killerBackground)}}</p>
      </div>
      <div class="skills" v-if=" killerSkills!=null">
        <h1>Skills<span><router-link to="/skills">(Read More)</router-link></span></h1>
        <hr>
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
         <hr>
        <p>
          RealName：<span class="value">{{killerRealName}}</span><br>
          Weapon：<span class="value">{{killerWeapon}}</span><br>
          Power：<span class="value">{{killerPower}}</span><br> 
          Movement Speed：<span class="value">{{killerMove}}</span><br>
          Terror Radius：<span class="value">{{killerTerror}}</span><br>
          Height：<span class="value">{{killerHeight}}</span><br>
          <span v-if="killerAltMove">Alternate Movement Speed：<span class="value">{{killerAltMove}}</span><br></span>
        </p>
      </div>
      <div class="video">
        <h1>Video</h1>
        <hr>
        <div class="videos">
          <div class="videoBox" @click="toVideo">
              <figure>
                <video :src="require('@/assets/video/defaultAnimation.mp4')" alt="video"/>
                <figcaption>
                  <h1>VIDEO 1</h1>
                  <p>test....</p>
                </figcaption>
              </figure>
          </div>
          <div class="videoBox">
            <figure>
              <video :src="require('@/assets/video/defaultAnimation.mp4')" alt="video"/>
              <figcaption>
                <h1>VIDEO 2</h1>
                <p>test....</p>
              </figcaption>
            </figure>
          </div>
          <div class="videoBox">
            <figure>
              <video :src="require('@/assets/video/defaultAnimation.mp4')" alt="video"/>
              <figcaption>
                <h1>VIDEO 3</h1>
                <p>test....</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      killerName:{type: String},
      killerRealName:{type: String},
      killerMove:{type: String},
      killerTerror:{type: String},
      killerHeight:{type: String},
      killerSkills:{type: Array},
      killerAltMove:{type: String},
      killerWeapon:{type: String},
      killerPower:{type: String},
      killerDifficulty:{type: String},
      reSkills:{type: Array},
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
  }
}
</script>
<script setup>
import { reactive, ref, onMounted } from "vue"
import { ref as r, uploadBytes } from "firebase/storage"
import { db, storage } from "@/firebase"
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()
const sUrl = ref([])
const sData = ref([])
const rsUrl = ref([])
const rsData = ref([])

const state = reactive({
  move: "",
  altMove: "",
  terror: "",
  height: "",
  weapon: "",
  power: "",
  background: "",
  realName: "",
  difficulty: ""
})

const input1 = ref(null)
const input2 = ref(null)
const displayModal = ref([false])
const disable = ref([false])


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
})

const deleteKiller = id => {
  router.push("/personal")
  deleteDoc(doc(collection(db, "killers"), id))
}

const updateSettings = (id, dis, options, optionsValue) => {
  if(options == "skills"){
      updateDoc(doc(collection(db, "killers"), id),{ skills: sUrl.value })
      disable.value[dis] = true
    }else if(options == "recommandSkills"){
      updateDoc(doc(collection(db, "killers"), id),{ recommandSkills: rsUrl.value })
      disable.value[dis] = true
  }
  else if(isNone(optionsValue)){
    console.log("skills pass")
    switch (options){
      case "difficulty":
        updateDoc(doc(collection(db, "killers"), id),{ difficulty: state.difficulty })
        break
      case "background":
        updateDoc(doc(collection(db, "killers"), id),{ background: state.background })
        break
      case "move":
        updateDoc(doc(collection(db, "killers"), id),{ movementSpeed: state.move })
        break
      case "altMove":
        updateDoc(doc(collection(db, "killers"), id),{ altnativeMoveSpeed: state.altMove })
        break
      case "terror":
        updateDoc(doc(collection(db, "killers"), id),{ terrorRadius: state.terror })
        break 
      case "height":
        updateDoc(doc(collection(db, "killers"), id),{ height: state.height })
        break
      case "weapon":
        updateDoc(doc(collection(db, "killers"), id),{ weapon: state.weapon })
        break
      case "power":
        updateDoc(doc(collection(db, "killers"), id),{ power: state.power })
        break
      case "realName":
        updateDoc(doc(collection(db, "killers"), id),{ realName: state.realName })
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

const complete = () => {
  sUrl.value = []
  sData.value = []
  rsUrl.value = []
  rsData.value = []
  displayModal.value[0] = false
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

const onUpload = img =>{
  const storageRef = r(storage, `killersSkills/${img.name}`)
  uploadBytes(storageRef, img).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot)
  })
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