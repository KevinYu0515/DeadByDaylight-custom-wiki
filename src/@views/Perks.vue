<template>
  <DBDNavbar></DBDNavbar>
  <div class="perks flex justify-content-center align-items-center flex-column">
    <div v-if="!perks.length">
      <img src="@/assets/picture/loading.gif" alt="loading">
    </div>
    <div class="illustrated">
      <div class="scroll">
        <n-grid :cols="16" v-for="_ in 2" :key="_">
          <n-grid-item v-for="(perk, idx) in perks" :key="idx">
            <div
              class="bg w-full h-full"
              :class="{'item': !isClick[idx], 'active': isClick[idx]}"
              @click="clickPerk(perk, idx)" 
              :title="perk.name"
              
            >
              <img class="w-full" :src="perk.icon" alt="">
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </div>

    <div class="infor flex justify-content-center align-items-center flex-column p-5">
      <h1>Perks INFORMATION</h1>
      <hr class="outDialog">
      <div v-if="perksCount !== 0" class="my-2">
        <n-button class="mx-2" type="tertiary" @click="clearPerksClick">{{ perksCount }}</n-button>
        <n-button class="mx-2" type="tertiary" @click="clearPerksClick">Clear All</n-button>
      </div>
      <div class="nonePerks p-8" v-if="perksCount == 0">Please Click Perks Above</div>
      <div
        class="inforBox flex justify-content-center align-items-center" 
        v-else 
        v-for="(perk, index) in perksClick" 
        :key="index"
      >
        <h1 class="mx-5">{{perk.usefulness}}</h1>
        <img class="mx-5" :src="perk.icon" alt="">
        <div class="text flex justify-content-center align-items-start flex-column p-5 w-6">
          <h2>{{perk.name}}</h2>
          <p> {{perk.illustrate}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NGrid, NGridItem, NButton } from "naive-ui";
import DBDNavbar from "@/@components/Navbar/DBDNavbar.vue";
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import perksStore from "@/vuex/perksStore";

const store = useStore();
const clickIndex = ref([]);
const perksClick = ref([]);
const isClick = ref([false]);
const perks = computed(() => store.state.perks ? store.state.perks.fbPerks : []);
const perksCount = computed(() => perksClick.value.length ? `已選 ${perksClick.value.length}` : 0);

// 技能點擊
const clickPerk = (e, n) => {
  isClick.value[n] = !isClick.value[n];
  if(isClick.value[n]){
    perksClick.value.unshift(e);
    clickIndex.value.unshift(n);
  }else{
    for(let i=0; i<perksClick.value.length;i++){
      if(perksClick.value[i].name == e.name){
        perksClick.value.splice(i,1);
        clickIndex.value.splice(i,1);
      } else console.log("false");
    }
  }
};

// 清除所選技能
const clearPerksClick = () => {
  isClick.value = [false];
  perksClick.value = [];
};

// 生命週期
onMounted(() => {
  if(!store.state.perks) store.registerModule("perks", perksStore);
  store.dispatch("perks/GETDATA");
});
onBeforeUnmount(() => store.unregisterModule("perks"));
</script>

<style lang="scss" scoped>
@import "../assets/scss/perks.scss";
</style>