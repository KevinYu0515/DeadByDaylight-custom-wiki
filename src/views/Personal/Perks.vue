<template>
  <DBDNavbar></DBDNavbar>
  <div class="perks flex justify-content-center align-items-center flex-column">
    <div class="illustrated">
      <ul>
        <li
          class="list-none absolute overflow-hidden cursor-pointer"
          :class="{'item': !isClick[index], 'active': isClick[index]}"
          v-for="(perk, index) in perks"
          :key="index"
          :style="{'top': topCalc(index), 'left': leftCalc(index)}"
        >
          <div class="bg w-full h-full" @click="clickPerk(perk, index)" :title="perk.name">
            <img :src="perk.icon" alt="">
          </div>
        </li>
        <li 
          class="list-none absolute overflow-hidden"
          :style="{'top': topCalc(perks.length), 'left': leftCalc(perks.length)}"
        >
          <div class="bg w-full h-full cursor-pointer" @click="modalStatue(0, false)" title="Add New perks">
            <img :src="require('@/assets/icon/IconHelp.png')" alt=""/>
          </div>
        </li>
      </ul>
    </div>

    <append-perk
      :isDisplay="displayModal[0]"
      @childModal="modalStatue"
      @uploadImg="onUpload"
      @setPerkDoc="addPerk"
      ref="appendPerk"
    />
    <simple-dialog :isDisplay="displayModal[1]" location="Append New perk" @childModal="modalStatue"></simple-dialog>

    <div class="infor flex justify-content-center align-items-center flex-column p-5">
      <h1>Perks INFORMATION</h1>
      <hr class="outDialog">
      <div v-if="perksClick.length > 0" class="my-2">
        <Button @click="clearPerksClick" class="p-button-success mx-2">已選：{{perksClick.length}}</Button>
        <Button label="Clear" icon="pi pi-times" @click="clearPerksClick" class="p-button-infor mx-2"/>
      </div>
      <div class="nonePerks p-8" v-if="perksClick.length == 0">Please Click Perks Above</div>
      <div 
        class="inforBox flex justify-content-center align-items-center" 
        v-else 
        v-for="(perk, index) in perksClick" 
        :key="index"
      >
        <h1 class="mx-5">{{perk.usefulness}}</h1>
        <img class="mx-5" :src="perk.icon" alt="">
        <div class="text flex justify-content-center align-items-start flex-column p-5 w-6">
          <h2>{{perk.name}}</h2>
          <p> {{perk.illustrate}} </p>
        </div>
        <Button 
          label="Edit"  
          class="p-button-warning bs"
          style="max-width:100%"
          @click="editStatue(index);" 
        /> 

        <append-perk
          :isEdit="displayEdit[index]"
          :perkData="perk"
          :perkIndex="index"
          :perkList="perks"
          @updatePerk="updatePerk"
          @complete="editStatue"
          @replace="replacePerk"
        />

        <simple-dialog
          :isDisplay2="displayModal[2]"
          title="Warning"
          content="該資料不可為空"
          @childModal="modalStatue"
        ></simple-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DBDNavbar from "../../components/Navbar/DBDNavbar.vue"
import SimpleDialog from "../../components/DialogGroup/SimpleDialog.vue"
import AppendPerk from "../../components/DialogGroup/AppendPerk.vue"
export default {
  name:"perks",
  components:{ DBDNavbar, SimpleDialog, AppendPerk },
  data(){
    return{
      perksClick: [],
      clickIndex: [],
      isClick : [false],
    }
  },
  methods:{
    topCalc(i){
      let index = 200
      if(i<=7){
        index += (i%2)*55
      }else{
        index += (i%2)*55+(2*Math.floor(i/16))*55
      }
      index = index.toString()+"%"
      return index
    },
    leftCalc(i){
      let index = 80
      index += i%16*13
      index = index.toString()+"%"
      return index
    },
    clickPerk(e, n){
      this.isClick[n] = !this.isClick[n]
      if(this.isClick[n]){
        this.perksClick.unshift(e)
        this.clickIndex.unshift(n)
      }else{
        for(let i=0; i<this.perksClick.length;i++){
          if(this.perksClick[i].name == e.name){
            this.perksClick.splice(i,1)
            this.clickIndex.splice(i,1)
          }else{
            console.log("false")
          }
        }
      }
    },
    replacePerk(perk, perks){
      for(let i=0; i<this.perksClick.length;i++){
          if(this.perksClick[i] == perk){
            this.perksClick.splice(i,1,perks[this.clickIndex[i]])
          }
        }
    },
    clearPerksClick(){
      this.isClick = [false]
      this.perksClick = []
    },
  }
}
</script>

<script setup>
import { ref,  onMounted, computed, onBeforeUnmount } from "vue"
import { useStore } from "vuex"
import perksStore from "../../vuex/perksStore"

const store = useStore()
const perks = computed(() => store.state.perks ? store.state.perks.fbPerks : [])
const displayEdit = ref([false])
const displayModal = ref([false])
const appendPerk = ref(null)

// 資料處理表達式
const addPerk = perkData => store.dispatch("perks/ADDDATA", perkData)
const updatePerk = (id, options ,optionsValue) => store.dispatch("perks/UPDATEDATA", {id, options, optionsValue})
const onUpload = perk => store.dispatch("perks/UPLOADDATA", perk)

// 彈出視窗狀態控制
const editStatue = i => displayEdit.value[i] = !displayEdit.value[i]
const modalStatue = (i, isClear) => {
  console.log(displayModal.value[i], "Test")
  displayModal.value[i] = !displayModal.value[i]
  if(isClear) appendPerk.value.clearData()
}

// 生命週期
onMounted(() => {
  store.registerModule("perks", perksStore)
  store.dispatch("perks/GETDATA")
})
onBeforeUnmount(() => store.unregisterModule("perks"))

</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/perks.scss";
</style>

<style scoped>
@import "../../assets/css/index.css";
</style>