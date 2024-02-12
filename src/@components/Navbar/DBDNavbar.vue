<template>
  <div class="navbar flex justify-content-center align-items-center top-0 left-0 fixed">
    <ul class="flex flex-row list-none">
        <li><router-link to="/">Main</router-link></li>
        <li><router-link to="/perks">Perks</router-link></li>
        <li><router-link to="/login">Account</router-link></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/dbdnavbar.scss";
@import url('https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Dirt&display=swap');
</style>