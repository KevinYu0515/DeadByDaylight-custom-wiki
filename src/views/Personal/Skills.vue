<template>
  <DBDNavbar></DBDNavbar>
  <div class="skills">
    <div class="illustrated">
      <ul>
        <li 
          :class="{'item': !isclick[index], 'active': isclick[index]}"
          v-for="(skill, index) in skills" 
          :key="index"
          :style="{'top': topcalc(index), 'left': leftcalc(index)}"
        >
          <div class="bg" @click="clickSkill(skill, index)" :title="skill.name">
            <img :src="skill.icon" alt="">
          </div>
        </li>
        <li :style="{'top': topcalc(skills.length), 'left': leftcalc(skills.length)}">
          <div class="bg" @click="modalStatue" title="Add New Skills">
            <img :src="require('@/assets/icon/IconHelp.png')" alt=""/>
          </div>
        </li>
        <Dialog 
          header="Append New Skill" 
          v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '50vw'}" :modal="true"
        >
          <div class="flex align-items-center">
            <h3>Skill Name：</h3>
            <InputText 
              placeholder="New Skill Name"
              class="mx-1 my-1"
              v-model="newSkillName"
              required
            />
            </div>
          <hr class="inDialog">
          <Button 
            label="Upload Skill Image"  
            class="p-button-warning my-2 col-fixed"
            style="max-width:100%"
            @click="clickInput1" 
          />
          <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="gif/*" required/>
          <div v-if="sData!=null">            
            <img class="preview" height="110" width="110" :src="sUrl">
          </div>
          <hr class="inDialog">
          <h3>Description</h3>
          <Textarea class="my-2" placeholder="Description" v-model="newSkillInfor" :autoResize="true" rows="5" cols="80" />
          <template #footer>
              <Button label="No" icon="pi pi-times" @click="modalStatue" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check" @click="addskill" autofocus />
          </template>
        </Dialog>
      </ul>
    </div>
    <div class="infor">
      <h1>SKILLS INFORMATION</h1>
      <hr class="outDialog">
      <div class="noneSkills" v-if="skillsClick.length == 0">Please Click Skills Above</div>
      <div class="inforBox" v-else v-for="(skill, index) in skillsClick" :key="index">
        <h1>{{skill.usefulness}}</h1>
        <img :src="skill.icon" alt="">
        <p> {{skill.illustrate}} </p>
        <Button 
          label="Edit"  
          class="p-button-warning bs"
          style="max-width:100%"
          @click="editStatue(index)" 
        /> 
        <Dialog 
          :header="`編輯「${skill.name}」`" 
          v-model:visible="displayEdit[index]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '50vw'}" :modal="true"
        >
          <div class="flex align-items-center">
            <h3>Skill Name：</h3>
            <InputText
              placeholder="Skill Name"
              class="mx-1 my-1"
              v-model.trim="newSkillName"
              required
            />
            </div>
          <hr class="inDialog">
          <Dropdown
            v-model="newSkillUseful"
            :options="usefulOptions"
            optionLabel="level"
            optionValue="level"
            placeholder="UseFulness"
            class="mx-1 my-1"
            style="width:200px"
          />
          <hr class="inDialog">
          <h3>Description</h3>
          <Textarea class="my-2" placeholder="Description" v-model.trim="newSkillInfor" :autoResize="true" rows="5" cols="80" />
          <template #footer>
              <Button label="No" icon="pi pi-times" @click="editStatue(index)" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check" @click="updateSkill(skill.id, index)" autofocus />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DBDNavbar from "../../components/DBDNavbar.vue"
export default {
  components:{ DBDNavbar },
  data(){
    return{
      skillsClick: [],
      isclick : [false],
      usefulOptions: ([{level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}, {level:"T4"}]),
    }
  },
  methods:{
    topcalc(i){
      let index
      if(i<=7){
        index = (i%2)*55
      }else{
        index = (i%2)*55+(2*Math.floor(i/8))*55
      }
      index = index.toString()+"%"
      return index
    },
    leftcalc(i){
      let index = i%8*13
      index = index.toString()+"%"
      return index
    },
    clickSkill(e, n){
      this.isclick[n] = this.isclick[n] ? false : true
      if(this.isclick[n]){
        this.skillsClick.unshift(e)
      }else{
        for(let i=0; i<this.skillsClick.length;i++){
          if(this.skillsClick[i] == e){
            this.skillsClick.splice(i,1)
          }
        }
      }
    },
    clickInput1(){
      this.$nextTick(()=>{
        this.$refs.input1.click()
      })
    }
  }
}
</script>

<script setup>
import { ref, onMounted } from "vue"
import { db, storage } from "@/firebase"
import { collection, onSnapshot, addDoc, updateDoc, doc} from "firebase/firestore"
import { ref as r, uploadBytes } from "firebase/storage"
const skills = ref([])
const newSkillName = ref("")
const newSkillInfor = ref("")
const newSkillUseful = ref("")
const sUrl = ref("")
const sData = ref(null)
const displayEdit = ref([false])
const displayModal = ref(false)

onMounted(() => {
  console.log("sucess setup7")
  onSnapshot(collection(db,"skills"), (querySnapshot) => {
    let fbskills = []
    querySnapshot.forEach((doc) => {
      const skill = {
        id: doc.id,
        name: doc.data().name,
        usefulness: doc.data().usefulness,
        icon: doc.data().icon,
        illustrate: doc.data().illustrate
      }
      fbskills.push(skill)
    })
    skills.value = fbskills
  })
})

const addskill = () => {
  addDoc(collection(db, "skills"), {
    name: newSkillName.value,
    usefulness: newSkillUseful.value,
    icon: sUrl.value,
    illustrate: newSkillInfor.value
  })
  sUrl.value = "",
  sData.value = null,
  newSkillName.value = "",
  newSkillInfor.value = "",
  newSkillUseful.value = "",
  displayModal.value = false
}

const updateSkill = (id, i) => {
  updateDoc(doc(collection(db, "skills"), id), {
    name: newSkillName.value,
    usefulness: newSkillUseful.value,
    illustrate: newSkillInfor.value
  })
  newSkillName.value = "",
  newSkillInfor.value = "",
  newSkillUseful.value = "",
  console.log("updateSkill")
  displayEdit.value[i] = false
}

const previewImage = event => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener("load",()=>{
    sUrl.value = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  sData.value = files[0]
  onUpload()
}
const onUpload = () => {
  const storageRef = r(storage, `killersSkills/${sData.value.name}`)
  uploadBytes(storageRef, sData.value).then((snapshot) => {
    console.log("Uploaded a blob or file!")
    console.log(snapshot)
  })
}

const editStatue = i => {
  displayEdit.value[i] = displayEdit.value[i] ? false : true
}

const modalStatue = () => {
  displayModal.value = displayModal.value ? false : true
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/skills.scss";
</style>