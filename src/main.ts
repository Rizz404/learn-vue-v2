import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Pasang router sebagai plugin
app.use(router)

app.mount('#app')
