<template>
  <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="perks_table" tableStyle="width: 100%"
    expandableRowGroups rowGroupMode="subheader" groupRowsBy="type"
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
          {{ slotProps.data.type.replace(/\b\w/g, (match) => match.toUpperCase()) }}
        </span>
    </template>
    <Column field="type" header="Type"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="description" header="Description"></Column>
    <template #groupfooter="slotProps">
      <div v-if="(slotProps.data.type === 'self' && slotProps.index < 2 ) || slotProps.data.type === 'recommend'">
        <Button label="Add New Perk" @click="appendNewPerks(slotProps.data.type)" class="p-button-text"/>
      </div>
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
              label="Perk Image Upload"  
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
      <input data-type="perk" type="file" name="file" ref="input1" style="display:none" @change="preview" accept="image/*" multiple/>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, reactive, onUpdated, computed, defineProps, defineEmits } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { cloneDeep } from "lodash-es";
const props = defineProps(["perks", "selected"]);
const emits = defineEmits(["selectItems", "uploadData", "addPerk"]);
const perks = ref([]);
const selected = ref(true);
const visibleRight = ref(false);
const selectedProduct = ref();
const expandedRowGroups = ref();
const isAppendVisible = ref(false);
const isAppendType = ref("Self");
const input1 = ref(null);
const clickInput1 = () => input1.value.click();

const state = reactive({
  image: "",
  description: "",
  name: "",
  type: ""
});

const rules = {
  description: { required },
  name: { required }
};

const v$ = useVuelidate(rules, state);

const selectPerks = reactive({
  id: "",
  image: "",
  name: "",
  description: ""
});

const perks_table = computed(() => {
  const list = perks.value
                    .filter(data => data.type !== null)
                    .map(data => {
                      return {
                        id: data.id,
                        type: data.type,
                        name: data.name || "NULL",
                        image: data.image,
                        description: data.description
                      };
                    });
  if(!list.some(data => data.type === "self")) list.push({type: "self", id: "0x1"});
  if(!list.some(data => data.type === "recommend")) list.push({type: "recommend", id: "0x2"});
  list.sort((x, y) => {
    let compare = 0;
    if(x.type > y.type) compare = -1;
    return compare;
  });
  return list;
});

const onRowSelect = event => {
  selectPerks.id = event.data.id;
  selectPerks.image = event.data.image;
  selectPerks.name = event.data.name;
  selectPerks.description = event.data.description;
  visibleRight.value = true;
  emits("selectItems", visibleRight.value, selectPerks);
};

const onRowUnselect = () => {
  selectPerks.id = "";
  selectPerks.image = "";
  selectPerks.name = "";
  selectPerks.description = "";
  visibleRight.value = false;
  emits("selectItems", visibleRight.value, selectPerks);
};

const appendNewPerks = res => {
  isAppendVisible.value = !isAppendVisible.value;
  isAppendType.value = res.replace(/\b\w/g, (match) => match.toUpperCase());
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

const handleSubmit = (isFormValid, state) => {
  if (!isFormValid) { return; }
  state.type = isAppendType.value.toLowerCase();
  emits("addPerk", state);
  isAppendVisible.value = false;
};

onUpdated(() => {
  perks.value = cloneDeep(props.perks);
  selected.value = props.selected;
  if(selected.value === false) onRowUnselect();
});
</script>