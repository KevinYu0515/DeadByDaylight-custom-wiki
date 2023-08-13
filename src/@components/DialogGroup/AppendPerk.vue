<template>
  <Dialog
    header="Append New Perk" 
    v-model:visible="isDisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :model="true"
  >
    <form @submit.prevent="handleSubmit(!v$.$invalid, state)">
      <div class="flex align-items-center">
        <h3>Perk Name：</h3>
        <InputText 
          placeholder="New Perk Name"
          class="mx-1 my-1"
          name="perkName"
          id="perkName"
          v-model="v$.newPerkName.$model" :class="{'p-invalid':v$.newPerkName.$invalid && submitted}"
        />
        <small v-if="(v$.newPerkName.$invalid && submitted) || v$.newPerkName.$pending.$response" class="p-error">
          {{v$.newPerkName.required.$message.replace('Value', 'Name')}}
        </small>
      </div>
      <hr class="inDialog">
      <Dropdown
        v-model="v$.newPerkUseful.$model" :class="{'p-invalid':v$.newPerkUseful.$invalid && submitted}"
        :options="usefulOptions"
        optionLabel="level"
        optionValue="level"
        placeholder="UseFulness"
        class="mx-1 my-1"
        id="newPerkUseful"
        style="width:200px"
      />
      <small v-if="(v$.newPerkUseful.$invalid && submitted) || v$.newPerkUseful.$pending.$response" class="p-error">
        {{v$.newPerkUseful.required.$message.replace('Value', 'Usefulness')}}
      </small>
      <hr class="inDialog">
      <Button 
        label="Upload Perk Image"  
        class="p-button-warning my-2 col-fixed"
        style="max-width:100%"
        @click="clickInput1" 
      />
      <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="gif/*" required/>
      <div v-if="state.perkData!=null">            
        <img class="preview" height="110" width="110" :src="state.perkUrl">
      </div>
      <hr class="inDialog">
      <h3>Description</h3>
      <Textarea 
        class="my-2" 
        placeholder="Description" 
        id = "newPerkInfor"
        v-model="v$.newPerkInfor.$model" :class="{'p-invalid':v$.newPerkInfor.$invalid && submitted}"
        :autoResize="true" 
        rows="5" 
        cols="50" 
      />
      <small v-if="(v$.newPerkInfor.$invalid && submitted) || v$.newPerkInfor.$pending.$response" class="p-error">
        {{v$.newPerkInfor.required.$message.replace('Value', 'Description')}}
      </small>
      <br>
      <Button type="submit"  label="Submit" class="mt-2" />
    </form>
      <template #footer>
          <Button label="Discard" icon="pi pi-trash" @click="modelStatue(1)" class="p-button-text"/>
      </template>
  </Dialog>

  <Dialog 
    :header="`編輯「${perkName}」`" 
    v-model:visible="isEdit" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :model="true"
  >
    <div class="flex align-items-center">
      <h3>Perk Name：</h3>
      <InputText
        placeholder="Perk Name"
        class="mx-1 my-1"
        v-model="state.newPerkName"
      />
      <Button label="Confirm" class="mx-2" :disabled="disable[0]" @click="updatePerk(perkID, 0, 'name', state.newPerkName)" autofocus />
    </div>
    <hr class="inDialog">
    <Dropdown
      v-model="state.newPerkUseful"
      :options="usefulOptions"
      optionLabel="level"
      optionValue="level"
      placeholder="UseFulness"
      class="mx-1"
      style="width:200px"
    />
    <Button label="Confirm" class="mx-2" :disabled="disable[1]" @click="updatePerk(perkID, 1, 'usefulness', state.newPerkUseful)" autofocus />
    <hr class="inDialog">
    <h3>Description</h3>
    <Textarea class="my-2" placeholder="Description" v-model="state.newPerkInfor" :autoResize="true" rows="5" cols="80" />
    <br>
    <Button label="Confirm" class="mx-2"  :disabled="disable[2]" @click="updatePerk(perkID, 2, 'illustrate', state.newPerkInfor)" autofocus />
    <template #footer>
        <Button label="Complete" icon="pi pi-check" @click="complete(perkData, perkList)" class="p-button-text"/>
    </template>
  </Dialog>
</template>

<script>
export default {
    name:"AppendPerk",
    data() {
      return{
        usefulOptions: ([{level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}, {level:"T4"}])
      }
    }
}
</script>

<script setup>
import { ref, reactive, defineProps, defineEmits, defineExpose, onUpdated } from "vue"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"

const props = defineProps(["isDisplay","isEdit","perkData","perkIndex","perkList"])
const isDisplay = ref(null)
const isEdit = ref(null)
const disable = ref([false])
const perkIndex = ref(null)
const perkData = ref(null)
const perkName = ref(null)
const perkID = ref(null)
const perkList = ref(null)
const defaulted = ref(false)

onUpdated(()=>{
  isDisplay.value = props.isDisplay
  isEdit.value = props.isEdit
  if(isEdit.value){
    perkData.value = props.perkData
    perkList.value = props.perkList
    perkIndex.value = props.perkIndex
    perkName.value = perkData.value.name
    perkID.value = perkData.value.id
    if(!defaulted.value){
      state.newPerkName = perkData.value.name
      state.newPerkInfor = perkData.value.illustrate
      state.newPerkUseful = perkData.value.usefulness
      defaulted.value = true
    }
  }
})

const input1 = ref(null)
const submitted = ref(false)
const clickInput1 = () => {
  input1.value.click()
}

const state = reactive({
    newPerkName: "",
    newPerkInfor: "",
    newPerkUseful: "",
    perkData: null,
    perkUrl: ""
})

const rules = {
  newPerkName: { required },
  newPerkInfor: { required },
  newPerkUseful: { required }
}

const v$ = useVuelidate(rules, state)

const handleSubmit = (isFormValid, state) => {
    submitted.value = true
    console.log(state)
    if (!isFormValid) { return }
    emits("setPerkDoc", state)
    modelStatue(0, true)
}

const previewImage = event => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener("load",()=>{
    state.perkUrl = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  state.perkData = files[0]
  emits("uploadImg", files[0])
}

const modelStatue = (i, isClear) =>{
  emits("childModel", i, isClear)
  submitted.value = false
}

const clearData = () => {
  state.newPerkInfor = "",
  state.newPerkName = "",
  state.newPerkUseful = "",
  state.perkData = null,
  state.perkUrl = ""
}

const updatePerk = (id, dis, options, optionsValue) => {
  emits("updatePerk", id, options, optionsValue)
  disable.value[dis] = true
}

const complete = (perk, list) => {
  emits("complete", perkIndex.value)
  emits("replace", perk, list)
  disable.value = [false]
  defaulted.value = false
}

const emits = defineEmits(["uploadImg", "childModel", "setPerkDoc", "updatePerk", "replace", "complete"])
defineExpose({ clearData })

</script>

<style scoped>
@import "../../assets/css/index.css";
</style>