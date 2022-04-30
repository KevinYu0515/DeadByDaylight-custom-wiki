<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <transition name="drop-in">
        <div class="vue-modal-inner">
          <div class="vue-modal-content">
            <slot />
            <button type="button" @click="close">Close</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
export default {
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };
    const handleKeyup = (event) => {
      if (event.keyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

    return { close };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/modal.scss";
</style>
