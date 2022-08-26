<template>
  <div class="personal">
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
        @click="ModalStatue" 
      />
      <Dialog 
        header="Append New Role" 
        v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
        :style="{width: '50vw'}" :modal="true"
      >
        <InputText 
          placeholder="AddKiller"
          class="mx-3"
          v-model.trim="newKillerName"
        />
        <Button 
          label="Upload Cover"  
          class="p-button-warning mx-3 col-fixed"
          style="max-width:100%"
          @click="input1" 
        />
        <input type="file" name="file" ref="input1" style="display:none" @change="previewImage" accept="image/*" required/>
        <div v-if="image!=null">                     
          <img class="preview" height="252" width="192" :src="imageUrl">
        <br>
        </div>
        <Button 
          label="Add"  
          class="p-button-danger mx-3 col-fixed"
          style="max-width:100%"
          @click="addKiller" 
        />
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="ModalStatue" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" @click="ModalStatue" autofocus />
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
              <p>move： {{killer.move}} m/s</p>
              <br>
              <p>terror： {{killer.terror}} m</p>
              <br>
              <p>height： {{killer.height}}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      displayModal: false,
      searchName: "",
      selectedLevel: "ALL",
      levelOptions: ([ {level:"ALL"}, {level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}]),
    }
  },
  computed:{
    levelGroup() {
        if (this.selectedLevel !== "ALL") {
          return this.killers.filter((item) => {
            return item.level == this.selectedLevel
          })
        } else {
          return this.killers
        }
      },
      nameGroup() {
        if (this.searchName) {
          return this.killers.filter((item) => {
            let name = item.name.toLowerCase()
            let keyword = this.searchName.toLowerCase()
            return name.indexOf(keyword) !== -1
          })
        } else {
          return this.levelGroup
        }
      },
    },
    methods:{
      passDataToRecords(killer){
        this.$router.push({
          path:"/records",
          name:"Records",
          query:{
            killerCover: killer.cover,
            killerName: killer.name,
            killerMove: killer.move,
            killerTerror: killer.terror,
            killerHeight: killer.height
          }
        }),
        console.log("pass")
      },
      previewImage(event){
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf(".") <= 0){
          return alert("Please add a valid file!")
        }
        const fileReader = new FileReader()
        fileReader.addEventListener("load",()=>{
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
        this.onUpload()
      },
      onUpload(){
        const storageRef = r(storage, `${this.image.name}`)
        uploadBytes(storageRef, this.image).then((snapshot) => {
          console.log("Uploaded a blob or file!")
          console.log(snapshot)
        })
      },
      ModalStatue() {
        this.displayModal = this.displayModal ? false : true
      },
      input1() {
        this.$refs.input1.click()   
      },
    }
}
</script>

<script setup>
import { ref, onMounted, onUpdated } from "vue"
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

onMounted(() => {
  onSnapshot(collection(db,"killers"), (querySnapshot) => {
    let fbkillers = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data())
      const killer = {
        id: doc.id,
        index: doc.data().index,
        name: doc.data().name,
        move: doc.data().move,
        terror: doc.data().terror,
        height: doc.data().height,
        level: doc.data().level,
        cover: doc.data().cover
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
    move: "",
    terror: "",
    height: "",
    cover: imageUrl.value
  })
  newKillerName.value = ""
  newKillerCover.value = ""
  newKillerLevel.value = ""
  imageUrl.value = ""
  image.value = null
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
