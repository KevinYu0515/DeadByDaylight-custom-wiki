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
          <div class="bg" @click="modalStatue(0)" title="Add New Skills">
            <img :src="require('@/assets/icon/IconHelp.png')" alt=""/>
          </div>
        </li>
        <AppendSkill
          :isdisplay="displayModal[0]"
          :usefulOptions="usefulOptions"
          @childmodal="modalStatue"
          @uploadImg="onUpload"
          @setSkillDoc="addSkill"
          ref="appendSkill"
        />
        <warning-dialog :isdisplay="displayModal[1]" location="Append New Skill" @childmodal="modalStatue"></warning-dialog>
      </ul>
    </div>
    <div class="infor">
      <h1>SKILLS INFORMATION</h1>
      <hr class="outDialog">
      <div v-if="skillsClick.length > 0" class="my-2">
        <Button @click="clearSkillsClick" class="p-button-success mx-2">已選：{{skillsClick.length}}</Button>
        <Button label="Clear" icon="pi pi-times" @click="clearSkillsClick" class="p-button-infor mx-2"/>
      </div>
      <div class="noneSkills" v-if="skillsClick.length == 0">Please Click Skills Above</div>
      <div class="inforBox" v-else v-for="(skill, index) in skillsClick" :key="index">
        <h1>{{skill.usefulness}}</h1>
        <img :src="skill.icon" alt="">
        <div class="text">
          <h2>{{skill.name}}</h2>
          <p> {{skill.illustrate}} </p>
        </div>
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
              v-model="state.newSkillName"
            />
            <Button label="Confirm" class="mx-2" :disabled="disable[0]" @click="updateSkill(skill.id, 0, 'name', state.newSkillName)" autofocus />
          </div>
          <hr class="inDialog">
          <Dropdown
            v-model="state.newSkillUseful"
            :options="usefulOptions"
            optionLabel="level"
            optionValue="level"
            placeholder="UseFulness"
            class="mx-1"
            style="width:200px"
          />
          <Button label="Confirm" class="mx-2" :disabled="disable[1]" @click="updateSkill(skill.id, 1, 'usefulness', state.newSkillUseful)" autofocus />
          <hr class="inDialog">
          <h3>Description</h3>
          <Textarea class="my-2" placeholder="Description" v-model="state.newSkillInfor" :autoResize="true" rows="5" cols="80" />
          <br>
          <Button label="Confirm" class="mx-2"  :disabled="disable[2]" @click="updateSkill(skill.id, 2, 'description', state.newSkillInfor)" autofocus />
          <template #footer>
              <Button label="Complete" icon="pi pi-check" @click="complete(index); replaceSkill(skill, skills)" class="p-button-text"/>
          </template>
        </Dialog>
        <warning-dialog
          :isdisplay2="displayModal[2]"
          title="Warning"
          content="該資料不可為空"
          @childmodal="modalStatue"
        ></warning-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DBDNavbar from "../../components/Navbar/DBDNavbar.vue"
import WarningDialog from "../../components/DialogGroup/WarningDialog.vue"
import AppendSkill from "../../components/DialogGroup/AppendSkill.vue"
export default {
  name:"Skills",
  components:{ DBDNavbar, WarningDialog, AppendSkill },
  data(){
    return{
      skillsClick: [],
      clickIndex: [],
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
        index = (i%2)*55+(2*Math.floor(i/10))*55
      }
      index = index.toString()+"%"
      return index
    },
    leftcalc(i){
      let index = i%10*13
      index = index.toString()+"%"
      return index
    },
    clickSkill(e, n){
      console.log(e.name, e)
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
    }
  }
}
</script>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { storage, skillsColRef } from "@/firebase"
import { onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref as r, uploadBytes } from "firebase/storage"
const skills = ref([])
const displayEdit = ref([false])
const displayModal = ref([false])
const disable = ref([false])
const appendSkill = ref(null)

onMounted(() => {
  console.log("sucess setup7")
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
  modalStatue(0, true)
}

const state = reactive({
  newSkillName:"",
  newSkillInfor:"",
  newSkillUseful:""
})

const updateSkill = (id, dis, options ,optionsValue) => {
  if(isNone(optionsValue)){
    if(options == "name"){
      updateDoc(doc(skillsColRef, id), { name: state.newSkillName })
    }else if(options == "description"){
      updateDoc(doc(skillsColRef, id), { illustrate: state.newSkillInfor })
    }else if(options == "usefulness"){
      updateDoc(doc(skillsColRef, id), { usefulness: state.newSkillUseful })
    }
    disable.value[dis] = true
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

const complete = i => {
  appendSkill.value.clearData()
  editStatue(i)
}

const editStatue = i => {
  displayEdit.value[i] = displayEdit.value[i] ? false : true
  disable.value = [false]
}

const modalStatue = (i, isClear) => {
  displayModal.value[i] = !displayModal.value[i]
  if(isClear){
    appendSkill.value.clearData()
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/skills.scss";
</style>

<style scoped>
@import "../../assets/css/index.css";
</style>