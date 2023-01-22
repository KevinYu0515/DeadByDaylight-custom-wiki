<template>
  <!-- <img class="bg fixed h-auto opacity-10 w-full" :src="killer_information.backgroundImage"/> -->
  <div class="records flex justify-content-center align-items-center">
    <div class="leftInfor flex justify-content-center align-items-center flex-column absolute z-5">
      <Button
        label="Delete"  
        class="p-button-danger bs mb-3"
        style="max-width:100%"
        @click="deleteKiller(killer_information.id)"
      />
      <div class="card relative overflow-hidden">
        <div class="imgBox absolute top-0 left-0 w-full h-full">
          <img class="absolute top-0 left-0 w-full h-full" :src="killer_information.cover" alt="killer"/>
        </div>
      </div>
      <div class="content flex justify-content-center align-items-center relative">
        <div>
          <h1>{{killer_information.name}}</h1>
          <p>Difficulty Rating： <span class="difficulty">{{killer_information.difficulty}}</span> </p>
        </div>
      </div>
      <div class="buttonGroup bs">
        <SplitButton data-type="settings" label="Settings" icon="pi pi-bars" :model="items"></SplitButton>
        <Button 
          label="Back"
          data-type="back"  
          class="p-button-success mt-3"
          @click="routerTo('/personal')" 
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
          <div class="perks mb-5 flex justify-content-center align-items-start flex-column relative" v-if="(killer_information.perks[0])">
            <h1>Perks<span><router-link to="/skills">(Read More)</router-link></span></h1>
            <hr class="outDialog">
            <h3>Self Perks</h3>
            <div class="selfPerks flex" v-if="(killer_information.perks[0])">
              <div class="selfPerks__item" v-for="perk in killer_information.perks" :key="perk"><img :src="perk" width="130" height="130"/></div>
            </div>
            <h3>Recommend Perks</h3>
            <div class="recommendPerks flex" v-if="(killer_information.recommendPerks[0])">
              <div class="recommendPerks__item" v-for="perk in killer_information.recommendPerks" :key="perk"><img :src="perk" width="130" height="130"/></div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="infor mb-5 relative">
            <h1>Infor</h1>
            <hr class="outDialog">
            <table>
              <tr>
                <th>Type</th>
                <th><span class="value">Content</span></th>
              </tr>
              <tr>
                <td>RealName</td>
                <td><span class="value">{{killer_information.realName}}</span></td>
              </tr>
              <tr>
                <td>Weapon</td>
                <td><span class="value">{{killer_information.weapon}}</span></td>
              </tr>
              <tr>
                <td>Power</td>
                <td><span class="value">{{killer_information.power}}</span></td>
              </tr>
              <tr>
                <td>Movement Speed</td>
                <td><span class="value">{{killer_information.movementSpeed}}</span></td>
              </tr>
              <tr v-if="killer_information.alternativeMovementSpeed">
                <td>Alternate Movement Speed</td>
                <td><span class="value">{{killer_information.alternativeMovementSpeed}}</span></td>
              </tr>
              <tr>
                <td>Terror Radius</td>
                <td><span class="value">{{killer_information.terrorRadius}}</span></td>
              </tr>
              <tr v-if="killer_information.alternativeTerrorRadius">
                <td>Alternate Terror Radius</td>
                <td><span class="value">{{killer_information.alternativeTerrorRadius}}</span></td>
              </tr>
              <tr>
                <td>Height</td>
                <td><span class="value">{{killer_information.height}}</span></td>
              </tr>
            </table>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="add-ones-container mb-5 relative" v-if="(killer_information.add_ones_images[0])">
            <h1>Add-Ones</h1>
            <hr class="outDialog"/>
            <div class="add-ones-block" v-for="(add_ones_image, index) in killer_information.add_ones_images" :key="index">
              <img @click="toggleAddOnes(index)" :src="add_ones_image" width="100" height="100" alt="" class="" :title="filterText(killer_information.add_ones_names[index], 4)"/>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <Dialog
      :header="add_ones_information.name"
      v-model:visible="add_ones_popup"
      :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
      :modal="true"
    >
      <img :src="add_ones_information.image" width="100" height="100" alt="" class=""/>
      <p>
        {{ add_ones_information.description }}
      </p>
      <template #footer>
        <Button label="Close" @click="toggleAddOnes()" class="p-button-text"/>
      </template>
    </Dialog>
  </div>

   <!-- 紀錄更改 -->
  <AppendRecord
    :isdisplay="displayModal[0]"
    :killer_information="JSON.stringify(killer_information)"
    @childmodal="modalStatue"
    @uploadData="onUpload"
    @updateSettings="updateSettings"
  />

  <!-- 紀錄儲存警告 -->
  <SimpleDialog
    :isdisplay="displayModal[1]" 
    :location="`${killer_information.name} Settings`" 
    @childModal="modalStatue"
  />

  <!-- 背景圖片上傳 -->
  <SimpleDialog
    :isdisplay3="displayModal[4]"
    :upload-title="`${killer_information.name} Background`"
    :close3= 4
    uploadItems="bgImg"
    @upload-doc="onUpload"
    @updateSettings="updateSettings"
    @childModal="modalStatue"
  />
</template>

<script setup>
import SimpleDialog from "../../components/DialogGroup/SimpleDialog.vue"
import AppendRecord from "../../components/DialogGroup/AppendRecord.vue"
import killersStore from "../../vuex/killersStore"
import { ref, onMounted, onBeforeUnmount, reactive, computed, defineProps } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
// import json from "../../../python/killers.json"

const store = useStore()
const router = useRouter()
const props = defineProps(["killer_information"])
const displayModal = ref([false])
const killer_information = JSON.parse(props.killer_information)

// 附屬品資料設定
const add_ones_group = computed(() => store.state.killers ? store.state.killers.fbAdd_ones : [])
const add_ones_popup = ref(false)
const add_ones_information = reactive({
  image: "",
  name: "",
  description: ""
})

// 按鈕組設定
const items =  ref([
{
  label: "Base Information",
  icon: "pi pi-cog",
  command: () => { modalStatue(0) }
},
{
  label: "Background",
  icon: "pi pi-cog",
  command: () => { modalStatue(4) }
}
])

// 背景長度過濾器
// const fillterbg = background => {
//   if(!background) return background
//   if( background.length > 1000 ) return background.slice(0, 1000) + "..."
//   return background
// }
// 文字長度過濾器
const filterText = (text, num) => text.slice(0, num * -1)

// 資料處裡表達式
const id = killer_information.id
const updateSettings = (options, optionsValue) => store.dispatch("killers/UPDATEDATA", {id, options, optionsValue})
const onUpload = (data, file) => store.dispatch("killers/UPLOADIMG", {file, data})
const deleteKiller = id => {
  router.push("/personal")
  store.dispatch("killers/DELETEROLE", id)
}

// 跳轉路由器
const routerTo = path => router.push(`${path}`)

// 彈出視窗狀態控制
const modalStatue = i => displayModal.value[i] = !displayModal.value[i]

// 附屬品介紹觸發器
const toggleAddOnes = index => {
  add_ones_popup.value = !add_ones_popup.value
  add_ones_information.image = killer_information.add_ones_images[index]
  add_ones_information.name = add_ones_group.value[index].names.ch
  add_ones_information.description = add_ones_group.value[index].descriptions.en
}

// 生命週期
onMounted(() => {
  store.registerModule("killers", killersStore)
  store.dispatch("killers/GETADDONES", killer_information.id)
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
@import "@/assets/scss/personal/records.scss";
</style>

<style scoped>
@import "../../assets/css/index.css";
</style>