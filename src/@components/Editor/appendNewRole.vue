<template>
  <div>
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
        <Button type="back" label="Back" @click="backToKiller" class="p-button-info my-2 mx-5" />
    </form>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, onUpdated, ref, reactive } from "vue"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
const props = defineProps(["drOptions", "levelOptions"])
const emits = defineEmits(["addKiller", "onUpload", "backToKiller"])

const drOptions = ref([])
const levelOptions = ref([])
const input1 = ref(null)
const submitted = ref(false)
const clickInput1 = () => {
    input1.value.click()
}

const backToKiller = () => {
    emits("backToKiller", false)
}

const state = reactive({
    newKillerName : "",
    newKillerLevel : "",
    newKillerDR: "",
    imgUrl: "",
    imgData: null,
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
  emits("onUpload", files[0])
}

const handleSubmit = (isFormValid, state) => {
    submitted.value = true
    if (!isFormValid) { return }
    emits("addKiller", state)
    clearData()
}

const clearData = () => {
  state.newKillerLevel = ""
  state.newKillerName = ""
  state.newKillerDR = ""
  state.imgData = null
  state.imgUrl = ""
}

onUpdated(() => {
    drOptions.value = props.drOptions
    levelOptions.value = props.levelOptions
})
</script>

<style>

</style>