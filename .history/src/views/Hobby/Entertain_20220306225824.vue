<template>
  <div class="entertain">
    <Carousel
      :navigation="true"
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
import Carousel from "../../components/Slideshow/Carousel.vue";
import Slide from "../../components/Slideshow/Slide.vue";

export default {
  name: "Entertain",
  components: { Carousel, Slide },
  setup() {
    const carouselSlides = ["bg-1", "bg-2", "bg-3"];

    return { carouselSlides };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  max-height: 100vh;
  height: 100vh;

  .slide-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    height: 100%;

    img {
      min-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
