<template>
  <div>
    <form @submit.prevent="handleSubmit(!v$.$invalid, state)">
        <Dropdown
          v-model="v$.info.rank.$model" :class="{'p-invalid':v$.info.rank.$invalid && submitted}"
          :options="levelOptions"
          optionLabel="level"
          optionValue="level"
          placeholder="ALL"
          class="mx-1 my-1"
          style="width:200px"
        />
        <small v-if="(v$.info.rank.$invalid && submitted) || v$.info.rank.$pending.$response" class="p-error">
          {{v$.info.rank.required.$message.replace('Value', 'Rank')}}
        </small>
        <InputText 
          placeholder="KillerName"
          class="mx-1 my-1"
          v-model="v$.info.name.$model" :class="{'p-invalid':v$.info.name.$invalid && submitted}"
          required
        />
        <small v-if="(v$.info.name.$invalid && submitted) || v$.info.name.$pending.$response" class="p-error">
          {{v$.info.name.required.$message.replace('Value', 'Name')}}
        </small>
        <Dropdown
          v-model="v$.info.difficulty.$model" :class="{'p-invalid':v$.info.difficulty.$invalid && submitted}"
          :options="drOptions"
          optionLabel="dr"
          optionValue="dr"
          placeholder="Difficutly Rating"
          class="mx-1 my-1"
          style="width:200px"
        />
        <small v-if="(v$.info.difficulty.$invalid && submitted) || v$.info.difficulty.$pending.$response" class="p-error">
          {{v$.info.difficulty.required.$message.replace('Value', 'Difficulty Rating')}}
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
        <div v-if="state.info.cover">
          <img class="preview" height="252" width="192" :src="state.info.cover">
        <br>
        </div>
        <Button type="back" label="Back" @click="backToKiller" class="p-button-info my-2 mx-5" />
    </form>
  </div>
</template>

<script setup>
import { onUpdated, ref, reactive, defineProps, defineEmits } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Timestamp } from "@firebase/firestore";
const props = defineProps(["drOptions", "levelOptions"]);
const emits = defineEmits(["addKiller", "onUpload", "backToKiller"]);

const drOptions = ref([]);
const levelOptions = ref([]);
const input1 = ref(null);
const submitted = ref(false);
const clickInput1 = () => {
  input1.value.click();
};

const backToKiller = () => {
  emits("backToKiller", false);
};

const state = reactive({
  build: "",
  info: {
    name: "",
    rank: "",
    difficulty: "",
    cover: "",
    lore: "",
    height: "",
    movementSpeed: {
      normal: ""
    },
    terrorRadius: {
      normal: ""
    },
    power: "",
    weapon: ""
  }
});

const rules = {
  info: {
    rank: { required },
    name: { required },
    difficulty: { required }
  }
};

const v$ = useVuelidate(rules, state);

const previewImage = event => {
  const files = event.target.files;
  let filename = files[0].name;
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!");
  }
  const fileReader = new FileReader();
  fileReader.addEventListener("load",()=>{
    state.info.cover = fileReader.result;
  });
  fileReader.readAsDataURL(files[0]);
  emits("onUpload", files[0]);
};

const handleSubmit = (isFormValid, state) => {
  submitted.value = true;
  if (!isFormValid) { return; }
  state.build = Timestamp.fromDate(new Date());
  console.log(state.build);
  emits("addKiller", state);
  clearData();
};

const clearData = () => {
  state.name = "";
  state.difficulty = "";
  state.cover = "";
  state.rank = "";
};

onUpdated(() => {
  drOptions.value = props.drOptions;
  levelOptions.value = props.levelOptions;
});
</script>