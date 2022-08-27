<template>
  <div class="records">
    <div class="leftBg">
      <div class="card">
        <div class="imgBox">
          <img :src="killerCover" alt="killer"/>
        </div>
      </div>
      <div class="content">
        <div>
          <h1>{{killerName}}</h1>
          <p>Move： {{killerMove}} m/s</p>
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
        label="Delete"  
        class="p-button-danger bs"
        style="max-width:100%"
        @click="deleteKiller(killerID)"
      />
      <Dialog 
        header="Append New Role" 
        v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
        :style="{width: '50vw'}" :modal="true"
      >
        <Button 
          label="Skills Upload"  
          class="p-button-warning mx-3 col-fixed"
          style="max-width:100%"
          @click="input1" 
        /> 
        <div class="previews" v-for="(skill, index) in skillsData" :key="index">
          <div v-if="skill!=null">                     
            <img style="margin:10px" height="112" width="122" :src="skillsUrl[index]">
          <br>
          </div>
        </div>
        <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="image/*" multiple/>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="modalStatue" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" @click="addSkills(killerID)" autofocus />
        </template>
      </Dialog>
    </div>
    <div class="container">
      <div class="skills">
          <img :src="killerSkill_1"/>
          <img :src="killerSkill_2"/>
          <img :src="killerSkill_3"/>
      </div>
      <div class="video">
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
              <h1>VIDEO 1</h1>
              <p>test....</p>
            </figcaption>
          </figure>
        </div>
        <div class="videoBox">
          <figure>
            <img :src="require('@/assets/picture/test.png')" alt="video">
            <figcaption>
              <h1>VIDEO 1</h1>
              <p>test....</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        killerID:{type: String},
        killerCover:{type: String},
        killerName:{type: String},
        killerMove:{type: String},
        killerTerror:{type: String},
        killerHeight:{type: String},
        killerSkill_1:{type: String},
        killerSkill_2:{type: String},
        killerSkill_3:{type: String}
    },
    methods:{
      previewImage(event){
        console.log(event)
        const files = event.target.files
        console.log(files.length)
        for(let i = 0;i<files.length;i++){
          const filename = files[i].name
          if (filename.lastIndexOf(".") <= 0){
            return alert("Please add a valid file!")
          }
          const fileReader = new FileReader()
          fileReader.addEventListener("load",()=>{
            this.skillsUrl[i] = fileReader.result
          })
          fileReader.readAsDataURL(files[i])
          this.skillsData[i] = files[i]
          this.onUpload(files[i])
        }
      },
      onUpload(img){
        const storageRef = r(storage, `killersSkills/${img.name}`)
        uploadBytes(storageRef, img).then((snapshot) => {
          console.log("Uploaded a blob or file!")
          console.log(snapshot)
        })
      },
      input1() {
        this.$refs.input1.click()   
      },
    }
}
</script>
<script setup>
import { ref } from "vue"
import { ref as r, uploadBytes } from "firebase/storage"
import { db, storage } from "@/firebase"
import { collection, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import { useRouter } from "vue-router"
const router = useRouter()
const displayModal = ref(false)
const skillsUrl = ref([])
const skillsData = ref([])

const modalStatue = () => {
  displayModal.value = displayModal.value ? false : true
}
const deleteKiller = id => {
  router.push("/personal")
  deleteDoc(doc(collection(db, "killers"), id))
}

const addSkills = id => {
  updateDoc(doc(collection(db, "killers"), id),  {
    skill_1: skillsUrl.value[0],
    skill_2: skillsUrl.value[1],
    skill_3: skillsUrl.value[2]
  })
  for(let i=0;i<3;i++){
    addDoc(collection(db, "skills"),{
      name: skillsData.value[i].name,
      icon: skillsUrl.value[i]
    })
  }
  skillsUrl.value = []
  skillsData.value = []
  displayModal.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/records.scss";
</style>