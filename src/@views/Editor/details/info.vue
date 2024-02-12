<template>
  <DataTable 
    :value="infoTable" 
    editMode="cell" 
    @cell-edit-complete="onCellEditComplete" 
    tableClass="editable-cells-table" 
    tableStyle="max-width: 100%"
    scrollable
    scrollHeight="65vh"
  >
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="width: 25%">
        <template #body="{ data, field }">
            {{ data[field] }}
        </template>
        <template #editor="{ data, field }">
            <template v-if="field !== 'type' && data.type === 'Difficulty'">
                <Dropdown
                    v-model="data[field]"
                    :options="drOptions"
                    optionLabel="dr"
                    optionValue="dr"
                    :value="data[field]"
                    class="mx-1 my-1"
                    style="width:200px"
                />
            </template>
            <template v-else-if="field !== 'type'">
                <InputText v-model="data[field]" autofocus />
            </template>
            <template v-else>
                {{ data[field] }}
            </template>
        </template>
    </Column>
    <template #footer>
      <Button label="Add New Information" @click="isAppendVisible = true" class="p-button-text"/>
    </template>
  </DataTable>
  <Dialog
    :header="`Add 「New」 Information`"
    v-model:visible="isAppendVisible" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
    :style="{width: '50vw'}" :model="true"
  >
    <form @submit.prevent="handleSubmit(!v$.$invalid, state)">
      <div class="flex flex-column">
          <div class="flex flex-column">
            <label class="font-bold">Information Name</label>
            <div class="flex">
              <InputText class="my-3" v-model="v$.name.$model" placeholder="name" autofocus />
              <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">
                {{v$.name.required.$message.replace('Value', 'Usefulness')}}
              </small>
              <InputText class="my-3 mx-2" v-model="state.subname" placeholder="subname" autofocus />
            </div>
          </div>
          <div class="flex flex-column">
            <label class="font-bold">Information Value</label>
            <InputText class="my-3" v-model="v$.value.$model" placeholder="value" autofocus />
            <small v-if="(v$.value.$invalid && submitted) || v$.value.$pending.$response" class="p-error">
              {{v$.value.required.$message.replace('Value', 'Usefulness')}}
            </small>
          </div>
      </div>
      <Button type="submit"  label="Submit" class="mt-2" />
    </form>
  </Dialog>
</template>

<script setup>
import { computed, reactive, ref, onUpdated, defineProps, defineEmits } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { cloneDeep } from "lodash-es";
const isAppendVisible = ref(false);
const columns = ref([
    { field: "type", header: "Type" },
    { field: "value", header: "Value" }
]);
const refInfo = ref({});
const drOptions = computed(() => props.drOptions);
const emits = defineEmits(["updateInfo", "addInfo"]);
const props = defineProps({
    info: Object, 
    drOptions: Array
});
const infoTable = computed(() => {
    if(refInfo.value === null) return null;
    const result = [];
    for(let data of Object.entries(refInfo.value)){
        data[0] = data[0].charAt(0).toUpperCase() + data[0].slice(1);
        if(data[0] === "Cover" || data[0] === "Lore") continue;
        else if(typeof(data[1]) === "object"){
            for(let _data of Object.entries(data[1])){
                result.push({
                    type: `${data[0]}(${_data[0]})`,
                    value: _data[1]
                });
            }
        }
        else{
            result.push({
                type: data[0],
                value: data[1]
            });
        }
    }
    return result;
});

const state = reactive({
  name: "",
  subname: "",
  value: ""
});

const rules = {
  value: { required },
  name: { required }
};

const v$ = useVuelidate(rules, state);

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event;
  data.type = data.type.replace(/\b\w/g, (match) => match.toLowerCase());
  if(field === "value" && newValue){
      if (newValue.trim().length > 0){
          if(data.type.includes("(") && data.type.includes(")")){
            const index1 = data.type.indexOf("(");
            const index2 = data.type.indexOf(")");
            data[field] = newValue;
            refInfo.value[data.type.slice(0, index1)][data.type.slice(index1 + 1, index2)] = newValue;
          }
          else{
            data[field] = newValue;
            refInfo.value[data.type] = newValue;
          }
      }
      else event.preventDefault();
      emits("updateInfo", {info: refInfo.value});
  }
};

const handleSubmit = (isFormValid, state) => {
  if (!isFormValid) { return; }
  state.name = state.name.replace(/\b\w/g, (match) => match.toLowerCase());
  if(state.name === "name") refInfo.value[state.name].push(state.value);
  else if(state.subname){
    const keys = Object.keys(refInfo.value).map(data => data.replace(/\b\w/g, (match) => match.toLowerCase()));
    if(keys.some(data => data === state.name)) refInfo.value[state.name][state.subname] = state.value;
    else refInfo.value[state.name] = {[state.subname]: state.value};
  }
  else refInfo.value[state.name] = state.value;
  emits("updateInfo", {info: refInfo.value});
  isAppendVisible.value = false;
};

onUpdated(() => {
  refInfo.value = cloneDeep(props.info);
});
</script>