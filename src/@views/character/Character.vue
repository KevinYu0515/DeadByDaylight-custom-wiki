<template>
  <div class="records flex">
    <div class="leftInfor absolute left-0 top-0 flex flex-wrap justify-content-between flex-column z-5 w-auto h-screen">
      <div class="pl-5 pt-5">
        <div class="card relative overflow-hidden">
          <img class="absolute top-0 left-0 h-full" :src="killer ? killer.info.cover : ''" alt="killer"/>
        </div>
        <div class="content flex justify-content-center align-items-center relative mt-3">
          <div>
            <h1>{{killer ? killer.info.name[0] : ""}}</h1>
            <p>Difficulty Rating： <span class="difficulty">{{killer ? killer.info.difficulty : ""}}</span> </p>
          </div>
        </div>
        <ul class="select-items list-none mt-5">
          <li v-for="(item, index) in left_bar_items" :key="index" class="flex align-items-center justify-content-evenly py-1 cursor-pointer">
            <img v-show="currentPath !== `/character/${item.fullname}`" class="w-3rem" src="@/assets/icon/IconHelp.png" alt=""/>
            <img v-show="currentPath === `/character/${item.fullname}`" class="w-3rem" src="@/assets/icon/Loading_killer.png" alt=""/>
            <router-link :to="`/character/${item.fullname}`" class="no-underline">
              <div class="option-box flex align-items-center justify-content-star pl-3 text-xl font-bold">
                {{ item.name }}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="px-3 w-9rem flex align-items-center flex-column">
        <n-button class="my-2" type="tertiary" @click="showOtherKillers = !showOtherKillers;">Other Characters</n-button>
        <n-button class="my-2" type="tertiary" @click="routerTo('/characters')">Back Home</n-button>
      </div>
    </div>
    <ul class="route absolute list-none">
      <li v-for="(_, idx) in _route" :key="idx" class="pl-2">
        {{ _route[idx] }} <span class="pl-2"> > </span>
      </li>
      <li class="active pl-2">{{currentOption}}</li>
    </ul>
    <div class="content-container" v-if="killer !== null && currentOption !== null">
      <keep-alive>
        <component :is="tabs[currentOption]" :character_data="killer"></component>
      </keep-alive>
    </div>
  </div>
  <template v-if="other_killers">
    <div v-show="showOtherKillers" @click="showOtherKillers = !showOtherKillers;" class="other-killer-container">
      <div class="other-killer-inner-container">
        <div class="other-killer-box" v-for="(item, idx) in other_killers" :key="idx">
          <img @click="changeId(item.id)" class="w-full h-auto" :src="item.info.cover" :title="item.info.name" alt=""/>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import Information from "@/@views/character/Information.vue";
import Lore from "@/@views/character/Lore.vue";
import Perks from "@/@views/character/Perks.vue";
import Power from "@/@views/character/Power.vue";
import Addones from "@/@views/character/Addones.vue";
import "@/assets/scss/character/character.scss";
import { NButton } from "naive-ui";
import { onBeforeMount, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

defineProps({"record_option": String});
const store = useStore();
const router = useRouter();
const showOtherKillers = ref(false);
const character_id = computed(() => store.state.character ? store.state.character.data.character_id : "");
const killer = computed(() => store.state.character ? store.state.character.data.killersInfo.find(killer => killer.id === character_id.value) : null);
const other_killers = computed(() => store.state.character ? store.state.character.data.killersInfo.filter(killer => killer.id !== character_id.value) : []);
const _route = ["Home", "Killers"];
const currentOption = computed(() => router.currentRoute.value.params.record_option || null);
const currentPath = computed(() => router.currentRoute.value.fullPath || null);
const tabs = {
  Information,
  Lore,
  Perks,
  Power,
  Addones
};

const left_bar_items = [
  {"name": "Info", "fullname": "Information"},
  {"name": "Lore", "fullname": "Lore"},
  {"name": "Power", "fullname": "Power"},
  {"name": "Perks", "fullname": "Perks"},
  {"name": "Addones", "fullname": "Addones"}
];

// 跳轉路由器
const routerTo = path => router.push(`${path}`);

const changeId = id => {
  store.commit("character/SETID", id);
};

// 生命週期
onBeforeMount(() => {
  _route.push(killer.value.info.name[0]);
});

onMounted(() => {
  let diff = document.querySelector(".difficulty");
  const textColorMap = store.state.character.difficultyColor;
  const color = textColorMap[diff.textContent];
  document.documentElement.style.setProperty("--difficulty", color);
});

</script>