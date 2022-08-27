<template>
  <div class="navbar">
    <router-link to="/" class="logo">
        <img :src="require('@/assets/icon/dbdlogo.png')" alt="logo"/>
    </router-link>
    <ul>
        <li><router-link to="/personal">Main</router-link></li>
        <li><router-link to="/skills">Skills</router-link></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/dbdnavbar.scss";
@import url('https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Dirt&display=swap');
</style>