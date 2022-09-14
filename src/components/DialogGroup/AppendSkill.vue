<template>
  <Dialog
    header="Append New Skill" 
    v-model:visible="isdisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :modal="true"
  >
    <form @submit.prevent="handleSubmit(!v$.$invalid, state)">
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
      <div v-if="state.skillData!=null">            
        <img class="preview" height="110" width="110" :src="state.skillUrl">
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
        cols="50" 
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
    :header="`編輯「${skillName}」`" 
    v-model:visible="isEdit" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :modal="true"
  >
    <div class="flex align-items-center">
      <h3>Skill Name：</h3>
      <InputText
        placeholder="Skill Name"
        class="mx-1 my-1"
        v-model="state.newSkillName"
      />
      <Button label="Confirm" class="mx-2" :disabled="disable[0]" @click="updateSkill(skillID, 0, 'name', state.newSkillName)" autofocus />
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
    <Button label="Confirm" class="mx-2" :disabled="disable[1]" @click="updateSkill(skillID, 1, 'usefulness', state.newSkillUseful)" autofocus />
    <hr class="inDialog">
    <h3>Description</h3>
    <Textarea class="my-2" placeholder="Description" v-model="state.newSkillInfor" :autoResize="true" rows="5" cols="80" />
    <br>
    <Button label="Confirm" class="mx-2"  :disabled="disable[2]" @click="updateSkill(skillID, 2, 'illustrate', state.newSkillInfor)" autofocus />
    <template #footer>
        <Button label="Complete" icon="pi pi-check" @click="complete(skillData, skillList)" class="p-button-text"/>
    </template>
  </Dialog>
</template>

<script>
export default {
    name:"AppendSkill",
    data() {
      return{
        usefulOptions: ([{level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}, {level:"T4"}])
      }
    }
}
</script>

<script setup>
import { ref, reactive, defineProps, defineEmits, defineExpose, onUpdated, onBeforeUpdate } from "vue"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"

const props = defineProps(["isdisplay","isEdit","skillData","skillIndex","skillList"])
const isdisplay = ref(null)
const isEdit = ref(null)
const disable = ref([false])
const skillIndex = ref(null)
const skillData = ref(null)
const skillName = ref(null)
const skillID = ref(null)
const skillList = ref(null)

onBeforeUpdate(() => {
  console.log("before update")
  isdisplay.value = props.isdisplay
  isEdit.value = props.isEdit
})

onUpdated(()=>{
  if(isEdit.value){
    console.log("isEdit", isEdit.value)
    skillData.value = props.skillData
    skillList.value = props.skillList
    skillIndex.value = props.skillIndex
    skillName.value = skillData.value.name
    skillID.value = skillData.value.id
    state.newSkillName = skillData.value.name
    state.newSkillInfor = skillData.value.illustrate
    state.newSkillUseful = skillData.value.usefulness
  }
})

const input1 = ref(null)
const submitted = ref(false)
const clickInput1 = () => {
  input1.value.click()
}

const state = reactive({
    newSkillName: "",
    newSkillInfor: "",
    newSkillUseful: "",
    skillData: null,
    skillUrl: ""
})

const rules = {
  newSkillName: { required },
  newSkillInfor: { required },
  newSkillUseful: { required }
}

const v$ = useVuelidate(rules, state)

const handleSubmit = (isFormValid, state) => {
    submitted.value = true
    if (!isFormValid) { return }
    emits("setSkillDoc", state)
    modalStatue(0, true)
}

const previewImage = event => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener("load",()=>{
    state.skillUrl = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  state.skillData = files[0]
  emits("uploadImg", files[0])
}

const modalStatue = (i, isClear) =>{
  emits("childmodal", i, isClear)
  submitted.value = false
}

const clearData = () => {
  state.newSkillInfor = "",
  state.newSkillName = "",
  state.newSkillUseful = "",
  state.skillData = null,
  state.skillUrl = ""
}

const updateSkill = (id, dis, options, optionsValue) => {
  emits("updateSkill", id, options, optionsValue)
  disable.value[dis] = true
}

const complete = (skill, list) => {
  emits("complete", skillIndex.value)
  emits("replace", skill, list)
  disable.value = [false]
}


const emits = defineEmits(["uploadImg", "childmodal", "setSkillDoc", "updateSkill", "replace", "complete"])
defineExpose({ clearData })

</script>

<style scoped>
@import "../../assets/css/index.css";
</style>