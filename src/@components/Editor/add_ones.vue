<template>
    <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="add_ones_table" tableStyle="width: 100%"
        expandableRowGroups rowGroupMode="subheader" groupRowsBy="rarity"
        scrollable scrollHeight="70vh"
        v-model:selection="selectedProduct"
        @rowSelect="onRowSelect" 
        @rowUnselect="onRowUnselect"
        selectionMode="single" 
        dataKey="name" 
        :metaKeySelection="false"
    >
        <template #groupheader="slotProps">
            <span class="vertical-align-middle ml-2 font-bold line-height-3">{{ slotProps.data.rarity }}</span>
        </template>
        <Column field="rarity" header="Rarity"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="description" header="Description"></Column>
    </DataTable>
</template>

<script setup>
import { defineProps, defineEmits, ref, onUpdated, computed, reactive } from "vue"
const props = defineProps(["add_ones_images", "add_ones_names", "tabIndex", "selected"])
const add_ones_images = ref([])
const add_ones_names = ref([])
const expandedRowGroups = ref()
const selectedProduct = ref()
const visibleRight = ref(false)
const selected = ref(null)
const selectOnes = reactive({
    url: "",
    name: "",
    description: ""
})

const filterText = (text, num) => text.slice(0, num * -1)

const add_ones_table = computed(() => {
    const list = []
    let cnt = 0
    let rarity = "gray"
    for(let index = 0; index < add_ones_images.value.length; index++){
        if(cnt >= 4) rarity = "yellow"
        if(cnt >= 8) rarity = "green"
        if(cnt >= 12) rarity = "purple"
        if(cnt >= 14) rarity = "red"
        ++cnt
        list.push({
            rarity,
            name: filterText(add_ones_names.value[index], 4),
            url: add_ones_images.value[index],
            description: "A scratched and worn brace made of thick, cured animal skin. The Trapper can no longer be caught in his own Bear Traps, they will instead be disarmed when he steps onto them."
        })
    }
    return list
})

const onRowSelect = (event) => {
    selectOnes.url = event.data.url
    selectOnes.name = event.data.name
    selectOnes.description = event.data.description
    visibleRight.value = true
    emits("selectItems", visibleRight.value, selectOnes)
}

const onRowUnselect = () => {
    selectOnes.url = ""
    selectOnes.name = ""
    selectOnes.description = ""
    visibleRight.value = false
    emits("selectItems", visibleRight.value, selectOnes)
}

const emits = defineEmits(["selectItems", "lastIndex"])

onUpdated(() => {
    add_ones_images.value = props.add_ones_images
    add_ones_names.value = props.add_ones_names
    selected.value = props.selected
    if(!selected.value) onRowUnselect()
})

</script>

<style lang="scss" scoped>
.add-ones-block{
    display: inline;
}
</style>