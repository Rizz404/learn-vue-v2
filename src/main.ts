import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import AppFor91 from './AppFor91.vue'
import routerFor91 from './router/indexFor91'

const app = createApp(AppFor91)
const pinia = createPinia()

// Pasang router sebagai plugin
app.use(pinia)
app.use(routerFor91)

app.mount('#app')
