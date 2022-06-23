<template>
  <main :style="mainStyle">
    <div class="star_line">
      <span class="star" @click="changeValue(star)" :style="starStyle" v-for="(star, index) in total" :key="index">☆</span>
    </div>
    <div class="star_line" :style="blackStyle">
      <span class="star" @click="changeValue(star - 1)" :style="starStyle"  v-for="(star, index) in total" :key="index">★</span>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return{
      score:1
    }
  },
  props: {
    total: {
      default: 10,
    },
    size: {
      default: 30,
    },
    value: {},
  },
  computed: {
    mainStyle() {
      return { width: this.size * this.total + "px" }
    },
    starStyle() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        fontSize: this.size + 6 + "px",
      }
    },
    blackStyle() {
      return {
        width: (this.value / this.total) * 100 + "%",
      }
    },
  },
  methods: {
    changeValue(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  .star_line {
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    .star {
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
