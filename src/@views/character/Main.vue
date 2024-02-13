<template>
    <DBDNavbar></DBDNavbar>
    <div class="characters-container">
        <section class="killer w-full z-1 px-3 py-8 flex justify-content-center align-items-center flex-column">
        <n-space class="w-5 flex justify-content-center">
            <n-dropdown trigger="click" :options="levelOptions" @select="handleSelect">
            <n-button type="tertiary">{{ selectedLevel }}</n-button>
            </n-dropdown>
            <n-input v-model:value="searchName" type="text" placeholder="Character Name" />
        </n-space>
        <div class="characters-cover-container w-9 flex justify-content-center align-items-center flex-wrap h-auto pt-5">
            <div v-if="!killers.length">
              <img class="loading" src="@/assets/picture/loading.gif" alt="loading">
            </div>
            <div 
              class="card m-2 overflow-hidden cursor-pointer relative"
              v-for="killer in nameGroup"
              :key="killer"
              :data-role="killer.name"
            >
              <router-link to="/character/Information" @click="passDataToRecords(killer.id)">
                  <span class="bloodHover absolute block z-1"></span>
                  <div class="imgBox absolute top-0 left-0 w-full h-full">
                      <img class="absolute top-0 left-0 w-full h-full" :src="killer.info.cover" alt="killer"/>
                  </div>
                  <div class="content absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center z-1">
                  <div class="p-5">
                      <h3 style="padding-bottom:20px">{{killer.info.name[0]}}</h3>
                      <p class="difficulty" :style="{'color':difficulty(killer)}">{{killer.info.difficulty}}</p>
                  </div>
                  </div>
              </router-link>
            </div>
        </div>
        </section>
    </div>
</template>

<script setup>
import DBDNavbar from "@/@components/Navbar/DBDNavbar.vue";
import { NDropdown, NSpace, NButton, NInput } from "naive-ui";
import { ref, onMounted, onUpdated, computed } from "vue";
import { useStore } from "vuex";
import $ from "jquery";

const store = useStore();
const selectedLevel = ref("ALL");
const searchName = ref("");
const killers = computed(() => store.state.character ? store.state.character.data.killersInfo : []);


// 等級過濾器
const levelGroup = computed(() =>{
  if (selectedLevel.value !== "ALL") return killers.value.filter((item) => item.info.rank == selectedLevel.value);
  return killers.value;
});

const levelOptions = computed(() => {
  return store.state.character.levelOptions.map(item => ({
    "label": item.level,
    "key": item.level
  }));
});

// 名稱過濾器
const nameGroup = computed(() => {
  if (searchName.value) {
      return killers.value.filter((item) => {
        let name = item.info.name[0].toLowerCase();
        let keyword = searchName.value.toLowerCase();
        return name.indexOf(keyword) !== -1;
      });
    } return levelGroup.value;
});

// 經路由傳資料
const passDataToRecords = id => {
  store.commit("character/SETID", id);
};

const handleSelect = key => {
  selectedLevel.value = key;
};

// 難易度顏色配置
const difficulty = role => {
  const levelColorMap = store.state.character.difficultyColor;
  return levelColorMap[role.info.difficulty];
};

// 生命週期
onMounted(() => {
  store.dispatch("character/GETDATA");
}),

onUpdated(() => {
  $(document).ready(function(){
    $(".card").on("mousein", function(e){
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      $(this).find("span").css({top:y, left:x});
    });
    $(".card").on("mouseout", function(e){
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      $(this).find("span").css({top:y, left:x});
    });
  });
});

onUpdated(() => {
  let background = document.querySelector(".bg");
  window.addEventListener("scroll", () => {
    let value = 1 + window.scrollY / -600;
    background.style.opacity = value;
  });
});
</script>

<style scoped lang="scss">
@import "../../assets/scss/character/main.scss";
</style>