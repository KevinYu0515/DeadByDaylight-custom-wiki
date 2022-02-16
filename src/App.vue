<template>
  <div class="app">
    <Navbar/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default{
  name:"App",
  components:{
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.deafult{
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: #f5f5f5;
    font-size: 18vw;
    font-weight: 700;
}

</style>
