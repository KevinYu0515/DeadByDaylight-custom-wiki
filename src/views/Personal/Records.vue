<template>
  <div class="records">
    <div class="leftBg">
      <div class="card">
        <div class="imgBox">
          <img :src="killerCover" alt="killer"/>
        </div>
      </div>
      <div class="content">
             <div>
              <h1>{{killerName}}</h1>
              <p>Move： {{killerMove}} m/s</p>
              <br>
              <p>Terror： {{killerTerror}} m</p>
              <br>
              <p>Height： {{killerHeight}}</p>
            </div>
        </div>
    </div>
    <div class="container">
      <div class="skills">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        killerCover:{type: String},
        killerName:{type: String},
        killerMove:{type: String},
        killerTerror:{type: String},
        killerHeight:{type:String}
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/records.scss";
</style>