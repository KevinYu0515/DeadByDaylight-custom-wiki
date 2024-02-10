<template>
  <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="add_ones_table" tableStyle="width: 100%"
    expandableRowGroups rowGroupMode="subheader" groupRowsBy="rarity"
    scrollable scrollHeight="70vh"
    v-model:selection="selectedProduct"
    @rowSelect="onRowSelect" 
    @rowUnselect="onRowUnselect"
    selectionMode="single" 
    dataKey="id"
    :metaKeySelection="false"
  >
    <template #groupheader="slotProps">
      <span class="vertical-align-middle ml-2 font-bold line-height-3">
        {{ slotProps.data.rarity.replace(/\b\w/g, (match) => match.toUpperCase()) }}
      </span>
    </template>
    <Column field="rarity" header="Rarity"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="description" header="Description"></Column>
    <template #groupfooter="slotProps">
      <Button label="Add New AddOnes" @click="appendNewAddOnes(slotProps.data.rarity)" class="p-button-text"/>
    </template>
  </DataTable>
  <Dialog
    :header="`Add 「${isAppendType}」 Perk`"
    v-model:visible="isAppendVisible" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :model="true"
  >
    <form @submit.prevent="handleSubmit(!v$.$invalid, state)">
      <div class="flex flex-column">
          <div class="flex flex-column">
            <label class="font-bold">Name</label>
            <InputText class="my-3" v-model="v$.name.$model" placeholder="name" autofocus />
            <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">
              {{v$.name.required.$message.replace('Value', 'Usefulness')}}
            </small>
          </div>
          <div class="flex flex-column">
            <label class="font-bold">Description</label>
            <Textarea
              class="my-3" 
              v-model="v$.description.$model"
              placeholder="description"
              :autoResize="true" 
              rows="5" 
              cols="50" 
            />
            <small v-if="(v$.description.$invalid && submitted) || v$.description.$pending.$response" class="p-error">
              {{v$.description.required.$message.replace('Value', 'Usefulness')}}
            </small>
          </div>
          <div class="flex flex-wrap gap-5 align-items-center">
            <Button 
              label="AddOnes Image Upload"
              class="p-button-warning flex"
              @click="clickInput1()" 
            />
            <Button
              type="submit"
              label="Submit"
              class="flex mx-2"
            />
            <Button
              label="Cancel"
              class="p-button-info flex"
              @click="isAppendVisible = false"
            />
          </div>
          <div v-if="state.image" style="transform:scale(50%)">                     
            <img :src="state.image">
          </div>
      </div>
      <input data-type="addOnes" type="file" name="file" ref="input1" style="display:none" @change="preview" accept="image/*" multiple/>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, onUpdated, computed, reactive, defineProps, defineEmits } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const props = defineProps(["addOnes", "tabIndex", "selected"]);
const emits = defineEmits(["selectItems", "lastIndex", "addAddOnes"]);
const isAppendType = ref("Common");
const isAppendVisible = ref(false);
const addOnes = ref([]);
const expandedRowGroups = ref();
const selectedProduct = ref();
const visibleRight = ref(false);
const input1 = ref();
const clickInput1 = () => input1.value.click();
const selected = ref(null);
const selectOnes = reactive({
    id: "",
    image: "",
    name: "",
    description: ""
});

const state = reactive({
  image: "",
  description: "",
  name: "",
  rarity: ""
});

const rules = {
  description: { required },
  name: { required }
};

const v$ = useVuelidate(rules, state);

const add_ones_table = computed(() => {
  if(Object.keys(addOnes.value).length !== 0){
    const result = [];
    let idx = 0;
    for(const [key, value] of Object.entries(addOnes.value)){
      if(Object.keys(value).length === 0) result.push({rarity: key, id: `0x${idx++}`});
      else result.push(...addOnes.value[key]);
    }
    return result;
  }
  return [];
});

const onRowSelect = (event) => {
    selectOnes.id = event.data.id;
    selectOnes.image = event.data.image;
    selectOnes.name = event.data.name;
    selectOnes.description = event.data.description;
    visibleRight.value = true;
    emits("selectItems", visibleRight.value, selectOnes);
};

const onRowUnselect = () => {
    selectOnes.id = "";
    selectOnes.image = "";
    selectOnes.name = "";
    selectOnes.description = "";
    visibleRight.value = false;
    emits("selectItems", visibleRight.value, selectOnes);
};

const appendNewAddOnes = res => {
  isAppendVisible.value = !isAppendVisible.value;
  isAppendType.value = res.replace(/\b\w/g, (match) => match.toUpperCase());
};

const handleSubmit = (isFormValid, state) => {
  if (!isFormValid) { return; }
  state.rarity = isAppendType.value.toLowerCase();
  emits("addAddOnes", state);
  isAppendVisible.value = false;
};

const preview = event => {
  const files = event.target.files;
  const filename = files[0].name;
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!");
  }
  const fileReader = new FileReader();
  fileReader.addEventListener("load",() => state.image = fileReader.result);
  fileReader.readAsDataURL(files[0]);
};

onUpdated(() => {
    addOnes.value = props.addOnes;
    selected.value = props.selected;
    if(!selected.value) onRowUnselect();
});
</script>