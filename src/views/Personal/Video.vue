<template>
  <div class="video">
    <div class="figure"></div>
    <div class="player">
      <video  class="player__video viewer" :src="videoLink"></video>
      <div class="player__controls">
          <div class="progress">
              <div class="progress__filled"></div>
          </div>
          <button class="player__button toggle" title="Toggle Play">►</button>
          <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
          <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
          <button data-skip="-10" class="player__button">« 10s</button>
          <button data-skip="25" class="player__button">25s »</button>
      </div>
    </div>
    <Button @click="back" class="back">Back to Personal</Button>
  </div>
</template>

<script>
export default {
  name:"Video",
  props:{
    videoLink:{type: String}
  }
}
</script>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const back = () => {
    router.push("/personal")
}
onMounted(() => {
  const player = document.querySelector(".player")
  const video = player.querySelector(".player__video.viewer")
  const progress = player.querySelector(".progress")
  const progressBar = player.querySelector(".progress__filled")
  const toggle = player.querySelector(".toggle")
  const skipButtons = player.querySelectorAll("button[data-skip]")
  const ranges = player.querySelectorAll(".player__slider")

  function togglePlay(){
      const methods = video.paused ? "play" : "pause"
      video[methods]()
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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/video.scss";
</style>