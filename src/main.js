import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import primevue from "./primevue"
import "./interceptors/axios"
import PrimeVue from "primevue/config"
import Tooltip from "primevue/tooltip"
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import "swiper/swiper-bundle.css"
import store from "./vuex/store"
import VueCropper from "vue-cropper"
import axios from "axios"

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"                                                                                    
import "primeicons/primeicons.css"
import "vue-cropper/dist/index.css"

const app = createApp(App)

app.use(router).use(PrimeVue).use(store).use(VueCropper)
    .component("Swiper", Swiper)
    .component("SwiperSlide", SwiperSlide)

primevue.components.forEach(component => {
    app.component( component.name, component)
})

app.directive("Tooltip", Tooltip)
app.config.globalProperties.$http = axios

app.mount("#app")
