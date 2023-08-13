<template>
  <section>
    <TabMenu :model="items"/>
    <div class="content mb-5 relative">
      <div aria-label="perks" v-show="(tabIndex === 0)">
        <perk
          :perks="killers[killerIndex].perks"
          :recommendPerks="killers[killerIndex].recommendPerks"
          :selected="visibleRight"
          @select-items="Onselect"
          @upload-data="uploadData"
        ></perk>
      </div>

      <div aria-label="info" v-show="(tabIndex === 1)">
        <info
          v-bind="killer_info"
          @update-info = "updateInfo"
        ></info>
      </div>

      <div aria-label="addOnes" v-show="(tabIndex === 2)">
        <addOnes
          :add_ones_images="killers[killerIndex].add_ones_images"
          :add_ones_names="killers[killerIndex].add_ones_names"
          :selected="visibleRight"
          @select-items="Onselect"
        ></addOnes>
      </div>
      <div aria-label="settings" v-show="(tabIndex === 4)">
        <settings
          @delete="deleteKiller"
        ></settings>
      </div>
    </div>
  </section>
  <Sidebar v-model:visible="visibleRight" position="right">
      <InputText class="my-2" v-model="selectOnes.name" :value="selectOnes.name" autofocus />
      <div class="flex flex-column">
        <img class="my-5 align-self-center" :src="selectOnes.url" :alt="selectOnes.name" width="150" height="150">
        <span class="font-bold my-2">Description：</span>
        <Textarea 
          class="my-2" 
          :value="selectOnes.description"
          v-model="selectOnes.description"
          :autoResize="true" 
          rows="5" 
          cols="50" 
        />
        <Button
          label="Confirm"  
          class="p-button-success bs mb-3"
          style="max-width:100%;"
          @click="updateData()"
        />
      </div>
  </Sidebar>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, computed, defineProps, onUpdated, reactive } from "vue"
import killersStore from "../../vuex/killersStore"
import perksStore from "../../vuex/perksStore"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import perk from "../../@components/Editor/perk.vue"
import info from "../../@components/Editor/info.vue"
import addOnes from "../../@components/Editor/add_ones.vue"
import settings from "../../@components/Editor/settings.vue"
import $ from "jquery"

const store = useStore()
const tabIndex = ref(0)
const props = defineProps({"killerIndex": Number})
const killerIndex = ref(0)
const visibleRight = ref(null)
const router = useRouter()
const selectOnes = reactive({
  url: "",
  name: "",
  description: ""
})
const killers = computed(() => store.state.killers ? store.state.killers.fbkillers : [{
  id: null,
  perks: [],
  recommendPerks: [],
  realName: null,
  weapon: null,
  power: null,
  movementSpeed: null,
  alternativeMovementSpeed: null,
  terrorRadius: null,
  alternativeTerrorRadius: null,
  height: null,
  add_ones_images: [],
  add_ones_names: [],
  difficulty: null
}])

const drOptions = computed(() => store.state.killers ? store.state.killers.drOptions : [])
const killer_info = computed(() => { 
  return {
    difficulty: killers.value[killerIndex.value].difficulty,
    realName: killers.value[killerIndex.value].realName,
    weapon: killers.value[killerIndex.value].weapon,
    power: killers.value[killerIndex.value].power,
    movementSpeed: killers.value[killerIndex.value].movementSpeed,
    alternativeMovementSpeed: killers.value[killerIndex.value].alternativeMovementSpeed,
    terrorRadius: killers.value[killerIndex.value].terrorRadius,
    alternativeTerrorRadius: killers.value[killerIndex.value].alternativeTerrorRadius,
    height: killers.value[killerIndex.value].height,
    drOptions: drOptions.value
  }
})
const items = ref([
    {
        label: "Perk",
        icon: "pi pi-fw pi-home",
        command: () => {
          tabIndex.value = 0
        }
    },
    {
        label: "Info",
        icon: "pi pi-fw pi-calendar",
        command: () => {
          tabIndex.value = 1
        }
    },
    {
        label: "Add-Ones",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          tabIndex.value = 2
        }
    },
    {
        label: "Background",
        icon: "pi pi-fw pi-file",
        command: () => {
          tabIndex.value = 3
        }
    },
    {
        label: "Settings",
        icon: "pi pi-fw pi-file",
        command: () => {
          tabIndex.value = 4
        }
    }
])

const updateData = () => {
  alert("Ok")
  // store.dispatch("killers/UPDATEDATA", {
  //   id: killers.value[killerIndex].id,
  //   type, property, newValue
  // })
}

const Onselect = (isVisible, selectItems) => {
  visibleRight.value = isVisible
  selectOnes.url = selectItems.url
  selectOnes.name = selectItems.name
  selectOnes.description = selectItems.description
}

const updateInfo = (options, optionsValue) => {
  store.dispatch("killers/UPDATEDATA", {
    id: killers.value[killerIndex.value].id,
    options,
    optionsValue
  })
}

const uploadData = perk => store.dispatch("perks/UPLOADDATA", perk)

const deleteKiller = () => {
  router.push("/")
  store.dispatch("killers/DELETEROLE", killers.value[killerIndex.value].id)
}

onMounted(() => {
  store.registerModule("killers", killersStore)
  store.registerModule("perks", perksStore)
  store.dispatch("killers/GETDATA")
})

onUpdated(() => {
  killerIndex.value = props.killerIndex
  if(tabIndex.value !== 2 && tabIndex.value !== 0) visibleRight.value = false
  const close  = $("button[aria-label='close']")
  if(close){
    close.onClick = () => visibleRight.value = false
  }
})

onBeforeUnmount(() => {
  store.unregisterModule("killers")
  store.unregisterModule("perks")
})

</script>

<style lang="scss" scoped>
section{
  width: 70vw;
  position: absolute;
  top: 100px;
  left: 300px;
  .content{
    width: 100%;
    min-height: 70vh;
    padding: 10px;
    height: auto;
    background-color: antiquewhite;
  }
}

:global(.p-component-overlay){
  display: none;
}

:global(.p-sidebar-right){
  width: 25rem;
}
</style>