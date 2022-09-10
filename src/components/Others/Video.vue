<template>
  <div class="video">
    <video width="800" height="600" :src="require('@/assets/video/defaultAnimation.mp4')" controls></video>
    <Button @click="back" class="back">Back to Personal</Button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      testDisplay: false
    }
  },
  methods:{
    test(){
      this.testDisplay = !this.testDisplay
      console.log(this.testDisplay)
    }
  }
}
</script>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const back = () => {
    router.push("/personal")
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/video.scss";
</style>