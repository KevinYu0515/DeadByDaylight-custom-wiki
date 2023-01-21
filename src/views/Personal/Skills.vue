<template>
  <DBDNavbar></DBDNavbar>
  <div class="skills flex justify-content-center align-items-center flex-column">
    <div class="illustrated">
      <ul>
        <li
          class="list-none absolute overflow-hidden cursor-pointer"
          :class="{'item': !isclick[index], 'active': isclick[index]}"
          v-for="(skill, index) in skills"
          :key="index"
          :style="{'top': topcalc(index), 'left': leftcalc(index)}"
        >
          <div class="bg w-full h-full" @click="clickSkill(skill, index)" :title="skill.name">
            <img :src="skill.icon" alt="">
          </div>
        </li>
        <li 
          class="list-none absolute overflow-hidden"
          :style="{'top': topcalc(skills.length), 'left': leftcalc(skills.length)}"
        >
          <div class="bg w-full h-full cursor-pointer" @click="modalStatue(0)" title="Add New Skills">
            <img :src="require('@/assets/icon/IconHelp.png')" alt=""/>
          </div>
        </li>
      </ul>
    </div>

    <append-skill
      :isdisplay="displayModal[0]"
      @childmodal="modalStatue"
      @uploadImg="onUpload"
      @setSkillDoc="addSkill"
      ref="appendSkill"
    />
    <simple-dialog :isdisplay="displayModal[1]" location="Append New Skill" @childmodal="modalStatue"></simple-dialog>

    <div class="infor flex justify-content-center align-items-center flex-column p-5">
      <h1>SKILLS INFORMATION</h1>
      <hr class="outDialog">
      <div v-if="skillsClick.length > 0" class="my-2">
        <Button @click="clearSkillsClick" class="p-button-success mx-2">已選：{{skillsClick.length}}</Button>
        <Button label="Clear" icon="pi pi-times" @click="clearSkillsClick" class="p-button-infor mx-2"/>
      </div>
      <div class="noneSkills p-8" v-if="skillsClick.length == 0">Please Click Skills Above</div>
      <div 
        class="inforBox flex justify-content-center align-items-center" 
        v-else 
        v-for="(skill, index) in skillsClick" 
        :key="index"
      >
        <h1 class="mx-5">{{skill.usefulness}}</h1>
        <img class="mx-5" :src="skill.icon" alt="">
        <div class="text flex justify-content-center align-items-start flex-column p-5 w-6">
          <h2>{{skill.name}}</h2>
          <p> {{skill.illustrate}} </p>
        </div>
        <Button 
          label="Edit"  
          class="p-button-warning bs"
          style="max-width:100%"
          @click="editStatue(index);" 
        /> 

        <append-skill
          :isEdit="displayEdit[index]"
          :skillData="skill"
          :skillIndex="index"
          :skillList="skills"
          @updateSkill="updateSkills"
          @complete="editStatue"
          @replace="replaceSkill"
        />

        <simple-dialog
          :isdisplay2="displayModal[2]"
          title="Warning"
          content="該資料不可為空"
          @childmodal="modalStatue"
        ></simple-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DBDNavbar from "../../components/Navbar/DBDNavbar.vue"
import SimpleDialog from "../../components/DialogGroup/SimpleDialog.vue"
import AppendSkill from "../../components/DialogGroup/AppendSkill.vue"
export default {
  name:"Skills",
  components:{ DBDNavbar, SimpleDialog, AppendSkill },
  data(){
    return{
      skillsClick: [],
      clickIndex: [],
      isclick : [false],
    }
  },
  methods:{
    topcalc(i){
      let index = 200
      if(i<=7){
        index += (i%2)*55
      }else{
        index += (i%2)*55+(2*Math.floor(i/16))*55
      }
      index = index.toString()+"%"
      return index
    },
    leftcalc(i){
      let index = 80
      index += i%16*13
      index = index.toString()+"%"
      return index
    },
    clickSkill(e, n){
      this.isclick[n] = !this.isclick[n]
      if(this.isclick[n]){
        this.skillsClick.unshift(e)
        this.clickIndex.unshift(n)
      }else{
        for(let i=0; i<this.skillsClick.length;i++){
          if(this.skillsClick[i].name == e.name){
            this.skillsClick.splice(i,1)
            this.clickIndex.splice(i,1)
          }else{
            console.log("false")
          }
        }
      }
    },
    replaceSkill(e, skills){
      for(let i=0; i<this.skillsClick.length;i++){
          if(this.skillsClick[i] == e){
            this.skillsClick.splice(i,1,skills[this.clickIndex[i]])
          }
        }
    },
    clearSkillsClick(){
      this.isclick = [false]
      this.skillsClick = []
    },
  }
}
</script>

<script setup>
import { ref,  onMounted } from "vue"
import { storage, skillsColRef } from "@/firebase"
import { onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref as r, uploadBytes } from "firebase/storage"

const skills = ref([])
const displayEdit = ref([false])
const displayModal = ref([false])
const appendSkill = ref(null)

onMounted(() => {
  onSnapshot(skillsColRef, (querySnapshot) => {
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

const addSkill = state => {
  addDoc(skillsColRef, {
    name: state.newSkillName,
    usefulness: state.newSkillUseful,
    icon: state.skillUrl,
    illustrate: state.newSkillInfor
  })
}

const updateSkills = (id, options ,optionsValue) => {
  if(isNone(optionsValue)){
    updateDoc(doc(skillsColRef, id), { [options]: optionsValue })
    console.log("updateSkill")
  }
}

const isNone = options => {
  if(!options){
    displayModal.value[2] = true
    return false
  }else return true
}

const onUpload = skill => {
  const storageRef = r(storage, `killersSkills/${skill.name}`)
  uploadBytes(storageRef, skill).then((snapshot) => {
    console.log("Uploaded a blob or file!")
    console.log(snapshot)
  })
}

const editStatue = i => {
  displayEdit.value[i] = displayEdit.value[i] ? false : true
}

const modalStatue = (i, isClear) => {
  displayModal.value[i] = !displayModal.value[i]
  console.log(displayModal.value[i])
  if(isClear) appendSkill.value.clearData()
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/skills.scss";
</style>

<style scoped>
@import "../../assets/css/index.css";
</style>