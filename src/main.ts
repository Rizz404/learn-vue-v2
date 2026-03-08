import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

// Pasang router sebagai plugin
app.use(pinia)
app.use(router)

app.mount('#app')
