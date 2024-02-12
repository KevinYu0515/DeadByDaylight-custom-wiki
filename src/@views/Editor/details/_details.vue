<template>
  <section>
    <TabMenu :model="items"/>
    <div class="content mb-5 relative">
      <div aria-label="perks" v-show="(tabIndex === 0)">
        <Perk
          :perks="perks"
          :selected="visibleRight"
          @select-items="Onselect"
          @upload-data="uploadData"
          @add-perk="addPerk"
        ></Perk>
      </div>

      <div aria-label="info" v-show="(tabIndex === 1)">
        <Info
          :info="killer.info"
          :drOptions="drOptions"
          @update-info = "updateInfo"
        ></Info>
      </div>

      <div aria-label="addOnes" v-show="(tabIndex === 2)">
        <AddOnes
          :addOnes="addOnes"
          :selected="visibleRight"
          @select-items="Onselect"
          @add-addOnes="addAddOnes"
        ></AddOnes>
      </div>
      <div aria-label="background" v-show="(tabIndex === 3)">
        <Lore
          :lore="killer.info.lore"
          @update-data="updateInfo"
        ></Lore>
      </div>
      <div aria-label="settings" v-show="(tabIndex === 4)">
        <Settings
          :build="killer.build || null"
          @delete="deleteKiller"
        ></Settings>
      </div>
    </div>
  </section>
  <Sidebar v-model:visible="visibleRight" position="right">
      <span class="font-bold my-2">Name：</span><br>
      <InputText
        class="my-2"
        v-model="selectOnes.name"
        :value="selectOnes.name === 'NULL' ? null : selectOnes.name"
        :placeholder="selectOnes.name === 'NULL' ? 'NULL' : null"
      />
      <div class="flex flex-column">
        <img class="my-5 align-self-center" :src="selectOnes.image" :alt="selectOnes.name" width="150" height="150">
        <span class="font-bold my-2">Description：</span>
        <Textarea 
          class="my-2" 
          :value="selectOnes.description"
          v-model="selectOnes.description"
          :placeholder="selectOnes.description || 'NULL'"
          rows="10" 
          cols="50" 
        />
        <div class="flex">
          <Button
            label="Confirm"
            class="p-button-success mx-2 my-2"
            style="max-width:100%;"
            @click="updateData(selectOnes)"
          />
          <Button
            label="Cancel"
            class="p-button-info mx-2 my-2"
            style="max-width:100%;"
            @click="visibleRight = false"
          />
        </div>
      </div>
  </Sidebar>
  <Toast />
</template>

<script setup>
import { ref, onBeforeMount, onUpdated, computed, reactive } from "vue";
import perksStore from "../../../vuex/perksStore";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Perk from "@/@views/Editor/details/perk.vue";
import Info from "@/@views/Editor/details//info.vue";
import AddOnes from "@/@views/Editor/details//add_ones.vue";
import Lore from "@/@views/Editor/details//lore.vue";
import Settings from "@/@views/Editor/details//settings.vue";
import $ from "jquery";
import { cloneDeep } from "lodash-es";

const store = useStore();
const tabIndex = ref(0);
const props = defineProps({"killerIndex": Number, "killerID": String});
const visibleRight = ref(null);
const router = useRouter();
const selectOnes = reactive({
  id: "",
  image: "",
  name: "",
  description: ""
});
const killer = computed(() => store.state.character ? store.state.character.data.killersInfo[props.killerIndex] : null);
const perks = computed(() => store.state.character ? store.state.character.data.perks : []);
const addOnes = computed(() => store.state.character ? store.state.character.data.addOnes : {});
const drOptions = computed(() => store.state.character ? store.state.character.drOptions : []);
const items = ref([
  {
      label: "Perk",
      icon: "pi pi-fw pi-home",
      command: () => {
        tabIndex.value = 0;
      }
  },
  {
      label: "Info",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        tabIndex.value = 1;
      }
  },
  {
      label: "Add-Ones",
      icon: "pi pi-th-large",
      command: () => {
        tabIndex.value = 2;
      }
  },
  {
      label: "Lore",
      icon: "pi pi-bookmark",
      command: () => {
        tabIndex.value = 3;
      }
  },
  {
      label: "Settings",
      icon: "pi pi-fw pi-file",
      command: () => {
        tabIndex.value = 4;
      }
  }
]);

const Onselect = (isVisible, selectItems) => {
  visibleRight.value = isVisible;
  selectOnes.id = selectItems.id;
  selectOnes.image = selectItems.image;
  selectOnes.name = selectItems.name;
  selectOnes.description = selectItems.description;
};

const updateInfo = (data, isLore) => {
  if(isLore){
    const info = cloneDeep(killer.value.info);
    info.lore = data;
    data = {info: info};
  }
  store.dispatch("character/UPDATEDATA", {
    killerID: killer.value.id,
    data
  });
  // toast.add({ severity: "success", summary: "修改通知", detail: "修改成功", life: 3000 });
};

const uploadData = perk => store.dispatch("perks/UPLOADDATA", perk);

const updateData = data => {
  store.dispatch("character/UPDATEDATA", {
    killerID: killer.value.id,
    id: data.id,
    option: tabIndex.value == 0 ? "perk" : "addOnes",
    data,
  });
  visibleRight.value = false;
  // toast.add({ severity: "success", summary: "修改通知", detail: "修改成功", life: 3000 });
};

const addPerk = data => {
  store.dispatch("character/ADDPERK", {
    id: killer.value.id, 
    data
  });
  // toast.add({ severity: "success", summary: "新增通知", detail: "新增成功", life: 3000 });
};

const addAddOnes = data => {
  store.dispatch("character/ADDADDONES", {
    id: killer.value.id,
    data
  });
  // toast.add({ severity: "success", summary: "新增通知", detail: "新增成功", life: 3000 });
};

const deleteKiller = () => {
  router.push("/");
  store.dispatch("character/DELETEROLE", killer.value.id);
};


onBeforeMount(() => {
  if(store.state.perks) store.unregisterModule("perks");
  store.registerModule("perks", perksStore);
  store.dispatch("character/GETDATA");
  store.dispatch("character/GETPERK", props.killerID);
  store.dispatch("character/GETADDONES", props.killerID);
});

onUpdated(() => {
  if(tabIndex.value !== 2 && tabIndex.value !== 0) visibleRight.value = false;
  const close  = $("button[aria-label='close']");
  if(close) close.onClick = () => visibleRight.value = false;
});

</script>

<style lang="scss" scoped>
section{
  width: 75vw;
  position: absolute;
  top: 80px;
  left: 270px;
  .content{
    width: 100%;
    height: auto;
    padding: 10px;
    background-color: antiquewhite;
  }
}

:global(.p-sidebar-right){
  width: 25rem;
}
</style>