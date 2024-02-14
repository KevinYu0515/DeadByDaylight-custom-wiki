<template>
  <div class="flex flex-wrap align-items-center">
    <span>這個按鈕將會刪除這隻殺手的全部訊息，後果自負</span>
    <n-button type="error" class="mx-2" @click="deleteKiller">
      Delete Character
    </n-button>
  </div>
  <div class="flex flex-wrap my-3">
    <p>創建時間：<span>{{ Fordate }}</span></p>
  </div>
</template>

<script setup>
import { NButton } from "naive-ui";
import moment from "moment";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({
  characterID: {
    type: String,
    default: ""
  }
})
const router = useRouter();
const store = useStore();
const build = computed(() => {
  if(store.state.character) return store.state.character.data.killersInfo.find(killer => killer.id === props.characterID).build;
  return "";
});

const deleteKiller = () => {
  router.push("/");
  store.dispatch("character/DELETEROLE", props.characterID);
};


const Date = moment.unix(build.value.seconds).add(build.value.nanoseconds / 1000000, "milliseconds");
const Fordate = Date.format("YYYY-MM-DD HH:mm:ss.SSS");
</script>