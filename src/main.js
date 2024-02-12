import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./interceptors/axios";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import store from "./vuex/store";
import VueCropper from "vue-cropper";
import axios from "axios";
import "@/assets/scss/index.scss";

import "vue-cropper/dist/index.css";
const app = createApp(App);

app.use(router).use(store).use(VueCropper)
    .component("Swiper", Swiper)
    .component("SwiperSlide", SwiperSlide);

app.config.globalProperties.$http = axios;

app.mount("#app");