<template>
   <Dialog 
        header="Append New Role" 
        v-model:visible="isdisplay" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
        :style="{width: '50vw'}" :modal="true"
    >
    <form @submit.prevent="handleSubmit(!v$.$invalid, state)">
        <Dropdown
            v-model="v$.newKillerLevel.$model" :class="{'p-invalid':v$.newKillerLevel.$invalid && submitted}"
            :options="levelOptions"
            optionLabel="level"
            optionValue="level"
            placeholder="ALL"
            class="mx-1 my-1"
            style="width:200px"
        />
        <small v-if="(v$.newKillerLevel.$invalid && submitted) || v$.newKillerLevel.$pending.$response" class="p-error">
            {{v$.newKillerLevel.required.$message.replace('Value', 'Level')}}
        </small>
        <InputText 
            placeholder="KillerName"
            class="mx-1 my-1"
            v-model="v$.newKillerName.$model" :class="{'p-invalid':v$.newKillerName.$invalid && submitted}"
            required
        />
        <small v-if="(v$.newKillerName.$invalid && submitted) || v$.newKillerName.$pending.$response" class="p-error">
            {{v$.newKillerName.required.$message.replace('Value', 'Name')}}
        </small>
        <Dropdown
            v-model="v$.newKillerDR.$model" :class="{'p-invalid':v$.newKillerDR.$invalid && submitted}"
            :options="drOptions"
            optionLabel="dr"
            optionValue="dr"
            placeholder="Difficutly Rating"
            class="mx-1 my-1"
            style="width:200px"
        />
        <small v-if="(v$.newKillerDR.$invalid && submitted) || v$.newKillerDR.$pending.$response" class="p-error">
            {{v$.newKillerDR.required.$message.replace('Value', 'Difficulty Rating')}}
        </small>
        <br/>
        <hr class="inDialog">
        <Button 
            label="Upload Cover"  
            class="p-button-warning my-2 col-fixed"
            style="max-width:100%; margin-right:30px;"
            @click="clickInput1"
        />
        <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="image/*" required/>
        <Button type="submit" label="Submit" class="my-2" />
        <div v-if="state.imgData!=null">
            <img class="preview" height="252" width="192" :src="state.imgUrl">
        <br>
        </div>
        </form>
        <template #footer>
            <Button label="Discard" icon="pi pi-trash" @click="modalStatue(1)" class="p-button-text"/>
        </template>
    </Dialog>
</template>

<script>
export default {
    name:"AppendRole",
    methods:{
        clickInput1(){
            this.$refs.input1.click()
        }
    }
}
</script>

<script setup>
import { ref, reactive, defineProps, defineEmits, defineExpose, onUpdated } from "vue"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"

const input1 = ref(null)
const submitted = ref(false)

const props = defineProps(["isdisplay","levelOptions","drOptions"])
const isdisplay = ref(false)
const levelOptions = ref(null)
const drOptions = ref(null)
onUpdated(() => {
    isdisplay.value = props.isdisplay
    levelOptions.value = props.levelOptions
    drOptions.value = props.drOptions
})

const emits = defineEmits(["uploadImg", "setKillerDoc", "childmodal"])

const state = reactive({
    newKillerName : "",
    newKillerLevel : "",
    newKillerDR: "",
    imgUrl: "",
    imgData: null
})

const rules = {
    newKillerLevel: { required },
    newKillerName: { required },
    newKillerDR: { required }
}

const v$ = useVuelidate(rules, state)

const previewImage = event => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener("load",()=>{
    state.imgUrl = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  state.imgData = files[0]
  emits("uploadImg", files[0])
}

const handleSubmit = (isFormValid, state) => {
    console.log("submit")
    submitted.value = true
    if (!isFormValid) { return }
    emits("setKillerDoc", state)
    clearData()
    modalStatue(0)
}

const modalStatue = (i, isClear) => {
    emits("childmodal", i, isClear)
    submitted.value = false
}

const clearData = () => {
  state.newKillerLevel = ""
  state.newKillerName = ""
  state.newKillerDR = ""
  state.imgData = null
  state.imgUrl = ""
}

defineExpose({ clearData })

</script>

<style scoped>
@import "../../assets/css/index.css";
</style>
