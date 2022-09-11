<template>
  <Dialog
      :header="`${killerName} Settings`"
      v-model:visible="isdisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
      :style="{width: '50vw'}" :modal="true"
    >
      <div class="my-2">
        <h3>Real Name</h3>
        <div class="flex align-items-center my-2">
          <InputText placeholder="Real Name" v-model="state.realName" />
          <Button label="Confirm" class="mx-2"  :disabled="disable[0]" @click="updateSettings(0, 'realName', state.realName)" autofocus />
        </div>
      </div>
      <hr class="inDialog">
      
      <div class="my-2">
        <div class="flex align-items-center">
          <h3>Background</h3>
          <Button label="Confirm" class="mx-2"  :disabled="disable[1]" @click="updateSettings(1, 'background', state.background)" autofocus />
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
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[2]" @click="updateSettings(2, 'move', state.move)" autofocus />
        </div>
        <div class="altmove" v-show="moveChecked">
          <h3>Altnative Movement Speed</h3>
          <div class="flex align-items-center">
            <Textarea class="my-2" placeholder="Altnative Movement Speed" v-model="state.altMove" :autoResize="true" rows="1" cols="30" />
            <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[3]" @click="updateSettings(3, 'altMove', state.altMove)" autofocus />
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
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[4]" @click="updateSettings(4, 'terror', state.terror)" autofocus />
        </div>
        <div class="altmove" v-show="terrorChecked">
          <h3>Altnative Terror Radius</h3>
          <div class="flex align-items-center">
            <Textarea class="my-2" placeholder="Altnative Terror Radius" v-model="state.altTerror" :autoResize="true" rows="1" cols="30" />
            <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[5]" @click="updateSettings(5, 'altTerror', state.altTerror)" autofocus />
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
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[6]" @click="updateSettings(6, 'height', state.height)" autofocus />
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
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[7]" @click="updateSettings(7, 'difficulty', state.difficulty)" autofocus />
      </div>
      <hr class="inDialog">

      <div class="my-2">
        <h3>Weapon And Power</h3>
        <div class="flex align-items-center my-1">
          <InputText placeholder="Weapon" v-model="state.weapon" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[8]" @click="updateSettings(8, 'weapon', state.weapon)" autofocus />
          <InputText placeholder="Power" class="mx-2" v-model="state.power" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[9]" @click="updateSettings(9, 'power', state.power)" autofocus />
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
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[10]" @click="updateSettings(10, 'skills', state.skillUrl)" autofocus />
        <div class="flex">
          <div class="col-3" v-for="(skill, index) in state.skillData" :key="index">
            <div v-if="skill!=null" style="transform:scale(50%)">                     
              <img :src="state.skillUrl[index]">
            </div>
          </div>
        </div>
        <input type="file" name="file" ref="input1" style="display:none" @change="preview" accept="image/*" multiple/>
        <Button 
          label="Recommand Skills Upload"
          class="p-button-warning my-2"
          style="max-width:100%"
          @click="clickInput2" 
        /> 
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[11]" @click="updateSettings(11, 'recommandSkills', state.rskillUrl)" autofocus />
        <div class="flex">
          <div class="col-2" v-for="(skill, index) in state.rskillData" :key="index">
            <div v-if="skill!=null" style="transform:scale(50%)">
              <img :src="state.rskillUrl[index]">
            </div>
          </div>
        </div>
        <input type="file" name="file" ref="input2" style="display:none" @change="preview2" accept="image/*" multiple/>
      </div>

      <template #footer>
          <Button label="Complete" icon="pi pi-check" @click="complete" autofocus />
      </template>
    </Dialog>
</template>

<script>
export default {
    name:"AppendRecord",
    props:["isdisplay","killerName"],
    data(){
      return{
        heightOptions: ([{hei:"Tall"}, {hei:"Average"}, {hei:"Short"}]),
        drOptions: ([{dr:"Easy"}, {dr:"Moderate"}, {dr:"Hard"}, {dr:"Very Hard"}]),
      }
    },
}
</script>

<script setup>
import { ref, reactive, defineEmits } from "vue"
import { useRouter } from "vue-router"

const modalStatue = (i, isClear) => {
    emits("childmodal", i, isClear)
}

const input1 = ref(null)
const input2 = ref(null)
const disable = ref([false])
const isConfirm = ref(false)
const moveChecked = ref(false)
const terrorChecked = ref(false)

const clickInput1 = () => input1.value.click()
const clickInput2 = () => input2.value.click()

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
  skillData: [],
  skillUrl: [],
  rskillData: [],
  rskillUrl: []
})

const preview = event => {
  const files = event.target.files
  for(let i = 0;i<files.length;i++){
    const filename = files[i].name
    if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!")
    }
    const fileReader = new FileReader()
    fileReader.addEventListener("load",() => {
      state.skillUrl[i]= fileReader.result
    })
    fileReader.readAsDataURL(files[i])
    state.skillData[i] = files[i]
    emits("uploadData", files[i], "killerSkills")
  }
}

const preview2 = event => {
  const files = event.target.files
  for(let i = 0;i<files.length;i++){
    const filename = files[i].name
    if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!")
    }
    const fileReader = new FileReader()
    fileReader.addEventListener("load",() => {
      state.rskillUrl[i]= fileReader.result
    })
    fileReader.readAsDataURL(files[i])
    state.rskillData[i] = files[i]
    emits("uploadData", files[i], "killerSkills")
  }
}

const updateSettings = (dis, select, data) => {
  emits("updateSettings", select, data)
  if(data){
    disable.value[dis] = true
    isConfirm.value = true
  }
}

const clearData = () => {
  state.move = "",
  state.altMove = "",
  state.terror = "",
  state.altTerror ="",
  state.height = "",
  state.weapon = "",
  state.power = "",
  state.background = "",
  state.realName = "",
  state.difficulty = "",
  state.skillData = [],
  state.skillUrl = [],
  state.rskillData = [],
  state.rskillUrl = []
}

const router = useRouter()
const complete = () => {
  if(isConfirm.value){
    clearData()
    isConfirm.value = false
    disable.value = false
    router.push("/personal")
  }
  modalStatue(0)
}

const emits = defineEmits(["updateSettings", "uploadData", "childmodal"])
</script> 

<style scoped>
@import "../../assets/css/index.css";
</style>