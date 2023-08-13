<template>
  <div class="user_info_block">
    <div class="w-2">
      <Button label="Logout" href="javascript:void(0)" class="p-button-success my-2" @click="logout"></Button>   
      <span class="name">{{ user_name }}</span>
    </div>
  </div>
  <div class="control_block">
    <ul class="control_list">
      <li v-for="(item, index) in control_items" :key="index" class="control_item" :class="{'click': (controlIndex === index)}" @click="changePanel(index)">{{ item }}</li>
    </ul>
  </div>
  <div class="info_block">
    <template v-if="(controlIndex === 0)">
        <all 
          @feedback-index="onFeedbackIndex"
        ></all>
    </template>
    <template v-if="(controlIndex === 1)">
      <detail :killerIndex="killerIndex"></detail>
    </template>
  </div>
</template>

<script setup>
import all from "./_all.vue"
import detail from "./_details.vue"
import { useRouter } from "vue-router"
import { ref, defineProps, onMounted } from "vue"
import "@/firebase"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"


const props = defineProps(["user"])
const user_name = ref(props.user)
const router = useRouter()
const controlIndex = ref(0)
const killerIndex = ref(null)
const control_items = ["All Killers", "Killers Details", "History", "Posters"]

const onFeedbackIndex = (killer_index, control_index) => {
  controlIndex.value = control_index
  killerIndex.value = killer_index
}

// 登出功能
const logout = async() => {
  window.localStorage.removeItem("user")
  await firebase.auth().signOut()
  await router.push("/")
}

const changePanel = index => {
  controlIndex.value = index
}

onMounted(() => {
  controlIndex.value = 0
})

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
  .name{
    float: right;
    padding: 20px;
    text-align: center;
    vertical-align: middle;
  }
}
.info_block{
  width: 100vw;
  height: 100vh;
  background-color: #60935D;
}
</style>