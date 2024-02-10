<template>
  <div class="footer text-white">
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
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/footer.scss";
</style>
