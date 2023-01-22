<template>
  <Dialog
      :header="`${killer_information.name} Settings`"
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
      <div class="flex flex-column my-2">
        <div class="flex align-items-center">
          <h3>Movement Speed</h3>
          <InputSwitch class="mx-2" v-model="moveChecked" />
          <p>Switch On if you need to edit alternative movement speed</p>
        </div>
        <div class="flex align-items-center">
          <Textarea class="my-2" placeholder="Movement Speed" v-model="state.movementSpeed" :autoResize="true" rows="1" cols="20" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[2]" @click="updateSettings(2, 'movementSpeed', state.movementSpeed)" autofocus />
        </div>
        <div class="altmove" v-show="moveChecked">
          <h3>Altnative Movement Speed</h3>
          <div class="flex align-items-center">
            <Textarea class="my-2" placeholder="Altnative Movement Speed" v-model="state.alternativeMovementSpeed" :autoResize="true" rows="1" cols="30" />
            <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[3]" @click="updateSettings(3, 'altnativeMoveSpeed', state.alternativeMovementSpeed)" autofocus />
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
          <Textarea class="my-2" placeholder="Terror Radius" v-model="state.terrorRadius" :autoResize="true" rows="1" cols="20" />
          <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[4]" @click="updateSettings(4, 'terrorRadius', state.terrorRadius)" autofocus />
        </div>
        <div class="altmove" v-show="terrorChecked">
          <h3>Altnative Terror Radius</h3>
          <div class="flex align-items-center">
            <Textarea class="my-2" placeholder="Altnative Terror Radius" v-model="state.alternativeTerrorRadius" :autoResize="true" rows="1" cols="30" />
            <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[5]" @click="updateSettings(5, 'altnativeTerrorRadius', state.alternativeTerrorRadius)" autofocus />
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
        <h3>Perks</h3>
        <Button 
          label="Perks Upload"  
          class="p-button-warning my-2"
          style="max-width:100%"
          @click="clickInput1" 
        />
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[10]" @click="updateSettings(10, 'perks', state.perkUrl)" autofocus />
        <div class="flex">
          <div class="col-3" v-for="(perk, index) in state.perkData" :key="index">
            <div v-if="perk!=null" style="transform:scale(50%)">                     
              <img :src="state.perkUrl[index]">
            </div>
          </div>
        </div>
        <input data-type="perks" type="file" name="file" ref="input1" style="display:none" @change="preview" accept="image/*" multiple/>
        <Button 
          label="Recommend perks Upload"
          class="p-button-warning my-2"
          style="max-width:100%"
          @click="clickInput2" 
        /> 
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[11]" @click="updateSettings(11, 'recommendPerks', state.recommendPerkUrl)" autofocus />
        <div class="flex">
          <div class="col-2" v-for="(perk, index) in state.recommendPerkData" :key="index">
            <div v-if="perk!=null" style="transform:scale(50%)">
              <img :src="state.recommendPerkUrl[index]">
            </div>
          </div>
        </div>
        <input data-type="recommendPerks" type="file" name="file" ref="input2" style="display:none" @change="preview2" accept="image/*" multiple/>
      </div>
      <div class="my-2">
        <h3>Add-Ones</h3>
        <Button 
          label="Add-ones Upload"
          class="p-button-warning my-2"
          style="max-width:100%"
          @click="clickInput3" 
        /> 
        <Button label="Confirm" class="mx-2 my-2"  :disabled="disable[12]" @click="updateSettings(12, 'add_ones_images', state.add_ones_url); updateSettings(12, 'add_ones_names', state.add_ones_data)" autofocus />
        <div class="flex">
          <div class="col-2" v-for="(add_one, index) in state.add_ones_data" :key="index">
            <div v-if="add_one!=null" style="transform:scale(50%)">
              <img :src="state.add_ones_url[index]">
            </div>
          </div>
        </div>
        <input data-type="add-ones" type="file" name="file" ref="input3" style="display:none" @change="preview3" accept="image/*" multiple/>
      </div>

      <template #footer>
          <Button label="Complete" icon="pi pi-check" @click="complete" autofocus data-type="complete" />
      </template>
    </Dialog>
</template>

<script>
export default {
    name:"AppendRecord",
    props:["isdisplay", "killer_information"],
    data(){
      return{
        heightOptions: ([{hei:"Tall"}, {hei:"Average"}, {hei:"Short"}]),
        drOptions: ([{dr:"Easy"}, {dr:"Moderate"}, {dr:"Hard"}, {dr:"Very Hard"}]),
      }
    },
}
</script>

<script setup>
import { ref, reactive, defineEmits, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"

const Instance = getCurrentInstance()
const modalStatue = (i, isClear) => {
  emits("childmodal", i, isClear)
}

const killer_information = JSON.parse(Instance.props.killer_information)
const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const disable = ref([false])
const isConfirm = ref(false)
const moveChecked = ref(false)
const terrorChecked = ref(false)

const clickInput1 = () => input1.value.click()
const clickInput2 = () => input2.value.click()
const clickInput3 = () => input3.value.click()

const state = reactive({
  movementSpeed: killer_information.movementSpeed,
  alternativeMovementSpeed: killer_information.alternativemoventSpeed,
  terrorRadius: killer_information.terrorRadius,
  alternativeTerrorRadius: killer_information.alternativeTerrorRadius,
  height: killer_information.height,
  weapon: killer_information.weapon,
  power: killer_information.power,
  background: killer_information.background,
  realName: killer_information.realName,
  difficulty: killer_information.difficulty,
  perkData: killer_information.perks,
  perkUrl: killer_information.perks,
  recommendPerkData: killer_information.recommendPerks,
  recommendPerkUrl: killer_information.recommendPerks,
  add_ones_url: killer_information.add_ones_images,
  add_ones_data: killer_information.add_ones_names
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
      state.perkUrl[i]= fileReader.result
    })
    fileReader.readAsDataURL(files[i])
    state.perkData[i] = files[i]
    emits("uploadData", files[i], "killersSkills")
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
      state.recommendPerkUrl[i]= fileReader.result
    })
    fileReader.readAsDataURL(files[i])
    state.recommendPerkData[i] = files[i]
    emits("uploadData", files[i], "killersSkills")
  }
}

const preview3 = event => {
  console.log(Array.isArray(state.add_ones_url))
  console.log(Array.isArray(state.add_ones_data))
  const files = event.target.files
  for(let i = 0;i<files.length;i++){
    const filename = files[i].name
    if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!")
    }
    const fileReader = new FileReader()
    fileReader.addEventListener("load",() => {
      state.add_ones_url[i]= fileReader.result
    })
    fileReader.readAsDataURL(files[i])
    state.add_ones_data[i] = filename
    emits("uploadData", files[i], "add-ones/" + killer_information.name)
  }
}

const updateSettings = (dis, select, data) => {
  emits("updateSettings", select, data)
  disable.value[dis] = true
  isConfirm.value = true
}

const clearData = () => {
  state.movementSpeed = "",
  state.alternativeMovementSpeed = "",
  state.terrorRadius = "",
  state.alternativeTerrorRadius ="",
  state.height = "",
  state.weapon = "",
  state.power = "",
  state.background = "",
  state.realName = "",
  state.difficulty = "",
  state.perkData = [],
  state.perkUrl = [],
  state.recommendPerkData = [],
  state.recommendPerkUrl = [],
  state.add_ones_data = [],
  state.add_ones_url = []
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