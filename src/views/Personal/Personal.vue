<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
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
        />
      <InputText 
        placeholder="KillerName"
        v-model.trim="searchName"
      />
      <InputText 
        placeholder="AddKiller"
        class="mx-3"
        v-model.trim="newKillerName"
      />
      <InputText 
        placeholder="AddCover"
        class="mx-3"
        v-model.trim="newKillerCover"
      />
      <Button 
        label="Add"  
        class="p-button-danger mx-3 col-fixed"
        style="max-width:100%"
        @click="addKiller" 
      />
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
              <img :src="require(`@/assets/picture/killer/${killer.index}.png`)" alt="killer"/>
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
      searchName:"",
      selectedLevel: "ALL",
      levelOptions: ([ {level:"ALL"}, {level:"T0"}, {level:"T1"}, {level:"T2"}, {level:"T3"}])
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
            killerIndex: killer.index,
            killerName: killer.name,
            killerMove: killer.move,
            killerTerror: killer.terror,
            killerHeight: killer.height
          }
        }),
        console.log("pass")
      }
    }
}
</script>

<script setup>
import { ref, onMounted, onUpdated } from "vue"
import { db } from "@/firebase"
import { collection, onSnapshot,addDoc } from "firebase/firestore"
import $ from "jquery"
const killers = ref([])

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
        level: doc.data().level
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
    index: newKillerCover.value,
    name: newKillerName.value,
    level: newKillerLevel.value,
    move: 4.6,
    terror: 32,
    height: "tall"
  })
  newKillerName.value = ""
  newKillerCover.value = ""
  newKillerLevel.value = ""
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/personal.scss";
</style>
