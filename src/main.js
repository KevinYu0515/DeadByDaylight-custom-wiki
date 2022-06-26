import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import primevue from "./primevue"
import "./interceptors/axios"
import axios from "axios"
import VueAxios from "vue-axios"
import PrimeVue from "primevue/config"
import Tooltip from "primevue/tooltip"



import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"               //core css
import "primeicons/primeicons.css"   

const app = createApp(App)

app.use(router).use(VueAxios, axios).use(PrimeVue)

primevue.components.forEach(component => {
    app.component( component.name, component)  
})

app.directive("Tooltip", Tooltip)

app.mount("#app")
