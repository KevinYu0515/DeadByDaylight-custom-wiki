<template>
  <DBDNavbar></DBDNavbar>
  <div class="personal flex justify-content-center align-items-center flex-column overflow-hidden h-auto">
    <section class="bg w-full fixed top-0 flex justify-content-center align-items-center flex-column">
      <h1 class="mainTitle mb-5">Dead By Daylight Recording Side Project</h1>
      <p class="subTitle">Recording Videos, Killers Information, Skills</p>
      <p class="subTitle">Starting Date： 2022/08/15</p>
      <p class="subTitle">Maker： Kevin Lin</p>
      <p class="subTitle">Version： DBD 6.1.0</p>
    </section>
    <section class="killer w-full z-1 px-3 py-8 flex justify-content-center align-items-center flex-column">
      <div class="w-5">
        <Dropdown
            v-model="selectedLevel"
            :options="levelOptions"
            optionLabel="level"
            optionValue="level"
            placeholder="ALL"
            class="mx-1 flex-1 my-2"
            style="width:200px"
          />
        <InputText 
          placeholder="KillerName"
          v-model.trim="searchName"
          class="flex-auto mx-1 my-2"
        />
        <Button
          label="Create"  
          class="p-button-infor mx-1 flex-auto my-2"
          style="max-width:100%"
          @click="modalStatue(0)" 
        />
        <Button label="Logout" href="javascript:void(0)" class="p-button-success mx-2 flex-auto my-2" @click="logout"></Button>   
      </div>
      <div class="container w-9 flex justify-content-center align-items-center flex-wrap h-auto pt-5">
        <div 
          class="card m-2 overflow-hidden cursor-pointer relative"
          v-for="killer in nameGroup"
          :key="killer"
          :data-role="killer.name"
        >
          <a @click="passDataToRecords(killer)">
            <span class="bloodHover absolute block z-1"></span>
            <div class="imgBox absolute top-0 left-0 w-full h-full">
                <img class="absolute top-0 left-0 w-full h-full" :src="killer.cover" alt="killer"/>
            </div>
            <div class="content absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center z-1">
              <div class="p-5">
                <h3 style="padding-bottom:20px">{{killer.name}}</h3>
                <p class="difficulty" :style="{'color':difficulty(killer)}">{{killer.difficulty}}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>

  <append-role
    :isdisplay="displayModal[0]"
    :levelOptions="levelOptions"
    :drOptions="drOptions"
    @childmodal="modalStatue"
    @uploadImg="onUpload"
    @setKillerDoc="addKiller"
    ref="appendRole"
  />

  <simple-dialog 
    :isDisplay="displayModal[1]" 
    location="Append New Role" 
    @childModal="modalStatue"
  />
</template>

<script>
import DBDNavbar from "../../components/Navbar/DBDNavbar.vue"
import AppendRole from "../../components/DialogGroup/AppendRole.vue"
import SimpleDialog from "../../components/DialogGroup/SimpleDialog.vue"
export default {
  name:"Personal",
  components:{ DBDNavbar, SimpleDialog, AppendRole },
  data(){
    return{
      levelOptions: ([{level:"ALL"}, {level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}]),
      drOptions: ([{dr:"Easy"}, {dr:"Moderate"}, {dr:"Hard"}, {dr:"Very Hard"}]),
    }
  },
  methods:{
    passDataToRecords(killer){
      this.$router.push({
        path:"/records",
        name:"Records",
        query:{ killer_information: JSON.stringify(killer) }
      })
    },
    difficulty(killer){
      const levelColorMap = {
        "Easy": "rgba(64,176,64)",
        "Moderate": "yellow",
        "Hard": "rgba(229,132,48)",
        "Very Hard": "rgba(246,89,89)"
      }
      return levelColorMap[killer.difficulty]
    }
  }
}
</script>

<script setup>
import { ref, onMounted, onUpdated, computed, onBeforeUnmount } from "vue"
import killersStore from "../../vuex/killersStore"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import $ from "jquery"
import axios from "axios"

const store = useStore()
const router = useRouter()
const killers = computed(() => store.state.killers ? store.state.killers.fbkillers : [])
const displayModal = ref([false])
const selectedLevel = ref("ALL")
const searchName = ref("")
const appendRole = ref(null)

const addKiller = role => store.dispatch("killers/ADDROLE", role)
const onUpload = img => store.dispatch("killers/UPLOADIMG", "killersCover", img)

const levelGroup = computed(() =>{
  if (selectedLevel.value !== "ALL") {
    return killers.value.filter((item) => {
      return item.level == selectedLevel.value
    })
  } else {
    return killers.value
  }
})

const nameGroup = computed(() => {
  if (searchName.value) {
      return killers.value.filter((item) => {
        let name = item.name.toLowerCase()
        let keyword = searchName.value.toLowerCase()
        return name.indexOf(keyword) !== -1
      })
    } else {
      return levelGroup.value
    }
})

const modalStatue = (i, isClear) => {
  displayModal.value[i] = !displayModal.value[i]
  if(isClear){
    appendRole.value.clearData()
  }
}

const logout = async() => {
  await axios.post("logout", {}, { withCredentials:true })
  axios.defaults.headers.common["Authorization"] = ""
  await router.push("/login")
}

onMounted(() => {
  // 抓取資料
  store.registerModule("killers", killersStore)
  store.dispatch("killers/GETDATA")

  //文字特效
  const text = document.querySelector(".mainTitle")
  const factor = 30
  function shadowMove(e){
    const { offsetWidth: width, offsetHeight: height } = text
    let { offsetX: x, offsetY: y } = e
    if(this !== e.target){
      x = x + e.target.offsetLeft
      y = y + e.target.offsetTop
    }
    const xShadow = parseInt(x / width * factor - (factor / 2))
    const yShadow = parseInt(y / height * factor - (factor / 2))
    text.style.textShadow = `${xShadow}px ${yShadow}px 0 gray`
  }
  text.addEventListener("mousemove", shadowMove)
}),


onUpdated(() => {
  $(document).ready(function(){
    $(".card").on("mousein", function(e){
      var x = e.pageX - $(this).offset().left
      var y = e.pageY - $(this).offset().top
      $(this).find("span").css({top:y, left:x})
    })
    $(".card").on("mouseout", function(e){
      var x = e.pageX - $(this).offset().left
      var y = e.pageY - $(this).offset().top
      $(this).find("span").css({top:y, left:x})
    })
  })
})

onUpdated(() => {
  let background = document.querySelector(".bg")
  window.addEventListener("scroll", () => {
    let value = 1 + window.scrollY / -600
    background.style.opacity = value
  })
})

onBeforeUnmount(() => {
  store.unregisterModule("killers")
})

</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/personal.scss";
</style>

<style scoped>
@import "../../assets/css/index.css";
</style>
