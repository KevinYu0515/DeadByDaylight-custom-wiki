<template>
  <div class="personal">
    <h3>{{ message }}</h3>
    <div class="container01 grid w-8 flex justify-content-center align-items-center">
      <Dropdown
        v-model="selectedStyle"
        :options="styleOptions"
        optionLabel="style"
        optionValue="style"
        placeholder="全部"
        class="mx-3 col-3"
      />
      <div class="col-6 md:col-4">
        <div class="p-inputgroup">
            <InputText 
              placeholder="KillerName" 
              v-model.trim="input.name" 
              @keyup.enter="inputHandler"
            />
            <Button icon="pi pi-search" class="p-button-warning"/>
        </div>
      </div>
      <Button 
        label="Add"  
        class="p-button-danger mx-2 col-fixed"
        style="max-width:100%"
        @click="ModalStatue" 
      />
      <Dialog 
        header="Append New Role" 
        v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
        :style="{width: '50vw'}" :modal="true"
      >
        <div class="grid my-2">
          <select type="text" class="mx-2 h-2rem col-2" v-model="input.style" v-tooltip.top="'Choose your style'">
            <option v-for="item in styleOptions" :key="item">
              {{ item.style }}
            </option>
          </select>
          <input type="text" class="h-2rem col-3" placeholder="KillerName" v-tooltip.top="'Enter your killerName'" />
          <input type="text" class="h-2rem mx-2 col-4" placeholder="KillerSubName" v-tooltip.top="'Enter your subName'" />
        </div>
        <div class="grid my-2 mx-2">
          <p class="col-2">First Skill</p>
          <input type="file" class="col-10" @change="onFileSelected" v-tooltip.left="'Upload your first skill'"/>
          <p class="col-2">Second Skill</p>
          <input type="file" class="col-10" @change="onFileSelected" v-tooltip.left="'Upload your second skill'"/>
          <p class="col-2">Third Skill</p>
          <input type="file" class="col-10" @change="onFileSelected" v-tooltip.left="'Upload your third skill'"/>
        </div>
        <div class="grid my-2 mx-2">
          <p class="col-2">Weapon</p>
          <input type="file" class="col-10" @change="onFileSelected" v-tooltip.left="'Upload your weapon'"/>
          <p class="col-2">Ability</p>
          <input type="file" class="col-10" @change="onFileSelected" v-tooltip.left="'Upload your ability'"/>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="ModalStatue" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" @click="ModalStatue" autofocus />
        </template>
      </Dialog>
      <Button href="javascript:void(0)" class="p-button-success mx-2" @click="logout">Logout</Button>
    </div>
    <div class="container02">
      <swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :coverflowEffect="{
          rotate: 0,
          stretch: 60,
          depth: 200,
          modifier: 2,
          slideShadows: false,
        }"
        :pagination="{ clickable: true, dynamicBullets: false }"
        class="mySwiper"
      >
        <swiper-slide
          class="card"
          v-for="(item, index) in nameGroup"
          :key="index"
        >
          <div class="circle"></div>
          <div class="content grid">
            <div class="title col-12 text-4xl">
              {{item.name}}<span class="text-sm" v-if="item.sub_name != null">{{item.sub_name.join("、")}}</span>
            </div>
            <div 
              class="skill col-4"
              v-for="(skill, index2) in item.skills"
              :key="index2"
            >
              <img :src="require(`@/assets/icon/skills/${skill}.png`)" alt="none" :title="`${skill}`">
            </div>
            <div 
              class="attack col-3 mx-2"
              v-for="(attack, index3) in item.attack"
              :key="index3"
            >
              <img :src="require(`@/assets/icon/attack/${attack}.png`)" alt="none" :title="`${attack}`">
            </div>
          </div>
          <img :src="require(`@/assets/picture/killer/${item.killer}.png`)" alt="killer001">
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import SwiperCore, { Pagination,  EffectCoverflow } from "swiper"
import axios from "axios"
import { useRouter } from "vue-router"
import { onMounted, ref } from "vue"
import "swiper/swiper-bundle.css"

SwiperCore.use([Pagination,  EffectCoverflow])

export default {
  setup(){
    const router = useRouter()
    const message = ref("")
    const logout = async() => {
      await axios.post("logout", {}, { withCredentials:true })
      axios.defaults.headers.common["Authorization"] = ""
      await router.push("/login")
    }
    onMounted( async() => {
      const{ data } = await axios.get("user")
      message.value = `Hi ${data.name}`
    })

    return{ message, logout }

  },
  components: {
    Swiper, SwiperSlide 
  },

  data() {
    return {
      displayModal: false,
      selectedStyle:"全部",
      input: {
        style: "全部",
        name: "",
        killer: "001",
        sub_name: [""],
        skills: ["未知", "未知", "未知"],
        attack: ["UnKnown", "UnKnown"],
      },
      killerGroup: [],
      buttons: ["Add", "Cancel", "Delete"],
      styleOptions: ([ {style:"全部"}, {style:"追獵型"}, {style:"守屍型"}, {style:"暗殺型"}, {style:"控場型"}])
    }
  },
  computed: {
    styleGroup() {
      if (this.selectedStyle !== "全部") {
        return this.killerGroup.filter((item) => {
          return item.style == this.selectedStyle
        })
      } else {
        return this.killerGroup
      }
    },
    nameGroup() {
      if (this.input.name) {
        return this.killerGroup.filter((item) => {
          let name = item.name.toLowerCase()
          let keyword = this.input.name.toLowerCase()
          return name.indexOf(keyword) !== -1
        })
      } else {
        return this.styleGroup
      }
    },
  },
  mounted() {
    axios.get("http://localhost:1020/killerGroup")
      .then((res) => {
        this.killerGroup = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    submitHandler() {
      const fd = new FormData()
      fd.append("image", this.input.skills[0], this.input.skills[0].name)
      fd.append("style", this.input.style)
      fd.append("name", this.input.name)
      if (!this.input.style || !this.input.name) return
      axios.post("http://localhost:1020/killerGroup", fd)
        .then((res) => {
          this.killerGroup.push(res.data)
          this.cancelHandler()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cancelHandler() {
      this.input.name = ""
    },
    deleteHandler(item) {
      let target = item
      if (confirm(`Do you want to remove ${target.name} ?`)) {
        axios.delete("http://localhost:1020/killerGroup/" + target.id)
          .then((res) => {
            this.killerGroup.splice(target.id - 1, 1)
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    onFileSelected(event){
      console.log(event)
    },
    ModalStatue() {
      this.displayModal = this.displayModal ? false : true
    },
  },
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/others/personal/before.scss";
@import url("https://cdn-uicons.flaticon.com/uicons-bold-straight/css/uicons-bold-straight.css");
</style>
