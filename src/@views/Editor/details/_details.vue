<template>
  <section>
    <div class="content mb-5 relative">
      <n-tabs type="segment" animated>
        <n-tab-pane v-for="(item, idx) in tabs_navigation" :key="idx" :name="item.name" :tab="item.tabs">
          <keep-alive>
            <component :is="tabsComponent[item.name]" :characterID="killerID"></component>
          </keep-alive>
        </n-tab-pane>
      </n-tabs>
    </div>
      <!-- <div aria-label="perks" v-show="(tabIndex === 0)">
        <Perk
          :perks="perks"
          :selected="visibleRight"
          @select-items="Onselect"
          @upload-data="uploadData"
          @add-perk="addPerk"
        ></Perk>
      </div> -->

      <!-- <div aria-label="info" v-show="(tabIndex === 1)">
        <Info
          :info="killer.info"
          :drOptions="drOptions"
          @update-info = "updateInfo"
        ></Info>
      </div> -->

      <!-- <div aria-label="addOnes" v-show="(tabIndex === 2)">
        <AddOnes
          :addOnes="addOnes"
          :selected="visibleRight"
          @select-items="Onselect"
          @add-addOnes="addAddOnes"
        ></AddOnes>
      </div> -->
      <!-- <div aria-label="background" v-show="(tabIndex === 3)">
        <Lore
          :lore="killer.info.lore"
          @update-data="updateInfo"
        ></Lore>
      </div> -->
  </section>
</template>

<script setup>
import { NTabs, NTabPane } from "naive-ui";
import { ref, onBeforeMount, onUpdated } from "vue";
import perksStore from "@/vuex/perksStore";
import { useStore } from "vuex";
import $ from "jquery";
import Perk from "@/@views/editor/details/perk.vue";
import Info from "@/@views/editor/details//info.vue";
import AddOnes from "@/@views/editor/details//add_ones.vue";
import Lore from "@/@views/editor/details//lore.vue";
import Settings from "@/@views/editor/details//settings.vue";
const tabsComponent = {
  Perk,
  Info,
  AddOnes,
  Lore,
  Settings
}
const store = useStore();
const tabIndex = ref(0);
const props = defineProps({"killerIndex": Number, "killerID": String});
const visibleRight = ref(null);
const tabs_navigation = [
  {
      name: "Perk",
      tabs: "Perk",
  },
  {
      name: "Info",
      tabs: "Information",
  },
  {
      name: "AddOnes",
      tabs: "Addones",
  },
  {
      name: "Lore",
      tabs: "Lore",
  },
  {
      name: "Settings",
      tabs: "Settings",
  }
];

// const updateInfo = (data, isLore) => {
//   if(isLore){
//     const info = cloneDeep(killer.value.info);
//     info.lore = data;
//     data = {info: info};
//   }
//   store.dispatch("character/UPDATEDATA", {
//     killerID: killer.value.id,
//     data
//   });
//   // toast.add({ severity: "success", summary: "修改通知", detail: "修改成功", life: 3000 });
// };

// const uploadData = perk => store.dispatch("perks/UPLOADDATA", perk);

// const addAddOnes = data => {
//   store.dispatch("character/ADDADDONES", {
//     id: killer.value.id,
//     data
//   });
//   // toast.add({ severity: "success", summary: "新增通知", detail: "新增成功", life: 3000 });
// };

onBeforeMount(() => {
  if(!store.state.perks) store.registerModule("perks", perksStore);
  store.dispatch("character/GETDATA");
  store.commit("character/SETID", props.killerID);
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
    background-color: var(--green-100);
  }
}

:global(.p-sidebar-right){
  width: 25rem;
}
</style>