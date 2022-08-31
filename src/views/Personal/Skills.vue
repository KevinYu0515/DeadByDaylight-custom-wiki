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
        <Dialog
          header="Append New Skill" 
          v-model:visible="displayModal[0]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '50vw'}" :modal="true"
        >
          <form @submit.prevent="handleSubmit(!v$.$invalid)">
            <div class="flex align-items-center">
              <h3>Skill Name：</h3>
              <InputText 
                placeholder="New Skill Name"
                class="mx-1 my-1"
                name="skillName"
                id="skillName"
                v-model="v$.newSkillName.$model" :class="{'p-invalid':v$.newSkillName.$invalid && submitted}"
              />
              <small v-if="(v$.newSkillName.$invalid && submitted) || v$.newSkillName.$pending.$response" class="p-error">
                {{v$.newSkillName.required.$message.replace('Value', 'Name')}}
              </small>
            </div>
            <hr class="inDialog">
            <Dropdown
              v-model="v$.newSkillUseful.$model" :class="{'p-invalid':v$.newSkillUseful.$invalid && submitted}"
              :options="usefulOptions"
              optionLabel="level"
              optionValue="level"
              placeholder="UseFulness"
              class="mx-1 my-1"
              id="newSkillUseful"
              style="width:200px"
            />
            <small v-if="(v$.newSkillUseful.$invalid && submitted) || v$.newSkillUseful.$pending.$response" class="p-error">
              {{v$.newSkillUseful.required.$message.replace('Value', 'Usefulness')}}
            </small>
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
            <Textarea 
              class="my-2" 
              placeholder="Description" 
              id = "newSkillInfor"
              v-model="v$.newSkillInfor.$model" :class="{'p-invalid':v$.newSkillInfor.$invalid && submitted}"
              :autoResize="true" 
              rows="5" 
              cols="80" 
            />
            <small v-if="(v$.newSkillInfor.$invalid && submitted) || v$.newSkillInfor.$pending.$response" class="p-error">
              {{v$.newSkillInfor.required.$message.replace('Value', 'Description')}}
            </small>
            <br>
            <Button type="submit"  label="Submit" class="mt-2" />
          </form>
            <template #footer>
                <Button label="Discard" icon="pi pi-trash" @click="modalStatue(1)" class="p-button-text"/>
            </template>
        </Dialog>
        <Dialog 
          header="Warning" 
          v-model:visible="displayModal[1]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '30vw'}" :modal="true"
        >
        <p>你所作的紀錄將不會儲存，確定要退出?</p>
          <template #footer>
            <Button label="Yes" icon="pi pi-check" @click="modalStatue(1); modalStatue(0); clearData()" class="p-button-text"/>
            <Button label="No" icon="pi pi-times" @click="modalStatue(1)" class="p-button-text"/>
          </template>
        </Dialog>
      </ul>
    </div>
    <div class="infor">
      <h1>SKILLS INFORMATION</h1>
      <hr class="outDialog">
      <div v-if="skillsClick.length > 0" class="my-2">
        <Button :label="skillsClick.length" icon="pi pi-database" @click="clearSkillsClick" class="p-button-success mx-2"/>
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
              v-model.trim="newSkillName"
              prop="skillName"
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
            prop="skillUseful"
          />
          <hr class="inDialog">
          <h3>Description</h3>
          <Textarea class="my-2" placeholder="Description" prop="skillDsp" v-model.trim="newSkillInfor" :autoResize="true" rows="5" cols="80" />
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
    clearSkillsClick(){
      this.isclick = [false]
      this.skillsClick = []
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
import { reactive, ref, onMounted } from "vue"
import { db, storage } from "@/firebase"
import { collection, onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref as r, uploadBytes } from "firebase/storage"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
const skills = ref([])
const sUrl = ref("")
const displayEdit = ref([false])
const displayModal = ref([false])
const submitted = ref(false)
const sData = ref(null)

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

const state = reactive({
    newSkillName: "",
    newSkillInfor: "",
    newSkillUseful: ""
})
const rules = {
  newSkillName: { required },
  newSkillInfor: { required },
  newSkillUseful: { required }
}
const v$ = useVuelidate(rules, state)

const handleSubmit = (isFormValid) => {
    submitted.value = true
    if (!isFormValid) { return }
    addskill()
}

const addskill = () => {
  addDoc(collection(db, "skills"), {
    name: state.newSkillName,
    usefulness: state.newSkillUseful,
    icon: sUrl.value,
    illustrate: state.newSkillInfor
  })
  sUrl.value = "",
  sData.value = null,
  state.newSkillName = "",
  state.newSkillInfor = "",
  state.newSkillUseful = "",
  displayModal.value = false
  submitted.value = false
}

const updateSkill = (id, i) => {
  updateDoc(doc(collection(db, "skills"), id), {
    name: state.newSkillName,
    usefulness: state.newSkillUseful,
    illustrate: state.newSkillInfor
  })
  state.newSkillName = "",
  state.newSkillInfor = "",
  state.newSkillUseful = "",
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

const clearData = () => {
  state.newSkillName = "",
  state.newSkillInfor = "",
  state.newSkillUseful = "",
  sUrl.value = "",
  sData.value = null
}

const editStatue = i => {
  displayEdit.value[i] = displayEdit.value[i] ? false : true
}

const modalStatue = i => {
  displayModal.value[i] = !displayModal.value[i]
  submitted.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/skills.scss";
</style>