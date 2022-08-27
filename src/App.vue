<template>
  <div class="app">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue"
export default {
  name: "App",
  components: { Footer },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&family=Space+Grotesk&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Rowdies&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand&family=Ubuntu&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  scroll-behavior: smooth;
}

.default {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #f5f5f5;
  font-size: 18vw;
  font-weight: 700;
}
</style>
