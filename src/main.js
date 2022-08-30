import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import primevue from "./primevue"
import "./interceptors/axios"
import PrimeVue from "primevue/config"
import Tooltip from "primevue/tooltip"

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"                                                                                    
import "primeicons/primeicons.css"

const app = createApp(App)

app.use(router).use(PrimeVue)

primevue.components.forEach(component => {
    app.component( component.name, component)
})

app.directive("Tooltip", Tooltip)

app.mount("#app")
