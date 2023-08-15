<template>
  <div class="records flex justify-content-center align-items-center">
    <img class="background" :src="backgroundImage" alt="backgroundImage"/>
    <div class="leftInfor flex justify-content-center align-items-center flex-column absolute z-5">
      <div class="card relative overflow-hidden">
        <div class="imgBox absolute top-0 left-0 w-full h-full">
          <img class="absolute top-0 left-0 w-full h-full" :src="killer.info.cover" alt="killer"/>
        </div>
      </div>
      <div class="content flex justify-content-center align-items-center relative">
        <div>
          <h1>{{killer.info.name[0]}}</h1>
          <p>Difficulty Rating： <span class="difficulty">{{killer.info.difficulty}}</span> </p>
        </div>
      </div>
      <div class="buttonGroup bs">
        <Button 
          label="Back"
          data-type="back"  
          class="p-button-success mt-3"
          @click="routerTo('/')" 
        /> 
      </div>
    </div>

    <div class="swiper-area relative">
      <swiper
        :observer="true"
        :observeParents="true"
        :slidesPerView="1"
        :spaceBetween="30"
        :centered-slides="true"
        :loop="true"
      >
        <swiper-slide>
          <div class="perks mb-5 flex justify-content-center align-items-start flex-column relative">
            <h1>Perks<span><router-link to="/perks">(Read More)</router-link></span></h1>
            <hr class="outDialog">
            <h3>Self Perks</h3>
            <div class="selfPerks flex" v-if="(perks.filter(data => data.type === 'self').length)">
              <div
                class="selfPerks__item"
                v-for="perk in perks.filter(data => data.type === 'self')"
                :key="perk"
              >
                <img :src="perk.image" width="130" height="130"/>
              </div>
            </div>
            <h3>Recommend Perks</h3>
            <div class="recommendPerks flex" v-if="(perks.filter(data => data.type === 'recommend').length)">
              <div
                class="recommendPerks__item"
                v-for="perk in perks.filter(data => data.type === 'recommend')"
                :key="perk"
              >
                <img :src="perk.image" width="130" height="130"/>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="infor mb-5 relative">
            <h1>Info</h1>
            <hr class="outDialog">
            <table>
              <tr>
                <th>Type</th>
                <th><span class="value">Content</span></th>
              </tr>
              <tr>
                <td>RealName</td>
                <td><span class="value">{{killer.info.name[1]}}</span></td>
              </tr>
              <tr>
                <td>Weapon</td>
                <td><span class="value">{{killer.info.weapon}}</span></td>
              </tr>
              <tr>
                <td>Power</td>
                <td><span class="value">{{killer.info.power}}</span></td>
              </tr>
              <tr>
                <td>Movement Speed</td>
                <td><span class="value">{{killer.info.movementSpeed.normal}}</span></td>
              </tr>
              <tr v-if="killer.info.movementSpeed.alternative">
                <td>Alternate Movement Speed</td>
                <td><span class="value">{{killer.info.movementSpeed.alternative}}</span></td>
              </tr>
              <tr>
                <td>Terror Radius</td>
                <td><span class="value">{{killer.info.terrorRadius.normal}}</span></td>
              </tr>
              <tr v-if="killer.info.terrorRadius.alternative">
                <td>Alternate Terror Radius</td>
                <td><span class="value">{{killer.info.terrorRadius.alternative}}</span></td>
              </tr>
              <tr>
                <td>Height</td>
                <td><span class="value">{{killer.info.height}}</span></td>
              </tr>
            </table>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="add-ones-container mb-5 relative" v-if="(addOnes.length)">
            <h1>Add-Ones</h1>
            <hr class="outDialog"/>
            <div class="add-ones-block" v-for="(add_ones, index) in addOnes" :key="index">
              <img :src="add_ones.image" width="100" height="100" alt="" class="" :title="filterText(add_ones.name, 4)"/>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import killersStore from "../vuex/killersStore"
import { onBeforeMount, onMounted, onBeforeUnmount, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()
const props = defineProps(["killer_information"])
const killer = JSON.parse(props.killer_information)
const perks = computed(() => store.state.killers ? store.state.killers.data.perks : [])
const addOnes = computed(() => store.state.killers ? store.state.killers.data.addOnes : [])
const backgroundImage = computed(() => require("../assets/picture/default_record_background.png"))

// 文字長度過濾器
const filterText = (text, num) => text.slice(0, num * -1)

// 跳轉路由器
const routerTo = path => router.push(`${path}`)

// 生命週期
onBeforeMount(() => {
  store.registerModule("killers", killersStore)
  store.dispatch("killers/GETPERK", killer.id)
  store.dispatch("killers/GETADDONES", killer.id)
})

onMounted(() => {
  let diff = document.querySelector(".difficulty")
  const textColorMap = store.state.killers.difficultyColor
  const color = textColorMap[diff.textContent]
  document.documentElement.style.setProperty("--difficulty", color)
})

onBeforeUnmount(() => store.unregisterModule("killers"))

</script>

<style lang="scss" scoped>
@import "../assets/scss/records.scss";
</style>

<style scoped>
@import "../assets/css/index.css";
</style>