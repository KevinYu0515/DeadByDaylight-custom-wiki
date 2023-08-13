<template>
  <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="perks_table" tableStyle="width: 100%"
    expandableRowGroups rowGroupMode="subheader" groupRowsBy="type"
    scrollable scrollHeight="70vh"
    v-model:selection="selectedProduct"
    @rowSelect="onRowSelect" 
    @rowUnselect="onRowUnselect"
    selectionMode="single" 
    dataKey="url" 
    :metaKeySelection="false"
  >
    <template #groupheader="slotProps">
        <span class="vertical-align-middle ml-2 font-bold line-height-3">{{ slotProps.data.type }}</span>
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
      :header="`Add ${isAppendType} Perk`"
      v-model:visible="isAppendVisible" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
      :style="{width: '50vw'}" :model="true"
    >
      <div class="flex flex-column">
          <div class="flex flex-column">
            <label class="font-bold">Name</label>
            <InputText class="my-3" v-model="newPerk.name" placeholder="name" autofocus />
          </div>
          <div class="flex flex-column">
            <label class="font-bold">Description</label>
            <InputText class="my-3" v-model="newPerk.description" placeholder="description" autofocus />
          </div>
          <Button 
            label="Perk Image Upload"  
            class="p-button-warning my-2"
            style="max-width:30%;"
            @click="clickInput1()" 
          />
          <div v-if="newPerk.url" style="transform:scale(50%)">                     
            <img :src="newPerk.url">
          </div>
      </div>
      <input data-type="perk" type="file" name="file" ref="input1" style="display:none" @change="preview" accept="image/*" multiple/>
  </Dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive, onUpdated, computed } from "vue"
const props = defineProps(["perks", "recommendPerks", "selected"])
const emits = defineEmits(["selectItems", "uploadData"])
const perks = ref([])
const recommendPerks = ref([])
const selected = ref(true)
const visibleRight = ref(false)
const selectedProduct = ref()
const expandedRowGroups = ref()
const isAppendVisible = ref(false)
const isAppendType = ref(null)
const input1 = ref(null)
const clickInput1 = () => input1.value.click()

const perks_table = computed(() => {
    const list = []
    for(let index = 0; index < perks.value.length; index++){
        list.push({
            type: "self",
            name: "self name",
            url: perks.value[index],
            description: "記者曹佼人：「回到這處停靠站，所有車輛都是正常停靠，如果順利的把它放回去，是非常順的可以把它停好，但如果要像圖片這樣子，車頭擺在這邊，但車身是橫跨了另外一個停車柱，其實這樣90度彎曲，很明顯就是惡意亂放。」"
        })
    }
    for(let index = 0; index < recommendPerks.value.length; index++){
        list.push({
            type: "recommend",
            name: "recommend name",
            url: recommendPerks.value[index],
            description: ""
        })
    }
    return list
})

const selectPerks = reactive({
  url: "",
  name: "",
  description: ""
})

const onRowSelect = event => {
  selectPerks.url = event.data.url
  selectPerks.name = event.data.name
  selectPerks.description = event.data.description
  visibleRight.value = true
  emits("selectItems", visibleRight.value, selectPerks)
}

const onRowUnselect = () => {
  selectPerks.url = ""
  selectPerks.name = ""
  selectPerks.description = ""
  visibleRight.value = false
  emits("selectItems", visibleRight.value, selectPerks)
}

const appendNewPerks = res => {
  isAppendVisible.value = !isAppendVisible.value
  isAppendType.value = res
}

const newPerk = reactive({
  data: "",
  url: "",
  description: "",
  name: ""
})

const preview = event => {
  const files = event.target.files
  const filename = files[0].name
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener("load",() => newPerk.url = fileReader.result)
  fileReader.readAsDataURL(files[0])
  newPerk.data = files[0]
  emits("uploadData", files[0], "killersSkills")
}

onUpdated(() => {
    perks.value = props.perks
    recommendPerks.value = props.recommendPerks
    selected.value = props.selected
    if(selected.value === false) onRowUnselect()
})
</script>