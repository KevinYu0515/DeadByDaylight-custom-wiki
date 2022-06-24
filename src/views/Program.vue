<template>
  <div class="program">
    <Carousel
      :navigation="false"
      :pagination="true"
      :startAutoPlay="false"
      :timeout="2000"
      class="carousel"
      v-slot="{ currentSlide }"
    >
      <Slide v-for="(slide, index) in carouselSlides" :key="index">
        <div v-show="currentSlide === index + 1" class="slide-info">
          <img :src="require(`@/assets/picture/${slide}.jpg`)" alt="" />
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import Carousel from "../components/Slideshow/Carousel.vue"
import Slide from "../components/Slideshow/Slide.vue"

export default {
components: { Carousel, Slide },
  setup() {
    const carouselSlides = ["bg-1", "bg-2", "bg-3"]
    return { carouselSlides }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/program/program.scss";
</style>
