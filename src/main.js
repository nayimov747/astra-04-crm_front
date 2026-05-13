import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "./assets/main.css"
import router from './router'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.min.css';
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || "none",
    },
  },
});
app.use(ConfirmationService)
app.use(ToastService)




app.mount('#app')
