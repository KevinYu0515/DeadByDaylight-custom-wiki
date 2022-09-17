<template>
  <div class="video">
    <img class="videoFigure" :src="videoBg" alt="videoBackground"/>
    <Button @click="back" class="back my-5">Back to Personal</Button>
    <div class="player">
      <video  class="player__video viewer" :src="videoNow"></video>
      <div class="player__controls">
          <div class="progress">
              <div class="progress__filled"></div>
          </div>
          <button class="player__button toggle" title="Toggle Play">►</button>
          <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
          <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
          <button data-skip="-10" class="player__button">« 10s</button>
          <button data-skip="25" class="player__button">25s »</button>
          <button class="player__button fullScreen" title="Full Screen">❏</button>
      </div>
    </div>
    <div class="flex justify-content-center align-items-center">
      <div class="mx-5" v-for="(video, index) in videoUrl" :key="index">
        <video height="150" width="260" class="videoSwipe mt-3 cursor-pointer" :class="{'isplayed':isplayed[index]}" @click="changeVideo(index)" :src="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Video",
  props:{
    videoLink:{type: String},
    videoIndex:{type: String},
    videoUrl:{type: Array},
    videoBg:{type: String}
  }
}
</script>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const Instance = getCurrentInstance()
const isplayed = ref([false])
const videoNow = ref(null)
const back = () => {
    router.push("/personal")
}
onMounted(() => {
  videoNow.value = Instance.props.videoLink
  isplayed.value[parseInt(Instance.props.videoIndex)] = true
  const player = document.querySelector(".player")
  const video = player.querySelector(".player__video.viewer")
  const progress = player.querySelector(".progress")
  const progressBar = player.querySelector(".progress__filled")
  const toggle = player.querySelector(".toggle")
  const skipButtons = player.querySelectorAll("button[data-skip]")
  const ranges = player.querySelectorAll(".player__slider")
  const fullScreen = player.querySelector(".fullScreen")

  function togglePlay(){
      const methods = video.paused ? "play" : "pause"
      video[methods]()
  }

  const isfull = ref(false)
  function toggleFull(){
    if(!isfull.value){
      isfull.value = true
      player.requestFullscreen()
      fullScreen.textContent = "⇲"
      fullScreen.title = "Shrink Screen"
    }else {
      isfull.value = false
      document.exitFullscreen()
      fullScreen.textContent = "❏"
      fullScreen.title = "Full Screen"
    }
  }


  function updateButton() {
      toggle.textContent = this.paused ? "►" : "❚❚"
  }  

  function skip() {
      video.currentTime += parseFloat(this.dataset.skip)
    }
    
  function handleRangeUpdate() {
      video[this.name] = this.value
  }

  function handleProgress() {
      const percent = video.currentTime / video.duration * 100
      progressBar.style.flexBasis = `${percent}%`
  }
  function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration
  video.currentTime = scrubTime
  }


  video.addEventListener("play", updateButton)
  video.addEventListener("pause", updateButton)
  video.addEventListener("timeupdate", handleProgress)
  fullScreen.addEventListener("click", toggleFull)

  video.addEventListener("click", togglePlay)
  toggle.addEventListener("click", togglePlay)
  skipButtons.forEach(button => button.addEventListener("click", skip))
  ranges.forEach(range => {
    range.addEventListener("change", handleRangeUpdate)
    range.addEventListener("mousemove", handleRangeUpdate)
    range.addEventListener("click", handleRangeUpdate)
  })

  let mousedown = false
  progress.addEventListener("click", scrub)
  progress.addEventListener("mousemove", e => mousedown && scrub(e))
  progress.addEventListener("mousedown", () => (mousedown = true))
  progress.addEventListener("mouseup", () => (mousedown = false))
})

const changeVideo = index => {
  isplayed.value = [false]
  isplayed.value[index] = true
  videoNow.value = Instance.props.videoUrl[index] 
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/video.scss";
</style>