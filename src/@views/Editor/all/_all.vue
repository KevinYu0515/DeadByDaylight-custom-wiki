<template>
  <section v-show="!create" class="row flex-wrap">
    <template v-if="killers.length === 0">
      <n-skeleton class="mx-2" v-for="_ in 3" :key="_" height="100px" width="100px" />
    </template>
    <template v-else>
      <div
        v-for="(killer, index) in killers"
        :key="index"
        class="killer_block col-3"
        @click="btnToDetails(killer.id, index)"
      >
        <img class="cover" :src="killer.info.cover">
      </div>
      <div class="killer_block"  @click="btnToAdd">
        <img class="plus" src="@/assets/icon/plus.png">
      </div>
    </template>
  </section>
  <section v-show="create">
    <append-new-role
      :drOptions="drOptions"
      :levelOptions="levelOptions"
      @add-killer="addKiller"
      @on-upload="onUpload"
      @back-to-killer="btnToKiller"
    ></append-new-role>
  </section>
</template>

<script setup>
import { NSkeleton } from "naive-ui";
import { computed, ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import appendNewRole from "@/@views/editor/all/appendNewRole.vue";

const create = ref(false);
const store = useStore();
const drOptions =  computed(() => store.state.character ? store.state.character.drOptions : []);
const levelOptions = computed(() => store.state.character ? store.state.character.levelOptions : []);
const killers = computed(() => store.state.character ? store.state.character.data.killersInfo : [] );
const emit = defineEmits(["feedbackIndex"]);

// 資料處裡表達式
const addKiller = data => {
  store.dispatch("character/ADDROLE", data);
  create.value = !create.value;
};
const onUpload = img => store.dispatch("character/UPLOADIMG", {
  folder: "newkillersCover", 
  img
});

const btnToDetails = id => {
  emit("feedbackIndex", id);
};

const btnToKiller = res => {
  create.value = res;
};

const btnToAdd = () => {
  create.value = true;
}

onBeforeMount(() => {
  store.dispatch("character/GETDATA");
});

</script>

<style lang="scss" scoped>
section{
    position: absolute;
    top: 100px;
    left: 300px;
    display: flex;
    .killer_block{
        position: relative;
        width: 100px;
        height: 100px;
        background-color: rgba(0, 139, 139, 0.5);
        margin: 10px;
        overflow: hidden;
        &:hover{
          box-shadow: 0 0 10px rgba(28, 50, 26, 0.566);
          cursor: pointer;
        }
        .cover{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .plus{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(.1);
        }
    }
}
</style>