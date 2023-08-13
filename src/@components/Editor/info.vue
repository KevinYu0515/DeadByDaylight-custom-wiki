<template>
  <DataTable 
    :value="infoTable" 
    editMode="cell" 
    @cell-edit-complete="onCellEditComplete" 
    tableClass="editable-cells-table" 
    tableStyle="min-width: 50rem"
    scrollable
    scrollHeight="70vh"
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
  </DataTable>
</template>

<script setup>
import { defineProps, defineEmits, reactive, onUpdated, computed, ref } from "vue"
const columns = ref([
    { field: "type", header: "Type" },
    { field: "value", header: "Value" }
])
const drOptions = computed(() => props.drOptions)
const emits = defineEmits(["updateInfo"])
const props = defineProps({
    difficulty: String,
    realName: String,
    weapon: String,
    power: String,
    movementSpeed: String,
    alternativeMovementSpeed: String,
    terrorRadius: String,
    alternativeTerrorRadius: String,
    height: String,
    drOptions: Array
})
const info = reactive({
    difficulty: "",
    realName: "",
    weapon: "",
    power: "",
    movementSpeed: "",
    alternativeMovementSpeed: "",
    terrorRadius: "",
    alternativeTerrorRadius: "",
    height: ""
})
const infoTable = computed(() => {
    const list = Object.entries(info).map(data => { return { type: data[0].charAt(0).toUpperCase() + data[0].slice(1), value: data[1] }})
    return list
})
const onCellEditComplete = (event) => {
    console.log(event)
    let { data, newValue, field } = event
    if(field === "value" && newValue){
        if (newValue.trim().length > 0) data[field] = newValue
        else event.preventDefault()
        emits("updateInfo", data.type, newValue)
    }
}

onUpdated(() => {
    info.difficulty = props.difficulty
    info.realName = props.realName
    info.weapon = props.weapon
    info.power = props.power
    info.movementSpeed = props.movementSpeed
    info.alternativeMovementSpeed = props.alternativeMovementSpeed
    info.terrorRadius = props.terrorRadius
    info.alternativeTerrorRadius = props.alternativeTerrorRadius
    info.height = props.height
})
</script>

<style>

</style>