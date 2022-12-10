<template>
  <DBDNavbar></DBDNavbar>
  <div class="video">
    <!-- <img v-if="videoBg != null" class="videoFigure" :src="videoBg" alt="videoBackground"/> -->
    <div class="player">
      <video  class="player__video viewer" :src="CurrentVideo"></video>
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
  </div>
  <div class="videoList">
    <div class="videoBox mt-8 flex justify-content-start align-items-center">
      <div class="mx-2" v-for="(video, index) in videoTrailersUrl" :key="index">
        <video height="150" width="260" class="videoItem mt-3" :class="{'isplayed':isplayedStyle[0] && isplayed[index]}" @click="changeVideo(index , -1)" :src="video"></video>
      </div>
    </div>
    <div v-for="(figure, figureIndex) in videoRecordUrl" :key="figureIndex" class="videoBox mt-2 flex justify-content-start align-items-center">
      <div class="mx-2" v-for="(video, videoIndex) in figure.ytRecord" :key="videoIndex">
        <video height="150" width="260" class="videoItem mt-3" :class="{'isplayed':isplayedStyle[figureIndex + 1] && isplayed[videoIndex]}" @click="changeVideo(videoIndex, figureIndex)" :src="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Video"
}
</script>

<script setup>
// import AppendVideo from "../../components/DialogGroup/AppendVideo.vue"
import DBDNavbar from "../../components/Navbar/DBDNavbar.vue"
import { ref, onMounted, getCurrentInstance } from "vue"
import { ref as r } from "firebase/storage"
import { videosColRef, storage, download } from "@/firebase"
import { onSnapshot,  } from "@firebase/firestore"
//uploadBytes, updateDoc, doc

const Instance = getCurrentInstance()
const isplayedStyle = ref([false])
const isplayed = ref([false])
const CurrentVideo = ref(require("@/assets/video/defaultAnimation.mp4"))
const videoTrailersUrl = ref([])
const videoRecordUrl = ref([])

onMounted(() => {
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

onMounted(() => {
  if(videoRecordUrl.value.length == 0 || videoTrailersUrl.value.length == 0){
    console.log("download...")
    onSnapshot(videosColRef, (querySnapshot) => {
      let TempVideos = []
      querySnapshot.forEach((doc) => {
        const video = {
          trail: doc.data().trail,
          record: doc.data().record
        }
        TempVideos.push(video)
      })

      for (let figure = 0; figure < TempVideos.length; figure++) {
        let trailerName = TempVideos[figure].trail
        let pathReference = r(storage, `killersVideo/Trailer/${trailerName}.mp4`)
        download(pathReference, videoTrailersUrl.value)

        let ytRecordArray = []
        if(TempVideos[figure].record.length > 0 && TempVideos[figure].record[0] !== ""){
          for( let item = 0; item < TempVideos[figure].record.length; item++){
            let recordName = TempVideos[figure].record[item]
            let pathReference = r(storage, `killersVideo/Review/${recordName}.mp4`)
            download(pathReference, ytRecordArray)
          }
          const videoInfor = {
            name: trailerName,
            ytRecord: ytRecordArray
          }
          videoRecordUrl.value.push(videoInfor)
        }
      }
    })
  }
})

onMounted(() => {
const slider = document.querySelector(".videoBox")
let startX
let isDown = false
let scrollLeft

slider.addEventListener("mousedown",(e) => {
      isDown = true
      slider.classList.add("active")
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
  })

slider.addEventListener("mouseleave",(e) => {
      isDown = false
      slider.classList.remove("active")
  })

slider.addEventListener("mouseup",(e) => {
      isDown = false
      slider.classList.remove("active")
  })

slider.addEventListener("mousemove",(e) => {
      if(!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX)
      slider.scrollLeft = scrollLeft - walk
  })
})

const changeVideo = (index, type) => {
  isplayedStyle.value = [false]
  isplayed.value = [false]
  if(type == -1){
    type ++
    CurrentVideo.value = videoTrailersUrl.value[index]
    isplayedStyle.value[type] = true
    isplayed.value[index] = true
  } else {
    CurrentVideo.value = videoRecordUrl.value[type].ytRecord[index]
    isplayedStyle.value[type + 1] = true
    isplayed.value[index] = true
  }
}

// const deleteVideo = index => {
//   console.log(loadVideos.value, index)
// }

//更新資料
// const writeInVideos = () => {
//   updateDoc(doc(videosColRef, ),{ [options]: optionsValue })
//   console.log("updateSettings")
// }

// 上傳影片檔案
// const onUploadVideo = (video, kind) =>{
//   const videoTrailer = `${Instance.props.killerName}.mp4`
//   const videoReview = `${Instance.props.killerName}-00${loadVideos.value.length}.mp4`
//   const videoName = (kind == "Trailer") ? videoTrailer :  videoReview

//   const storageRef = r(storage, `killersVideo/${kind}/${videoName}`)
//   uploadBytes(storageRef, video).then((snapshot) => {
//     console.log("Uploaded a blob or file!", snapshot)
//   })
//   updateSettings("videos",loadVideos.value.length+1)
// }

</script>

<style lang="scss" scoped>
@import "@/assets/scss/personal/video.scss";
</style>