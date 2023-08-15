<template>
  <div class="flex flex-wrap align-items-center">
    <span>這個按鈕將會刪除這隻殺手的全部訊息，後果自負</span>
    <Button
      label="Delete"  
      class="p-button-danger mx-2"
      style="max-width:100%;"
      @click="emits('delete')"
    />
  </div>
  <div class="flex flex-wrap my-3">
    <p>創建時間：<span>{{ Fordate }}</span></p>
  </div>
</template>

<script setup>
import moment from "moment"
const props = defineProps(["build"])
const emits = defineEmits(["delete"])

const Date = moment.unix(props.build.seconds).add(props.build.nanoseconds / 1000000, "milliseconds")
const Fordate = Date.format("YYYY-MM-DD HH:mm:ss.SSS")
</script>