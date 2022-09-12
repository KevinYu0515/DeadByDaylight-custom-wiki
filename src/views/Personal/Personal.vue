<template>
  <DBDNavbar></DBDNavbar>
  <div class="personal">
    <section class="bg"></section>
    <section class="killer">
      <div class="container">
        <Dropdown
            v-model="selectedLevel"
            :options="levelOptions"
            optionLabel="level"
            optionValue="level"
            placeholder="ALL"
            class="mx-3 col-3"
            style="width:200px"
          />
        <InputText 
          placeholder="KillerName"
          v-model.trim="searchName"
        />
        <Button
          label="Create"  
          class="p-button-infor mx-3 col-fixed"
          style="max-width:100%"
          @click="modalStatue(0)" 
        />
        <Button href="javascript:void(0)" class="p-button-success mx-2" @click="logout">Logout</Button>   
      </div>
      <div class="container">
        <div 
          class="card"
          v-for="killer in nameGroup"
          :key="killer"
        >
          <a @click="passDataToRecords(killer)">
            <span class="bloodHover"></span>
            <div class="imgBox">
                <img :src="killer.cover" alt="killer"/>
            </div>
            <div class="content">
              <div>
                <h3 style="padding-bottom:20px">{{killer.name}}</h3>
                <p class="difficulty" :style="{'color':difficulty(killer)}">{{killer.difficulty}}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>

  <!-- 新增人物 -->
  <append-role
    :isdisplay="displayModal[0]"
    :levelOptions="levelOptions"
    :drOptions="drOptions"
    @childmodal="modalStatue"
    @uploadImg="onUpload"
    @setKillerDoc="addKiller"
    ref="appendRole"
  />
  <!-- 警告視窗 -->
  <simple-dialog 
    :isdisplay="displayModal[1]" 
    location="Append New Role" 
    @childmodal="modalStatue"
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
        query:{
          killerID: killer.id,
          killerBackground: killer.background,
          killerCover: killer.cover,
          killerName: killer.name,
          killerMove: killer.move,
          killerAltMove: killer.altMove,
          killerTerror: killer.terror,
          killerAltTerror: killer.altTerror,
          killerHeight: killer.height,
          killerSkills: killer.skills,
          reSkills: killer.reSkills,
          killerWeapon: killer.weapon,
          killerPower: killer.power,
          killerRealName: killer.realName,
          killerBgImg: killer.bgImg,
          killerDifficulty: killer.difficulty,
          videoNumber: killer.videos
        }
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
import { ref, onMounted, onUpdated, computed } from "vue"
import { useRouter } from "vue-router"
import { killersColRef, storage } from "@/firebase"
import { ref as r, uploadBytes } from "firebase/storage"
import { addDoc, onSnapshot } from "firebase/firestore"
import $ from "jquery"
import axios from "axios"

const router = useRouter()
const killers = ref([])
const displayModal = ref([false])
const selectedLevel = ref("ALL")
const searchName = ref("")
const appendRole = ref(null)

onMounted(() => {
  onSnapshot(killersColRef, (querySnapshot) => {
    let fbkillers = []
    querySnapshot.forEach((doc) => {
      const killer = {
        id: doc.id,
        background: doc.data().background,
        name: doc.data().name,
        move: doc.data().movementSpeed,
        altMove: doc.data().altnativeMoveSpeed,
        terror: doc.data().terrorRadius,
        altTerror: doc.data().altnativeTerrorRadius,
        height: doc.data().height,
        weapon: doc.data().weapon,
        power: doc.data().power,
        level: doc.data().level,
        cover: doc.data().cover,
        skills: doc.data().skills,
        reSkills: doc.data().recommandSkills,
        realName: doc.data().realName,
        bgImg: doc.data().bgImg,
        difficulty: doc.data().difficulty,
        videos: doc.data().videos
      }
      fbkillers.push(killer)
    })
    killers.value = fbkillers
  })
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

const onUpload = img => {
  const storageRef = r(storage, `killersCover/${img.name}`)
  uploadBytes(storageRef, img.value).then((snapshot) => {
    console.log("Uploaded a blob or file!")
    console.log(snapshot)
  })
}

const addKiller = state => {
  addDoc(killersColRef, {
    name: state.newKillerName,
    level: state.newKillerLevel,
    cover: state.imgUrl,
    difficulty: state.newKillerDR
  })
}

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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/personal.scss";
</style>

<style scoped>
@import "../../assets/css/index.css";
</style>
