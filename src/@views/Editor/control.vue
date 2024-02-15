<template>
  <div class="user_info_block">
    <div class="mx-5 flex flex-wrap align-items-center justify-content-center gap-3">
      <n-button :render-icon="renderHomeIcon" type="primary" class="mx-1" @click="backToMain()">Return Home</n-button>
      <n-button :render-icon="renderLogOutIcon" type="primary" class="mx-1" @click="logout()">Logout</n-button>
      <n-icon size="20"><person /></n-icon>
      <span>{{ user_name }}</span>
    </div>
  </div>
  <div class="control_block">
    <ul class="control_list">
      <li
        v-for="(item, index) in control_items" 
        :key="index" class="control_item"
        :class="{'click': controlIndex === index, 'disabled': killerID === null && index === 1}"
        @click="changePanel(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
  <div class="info_block">
    <keep-alive>
      <template v-if="(controlIndex === 0)">
        <all 
          @feedback-index="onFeedbackIndex"
        ></all>
      </template>
      <template v-else-if="(controlIndex === 1)">
        <detail/>
      </template>
    </keep-alive>
  </div>
</template>

<script setup>
import { NButton, NIcon } from "naive-ui";
import all from "@/@views/editor/all/_all.vue";
import detail from "@/@views/editor/details/_details.vue";
import { Home as HomeIcon, LogOut as LogOutIcon, Person } from '@vicons/ionicons5'
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeMount, computed, h } from "vue";
import "@/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useStore } from "vuex";
import accountStore from "@/vuex/accountStore";

const user_name = computed(() => store.state.account ? store.state.account.data.email : null);
const router = useRouter();
const controlIndex = ref(0);
const killerID = ref(null);
const control_items = ["All Characters", "Character Details", "History", "Posters"];
const store = useStore();
const renderHomeIcon = () => {
  return h(NIcon, null, {
            default: () => h(HomeIcon)
          })
}
const renderLogOutIcon = () => {
  return h(NIcon, null, {
            default: () => h(LogOutIcon)
          })
}

const onFeedbackIndex = async id => {
  killerID.value = id;
  controlIndex.value = 1;
  store.commit("character/SETID", id);
  await store.dispatch("character/GETPERK", id);
  await store.dispatch("character/GETADDONES", id);
  await store.dispatch("character/GETPERKBUILD", id);
};

// 登出功能
const logout = async() => {
  window.localStorage.removeItem("user");
  await firebase.auth().signOut();
  await router.push("/");
};

const backToMain = () => {
  router.push("/");
};

const changePanel = index => {
  controlIndex.value = index;
};

onBeforeMount(() => {
  if(!store.state.account) store.registerModule("account", accountStore);
  store.dispatch("account/GETDATA");
});

onMounted(() => {
  controlIndex.value = 0;
});

</script>

<style lang="scss" scoped>
.control_block{
  position: absolute;
  left: 0;
  width: 15vw;
  height: 100vh;
  background-color: #254441;
  padding-right: 100px;
  .control_list{
    list-style: none;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 30px;
    .control_item{
      width: 100%;
      line-height: 30px;
      font-size: 20px;
      color: #BBDFC5;
      cursor: pointer;
      &:hover{
        color:brown;
      }
    }
    .click{
      color: brown;
    }
  }
}
.user_info_block{
  position: absolute;
  top: 0;
  display: flex;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  min-height: 50px;
  background-color: #BBDFC5; 
}
.info_block{
  width: 100vw;
  height: 100vh;
  background-color: #60935D;
}

.disabled{
  pointer-events: none;
  cursor: not-allowed;
  opacity: .2;
}
</style>