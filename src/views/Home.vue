<template>
  <Navbar></Navbar>
  <section id="home">
    <div class="home_firstParaph">
      <div class="photo_bgRight"></div>
      <div id="content">
        <h1>Hi I'm<br /><span>Kevin LIN</span></h1>
        <p>
          I wouldn't care success or failure, for I will only struggle ahead as
          long as I have been destined to the distance. I wouldn't care the
          difficulties around, for what I can leave on the earth is only their
          view of my back since I have been marching toward the horizontal.
        </p>
        <Button
          @click="jump('about')"
          class="p-button-infor"
        >
          Read more
        </Button>
      </div>
      <img class="picture" src="../assets\picture\bg-1.jpg" />
    </div>
  </section>
  <Footer></Footer>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
export default {
  components:{ Navbar, Footer },
  data: () => ({
    media_icons: [
      {
        icon: require("@/assets/icon/facebook1.png"),
        path: "https://www.facebook.com/profile.php?id=100009946749327",
      },
      {
        icon: require("@/assets/icon/email1.png"),
        path: "",
      },
      {
        icon: require("@/assets/icon/phone1.png"),
        path: "",
      },
      {
        icon: require("@/assets/icon/github1.png"),
        path: "https://github.com/",
      },
    ],
  }),
  methods: {
    jump: function (msg) {
      this.$router.push({ path: msg })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
@import "@/assets/scss/element/btn.scss";
@import "@/assets/scss/element/decoration.scss";
</style>
