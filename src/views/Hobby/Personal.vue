<template>
  <div class="entertain">
    <div class="container01 grid w-5">
      <Dropdown
        v-model="input.style"
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
        class="p-button-danger mx-2"
         v-for="button in 2"
         :key="button"
        @click="button == 1 ? submitHandler() : cancelHandler()"
      >
        {{ buttons[button - 1] }}
      </Button>      
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
import "swiper/swiper-bundle.css"

SwiperCore.use([Pagination,  EffectCoverflow])

export default {
  components: {
    Swiper, SwiperSlide 
  },

  data() {
    return {
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
      if (this.input.style !== "全部") {
        return this.killerGroup.filter((item) => {
          return item.style == this.input.style
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
    this.axios
      .get("http://localhost:1020/killerGroup")
      .then((res) => {
        this.killerGroup = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    submitHandler() {
      let { style, name } = this.input
      if (!style || !name) return
      this.axios
        .post("http://localhost:1020/killerGroup", this.input)
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
        this.axios
          .delete("http://localhost:1020/killerGroup/" + target.id)
          .then((res) => {
            this.killerGroup.splice(target.id - 1, 1)
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/hobby/personal.scss";
@import url("https://cdn-uicons.flaticon.com/uicons-bold-straight/css/uicons-bold-straight.css");
</style>
