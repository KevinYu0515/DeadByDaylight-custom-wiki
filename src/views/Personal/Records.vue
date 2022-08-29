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
          <p>Move： {{killerMove}} </p>
          <br>
          <p>Terror： {{killerTerror}} m</p>
          <br>
          <p>Height： {{killerHeight}}</p>
      </div>
    </div>
       <Button 
        label="Settings"  
        class="p-button-warning bs"
        style="max-width:100%"
        @click="modalStatue" 
      /> 
      <Button 
        label="Back"  
        class="p-button-success bs"
        style="max-width:100%"
        @click="back" 
      /> 
      <Dialog 
        :header="`${killerName} Settings`"
        v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
        :style="{width: '50vw'}" :modal="true"
      >
        <h3>Real Name</h3>
        <div class="flex align-items-center my-2">
          <InputText placeholder="Real Name" :modelValue="killerRealName" v-model.trim="realName" />
        </div>
        <h3>Background</h3>
        <Textarea class="my-2" placeholder="Background" :modelValue="killerBackground" v-model.trim="background" :autoResize="true" rows="5" cols="80" />
        <h3>Movement Speed</h3>
        <div class="flex align-items-center my-2">
          <InputText placeholder="Movement Speed" :modelValue="killerMove" v-model.trim="move" />
          <p class="mx-2">m/s</p>
        </div>
        <h3>Altnative Movement Speed</h3>
        <Textarea class="my-2" placeholder="Altnative Movement Speed" :modelValue="killerAltMove" v-model.trim="altmove" :autoResize="true" rows="5" cols="30" />
        <h3>Terror Radius</h3>
        <Textarea class="my-2" placeholder="Terror Radius" :modelValue="killerTerror" v-model.trim="terror" :autoResize="true" rows="5" cols="30" />
        <h3>Height</h3>
        <Dropdown
            v-model.trim="height"
            :options="heightOptions"
            optionLabel="hei"
            optionValue="hei"
            placeholder="Height"
            class="mx-1 my-1"
            style="width:20%"
          />
        <h3>Weapon And Power</h3>
        <div class="flex align-items-center my-2">
          <InputText placeholder="Weapon" :modelValue="killerWeapon" v-model.trim="weapon" />
          <InputText placeholder="Power" class="mx-2" :modelValue="killerPower" v-model.trim="power" />
        </div>
        <h3>Skills</h3>
        <Button 
          label="Skills Upload"  
          class="p-button-warning my-2"
          style="max-width:100%"
          @click="input1" 
        />
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
          @click="input2" 
        /> 
        <div class="flex">
          <div class="col-2" v-for="(skill, index) in rsData" :key="index">
            <div v-if="skill!=null" style="transform:scale(50%)">               
              <img :src="rsUrl[index]">
            </div>
          </div>
        </div>
        <input type="file" name="file" ref="input2" style="display:none" @change="previewRS" accept="image/*" multiple/>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="modalStatue" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" @click="updateSettings(killerID)" autofocus />
        </template>
      </Dialog>
    </div>

    <div class="container">
      <div class="killerbg" v-if="killerBackground!=null">
        <h1>Background</h1>
        <hr>
        <p>{{killerBackground}}</p>
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
        <p>RealName：{{killerRealName}}<br> Weapon：{{killerWeapon}}<br> Power：{{killerPower}}<br> 
          <span v-if="killerAltMove">Alternate Movement Speed：{{killerAltMove}}</span>
        </p>
      </div>
      <div class="video">
        <h1>Video</h1>
        <hr>
        <div class="videos">
          <div class="videoBox">
            <figure>
              <img :src="require('@/assets/picture/test.png')" alt="video">
              <figcaption>
                <h1>VIDEO 1</h1>
                <p>test....</p>
              </figcaption>
            </figure>
          </div>
          <div class="videoBox">
            <figure>
              <img :src="require('@/assets/picture/test.png')" alt="video">
              <figcaption>
                <h1>VIDEO 2</h1>
                <p>test....</p>
              </figcaption>
            </figure>
          </div>
          <div class="videoBox">
            <figure>
              <img :src="require('@/assets/picture/test.png')" alt="video">
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
      reSkills:{type: Array},
  },
  methods:{
    previewS(event){
      const files = event.target.files
      for(let i = 0;i<files.length;i++){
        const filename = files[i].name
        if (filename.lastIndexOf(".") <= 0){
          return alert("Please add a valid file!")
        }
        const fileReader = new FileReader()
        fileReader.addEventListener("load",()=>{
          this.sUrl[i] = fileReader.result
        })
        fileReader.readAsDataURL(files[i])
        this.sData[i] = files[i]
        this.onUpload(files[i])
      }
    },
    previewRS(event){
      const files = event.target.files
      for(let i = 0;i<files.length;i++){
        const filename = files[i].name
        if (filename.lastIndexOf(".") <= 0){
          return alert("Please add a valid file!")
        }
        const fileReader = new FileReader()
        fileReader.addEventListener("load",()=>{
          this.rsUrl[i] = fileReader.result
        })
        fileReader.readAsDataURL(files[i])
        this.rsData[i] = files[i]
        this.onUpload(files[i])
      }
    },
    onUpload(img){
      const storageRef = r(storage, `killersSkills/${img.name}`)
      uploadBytes(storageRef, img).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot)
      })
    },
    input1() { this.$refs.input1.click() },
    input2() { this.$refs.input2.click() },
  }
}
</script>
<script setup>
import { ref } from "vue"
import { ref as r, uploadBytes } from "firebase/storage"
import { db, storage } from "@/firebase"
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()
const displayModal = ref(false)
const sUrl = ref([])
const sData = ref([])
const rsUrl = ref([])
const rsData = ref([])
const move = ref("")
const altmove = ref("")
const terror = ref("")
const height = ref("")
const weapon = ref("")
const power = ref("")
const background = ref("")
const realName = ref("")

const modalStatue = () => {
  displayModal.value = displayModal.value ? false : true
}
const deleteKiller = id => {
  router.push("/personal")
  deleteDoc(doc(collection(db, "killers"), id))
}

const updateSettings = id => {
  updateDoc(doc(collection(db, "killers"), id),  {
    background: background.value,
    movementSpeed: move.value,
    altnativeMoveSpeed: altmove.value,
    terrorRadius: terror.value,
    height: height.value,
    weapon: weapon.value,
    power: power.value,
    skills: sUrl.value,
    recommandSkills: rsUrl.value,
    realName: realName.value
  })
  sUrl.value = []
  sData.value = []
  rsUrl.value = []
  rsData.value = []
  displayModal.value = false
  router.push("/personal")
}

const back = () => {
  router.push("/personal")
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/records.scss";
</style>