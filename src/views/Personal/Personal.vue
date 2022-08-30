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
          @click="modalStatue" 
        />
        <Dialog 
          header="Append New Role" 
          v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '50vw'}" :modal="true"
        >
        <Dropdown
            v-model="newKillerLevel"
            :options="levelOptions"
            optionLabel="level"
            optionValue="level"
            placeholder="ALL"
            class="mx-1 my-1"
            style="width:200px"
          />
          <InputText 
            placeholder="KillerName"
            class="mx-1 my-1"
            v-model.trim="newKillerName"
            required
          />
          <br/>
          <Button 
            label="Upload Cover"  
            class="p-button-warning mx-3 my-2 col-fixed"
            style="max-width:100%"
            @click="clickInput1" 
          />
          <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="image/*" required/>
          <div v-if="image!=null">                     
            <img class="preview" height="252" width="192" :src="imageUrl">
          <br>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" @click="modalStatue" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check" @click="addKiller" autofocus />
          </template>
        </Dialog>
        <Button href="javascript:void(0)" class="p-button-success mx-2" @click="logout">Logout</Button>   
      </div>
      <div class="container">
        <div 
          class="card"
          v-for="killer in nameGroup"
          :key="killer"
        >
          <a @click="passDataToRecords(killer)">
            <span></span>
            <div class="imgBox">
                <img :src="killer.cover" alt="killer"/>
            </div>
            <div class="content">
              <div>
                <h3 style="padding-bottom:20px">{{killer.name}}</h3>
                <p>move： {{filltermove(killer)}} m/s</p>
                <br>
                <p>terror： {{killer.terror}} m</p>
                <br>
                <p>height： {{killer.height}}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DBDNavbar from "../../components/DBDNavbar.vue"
export default {
  components:{ DBDNavbar },
  data(){
    return{
      levelOptions: ([{level:"ALL"}, {level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}]),
      heightOptions: ([{hei:"Tall"}, {hei:"Average"}, {hei:"Short"}]),
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
          killerHeight: killer.height,
          killerSkills: killer.skills,
          reSkills: killer.reSkills,
          killerWeapon: killer.weapon,
          killerPower: killer.power,
          killerRealName: killer.realName
        }
      }),
      console.log("pass")
    },
    filltermove(killer){
      if(!killer.move) return killer.move
      if(killer.move.length > 11 ){
        return killer.move.slice(7, 11)
      }else return killer.move
    },
    clickInput1(){
      this.$nextTick(()=>{
        this.$refs.input1.click()
      })
    }
  }
}
</script>

<script setup>
import { ref, onMounted, onUpdated, computed } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { db, storage } from "@/firebase"
import { ref as r, uploadBytes } from "firebase/storage"
import { collection, onSnapshot, addDoc } from "firebase/firestore"
import $ from "jquery"
const router = useRouter()
const killers = ref([])
const imageUrl = ref("")
const image = ref(null)
const displayModal = ref(false)
const selectedLevel = ref("ALL")
const searchName = ref("")
const input1 = ref(null)

onMounted(() => {
  onSnapshot(collection(db,"killers"), (querySnapshot) => {
    let fbkillers = []
    querySnapshot.forEach((doc) => {
      const killer = {
        id: doc.id,
        background: doc.data().background,
        name: doc.data().name,
        move: doc.data().movementSpeed,
        altMove: doc.data().altnativeMoveSpeed,
        terror: doc.data().terrorRadius,
        height: doc.data().height,
        weapon: doc.data().weapon,
        power: doc.data().power,
        level: doc.data().level,
        cover: doc.data().cover,
        skills: doc.data().skills,
        reSkills: doc.data().recommandSkills,
        realName: doc.data().realName
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
      console.log("x:",x,"y:",y)
    })
    $(".card").on("mouseout", function(e){
      var x = e.pageX - $(this).offset().left
      var y = e.pageY - $(this).offset().top
      $(this).find("span").css({top:y, left:x})
      console.log("x:",x,"y:",y)
    })
  })
})

const newKillerName = ref("")
const newKillerCover = ref("")
const newKillerLevel = ref("")

const addKiller = () => {
  addDoc(collection(db, "killers"), {
    name: newKillerName.value,
    level: newKillerLevel.value,
    cover: imageUrl.value
  })
  newKillerName.value = ""
  newKillerCover.value = ""
  newKillerLevel.value = ""
  imageUrl.value = ""
  image.value = null
  displayModal.value = false
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

const previewImage = event => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf(".") <= 0){
    return alert("Please add a valid file!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener("load",()=>{
    imageUrl.value = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  image.value = files[0]
  onUpload()
}
const onUpload = () => {
  const storageRef = r(storage, `killersCover/${image.value.name}`)
  uploadBytes(storageRef, image.value).then((snapshot) => {
    console.log("Uploaded a blob or file!")
    console.log(snapshot)
  })
}

const modalStatue = () => {
  displayModal.value = displayModal.value ? false : true
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
