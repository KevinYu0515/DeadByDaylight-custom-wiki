<template>
  <section v-show="!create" class="row flex-wrap" style="display: flex;">
    <div v-if="!killers.length">
      <img src="@/assets/picture/loading.gif" alt="loading">
    </div>
    <div v-for="(killer, index) in killers" :key="index" class="killer_block col-3">
      <img class="cover" :src="killer.info.cover" @click="btnToDetails(killer.id, index)">
    </div>
    <div class="killer_block"  @click="btnToAppend">
      <img class="plus" src="@/assets/icon/plus.png">
    </div>
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
import { computed, ref, onMounted, onBeforeUnmount } from "vue"
import { useStore } from "vuex"
import appendNewRole from "./appendNewRole.vue"
import killersStore from "../../../vuex/killersStore"

const create = ref(false)
const store = useStore()
const drOptions =  computed(() => store.state.killers ? store.state.killers.drOptions : [])
const levelOptions = computed(() => store.state.killers ? store.state.killers.levelOptions : [])
const killers = computed(() => store.state.killers ? store.state.killers.data.killersInfo : [] )

// 資料處裡表達式
const addKiller = data => {
  store.dispatch("killers/ADDROLE", data)
  create.value = !create.value
}
const onUpload = img => store.dispatch("killers/UPLOADIMG", "killersCover", img)

const btnToDetails = (id, index) => {
  emits("feedbackIndex", id, index)
}

const btnToAppend = () => {
  create.value = !create.value
}

const btnToKiller = res => {
  create.value = res
}

const emits = defineEmits(["feedbackIndex"])

onMounted(() => {
  store.registerModule("killers", killersStore)
  store.dispatch("killers/GETDATA")
})

onBeforeUnmount(() => store.unregisterModule("killers"))
</script>

<style lang="scss" scoped>
section{
    position: absolute;
    top: 100px;
    left: 300px;
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