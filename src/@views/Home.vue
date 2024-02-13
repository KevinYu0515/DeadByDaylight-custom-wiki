<template>
  <DBDNavbar></DBDNavbar>
  <div id="landing-container">
    <div class="banner">
      <div class="content">
        <h2>DeadByDaylight <span>Wiki</span></h2>
        <p>Just for fun and practice Vue3 framework.<br/>Maker: YuKai<br/>Making Time: 2024/02/13<br/> Game Version: 9.0.2</p>
        <div class="slide"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DBDNavbar from "@/@components/Navbar/DBDNavbar.vue";
</script>

<style lang="scss" scoped>
@import "../assets/scss/home.scss";
</style>
