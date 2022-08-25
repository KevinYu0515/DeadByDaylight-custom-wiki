<template>
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
  <div class="home_secondParaph">
      <div class="box_container">
        <div class="box">
          <div class="percent">
            <svg id="circle1">
              <circle cx="60" cy="60" r="60"></circle>
              <circle cx="60" cy="60" r="60"></circle>
            </svg>
            <div class="number">
              <h2>30<span>%</span></h2>
            </div>
          </div>
          <h2 class="text">Algorithm</h2>
        </div>
        <div class="box">
          <div class="percent">
            <svg id="circle2">
              <circle cx="60" cy="60" r="60"></circle>
              <circle cx="60" cy="60" r="60"></circle>
            </svg>
            <div class="number">
              <h2>35<span>%</span></h2>
            </div>
          </div>
          <h2 class="text">APP & Web</h2>
        </div>
        <div class="box">
          <div class="percent">
            <svg id="circle3">
              <circle cx="60" cy="60" r="60"></circle>
              <circle cx="60" cy="60" r="60"></circle>
            </svg>
            <div class="number">
              <h2>35<span>%</span></h2>
            </div>
          </div>
          <h2 class="text">Robot</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
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
@import "@/assets/scss/home/firstParaph.scss";
@import "@/assets/scss/home/secondParaph.scss";
@import "@/assets/scss/element/btn.scss";
@import "@/assets/scss/element/decoration.scss";
</style>
