<template>
  <section>
    <div class="content">
      <n-tabs type="segment" animated>
          <n-tab-pane v-for="(item, idx) in tabs_navigation" :key="idx" :name="item.name" :tab="item.tabs">
            <keep-alive>
              <component :is="tabsComponent[item.name]" :characterID="characterID"></component>
            </keep-alive>
          </n-tab-pane>
      </n-tabs>
    </div>
  </section>
</template>

<script setup>
import { NTabs, NTabPane } from "naive-ui";
import { ref, onBeforeMount, onUpdated } from "vue";
import perksStore from "@/vuex/perksStore";
import { useStore } from "vuex";
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
const characterID = ref(store.state.character.data.character_id);
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

onBeforeMount(() => {
  if(!store.state.perks) store.registerModule("perks", perksStore);
});

onUpdated(() => {
  console.log("details update");
})
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
    max-height: 650px;
    padding: 10px;
    background-color: var(--green-100);
    overflow-y: scroll;
  }
}

:global(.p-sidebar-right){
  width: 25rem;
}
</style>