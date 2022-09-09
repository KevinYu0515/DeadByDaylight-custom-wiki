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
        <Dialog 
          header="Append New Role" 
          v-model:visible="displayModal[0]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '50vw'}" :modal="true"
        >
        <form @submit.prevent="handleSubmit(!v$.$invalid)">
          <Dropdown
              v-model="v$.newKillerLevel.$model" :class="{'p-invalid':v$.newKillerLevel.$invalid && submitted}"
              :options="levelOptions"
              optionLabel="level"
              optionValue="level"
              placeholder="ALL"
              class="mx-1 my-1"
              style="width:200px"
            />
            <small v-if="(v$.newKillerLevel.$invalid && submitted) || v$.newKillerLevel.$pending.$response" class="p-error">
              {{v$.newKillerLevel.required.$message.replace('Value', 'Level')}}
            </small>
            <InputText 
              placeholder="KillerName"
              class="mx-1 my-1"
              v-model="v$.newKillerName.$model" :class="{'p-invalid':v$.newKillerName.$invalid && submitted}"
              required
            />
            <small v-if="(v$.newKillerName.$invalid && submitted) || v$.newKillerName.$pending.$response" class="p-error">
              {{v$.newKillerName.required.$message.replace('Value', 'Name')}}
            </small>
            <Dropdown
              v-model="v$.newKillerDR.$model" :class="{'p-invalid':v$.newKillerDR.$invalid && submitted}"
              :options="drOptions"
              optionLabel="dr"
              optionValue="dr"
              placeholder="Difficutly Rating"
              class="mx-1 my-1"
              style="width:200px"
            />
            <small v-if="(v$.newKillerDR.$invalid && submitted) || v$.newKillerDR.$pending.$response" class="p-error">
              {{v$.newKillerDR.required.$message.replace('Value', 'Difficulty Rating')}}
            </small>
            <br/>
            <hr class="inDialog">
            <Button 
              label="Upload Cover"  
              class="p-button-warning my-2 col-fixed"
              style="max-width:100%; margin-right:30px;"
              @click="clickInput1" 
            />
            <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="image/*" required/>
            <Button type="submit" label="Submit" class="my-2" />
            <div v-if="image!=null">                     
              <img class="preview" height="252" width="192" :src="imageUrl">
            <br>
            </div>
          </form>
          <template #footer>
              <Button label="Discard" icon="pi pi-trash" @click="modalStatue(1)" class="p-button-text"/>
          </template>
        </Dialog>
        <Dialog 
          header="Warning" 
          v-model:visible="displayModal[1]" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
          :style="{width: '30vw'}" :modal="true"
        >
        <p>你所作的紀錄將不會儲存，確定要退出?</p>
          <template #footer>
            <Button label="Yes" icon="pi pi-check" @click="modalStatue(1); modalStatue(0); clearData()" class="p-button-text"/>
            <Button label="No" icon="pi pi-times" @click="modalStatue(1)" class="p-button-text"/>
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
</template>

<script>
import DBDNavbar from "../../components/DBDNavbar.vue"
export default {
  components:{ DBDNavbar },
  data(){
    return{
      levelOptions: ([{level:"ALL"}, {level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}]),
      heightOptions: ([{hei:"Tall"}, {hei:"Average"}, {hei:"Short"}]),
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
          killerDifficulty: killer.difficulty
        }
      }),
      console.log("pass")
    },
    difficulty(killer){
      switch (killer.difficulty){
        case "Easy": return "rgba(64,176,64)"
        case "Moderate": return "yellow"
        case "Hard": return "rgba(229,132,48)"
        case "Very Hard": return "rgba(246,89,89)"
      }
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
import { reactive, ref, onMounted, onUpdated, computed } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { killersColRef, storage } from "@/firebase"
import { ref as r, uploadBytes } from "firebase/storage"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import $ from "jquery"

import { addDoc, onSnapshot } from "firebase/firestore"
const router = useRouter()
const killers = ref([])
const imageUrl = ref("")
const image = ref(null)
const displayModal = ref([false])
const selectedLevel = ref("ALL")
const searchName = ref("")
const input1 = ref(null)
const submitted = ref(false)

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
        difficulty: doc.data().difficulty
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

onUpdated(() => {
  let background = document.querySelector(".bg")
  window.addEventListener("scroll", () => {
    let value = 1 + window.scrollY / -600
    background.style.opacity = value
  })
})

const state = reactive({
  newKillerName : "",
  newKillerLevel : "",
  newKillerDR: ""
})

const rules = {
  newKillerLevel: { required },
  newKillerName: { required },
  newKillerDR: { required }
}

const v$ = useVuelidate(rules, state)

const handleSubmit = (isFormValid) => {
    submitted.value = true
    if (!isFormValid) { return }
    addKiller()
}

const addKiller = () => {
  addDoc(killersColRef, {
    name: state.newKillerName,
    level: state.newKillerLevel,
    cover: imageUrl.value,
    difficulty: state.newKillerDR
  })
  clearData()
  displayModal.value[0] = false
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

const clearData = () => {
  state.newKillerLevel = ""
  state.newKillerName = ""
  state.newKillerDR = ""
  image.value = null
  imageUrl.value = ""
  submitted.value = false
}

const modalStatue = i => {
  displayModal.value[i] = !displayModal.value[i]
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
