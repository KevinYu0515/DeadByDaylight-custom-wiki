<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <transition name="drop-in">
        <div class="vue-modal-inner" v-show="open">
          <div class="vue-modal-content">
            <button class="close-button" type="button" @click="close">
              <i class="fi fi-br-cross-small"></i>
            </button>
            <slot />
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
@import url('https://cdn-uicons.flaticon.com/2.1.0/uicons-bold-rounded/css/uicons-bold-rounded.css');
@import "@/assets/scss/modal.scss";
</style>
