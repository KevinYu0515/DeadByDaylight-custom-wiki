import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import axios from "axios"
import VueAxios from "vue-axios"
import PrimeVue from "primevue/config"
import Dropdown from "primevue/dropdown"
import InputText from "primevue/inputtext"
import Button from "primevue/button"


import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"               //core css
import "primeicons/primeicons.css"   

createApp(App)
.use(router)
.use(VueAxios, axios)
.use(PrimeVue)
.component("Dropdown",Dropdown)
.component("InputText",InputText)
.component("Button", Button)
.mount("#app")
